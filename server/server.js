const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Database = require('better-sqlite3');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================================
// XSS Protection - sanitize user input
// ============================================================
function sanitizeInput(obj) {
  if (typeof obj === 'string') {
    return obj
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }
  if (typeof obj === 'object' && obj !== null) {
    const sanitized = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      sanitized[key] = sanitizeInput(obj[key]);
    }
    return sanitized;
  }
  return obj;
}

app.use((req, res, next) => {
  if (req.body && req.method !== 'GET') {
    req.body = sanitizeInput(req.body);
  }
  next();
});

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// ============================================================
// SQLite Database Initialization
// ============================================================
const DATA_DIR = path.join(__dirname, 'data');
fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = path.join(DATA_DIR, 'doujiang.db');
const db = new Database(DB_PATH);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT DEFAULT '未分类',
    date TEXT NOT NULL,
    summary TEXT,
    content TEXT NOT NULL,
    source TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now', 'localtime')),
    updated_at TEXT DEFAULT (datetime('now', 'localtime'))
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT DEFAULT '',
    message TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now', 'localtime'))
  );

  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    created_at TEXT DEFAULT (datetime('now', 'localtime'))
  );
`);

// Helper: migrate existing JSON data to SQLite on first run
function migrateFromJson() {
  const articlesFile = path.join(DATA_DIR, 'articles.json');
  if (fs.existsSync(articlesFile)) {
    try {
      const existing = JSON.parse(fs.readFileSync(articlesFile, 'utf8'));
      if (Array.isArray(existing) && existing.length > 0) {
        const count = db.prepare('SELECT COUNT(*) as c FROM articles').get().c;
        if (count === 0) {
          const insert = db.prepare(`
            INSERT INTO articles (title, category, date, summary, content, source)
            VALUES (?, ?, ?, ?, ?, ?)
          `);
          const migrate = db.transaction((articles) => {
            for (const a of articles) {
              const title = typeof a.title === 'object' ? JSON.stringify(a.title) : (a.title || '');
              const category = typeof a.category === 'object' ? JSON.stringify(a.category) : (a.category || '未分类');
              const summary = typeof a.summary === 'object' ? JSON.stringify(a.summary) : (a.summary || '');
              const content = typeof a.content === 'object' ? JSON.stringify(a.content) : (a.content || '');
              const source = typeof a.source === 'object' ? JSON.stringify(a.source) : (a.source || '');
              insert.run(title, category, a.date || new Date().toISOString().split('T')[0], summary, content, source);
            }
          });
          migrate(existing);
          console.log(`Migrated ${existing.length} articles from JSON to SQLite`);
        }
      }
    } catch (e) {
      console.log('Migration skipped:', e.message);
    }
  }

  // Migrate contacts
  const contactsFile = path.join(DATA_DIR, 'contacts.json');
  if (fs.existsSync(contactsFile)) {
    try {
      const existing = JSON.parse(fs.readFileSync(contactsFile, 'utf8'));
      if (Array.isArray(existing) && existing.length > 0) {
        const count = db.prepare('SELECT COUNT(*) as c FROM contacts').get().c;
        if (count === 0) {
          const insert = db.prepare(`
            INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)
          `);
          const migrate = db.transaction((contacts) => {
            for (const c of contacts) {
              insert.run(c.name || '', c.email || '', c.phone || '', c.message || '');
            }
          });
          migrate(existing);
          console.log(`Migrated ${existing.length} contacts from JSON to SQLite`);
        }
      }
    } catch (e) {
      console.log('Contacts migration skipped:', e.message);
    }
  }

  // Migrate subscribers
  const subscribersFile = path.join(DATA_DIR, 'subscribers.json');
  if (fs.existsSync(subscribersFile)) {
    try {
      const existing = JSON.parse(fs.readFileSync(subscribersFile, 'utf8'));
      if (Array.isArray(existing) && existing.length > 0) {
        const count = db.prepare('SELECT COUNT(*) as c FROM subscribers').get().c;
        if (count === 0) {
          const insert = db.prepare(`
            INSERT OR IGNORE INTO subscribers (email) VALUES (?)
          `);
          const migrate = db.transaction((subs) => {
            for (const s of subs) {
              if (s.email) insert.run(s.email);
            }
          });
          migrate(existing);
          console.log(`Migrated ${existing.length} subscribers from JSON to SQLite`);
        }
      }
    } catch (e) {
      console.log('Subscribers migration skipped:', e.message);
    }
  }
}

migrateFromJson();

// ============================================================
// Helper: JSON file read/write (still used by mail and products)
// ============================================================
function readJsonFile(filename) {
  const filePath = path.join(DATA_DIR, filename);
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function writeJsonFile(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ============================================================
// AI Translation helper
// ============================================================

// AI Translation helper - translates Chinese text to English
// Uses a configurable translation provider
// Translation configuration
const TRANSLATE_PROVIDER = process.env.TRANSLATE_PROVIDER || 'deepseek'; // 'deepseek' or 'openai'
const TRANSLATE_API_KEY = process.env.TRANSLATE_API_KEY || '';
const TRANSLATE_API_BASE = process.env.TRANSLATE_API_BASE || ''; // custom API base URL

async function translateToEnglish(text) {
  if (!text || typeof text !== 'string') return text;

  // If already mostly English, return as-is
  if (/^[\x00-\x7F\s]+$/.test(text.substring(0, 50))) return text;

  const apiKey = TRANSLATE_API_KEY;
  if (!apiKey) return text; // No API key configured, keep original

  let apiUrl, model;

  if (TRANSLATE_PROVIDER === 'openai') {
    apiUrl = TRANSLATE_API_BASE || 'https://api.openai.com/v1/chat/completions';
    model = 'gpt-4o-mini';
  } else {
    // DeepSeek (default)
    apiUrl = TRANSLATE_API_BASE || 'https://api.deepseek.com/chat/completions';
    model = 'deepseek-chat';
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: 'You are a professional translator. Translate the following Chinese text to English. Return ONLY the translated text, no explanations. Maintain the original formatting, line breaks, and any markdown syntax.' },
          { role: 'user', content: text }
        ],
        temperature: 0.3
      })
    });
    const data = await response.json();
    if (data.choices && data.choices[0]) {
      return data.choices[0].message.content.trim();
    }
    console.log('Translation API error:', JSON.stringify(data));
  } catch (e) {
    console.log('AI translation failed:', e.message);
  }

  return text; // Fallback: keep original
}

// ============================================================
// Admin Authentication
// ============================================================
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'doujiang2026';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '~~AAvae159874';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'dj-admin-secret-key-2026';

// Simple token-based auth (for production, use JWT)
const activeTokens = new Set();

// ============================================================
// Rate limiting for login
// ============================================================
const loginAttempts = new Map(); // IP -> { count, resetTime }

function rateLimit(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const maxAttempts = 10;
  const windowMs = 60 * 1000; // 1 minute

  const record = loginAttempts.get(ip);

  if (record && now < record.resetTime) {
    if (record.count >= maxAttempts) {
      const retryAfter = Math.ceil((record.resetTime - now) / 1000);
      res.setHeader('Retry-After', String(retryAfter));
      return res.status(429).json({ success: false, error: `请求过于频繁，请 ${retryAfter} 秒后再试` });
    }
    record.count++;
  } else {
    loginAttempts.set(ip, { count: 1, resetTime: now + windowMs });
  }

  next();
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of loginAttempts) {
    if (now >= record.resetTime) loginAttempts.delete(ip);
  }
}, 5 * 60 * 1000);

// ============================================================
// Login lockout tracking
// ============================================================
const loginFailures = new Map(); // IP -> { count, lockedUntil }

app.post('/api/admin/login', rateLimit, (req, res) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();

  // Check if IP is locked
  const failure = loginFailures.get(ip);
  if (failure && failure.lockedUntil && now < failure.lockedUntil) {
    const remaining = Math.ceil((failure.lockedUntil - now) / 1000);
    return res.status(429).json({
      success: false,
      error: `登录失败次数过多，账户已锁定，请 ${remaining} 秒后再试`
    });
  }

  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Login success - clear failures
    loginFailures.delete(ip);

    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
    activeTokens.add(token);
    setTimeout(() => activeTokens.delete(token), 24 * 60 * 60 * 1000);

    res.json({ success: true, token });
  } else {
    // Login failure - increment counter
    const maxFailures = 5;
    const lockoutMs = 15 * 60 * 1000; // 15 minutes

    if (!failure) {
      loginFailures.set(ip, { count: 1, lockedUntil: null });
    } else {
      failure.count++;
      if (failure.count >= maxFailures) {
        failure.lockedUntil = now + lockoutMs;
        const remaining = Math.ceil(lockoutMs / 1000);
        return res.status(429).json({
          success: false,
          error: `登录失败 ${maxFailures} 次，账户已锁定 ${remaining} 秒`
        });
      }
    }

    const remaining = maxFailures - (failure ? failure.count : 0);
    res.status(401).json({
      success: false,
      error: `用户名或密码错误（剩余 ${remaining} 次尝试机会）`
    });
  }
});

// Auth middleware
function requireAuth(req, res, next) {
  const token = req.headers['authorization']?.replace('Bearer ', '');

  if (!token || !activeTokens.has(token)) {
    return res.status(401).json({ success: false, error: '未授权，请先登录' });
  }

  next();
}

// POST /api/admin/logout - 登出
app.post('/api/admin/logout', (req, res) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (token) activeTokens.delete(token);
  res.json({ success: true });
});

// GET /api/admin/check - 检查登录状态
app.get('/api/admin/check', (req, res) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (token && activeTokens.has(token)) {
    res.json({ success: true, authenticated: true });
  } else {
    res.status(401).json({ success: false, authenticated: false });
  }
});

// ============================================================
// Articles API (SQLite)
// ============================================================

// GET /api/articles - 获取文章列表（支持分页和分类筛选）
app.get('/api/articles', (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    let whereClause = '';
    let params = [];

    if (category) {
      whereClause = 'WHERE category LIKE ?';
      params.push(`%${category}%`);
    }

    // Get total count
    const countResult = db.prepare(`SELECT COUNT(*) as total FROM articles ${whereClause}`).get(...params);
    const total = countResult.total;

    // Get paginated results
    const articles = db.prepare(
      `SELECT * FROM articles ${whereClause} ORDER BY id DESC LIMIT ? OFFSET ?`
    ).all(...params, limitNum, (pageNum - 1) * limitNum);

    res.json({
      success: true,
      data: articles,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// GET /api/articles/:id - 获取文章详情
app.get('/api/articles/:id', (req, res) => {
  try {
    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: '文章不存在' });
    }
    res.json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// POST /api/articles - 创建文章（支持自动翻译为双语）
app.post('/api/articles', requireAuth, async (req, res) => {
  try {
    const { title, category, summary, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: '缺少必要字段：title, content'
      });
    }

    // Auto-translate to English
    const [enTitle, enCategory, enSummary, enContent] = await Promise.all([
      translateToEnglish(title),
      category ? translateToEnglish(category) : Promise.resolve(category),
      summary ? translateToEnglish(summary) : Promise.resolve(summary),
      translateToEnglish(content)
    ]);

    const titleJson = JSON.stringify({ zh: title, en: enTitle });
    const categoryJson = category ? JSON.stringify({ zh: category, en: enCategory }) : JSON.stringify({ zh: '未分类', en: 'Uncategorized' });
    const summaryJson = summary ? JSON.stringify({ zh: summary, en: enSummary }) : JSON.stringify({ zh: title, en: enTitle });
    const contentJson = JSON.stringify({ zh: content, en: enContent });
    const date = new Date().toISOString().split('T')[0];

    const result = db.prepare(`
      INSERT INTO articles (title, category, date, summary, content) VALUES (?, ?, ?, ?, ?)
    `).run(titleJson, categoryJson, date, summaryJson, contentJson);

    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// PUT /api/articles/:id - 更新文章
app.put('/api/articles/:id', requireAuth, async (req, res) => {
  try {
    const { title, category, summary, content } = req.body;
    const existing = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id);

    if (!existing) {
      return res.status(404).json({ success: false, message: '文章不存在' });
    }

    const titleJson = title ? JSON.stringify({ zh: title, en: title }) : existing.title;
    const categoryJson = category ? JSON.stringify({ zh: category, en: category }) : existing.category;
    const summaryJson = summary ? JSON.stringify({ zh: summary, en: summary }) : existing.summary;
    const contentJson = content ? JSON.stringify({ zh: content, en: content }) : existing.content;

    db.prepare(`
      UPDATE articles SET title = ?, category = ?, summary = ?, content = ?, updated_at = datetime('now', 'localtime')
      WHERE id = ?
    `).run(titleJson, categoryJson, summaryJson, contentJson, req.params.id);

    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id);
    res.json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// DELETE /api/articles/:id - 删除文章
app.delete('/api/articles/:id', requireAuth, (req, res) => {
  try {
    const result = db.prepare('DELETE FROM articles WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: '文章不存在' });
    }
    res.json({ success: true, message: '文章已删除' });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// PUT /api/articles/:id/translate - 手动触发重新翻译
app.put('/api/articles/:id/translate', requireAuth, async (req, res) => {
  try {
    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: '文章不存在' });
    }

    const getZh = (field) => {
      try { return JSON.parse(article[field]).zh; } catch { return article[field]; }
    };

    const [enTitle, enCategory, enSummary, enContent] = await Promise.all([
      translateToEnglish(getZh('title')),
      translateToEnglish(getZh('category')),
      translateToEnglish(getZh('summary')),
      translateToEnglish(getZh('content'))
    ]);

    const titleJson = JSON.stringify({ zh: getZh('title'), en: enTitle });
    const categoryJson = JSON.stringify({ zh: getZh('category'), en: enCategory });
    const summaryJson = JSON.stringify({ zh: getZh('summary'), en: enSummary });
    const contentJson = JSON.stringify({ zh: getZh('content'), en: enContent });

    db.prepare(`
      UPDATE articles SET title = ?, category = ?, summary = ?, content = ?, updated_at = datetime('now', 'localtime')
      WHERE id = ?
    `).run(titleJson, categoryJson, summaryJson, contentJson, req.params.id);

    const updated = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// ============================================================
// Translate API
// ============================================================

// GET /api/translate/status - 翻译状态查询
app.get('/api/translate/status', (req, res) => {
  res.json({
    success: true,
    data: {
      enabled: !!TRANSLATE_API_KEY,
      provider: TRANSLATE_PROVIDER === 'openai' ? 'OpenAI GPT-4o-mini' : 'DeepSeek Chat',
      configured: !!TRANSLATE_API_KEY
    }
  });
});

// ============================================================
// Contact API (SQLite)
// ============================================================

// POST /api/contact - 提交联系表单
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: '缺少必要字段：name, email, message'
      });
    }

    // 简单的邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: '邮箱格式不正确' });
    }

    const result = db.prepare('INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)').run(name, email, phone || '', message);
    const contact = db.prepare('SELECT * FROM contacts WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({
      success: true,
      message: '联系表单提交成功，我们将尽快与您联系',
      data: contact
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// ============================================================
// Subscribe API (SQLite)
// ============================================================

// POST /api/subscribe - 邮箱订阅
app.post('/api/subscribe', (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: '缺少必要字段：email' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: '邮箱格式不正确' });
    }

    // Check if already subscribed
    const existing = db.prepare('SELECT * FROM subscribers WHERE email = ?').get(email);
    if (existing) {
      return res.status(409).json({ success: false, message: '该邮箱已订阅' });
    }

    const result = db.prepare('INSERT INTO subscribers (email) VALUES (?)').run(email);
    const subscriber = db.prepare('SELECT * FROM subscribers WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({
      success: true,
      message: '订阅成功',
      data: subscriber
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// GET /api/subscribers - 获取订阅者列表
app.get('/api/subscribers', (req, res) => {
  try {
    const subscribers = db.prepare('SELECT * FROM subscribers ORDER BY id DESC').all();
    res.json({ success: true, data: subscribers });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// DELETE /api/subscribers/:email - 取消订阅
app.delete('/api/subscribers/:email', (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);
    const result = db.prepare('DELETE FROM subscribers WHERE email = ?').run(email);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: '该邮箱未找到订阅记录' });
    }

    res.json({ success: true, message: '取消订阅成功' });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// ============================================================
// Mail API (模拟邮件系统 - still uses JSON files)
// ============================================================

// POST /api/mail/send - 发送邮件（模拟）
app.post('/api/mail/send', (req, res) => {
  try {
    const { to, subject, body } = req.body;

    if (!to || !subject || !body) {
      return res.status(400).json({
        success: false,
        message: '缺少必要字段：to, subject, body'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return res.status(400).json({ success: false, message: '收件人邮箱格式不正确' });
    }

    const sentMails = readJsonFile('sent-mails.json');
    const newMail = {
      id: uuidv4(),
      from: 'noreply@doujiang-tech.com',
      to,
      subject,
      body,
      date: new Date().toISOString(),
      status: 'sent'
    };

    sentMails.push(newMail);
    writeJsonFile('sent-mails.json', sentMails);

    res.status(201).json({
      success: true,
      message: '邮件发送成功（模拟）',
      data: newMail
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// GET /api/mail/inbox - 获取收件箱
app.get('/api/mail/inbox', (req, res) => {
  try {
    const inbox = readJsonFile('inbox.json');
    // 按日期倒序排列
    inbox.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json({ success: true, data: inbox });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// GET /api/mail/sent - 获取已发送邮件列表
app.get('/api/mail/sent', (req, res) => {
  try {
    const sentMails = readJsonFile('sent-mails.json');
    sentMails.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json({ success: true, data: sentMails });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// DELETE /api/mail/:id - 删除邮件
app.delete('/api/mail/:id', (req, res) => {
  try {
    const mailId = req.params.id;

    // 先尝试从收件箱中删除
    let inbox = readJsonFile('inbox.json');
    let inboxIndex = inbox.findIndex(m => m.id === mailId);

    if (inboxIndex !== -1) {
      const deleted = inbox.splice(inboxIndex, 1)[0];
      writeJsonFile('inbox.json', inbox);
      return res.json({ success: true, message: '邮件已删除', data: deleted });
    }

    // 再尝试从已发送中删除
    let sentMails = readJsonFile('sent-mails.json');
    let sentIndex = sentMails.findIndex(m => m.id === mailId);

    if (sentIndex !== -1) {
      const deleted = sentMails.splice(sentIndex, 1)[0];
      writeJsonFile('sent-mails.json', sentMails);
      return res.json({ success: true, message: '邮件已删除', data: deleted });
    }

    return res.status(404).json({ success: false, message: '邮件不存在' });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// ============================================================
// Products API (still uses JSON files)
// ============================================================

// GET /api/products - 获取产品列表
app.get('/api/products', (req, res) => {
  try {
    const products = readJsonFile('products.json');
    const { category } = req.query;

    let result = products;
    if (category) {
      result = products.filter(p => p.category === category);
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// GET /api/products/:id - 获取产品详情
app.get('/api/products/:id', (req, res) => {
  try {
    const products = readJsonFile('products.json');
    const product = products.find(p => p.id === req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: '产品不存在' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// ============================================================
// Root route
// ============================================================
app.get('/', (req, res) => {
  res.json({
    name: '豆姜科技 API Server',
    version: '2.0.0',
    description: '豆姜科技宣传网站后端服务 (SQLite)',
    endpoints: {
      articles: {
        list: 'GET /api/articles?page=1&limit=10&category=xxx',
        detail: 'GET /api/articles/:id',
        create: 'POST /api/articles (auto-translates to bilingual)',
        update: 'PUT /api/articles/:id',
        delete: 'DELETE /api/articles/:id',
        translate: 'PUT /api/articles/:id/translate (manual re-translate)'
      },
      translate: {
        status: 'GET /api/translate/status'
      },
      contact: {
        submit: 'POST /api/contact'
      },
      subscribe: {
        subscribe: 'POST /api/subscribe',
        list: 'GET /api/subscribers',
        unsubscribe: 'DELETE /api/subscribers/:email'
      },
      mail: {
        send: 'POST /api/mail/send',
        inbox: 'GET /api/mail/inbox',
        sent: 'GET /api/mail/sent',
        delete: 'DELETE /api/mail/:id'
      },
      products: {
        list: 'GET /api/products?category=xxx',
        detail: 'GET /api/products/:id'
      }
    }
  });
});

// ============================================================
// 404 handler
// ============================================================
app.use((req, res) => {
  res.status(404).json({ success: false, message: '接口不存在' });
});

// ============================================================
// Global error handler
// ============================================================
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ success: false, message: '服务器内部错误', error: err.message });
});

// ============================================================
// Production: serve static files
// ============================================================
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  // SPA fallback: all non-API routes serve index.html
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    }
  });
}

// ============================================================
// Start server
// ============================================================
app.listen(PORT, () => {
  console.log('========================================');
  console.log('  豆姜科技 API Server (SQLite)');
  console.log(`  Server running on http://localhost:${PORT}`);
  console.log(`  Database: ${DB_PATH}`);
  console.log('========================================');
});

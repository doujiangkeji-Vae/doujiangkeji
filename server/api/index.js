// Vercel Serverless API Entry Point
// This file adapts the Express server for Vercel serverless functions

const { Pool } = require('@neondatabase/serverless');

// Initialize Neon database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Admin credentials from env
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'doujiang2026';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '~~AAvae159874';

// Simple token store (in production, use Redis or JWT)
const activeTokens = new Set();

// Rate limiting (simple in-memory)
const loginAttempts = new Map();
const loginFailures = new Map();

// Translation function
async function translateToEnglish(text) {
  if (!text || typeof text !== 'string') return text;
  if (/^[\x00-\x7F\s]+$/.test(text.substring(0, 50))) return text;

  const apiKey = process.env.TRANSLATE_API_KEY;
  if (!apiKey) return text;

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are a professional translator. Translate the following Chinese text to English. Return ONLY the translated text, no explanations.' },
          { role: 'user', content: text }
        ],
        temperature: 0.3
      })
    });
    const data = await response.json();
    if (data.choices && data.choices[0]) {
      return data.choices[0].message.content.trim();
    }
  } catch (e) {
    console.log('Translation failed:', e.message);
  }
  return text;
}

// XSS Sanitization
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

// Auth middleware
function requireAuth(req) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  return activeTokens.has(token);
}

// Rate limit check
function checkRateLimit(ip) {
  const now = Date.now();
  const maxAttempts = 10;
  const windowMs = 60 * 1000;

  const record = loginAttempts.get(ip);
  if (record && now < record.resetTime) {
    if (record.count >= maxAttempts) {
      return { allowed: false, retryAfter: Math.ceil((record.resetTime - now) / 1000) };
    }
    record.count++;
  } else {
    loginAttempts.set(ip, { count: 1, resetTime: now + windowMs });
  }
  return { allowed: true };
}

// Main handler
module.exports = async (req, res) => {
  // Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Parse URL
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  const method = req.method;

  // Sanitize body for non-GET requests
  if (req.body && method !== 'GET') {
    req.body = sanitizeInput(req.body);
  }

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  try {
    // === Articles API ===
    if (path === '/api/articles' && method === 'GET') {
      const { rows } = await pool.query('SELECT * FROM articles ORDER BY id DESC');
      return res.status(200).json({ success: true, data: rows });
    }

    if (path === '/api/articles' && method === 'POST') {
      if (!requireAuth(req)) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
      }

      const { title, category, summary, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content required' });
      }

      const [enTitle, enCategory, enSummary, enContent] = await Promise.all([
        translateToEnglish(title),
        category ? translateToEnglish(category) : Promise.resolve(category),
        summary ? translateToEnglish(summary) : Promise.resolve(summary),
        translateToEnglish(content)
      ]);

      const titleJson = JSON.stringify({ zh: title, en: enTitle });
      const categoryJson = JSON.stringify({ zh: category || '未分类', en: enCategory || 'Uncategorized' });
      const summaryJson = JSON.stringify({ zh: summary || title, en: enSummary || enTitle });
      const contentJson = JSON.stringify({ zh: content, en: enContent });
      const date = new Date().toISOString().split('T')[0];

      const { rows } = await pool.query(
        'INSERT INTO articles (title, category, date, summary, content) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [titleJson, categoryJson, date, summaryJson, contentJson]
      );

      return res.status(201).json({ success: true, article: rows[0] });
    }

    // === Single Article ===
    const articleMatch = path.match(/^\/api\/articles\/(\d+)$/);
    if (articleMatch && method === 'GET') {
      const { rows } = await pool.query('SELECT * FROM articles WHERE id = $1', [articleMatch[1]]);
      if (rows.length === 0) {
        return res.status(404).json({ success: false, error: 'Not found' });
      }
      return res.status(200).json({ success: true, data: rows[0] });
    }

    if (articleMatch && method === 'DELETE') {
      if (!requireAuth(req)) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
      }
      await pool.query('DELETE FROM articles WHERE id = $1', [articleMatch[1]]);
      return res.status(200).json({ success: true });
    }

    // === Admin Login ===
    if (path === '/api/admin/login' && method === 'POST') {
      const rateCheck = checkRateLimit(ip);
      if (!rateCheck.allowed) {
        res.setHeader('Retry-After', String(rateCheck.retryAfter));
        return res.status(429).json({ success: false, error: `Too many requests, retry after ${rateCheck.retryAfter}s` });
      }

      const now = Date.now();
      const failure = loginFailures.get(ip);
      if (failure && failure.lockedUntil && now < failure.lockedUntil) {
        const remaining = Math.ceil((failure.lockedUntil - now) / 1000);
        return res.status(429).json({ success: false, error: `Account locked, retry after ${remaining}s` });
      }

      const { username, password } = req.body;

      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        loginFailures.delete(ip);
        const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
        activeTokens.add(token);
        setTimeout(() => activeTokens.delete(token), 24 * 60 * 60 * 1000);
        return res.status(200).json({ success: true, token });
      } else {
        const maxFailures = 5;
        const lockoutMs = 15 * 60 * 1000;

        if (!failure) {
          loginFailures.set(ip, { count: 1, lockedUntil: null });
        } else {
          failure.count++;
          if (failure.count >= maxFailures) {
            failure.lockedUntil = now + lockoutMs;
            return res.status(429).json({ success: false, error: `Account locked for 15 minutes` });
          }
        }

        const remaining = maxFailures - (failure ? failure.count : 1);
        return res.status(401).json({ success: false, error: `Invalid credentials (${remaining} attempts left)` });
      }
    }

    // === Contact Form ===
    if (path === '/api/contact' && method === 'POST') {
      const { name, email, phone, message } = req.body;
      await pool.query(
        'INSERT INTO contacts (name, email, phone, message) VALUES ($1, $2, $3, $4)',
        [name, email, phone || '', message]
      );
      return res.status(200).json({ success: true, message: 'Message received' });
    }

    // === Subscribe ===
    if (path === '/api/subscribe' && method === 'POST') {
      const { email } = req.body;
      await pool.query('INSERT INTO subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING', [email]);
      return res.status(200).json({ success: true, message: 'Subscribed' });
    }

    // === Translate Status ===
    if (path === '/api/translate/status' && method === 'GET') {
      return res.status(200).json({
        success: true,
        data: {
          enabled: !!process.env.TRANSLATE_API_KEY,
          provider: 'DeepSeek Chat'
        }
      });
    }

    // 404 for unmatched routes
    return res.status(404).json({ success: false, error: 'Not found' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

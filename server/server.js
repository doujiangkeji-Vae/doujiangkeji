const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================================
// Helper: JSON file read/write
// ============================================================
const DATA_DIR = path.join(__dirname, 'data');

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
// Articles API
// ============================================================

// GET /api/articles - 获取文章列表（支持分页和分类筛选）
app.get('/api/articles', (req, res) => {
  try {
    let articles = readJsonFile('articles.json');
    const { page = 1, limit = 10, category } = req.query;

    // 分类筛选
    if (category) {
      articles = articles.filter(a => a.category === category);
    }

    // 按创建时间倒序排列
    articles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // 分页
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedArticles = articles.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedArticles,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: articles.length,
        totalPages: Math.ceil(articles.length / limitNum)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// GET /api/articles/:id - 获取文章详情
app.get('/api/articles/:id', (req, res) => {
  try {
    const articles = readJsonFile('articles.json');
    const article = articles.find(a => a.id === req.params.id);

    if (!article) {
      return res.status(404).json({ success: false, message: '文章不存在' });
    }

    res.json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// POST /api/articles - 创建文章
app.post('/api/articles', (req, res) => {
  try {
    const { title, content, category, summary } = req.body;

    if (!title || !content || !category || !summary) {
      return res.status(400).json({
        success: false,
        message: '缺少必要字段：title, content, category, summary'
      });
    }

    const articles = readJsonFile('articles.json');
    const newArticle = {
      id: uuidv4(),
      title,
      content,
      category,
      summary,
      author: req.body.author || '豆姜科技',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    articles.push(newArticle);
    writeJsonFile('articles.json', articles);

    res.status(201).json({ success: true, data: newArticle });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// PUT /api/articles/:id - 更新文章
app.put('/api/articles/:id', (req, res) => {
  try {
    const articles = readJsonFile('articles.json');
    const index = articles.findIndex(a => a.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: '文章不存在' });
    }

    const { title, content, category, summary, author } = req.body;
    const updatedArticle = {
      ...articles[index],
      ...(title !== undefined && { title }),
      ...(content !== undefined && { content }),
      ...(category !== undefined && { category }),
      ...(summary !== undefined && { summary }),
      ...(author !== undefined && { author }),
      updatedAt: new Date().toISOString()
    };

    articles[index] = updatedArticle;
    writeJsonFile('articles.json', articles);

    res.json({ success: true, data: updatedArticle });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// DELETE /api/articles/:id - 删除文章
app.delete('/api/articles/:id', (req, res) => {
  try {
    const articles = readJsonFile('articles.json');
    const index = articles.findIndex(a => a.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: '文章不存在' });
    }

    const deletedArticle = articles.splice(index, 1)[0];
    writeJsonFile('articles.json', articles);

    res.json({ success: true, message: '文章已删除', data: deletedArticle });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// ============================================================
// Contact API
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

    const contacts = readJsonFile('contacts.json');
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone: phone || '',
      message,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    contacts.push(newContact);
    writeJsonFile('contacts.json', contacts);

    res.status(201).json({
      success: true,
      message: '联系表单提交成功，我们将尽快与您联系',
      data: newContact
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// ============================================================
// Subscribe API
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

    const subscribers = readJsonFile('subscribers.json');

    // 检查是否已订阅
    const existing = subscribers.find(s => s.email === email);
    if (existing) {
      return res.status(409).json({ success: false, message: '该邮箱已订阅' });
    }

    const newSubscriber = {
      id: uuidv4(),
      email,
      subscribedAt: new Date().toISOString(),
      active: true
    };

    subscribers.push(newSubscriber);
    writeJsonFile('subscribers.json', subscribers);

    res.status(201).json({
      success: true,
      message: '订阅成功',
      data: newSubscriber
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// GET /api/subscribers - 获取订阅者列表
app.get('/api/subscribers', (req, res) => {
  try {
    const subscribers = readJsonFile('subscribers.json');
    res.json({ success: true, data: subscribers });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// DELETE /api/subscribers/:email - 取消订阅
app.delete('/api/subscribers/:email', (req, res) => {
  try {
    const subscribers = readJsonFile('subscribers.json');
    const email = decodeURIComponent(req.params.email);
    const index = subscribers.findIndex(s => s.email === email);

    if (index === -1) {
      return res.status(404).json({ success: false, message: '该邮箱未找到订阅记录' });
    }

    const removed = subscribers.splice(index, 1)[0];
    writeJsonFile('subscribers.json', subscribers);

    res.json({ success: true, message: '取消订阅成功', data: removed });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// ============================================================
// Mail API (模拟邮件系统)
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
// Products API
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
    version: '1.0.0',
    description: '豆姜科技宣传网站后端服务',
    endpoints: {
      articles: {
        list: 'GET /api/articles?page=1&limit=10&category=xxx',
        detail: 'GET /api/articles/:id',
        create: 'POST /api/articles',
        update: 'PUT /api/articles/:id',
        delete: 'DELETE /api/articles/:id'
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
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('========================================');
  console.log('  豆姜科技 API Server');
  console.log(`  Server running on http://localhost:${PORT}`);
  console.log('========================================');
});

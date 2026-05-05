# GitHub + Vercel 部署指南

## 快速开始

### 1. 创建 GitHub 仓库

```bash
# 在项目根目录初始化 Git
git init
git add .
git commit -m "Initial commit"

# 创建 GitHub 仓库并推送
git remote add origin https://github.com/你的用户名/doujiang-tech.git
git push -u origin main
```

### 2. 配置 Neon 数据库

1. 访问 [Neon Console](https://console.neon.tech)
2. 创建新项目 → 选择 PostgreSQL
3. 创建数据库后，复制连接字符串（格式：`postgresql://...`）
4. 创建数据表：

```sql
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT DEFAULT '未分类',
  date TEXT NOT NULL,
  summary TEXT,
  content TEXT NOT NULL,
  source TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subscribers (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. 部署到 Vercel

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "Add New Project"
3. 选择你的 GitHub 仓库 `doujiang-tech`
4. 配置环境变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `DATABASE_URL` | `postgresql://...` | Neon 数据库连接字符串 |
| `ADMIN_USERNAME` | `doujiang2026` | 管理员用户名 |
| `ADMIN_PASSWORD` | `~~AAvae159874` | 管理员密码 |
| `TRANSLATE_API_KEY` | `sk-...` | DeepSeek API 密钥（可选） |

5. 点击 "Deploy"

### 4. 配置自定义域名（可选）

1. 在 Vercel 项目设置中找到 "Domains"
2. 添加你的域名（如 `doujiang.com`）
3. 按提示在域名 DNS 添加 CNAME 记录
4. Vercel 自动配置 HTTPS 证书

## 功能特性

- ✅ **全球 CDN**：Vercel Edge Network 加速
- ✅ **自动 HTTPS**：免费 SSL 证书
- ✅ **Serverless API**：按需执行，无服务器成本
- ✅ **Neon Postgres**：Serverless 数据库，免费额度 500MB
- ✅ **自动部署**：GitHub 推送自动触发重新部署

## 环境变量说明

### 必需变量

- `DATABASE_URL`：Neon PostgreSQL 连接字符串
- `ADMIN_USERNAME`：后台管理登录用户名
- `ADMIN_PASSWORD`：后台管理登录密码

### 可选变量

- `TRANSLATE_API_KEY`：DeepSeek API 密钥，用于自动翻译文章

## 数据库迁移

如需从本地 SQLite 迁移数据到 Neon：

```bash
# 导出本地数据
sqlite3 server/data/doujiang.db ".dump" > backup.sql

# 在 Neon SQL Editor 中执行导出的 SQL
```

## 监控和分析

1. 在 Vercel Dashboard 查看部署日志
2. 启用 Vercel Analytics 查看访问统计
3. 在 Neon Console 监控数据库使用情况

## 常见问题

**Q: 免费额度够用吗？**
- Vercel：免费版每月 100GB 带宽，足够中小型网站
- Neon：免费版 500MB 存储，约可存 5000 篇文章

**Q: 如何更新网站？**
- 本地修改代码 → `git push` → Vercel 自动重新部署

**Q: 如何备份数据？**
- Neon 自动每日备份，也可手动导出 SQL

## 安全建议

1. 定期更换管理员密码
2. 不要将 `.env` 文件提交到 GitHub
3. 启用 Vercel 的 Password Protection（可选）
4. 定期查看访问日志，发现异常及时处理

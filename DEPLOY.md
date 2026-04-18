# 豆姜科技网站 — 部署指南

## 📋 当前状态

- ✅ 前端已打包：`client/dist/`（301KB JS + 43KB CSS）
- ✅ 后端已适配生产环境（支持静态文件托管 + 环境变量端口）
- ✅ API 地址已改为相对路径（前后端同域部署）

---

## 🚀 方案一：Railway 一键部署（推荐，最简单）

Railway 可以同时部署前后端，免费额度每月 $5，足够个人网站使用。

### 步骤

1. **注册 Railway**
   - 打开 https://railway.app ，用 GitHub 账号登录

2. **创建项目**
   - 点击 "New Project" → "Deploy from GitHub repo"
   - 选择你的 GitHub 仓库（需要先把代码推送到 GitHub）

3. **配置项目**
   - Railway 会自动检测到 `package.json` 并安装依赖
   - 需要设置以下配置：
     - **Root Directory**: `server`（指向后端目录）
     - **Build Command**: `npm install`
     - **Start Command**: `node server.js`
     - **Port**: 会自动分配，无需手动设置

4. **上传前端构建文件**
   - 方式一：把 `client/dist/` 目录也提交到仓库，后端会自动托管
   - 方式二：在 Railway 中添加第二个服务，Root Directory 设为 `client`，Build Command 设为 `npm run build`

5. **完成**
   - Railway 会分配一个 `xxx.up.railway.app` 的免费域名
   - 网站即可通过该域名访问

---

## 🚀 方案二：Vercel（前端）+ Railway（后端）

### 前端部署到 Vercel

1. 注册 https://vercel.com ，用 GitHub 登录
2. 点击 "New Project" → 导入 GitHub 仓库
3. 配置：
   - **Root Directory**: `client`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. 部署完成后获得 `xxx.vercel.app` 域名

### 后端部署到 Railway

1. 在 Railway 创建新项目
2. Root Directory 设为 `server`
3. Start Command: `node server.js`
4. 获得后端 URL（如 `xxx.up.railway.app`）

### 前端连接后端

在 Vercel 项目设置中添加环境变量：
- `VITE_API_BASE` = `https://你的后端 Railway 域名/api`

然后重新部署前端。

---

## 🚀 方案三：自有服务器部署（阿里云/腾讯云）

### 1. 上传代码到服务器

```bash
# 在本地打包整个项目
tar -czf doujiang-tech.tar.gz doujiang-tech/

# 上传到服务器
scp doujiang-tech.tar.gz root@你的服务器IP:/root/

# 在服务器上解压
ssh root@你的服务器IP
tar -xzf doujiang-tech.tar.gz
cd doujiang-tech
```

### 2. 安装依赖

```bash
# 安装 Node.js（如果未安装）
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt-get install -y nodejs

# 安装项目依赖
cd server && npm install --production
```

### 3. 使用 PM2 保持运行

```bash
# 安装 PM2
npm install -g pm2

# 启动服务
cd /root/doujiang-tech/server
pm2 start server.js --name "doujiang-tech"

# 设置开机自启
pm2 startup
pm2 save
```

### 4. 配置 Nginx 反向代理（可选）

```bash
sudo apt install nginx

# 编辑配置
sudo nano /etc/nginx/sites-available/doujiang-tech
```

写入以下内容：

```nginx
server {
    listen 80;
    server_name 你的域名或IP;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/doujiang-tech /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. 配置 HTTPS（可选，需要域名）

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d 你的域名
```

---

## 📌 重要提醒

### 数据持久化
当前使用 JSON 文件存储数据（`server/data/`），**服务器重启后数据不会丢失**，但如果重新部署可能会被覆盖。建议：
- 短期：定期备份 `data/` 目录
- 长期：迁移到数据库（MongoDB / PostgreSQL）

### 域名购买（后续需要时）
- 推荐平台：阿里云万网、腾讯云 DNSPod、Namecheap
- 价格：`.com` 约 ¥55/年，`.tech` 约 ¥25/年，`.cn` 约 ¥29/年
- 购买后在域名管理面板添加 A 记录指向服务器 IP

### 环境变量
生产环境中可以通过环境变量配置：
- `PORT` — 服务端口（默认 3001）
- `VITE_API_BASE` — 前端 API 地址（默认 `/api`，同域部署无需设置）

---

## 📁 项目文件结构

```
doujiang-tech/
├── client/               # React 前端
│   ├── dist/             # ✅ 已打包的生产文件
│   ├── src/              # 源代码
│   └── package.json
├── server/               # Node.js 后端
│   ├── data/             # JSON 数据文件
│   ├── server.js         # 主服务器（已适配生产环境）
│   └── package.json
└── DEPLOY.md             # 本文件
```

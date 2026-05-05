#!/bin/bash
# ============================================================
# 豆姜科技网站 — 腾讯云一键部署脚本（多站点版）
# 使用方法：bash deploy.sh
# ============================================================

set -e

echo "========================================"
echo "  豆姜科技网站 — 腾讯云部署（多站点）"
echo "========================================"

# ============ 配置区 ============
# 豆姜科技网站配置
APP_PORT=3001
APP_DIR="/opt/doujiang-tech"
APP_DOMAIN=""  # 留空则用IP访问，如: doujiang.com

# 如需部署其他网站，按以下格式添加：
# SITE2_NAME="my-second-site"
# SITE2_PORT=3002
# SITE2_DIR="/opt/my-second-site"
# SITE2_DOMAIN=""  # 如: othersite.com
# ==================================

# 1. 检查 Node.js
if ! command -v node &> /dev/null; then
    echo ">>> 正在安装 Node.js 20.x ..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
    sudo apt-get install -y nodejs
    echo "✅ Node.js 安装完成: $(node -v)"
else
    echo "✅ Node.js 已安装: $(node -v)"
fi

# 2. 检查 Nginx
if ! command -v nginx &> /dev/null; then
    echo ">>> 正在安装 Nginx ..."
    sudo apt-get update
    sudo apt-get install -y nginx
    echo "✅ Nginx 安装完成"
else
    echo "✅ Nginx 已安装"
fi

# 3. 安装 PM2
if ! command -v pm2 &> /dev/null; then
    echo ">>> 正在安装 PM2 ..."
    sudo npm install -g pm2
    echo "✅ PM2 安装完成"
else
    echo "✅ PM2 已安装"
fi

# 4. 创建项目目录
echo ">>> 项目目录: $APP_DIR"
sudo mkdir -p $APP_DIR

# 5. 复制项目文件（假设已上传到 /tmp/doujiang-tech）
if [ -d "/tmp/doujiang-tech" ]; then
    echo ">>> 从 /tmp/doujiang-tech 复制项目文件 ..."
    sudo cp -r /tmp/doujiang-tech/* $APP_DIR/
    sudo cp /tmp/doujiang-tech/.gitignore $APP_DIR/ 2>/dev/null || true
else
    echo "⚠️  未找到 /tmp/doujiang-tech，请先上传项目文件"
    echo "   上传命令示例（在本地执行）："
    echo "   scp -r doujiang-tech/ root@你的服务器IP:/tmp/doujiang-tech"
    exit 1
fi

# 6. 安装后端依赖
echo ">>> 安装后端依赖 ..."
cd $APP_DIR/server
sudo npm install --production

# 7. 确保前端构建文件存在
if [ ! -d "$APP_DIR/client/dist" ]; then
    echo ">>> 前端未构建，正在构建 ..."
    cd $APP_DIR/client
    sudo npm install
    sudo npm run build
fi

# 8. 设置目录权限（确保 SQLite 数据目录可写）
sudo mkdir -p $APP_DIR/server/data
sudo chown -R $USER:$USER $APP_DIR

# 9. 使用 PM2 启动后端服务
echo ">>> 启动后端服务（端口 $APP_PORT）..."
cd $APP_DIR/server
pm2 delete doujiang-tech 2>/dev/null || true
pm2 start server.js --name "doujiang-tech"
pm2 save
pm2 startup 2>/dev/null || true

# 10. 配置 Nginx（多站点）
echo ">>> 配置 Nginx ..."
SERVER_IP=$(hostname -I | awk '{print $1}')

# 豆姜科技站点配置
sudo tee /etc/nginx/sites-available/doujiang-tech > /dev/null <<EOF
# 豆姜科技官网
server {
    listen 80;
    server_name ${APP_DOMAIN:-$SERVER_IP};

    location / {
        proxy_pass http://127.0.0.1:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    location /api {
        proxy_pass http://127.0.0.1:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        proxy_pass http://127.0.0.1:$APP_PORT;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# 启用豆姜科技站点
sudo ln -sf /etc/nginx/sites-available/doujiang-tech /etc/nginx/sites-enabled/

# 删除默认站点（避免冲突）
sudo rm -f /etc/nginx/sites-enabled/default

# ===== 添加其他网站的模板 =====
# 每添加一个新网站，复制以下模板并修改端口和域名：
#
# sudo tee /etc/nginx/sites-available/site2 > /dev/null <<EOF
# server {
#     listen 80;
#     server_name site2.com;  # 你的第二个域名
#
#     location / {
#         proxy_pass http://127.0.0.1:3002;  # 第二个网站的端口
#         proxy_http_version 1.1;
#         proxy_set_header Upgrade \$http_upgrade;
#         proxy_set_header Connection 'upgrade';
#         proxy_set_header Host \$host;
#         proxy_set_header X-Real-IP \$remote_addr;
#         proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
#         proxy_set_header X-Forwarded-Proto \$scheme;
#         proxy_cache_bypass \$http_upgrade;
#     }
# }
# EOF
# sudo ln -sf /etc/nginx/sites-available/site2 /etc/nginx/sites-enabled/

# 测试 Nginx 配置
sudo nginx -t

# 重载 Nginx
sudo systemctl reload nginx
sudo systemctl enable nginx

echo ""
echo "========================================"
echo "  ✅ 部署完成！"
echo "========================================"
echo ""
echo "  🌐 豆姜科技访问地址: http://${APP_DOMAIN:-$SERVER_IP}"
echo "  📁 项目目录: $APP_DIR"
echo "  🔧 PM2 管理: pm2 logs doujiang-tech"
echo "  🔄 重启服务: pm2 restart doujiang-tech"
echo ""
echo "  ─────────────────────────────────────"
echo "  📌 添加更多网站："
echo "  1. 在服务器上部署新网站到不同端口（如 3002、3003）"
echo "  2. 复制上面的 Nginx 模板，修改域名和端口"
echo "  3. 执行 sudo nginx -t && sudo systemctl reload nginx"
echo "  ─────────────────────────────────────"
echo ""
echo "========================================"

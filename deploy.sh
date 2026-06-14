#!/bin/bash
# 世界杯站发布脚本：只把站点文件复制进干净目录再直传 Cloudflare Pages
# 用法: bash deploy.sh   （在 worldcup-site 目录下）
set -e
cd "$(dirname "$0")"
rm -rf .deploy-dist
mkdir -p .deploy-dist/reports
cp index.html data.js theme.css theme.js .deploy-dist/
cp robots.txt sitemap.xml og.jpg _headers _redirects googlebb581cf5fc82feea.html .deploy-dist/
cp reports/*.html .deploy-dist/reports/
# 给 data.js 引用追加部署时间戳，绕过浏览器对 data.js 的 4h 缓存
# （index.html 本身 max-age=0 每次回源校验，所以新戳能立刻生效，访客无需强刷）
VER=$(date +%Y%m%d%H%M%S)
sed -i "s|src=\"data.js\"|src=\"data.js?v=$VER\"|g" .deploy-dist/index.html
echo "stamped data.js -> ?v=$VER"
wrangler pages deploy .deploy-dist --project-name=worldcup2026 --branch=main --commit-dirty=true
rm -rf .deploy-dist
echo "deploy done -> https://worldcup2026.kunkun1023.xyz"

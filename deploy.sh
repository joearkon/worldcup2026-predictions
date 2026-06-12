#!/bin/bash
# 世界杯站发布脚本：只把站点文件复制进干净目录再直传 Cloudflare Pages
# 用法: bash deploy.sh   （在 worldcup-site 目录下）
set -e
cd "$(dirname "$0")"
rm -rf .deploy-dist
mkdir -p .deploy-dist/reports
cp index.html data.js .deploy-dist/
cp reports/*.html .deploy-dist/reports/
wrangler pages deploy .deploy-dist --project-name=worldcup2026 --branch=main --commit-dirty=true
rm -rf .deploy-dist
echo "deploy done -> https://worldcup2026.kunkun1023.xyz"

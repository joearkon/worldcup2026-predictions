#!/bin/bash
# 世界杯站发布脚本：只把站点文件复制进干净目录再直传 Cloudflare Pages
# 用法: bash deploy.sh   （在 worldcup-site 目录下）
set -e
cd "$(dirname "$0")"
rm -rf .deploy-dist
mkdir -p .deploy-dist/reports
cp index.html bracket.html data.js theme.css theme.js _headers .deploy-dist/
# SEO/验证类文件不入 git（本地保留）；存在才复制，避免 fresh clone 时部署中断
for f in robots.txt sitemap.xml og.jpg _redirects googlebb581cf5fc82feea.html; do
  [ -f "$f" ] && cp "$f" .deploy-dist/
done
cp reports/*.html .deploy-dist/reports/
# 静态资源（晋级图大力神杯等图片）
[ -d assets ] && mkdir -p .deploy-dist/assets && cp -r assets/* .deploy-dist/assets/
# 给每个报告注入"创建/最后更新"时间(从 git 历史取,只注入部署副本,不污染源文件)
for distf in .deploy-dist/reports/*.html; do
  base=$(basename "$distf")
  created=$(git log --diff-filter=A --date=format-local:'%Y-%m-%d %H:%M:%S' --format=%ad -- "reports/$base" | tail -1)
  updated=$(git log -1 --date=format-local:'%Y-%m-%d %H:%M:%S' --format=%ad -- "reports/$base")
  [ -z "$created" ] && created=$(date '+%Y-%m-%d %H:%M:%S')
  [ -z "$updated" ] && updated=$(date '+%Y-%m-%d %H:%M:%S')
  stamp="<div style=\"text-align:center;font-size:11px;color:#666;margin:-14px 0 20px\">📅 创建 $created　·　🔄 最后更新 $updated</div>"
  awk -v s="$stamp" '/class="sub"/ && !d {print; print s; d=1; next} {print}' "$distf" > "$distf.t" && mv "$distf.t" "$distf"
done
# 给 data.js 引用追加部署时间戳，绕过浏览器对 data.js 的 4h 缓存
# （index.html 本身 max-age=0 每次回源校验，所以新戳能立刻生效，访客无需强刷）
VER=$(date +%Y%m%d%H%M%S)
sed -i "s|src=\"data.js\"|src=\"data.js?v=$VER\"|g" .deploy-dist/index.html
echo "stamped data.js -> ?v=$VER"
wrangler pages deploy .deploy-dist --project-name=worldcup2026 --branch=main --commit-dirty=true
rm -rf .deploy-dist
echo "deploy done -> https://worldcup2026.kunkun1023.xyz"

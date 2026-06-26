# -*- coding: utf-8 -*-
"""
世界杯单场预测报告生成器（标准模板）
================================================
用途：一次出多场（如某日 G/H/I 三组同日收官）时，避免手写多份 HTML 出不一致。
模板 = 项目既有标准报告（vs-banner / 五维评判 / 第⑥维 / 比分概率条 / 关键先生 /
最终评判+The One Risk / 资料来源 / powered by 坤桑），从《厄瓜多尔vs德国》原样取出，勿改。

用法：
  1) 改下方 M=[...] 里每场 dict（teams/比分/盘口/五维/⑥维/概率条/关键先生/最终评判）。
     下面保留的 2026-06-27 G/H/I 末轮六场 = 字段填法样例。
  2) python gen_report.py → 在 reports/ 生成各 "世界杯小组赛预测_主vs客.html"。
  3) 再到 data.js 的 matches 数组加条目(report 指向各文件) → git push → bash deploy.sh。
单场照旧可手写，本工具只是多场便利；字段务必与既有报告保持一致。
"""
import io, os
RDIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "reports")

CSS = '''*{box-sizing:border-box;margin:0;padding:0}
body{background:#0d0d0d;color:#d4d4d4;font-family:'PingFang SC','Microsoft YaHei',sans-serif;padding:28px 20px;max-width:920px;margin:0 auto;line-height:1.7}
h1{font-size:24px;color:#fff;text-align:center;margin-bottom:4px}
.sub{text-align:center;font-size:12px;color:#666;margin-bottom:26px}
.vs-banner{display:flex;align-items:center;justify-content:center;gap:26px;background:linear-gradient(135deg,rgba(200,170,20,.2),rgba(17,17,17,.9) 40%,rgba(17,17,17,.9) 60%,rgba(40,120,200,.16));border:1px solid #222;border-radius:14px;padding:26px 18px;margin-bottom:18px}
.team{text-align:center;flex:1}
.team-flag{font-size:44px}
.team-name{font-size:19px;font-weight:800;color:#fff;margin-top:4px}
.team-tag{font-size:11px;color:#888;margin-top:2px}
.score-box{text-align:center}
.score{font-size:46px;font-weight:900;color:#e8b84b;letter-spacing:4px;font-variant-numeric:tabular-nums}
.score-label{font-size:11px;color:#666;margin-top:2px}
.win{font-size:12px;font-weight:800;color:#e8b84b;margin-top:5px}
.card{background:#111;border:1px solid #1e1e1e;border-radius:10px;padding:18px 20px;margin-bottom:14px}
.card-title{font-size:12px;font-weight:700;color:#e8b84b;letter-spacing:.08em;margin-bottom:12px}
.dim{display:flex;align-items:baseline;gap:12px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);flex-wrap:wrap}
.dim:last-child{border-bottom:none}
.dim-name{font-size:13px;font-weight:700;color:#ddd;min-width:108px}
.dim-lean{font-size:11px;font-weight:700;padding:1px 9px;border-radius:4px;white-space:nowrap}
.lean-a{background:rgba(200,170,20,.16);color:#e8c860;border:1px solid rgba(200,170,20,.4)}
.lean-b{background:rgba(40,120,200,.18);color:#7fb8e0;border:1px solid rgba(40,120,200,.5)}
.lean-even{background:rgba(120,120,120,.12);color:#999;border:1px solid #333}
.dim-desc{font-size:12px;color:#999;flex:1;min-width:240px}
.bar-row{display:flex;align-items:center;gap:10px;margin:5px 0;font-size:12px}
.bar-label{min-width:104px;color:#bbb;font-variant-numeric:tabular-nums}
.bar-wrap{flex:1;background:#1a1a1a;height:14px;border-radius:4px;overflow:hidden}
.bar{height:100%;border-radius:4px;background:linear-gradient(90deg,#7a6210,#e8c860)}
.bar.alt{background:linear-gradient(90deg,#555,#bbb)}
.bar.mid{background:linear-gradient(90deg,#7a6210,#e8b84b)}
.bar-pct{min-width:38px;text-align:right;color:#e8b84b;font-weight:700;font-variant-numeric:tabular-nums}
.note{font-size:11px;color:#555;margin-top:10px}
.kv{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:4px}
@media(max-width:620px){.kv{grid-template-columns:1fr 1fr}}
.kv-item{background:#0a0a0a;border:1px solid #1a1a1a;border-radius:7px;padding:9px 11px}
.kv-l{font-size:10px;color:#555}
.kv-v{font-size:13px;font-weight:700;color:#fff;margin-top:2px}
.verdict{background:linear-gradient(135deg,rgba(232,160,4,.08),rgba(17,17,17,.95));border:1px solid rgba(232,160,4,.35);border-radius:12px;padding:20px 22px;margin:18px 0}
.verdict-title{font-size:13px;font-weight:800;color:#e8b84b;margin-bottom:8px}
.verdict p{font-size:13px;color:#ccc;margin-bottom:8px}
.risk{background:rgba(200,30,50,.08);border:1px solid rgba(200,30,50,.35);border-radius:8px;padding:11px 14px;margin-top:10px;font-size:12.5px;color:#ddd}
.srcs{font-size:11px;color:#555;line-height:2}
.srcs a{color:#5a8abf;text-decoration:none}
.footer{text-align:center;font-size:11px;color:#444;margin-top:26px;letter-spacing:.05em}
.footer b{color:#e8b84b}'''

def dims(items):
    out=''
    for n,cls,lean,desc in items:
        out+=f'  <div class="dim"><span class="dim-name">{n}</span><span class="dim-lean {cls}">{lean}</span><span class="dim-desc">{desc}</span></div>\n'
    return out

def bars(items):
    out=''
    for lab,cls,w,pct in items:
        c='bar' if cls=='' else 'bar '+cls
        out+=f'  <div class="bar-row"><span class="bar-label">{lab}</span><div class="bar-wrap"><div class="{c}" style="width:{w}%"></div></div><span class="bar-pct">{pct}%</span></div>\n'
    return out

def srcs(links):
    return ' · '.join(f'<a href="{u}">{t}</a>' for t,u in links)

def page(m):
    return f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{m["title"]}</title>
<meta name="description" content="{m["desc"]} · powered by 坤桑">
<link rel="canonical" href="https://worldcup2026.kunkun1023.xyz/reports/{m["file"]}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="2026世界杯预测中心">
<meta property="og:title" content="{m["title"]}">
<meta property="og:description" content="{m["desc"]}">
<meta property="og:image" content="https://worldcup2026.kunkun1023.xyz/og.jpg">
<meta property="og:url" content="https://worldcup2026.kunkun1023.xyz/reports/{m["file"]}">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="../theme.css?v=2">
<script src="../theme.js?v=2"></script>
<style>
{CSS}
</style>
</head>
<body>

<h1>{m["h1"]}</h1>
<div class="sub">{m["sub"]}</div>

<div class="vs-banner">
  <div class="team"><div class="team-flag">{m["hf"]}</div><div class="team-name">{m["hn"]}</div><div class="team-tag">{m["ht"]}</div></div>
  <div class="score-box"><div class="score">{m["score"]}</div><div class="score-label">{m["score_label"]}</div><div class="win">{m["win"]}</div></div>
  <div class="team"><div class="team-flag">{m["af"]}</div><div class="team-name">{m["an"]}</div><div class="team-tag">{m["at"]}</div></div>
</div>

<div class="card">
  <div class="card-title">🎯 盘口判读 · {m["odds_title"]}</div>
  <div class="note" style="margin-top:0;margin-bottom:10px">预测发布 2026-06-26（初盘）｜ 官方首发约赛前1h揭晓</div>
  <div style="font-size:12.5px;color:#bbb;line-height:1.9">{m["odds_body"]}</div>
  <div style="margin-top:10px;padding-top:9px;border-top:1px solid #222;font-size:12px;color:#ddd;line-height:1.8"><b style="color:#e8b84b">⚖ 胜负关系</b>：{m["win_rel"]}</div>
</div>

<div class="card">
  <div class="card-title">⚔ 五维综合评判</div>
{dims(m["dims"])}</div>

<div class="card" style="border-color:rgba(90,138,191,.45);background:linear-gradient(135deg,rgba(40,90,200,.06),rgba(17,17,17,.95))">
  <div class="card-title">🌐 第⑥维 · 本届小组赛表现 + 出线处境</div>
  <div style="font-size:12.5px;color:#bbb;line-height:1.9">{m["d6"]}</div>
</div>

<div class="card">
  <div class="card-title">📊 比分概率分布（赔率市场 + ⑥维收口）</div>
{bars(m["bars"])}  <div class="note">{m["bars_note"]}</div>
</div>

<div class="card">
  <div class="card-title">🎯 关键先生</div>
  <div class="kv"><div class="kv-item"><div class="kv-l">首球候选</div><div class="kv-v">{m["k1"]}</div></div><div class="kv-item"><div class="kv-l">胜负手</div><div class="kv-v">{m["k2"]}</div></div><div class="kv-item"><div class="kv-l">X变量</div><div class="kv-v">{m["k3"]}</div></div></div>
</div>

<div class="verdict">
  <div class="verdict-title">⚖ 最终评判：{m["verdict_title"]}</div>
  {m["verdict_body"]}
  <div class="risk"><b style="color:#ff6b75">⚠ The One Risk(本场单一最大不确定性)</b>：{m["risk"]}</div>
  <p style="margin-top:8px"><b>纪律说明</b>：娱乐预测,不构成任何投注建议。</p>
</div>

<div class="card">
  <div class="card-title">📚 资料来源</div>
  <div class="srcs">{srcs(m["srcs"])}</div>
</div>

<div class="footer">⚽ 2026 FIFA World Cup · 娱乐向,不构成投注建议 · powered by <b>坤桑</b></div>
<div style="text-align:center;font-size:10px;margin-top:10px;padding-bottom:8px"><a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener" style="color:#666;text-decoration:none">沪ICP备2025153381号-1</a></div>
</body>
</html>'''

SRC=[("FIFA官方·赛程","https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026"),("ESPN·盘口","https://www.espn.com/soccer/"),("网易·出线形势","https://sports.163.com/worldcup2026/data/")]

M=[]

# ===== 1. 挪威 vs 法国 =====
M.append(dict(
 file="世界杯小组赛预测_挪威vs法国.html",
 title="2026世界杯I组末轮预测 · 挪威 vs 法国",
 desc="两队均已出线争头名;法国不输即头名坐守反击,挪威须赢压上被姆巴佩反击;主1-2法次1-1平",
 h1="2026 世界杯 I组末轮 · 综合预测",
 sub="北京时间 2026-06-27 03:00 · I组末轮 · 两队均已出线·争小组头名",
 hf="🇳🇴",hn="挪威",ht="进攻8·高空杀招·防线一般遇对攻丢球",
 af="🇫🇷",an="法国",at="进攻9·姆巴佩单核·迈尼昂顶级门将",
 score="1 : 2",score_label="最可能比分（次选 1-1 平）· 法国胜",win="胜负：法国胜（次选：平·争头名意愿不强）",
 odds_title="偏法国·两强直接对话·都已出线",
 odds_body='<b style="color:#ddd">初盘</b>：法国 <b style="color:#e8c860">ML偏热</b>、平居中、挪威客胜 = 偏法国。两队均6分<b>已锁出线</b>。<br><b style="color:#ddd">处境</b>：法国净+5、挪威净+4，<b>法国不输即头名</b>(可坐守反击)；挪威须赢才能反超夺头名→须压上。<br><b style="color:#ddd">数据</b>：法国天赋碾压档·姆巴佩单核carry(WC16球)·迈尼昂顶级；挪威哈兰德+厄德高，<b>杀招=高空/定位球但对法国防空+迈尼昂要打折</b>，防线一般遇对攻会丢球。<br><b style="color:#e8b84b">checklist</b>：① 法国质量更高+只需平→稳 ② 挪威须赢压上→给姆巴佩反击空间 ③ 都已出线+淘汰赛在即→轮换留力风险(低分)。',
 win_rel='<b style="color:#e8b84b">主=法国胜(1-2)</b>——挪威压上被姆巴佩反击、挪高空咬1球；<b>次=1-1平</b>，双方轮换留力踢默契、争头名意愿不强。',
 dims=[("① 阵容硬实力","lean-b","法国更强","法国天赋+板凳深度更高;挪威靠哈兰德/厄德高双核。"),
       ("② 状态与打法","lean-b","法transition vs 挪高空","法国靠个人能力+反击;挪威杀招高空对法国防空打折。"),
       ("③ 处境与动机","lean-even","法不输即头名/挪须赢","法可坐守反击,挪须压上→露身后利于法反击。"),
       ("④ 赛场因素","lean-even","中立大场","无主场加成;板凳深度偏法国。"),
       ("⑤ 软性指标","lean-a","双轮换留力风险","淘汰赛在即,两队都已出线→可能轮换踢低强度。")],
 d6='🇳🇴 挪威 — 4-1伊拉克 + 3-2塞内加尔（高空杀招确认·但防线遇对攻丢2）→ <b style="color:#999">✅ 进攻达标·防守一般</b><br>🇫🇷 法国 — 3-1塞内加尔 + 3-0伊拉克（姆巴佩carry·天赋碾压档）→ <b style="color:#999">✅ 超预期·非便秘型</b><br><b style="color:#ddd">合成 lean</b>：法质量+挪须压上露空→法胜;但都出线=轮换平的尾部不低<br><b style="color:#e8b84b">⚖ ⑥校正</b>：主1-2法(反击+挪咬1);次1-1平(双轮换默契)。别押法大胜——两强对话+可能留力。',
 bars=[("1-2 法国","mid",100,"19"),("1-1 平","alt",90,"17"),("0-1 法国","",78,"14"),("2-2 对攻","alt",55,"10"),("2-1 挪威","",46,"8")],
 bars_note="盘口偏法·O/U 2.5。⇒ 挪须赢压上被反击→1-2主;都出线轮换→1-1次。挪威高空打开则2-2对攻尾部。｜ 盘口采集 06-26(初盘)",
 k1="🇫🇷 姆巴佩 / 🇳🇴 哈兰德",k2="姆巴佩反击破挪压上",k3="两队轮换幅度",
 verdict_title="胜负=法国胜 · 比分 1-2（次选 1-1 平）",
 verdict_body='<p><b>胜负关系</b>：<b style="color:#e8b84b">主=法国胜(1-2)</b>——法质量更高+挪威须赢压上被姆巴佩反击,挪高空咬1球;<b>次=1-1平</b>——两队均已出线、淘汰赛在即轮换留力踢默契。</p><p><b>比分锚</b>：1-2法主、1-1平次;法国争头名(避强敌)动机在,但别押大胜。</p>',
 risk='<b>都已出线+淘汰赛在即→双双大轮换踢成低强度平局</b>(末轮"都出线未必死拼"反复出现);或挪威高空真打穿法国轮换防线→对攻2-2甚至挪偷头名。临场盯两队首发轮换幅度。',
 srcs=SRC,
))

# ===== 2. 塞内加尔 vs 伊拉克 =====
M.append(dict(
 file="世界杯小组赛预测_塞内加尔vs伊拉克.html",
 title="2026世界杯I组末轮预测 · 塞内加尔 vs 伊拉克",
 desc="榜尾战;伊拉克已出局,塞内加尔须大胜刷净胜球搏最佳第三;主3-0塞次2-0塞",
 h1="2026 世界杯 I组末轮 · 综合预测",
 sub="北京时间 2026-06-27 03:00 · I组末轮 · 榜尾战·塞须大胜搏最佳第三",
 hf="🇸🇳",hn="塞内加尔",ht="进攻7·萨尔状态回暖·须大胜",
 af="🇮🇶",an="伊拉克",at="进攻4·会漏鱼腩·防空软·已出局",
 score="3 : 0",score_label="最可能比分（次选 2-0 塞）· 塞内加尔胜",win="胜负：塞内加尔胜（须大胜刷净胜球）",
 odds_title="深盘偏塞·须大胜·打会漏鱼腩",
 odds_body='<b style="color:#ddd">初盘</b>：塞内加尔 <b style="color:#e8c860">深盘大热</b>、伊拉克客胜赔率高。<br><b style="color:#ddd">处境</b>：双双0分。<b>伊拉克净-6已出局</b>(free hit)；<b>塞内加尔净-3须大胜</b>刷净胜球，才有"最佳小组第三"一线希望→动机拉满。<br><b style="color:#ddd">数据</b>：塞内加尔萨尔状态回暖(上轮双响)·反击有威胁但终结仍不稳；伊拉克<b>会漏鱼腩坐实</b>(两场失7)·防空软+门将哈桑负资产。<br><b style="color:#e8b84b">checklist</b>：① 塞须大胜+伊会漏→按"对会漏队往上够"押大净胜 ② 塞终结转化差是封顶变量 ③ 伊已出局free hit→偶尔放开偷球。',
 win_rel='<b style="color:#e8b84b">主=塞内加尔胜(3-0)</b>——打会漏鱼腩+须大胜动机;<b>次=2-0塞</b>，塞终结不稳没刷到3+。',
 dims=[("① 阵容硬实力","lean-a","塞内加尔强","塞整体质量高于已出局的伊拉克一档。"),
       ("② 状态与打法","lean-a","塞反击 vs 伊会漏","塞萨尔回暖;伊防空软、门将隐患、整体会漏。"),
       ("③ 处境与动机","lean-a","塞须大胜/伊已出局","塞动机拉满刷净胜球;伊free hit。"),
       ("④ 赛场因素","lean-even","中立场","无特殊加成。"),
       ("⑤ 软性指标","lean-even","塞终结转化差","塞该进没进的老问题=封顶大胜的尾部。")],
 d6='🇸🇳 塞内加尔 — 1-3法国 + 2-3挪威（对攻丢球多·萨尔终结回暖）→ <b style="color:#999">⚠ 防守不稳·进攻改善</b><br>🇮🇶 伊拉克 — 1-4挪威 + 0-3法国（会漏鱼腩·失7·已出局）→ <b style="color:#999">❌ 会漏鱼腩</b><br><b style="color:#ddd">合成 lean</b>：塞质量碾压+须大胜+伊会漏→大净胜<br><b style="color:#e8b84b">⚖ ⑥校正</b>：主3-0塞(对会漏往上够);次2-0塞(终结不稳)。胜负无悬念,焦点=塞能否刷够净胜球。',
 bars=[("3-0 塞内加尔","",100,"18"),("2-0 塞内加尔","mid",92,"16"),("4-0 塞内加尔","",72,"13"),("3-1 塞内加尔","",60,"11"),("1-0/平 偷分","alt",36,"6")],
 bars_note="深盘偏塞·O/U 2.5+。⇒ 须大胜+伊会漏→3-0主、2-0次;终结差则只小胜。｜ 盘口采集 06-26(初盘)",
 k1="🇸🇳 萨尔",k2="塞刷净胜球的终结效率",k3="塞终结转化差(该进没进)",
 verdict_title="胜负=塞内加尔胜 · 比分 3-0（次选 2-0 塞）",
 verdict_body='<p><b>胜负关系</b>：<b style="color:#e8b84b">主=塞内加尔胜(3-0)</b>——打会漏鱼腩伊拉克+须大胜动机,按"对会漏队往上够"押大净胜;<b>次=2-0塞</b>——塞终结转化差,控制但没刷到3+。</p><p><b>比分锚</b>：3-0主、2-0次,偏大球;胜负无悬念,焦点是净胜球够不够最佳第三。</p>',
 risk='<b>塞内加尔"该进没进"转化差复发→只1-0/2-1小胜,最佳第三泡汤</b>;或伊拉克free hit放开偷1球破零封。萨尔的终结效率=刷净胜球的关键。',
 srcs=SRC,
))

# ===== 3. 佛得角 vs 沙特 =====
M.append(dict(
 file="世界杯小组赛预测_佛得角vs沙特阿拉伯.html",
 title="2026世界杯H组末轮预测 · 佛得角 vs 沙特阿拉伯",
 desc="生死战都想赢;佛得角铁桶+反击克沙特压上,门将型伪铁桶须赢;主1-0佛次2-1佛",
 h1="2026 世界杯 H组末轮 · 综合预测",
 sub="北京时间 2026-06-27 08:00 · H组末轮 · 生死战·胜者基本出线",
 hf="🇨🇻",hn="佛得角",ht="防守7·铁桶+门神+反击·本届黑马",
 af="🇸🇦",an="沙特阿拉伯",at="进攻4.5·门将型伪铁桶·须赢压上",
 score="1 : 0",score_label="最可能比分（次选 2-1 佛）· 佛得角胜",win="胜负：佛得角胜（次选：对攻 2-1 佛）",
 odds_title="浅盘·生死战·两队都想赢",
 odds_body='<b style="color:#ddd">初盘</b>：浅盘小球倾向(两队进攻都有限)。<br><b style="color:#ddd">处境</b>：佛得角2分、沙特1分——<b>都想赢即基本锁前二</b>。佛赢=出线；沙特须赢才有戏。<br><b style="color:#ddd">数据</b>：佛得角<b>本届最大黑马</b>(铁桶+门神Vozinha+反击，连平西班牙0-0/乌拉圭2-2)；沙特<b>门将型伪铁桶</b>(0-4崩过西班牙)·防线遇火力会漏·须赢→压上露身后。<br><b style="color:#e8b84b">checklist</b>：① 沙特须赢压上→正撞佛得角铁桶+反击 ② 佛"逢强逼平"惯性是平局尾部 ③ 双方须赢→未必踢得保守。',
 win_rel='<b style="color:#e8b84b">主=佛得角胜(1-0)</b>——沙特压上被佛反击偷一球,低分符合佛画像;<b>次=2-1佛</b>，沙压上对攻打开、佛反击得手但被咬1。',
 dims=[("① 阵容硬实力","lean-even","半斤八两","两队均中下游;佛防守更硬、沙靠门将。"),
       ("② 状态与打法","lean-a","佛铁桶反击 vs 沙压上","佛铁桶+反击;沙须赢压上=正给佛反击空间。"),
       ("③ 处境与动机","lean-even","都须赢出线","生死战双方都拼,不会踢保守。"),
       ("④ 赛场因素","lean-even","中立场","无特殊加成。"),
       ("⑤ 软性指标","lean-a","佛门神X-factor","Vozinha关键扑救能力强于沙特门将稳定性。")],
 d6='🇨🇻 佛得角 — 0-0西班牙 + 2-2乌拉圭（铁桶+门神+能反击进球·两轮2分）→ <b style="color:#999">✅ 能守能反·硬黑马</b><br>🇸🇦 沙特 — 1-1乌拉圭 + 0-4西班牙（门将型伪铁桶·遇火力崩）→ <b style="color:#999">⚠ 伪铁桶·会漏</b><br><b style="color:#ddd">合成 lean</b>：佛防守+反击克制压上的沙特→佛小胜<br><b style="color:#e8b84b">⚖ ⑥校正</b>：主1-0佛(反击偷球);次2-1佛(对攻)。别押对其大胜或零封崩盘——佛能守、沙有门将。',
 bars=[("1-0 佛得角","",100,"18"),("2-1 佛得角","mid",82,"14"),("1-1 平","alt",75,"13"),("0-0 闷平","alt",50,"9"),("1-2 沙特","",46,"8")],
 bars_note="浅盘·O/U偏小。⇒ 沙压上被佛反击→1-0主、2-1次;双方须赢未必闷。佛逢强逼平惯性=1-1/0-0尾部。｜ 盘口采集 06-26(初盘)",
 k1="🇨🇻 佛反击锋线(皮纳/瓦雷拉)",k2="沙特压上 vs 佛反击",k3="沙特门将状态",
 verdict_title="胜负=佛得角胜 · 比分 1-0（次选 2-1 佛）",
 verdict_body='<p><b>胜负关系</b>：<b style="color:#e8b84b">主=佛得角胜(1-0)</b>——沙特须赢压上→正撞佛得角铁桶+反击,被偷一球;低分符合佛"别押大胜"画像;<b>次=2-1佛</b>——沙压上对攻打开、佛反击得手被咬1球。</p><p><b>比分锚</b>：1-0主、2-1次,偏小;胜者基本出线。</p>',
 risk='<b>沙特门将再封神+佛得角"逢强就逼平"惯性→1-1</b>(但双方须赢、未必踢保守);或沙特孤注一掷压上反被佛反击打成2-0/2-1佛。',
 srcs=SRC,
))

# ===== 4. 乌拉圭 vs 西班牙 =====
M.append(dict(
 file="世界杯小组赛预测_乌拉圭vs西班牙.html",
 title="2026世界杯H组末轮预测 · 乌拉圭 vs 西班牙",
 desc="西班牙不败即出线可能轮换,乌拉圭须赢压上被反击;主1-2西次1-1平",
 h1="2026 世界杯 H组末轮 · 综合预测",
 sub="北京时间 2026-06-27 08:00 · H组末轮 · 西不败即出线/乌须赢",
 hf="🇺🇾",hn="乌拉圭",ht="进攻6.5·转化差·两场全平·须赢压上",
 af="🇪🇸",an="西班牙",at="进攻8·亚马尔效率开关·不败即出线",
 score="1 : 2",score_label="最可能比分（次选 1-1 平）· 西班牙胜",win="胜负：西班牙胜（次选：平·西轮换达成出线）",
 odds_title="偏西班牙·西不败即可·乌须赢",
 odds_body='<b style="color:#ddd">初盘</b>：西班牙 <b style="color:#e8c860">ML偏热</b>、平居中、乌主胜赔率高。<br><b style="color:#ddd">处境</b>：<b>西班牙4分不败即出线</b>(基本锁头名,可半留力)；<b>乌拉圭2分必须赢</b>(两连平、输则大概率出局)→压上露身后。<br><b style="color:#ddd">数据</b>：西班牙对会漏队火力顶级(4-0沙特)·亚马尔=效率开关；乌拉圭天赋队<b>转化差</b>(两场全平未胜)·缺创造中枢·非铁桶会漏。<br><b style="color:#e8b84b">checklist</b>：① 乌须赢压上露身后→西快攻/亚马尔反击 ② 西只需不败→可能轮换留力踢低强度 ③ 乌转化差=自己难赢透。',
 win_rel='<b style="color:#e8b84b">主=西班牙胜(1-2)</b>——乌压上被西反击、乌天赋咬1球;<b>次=1-1平</b>，西轮换留力(不败即可)+乌死拼→西达成出线踢平。',
 dims=[("① 阵容硬实力","lean-b","西班牙更强","西整体质量+爆点(亚马尔)更高;乌靠老将+反击。"),
       ("② 状态与打法","lean-b","西火力 vs 乌转化差","西对会漏队敢押大;乌28射进1的转化顽疾。"),
       ("③ 处境与动机","lean-even","西不败即可/乌须赢","西可留力,乌须压上→露身后给西反击。"),
       ("④ 赛场因素","lean-even","中立场","无主场加成。"),
       ("⑤ 软性指标","lean-a","西轮换留力风险","西只需平→可能大轮换降强度,利于乌。")],
 d6='🇺🇾 乌拉圭 — 1-1沙特 + 2-2佛得角（转化差·两场全平未胜·防线被中下游咬）→ <b style="color:#999">⚠ 天赋队转化差</b><br>🇪🇸 西班牙 — 0-0佛得角 + 4-0沙特（对会漏队火力顶级·亚马尔效率开关）→ <b style="color:#999">✅ 看对手成色·会漏队敢押大</b><br><b style="color:#ddd">合成 lean</b>：西质量+乌须压上露空→西胜;但西轮换=平的尾部<br><b style="color:#e8b84b">⚖ ⑥校正</b>：主1-2西(反击+乌咬1);次1-1平(西留力)。临场盯西轮换名单——大轮换则下修。',
 bars=[("1-2 西班牙","mid",100,"18"),("1-1 平","alt",88,"16"),("0-2 西班牙","",76,"14"),("0-1 西班牙","",62,"11"),("2-1 乌拉圭","",40,"7")],
 bars_note="偏西·O/U 2.5。⇒ 乌压上被反击→1-2主;西留力踢平→1-1次。亚马尔首发打开则0-2/1-3西。｜ 盘口采集 06-26(初盘)",
 k1="🇪🇸 亚马尔（首发=效率开关）",k2="乌压上 vs 西反击",k3="🇪🇸 西班牙轮换幅度",
 verdict_title="胜负=西班牙胜 · 比分 1-2（次选 1-1 平）",
 verdict_body='<p><b>胜负关系</b>：<b style="color:#e8b84b">主=西班牙胜(1-2)</b>——乌拉圭须赢压上露身后→西班牙快攻/亚马尔反击,乌天赋咬回1球;<b>次=1-1平</b>——西班牙轮换留力(不败即可)+乌主场死拼→西达成出线目的踢平。</p><p><b>比分锚</b>：1-2西主、1-1平次;西争头名也想赢,但只需不败=别盲目押大。</p>',
 risk='<b>西班牙大轮换留力(只需平)+乌拉圭死拼→乌偷胜或闷平</b>;反向=亚马尔首发打开火力→西0-2/1-3大胜。临场盯西班牙轮换名单。',
 srcs=SRC,
))

# ===== 5. 埃及 vs 伊朗 =====
M.append(dict(
 file="世界杯小组赛预测_埃及vs伊朗.html",
 title="2026世界杯G组末轮预测 · 埃及 vs 伊朗",
 desc="埃及不败即出线求稳,伊朗须赢但攻坚乏力;两防硬低分;主1-1平次1-0埃",
 h1="2026 世界杯 G组末轮 · 综合预测",
 sub="北京时间 2026-06-27 11:00 · G组末轮 · 埃不败即出线/伊须赢",
 hf="🇪🇬",hn="埃及",ht="进攻6·萨拉赫单点·不败韧性·只需平",
 af="🇮🇷",an="伊朗",at="防守6·对手越强越铁桶·须赢但攻坚乏力",
 score="1 : 1",score_label="最可能比分（次选 1-0 埃）· 平",win="胜负：平（次选：埃及小胜 1-0）",
 odds_title="浅盘小球·两防守硬队·低分倾向",
 odds_body='<b style="color:#ddd">初盘</b>：浅盘、O/U偏小(两队进攻都有限)。<br><b style="color:#ddd">处境</b>：<b>埃及4分不败即出线</b>(可求稳)；<b>伊朗2分须赢</b>才稳出线(平则看比利时脸色)。<br><b style="color:#ddd">数据</b>：埃及能先进球的硬队·萨拉赫单点·不败韧性，<b>只需平→会踢得收着</b>；伊朗<b>弹性防线·对手越强越铁桶</b>·塔雷米单箭头进攻有限·低分逼平常态。<br><b style="color:#e8b84b">checklist</b>：① 两防守硬队→低分基本确定 ② 埃求稳+伊攻坚乏力→闷平概率高 ③ 萨拉赫/塔雷米单点定胜负。',
 win_rel='<b style="color:#e8b84b">主=平(1-1)</b>——埃求稳不败+伊须赢但攻坚有限,各靠单点;<b>次=埃及小胜(1-0)</b>，萨拉赫破局后控住。',
 dims=[("① 阵容硬实力","lean-even","半斤八两","两队中游、各有单点(萨拉赫/塔雷米),整体接近。"),
       ("② 状态与打法","lean-even","双防守硬·低分","埃能先进球硬队;伊弹性防线、低分逼平常态。"),
       ("③ 处境与动机","lean-a","埃只需平/伊须赢","埃求稳收着;伊须赢但进攻乏力难压开。"),
       ("④ 赛场因素","lean-even","中立场","无特殊加成。"),
       ("⑤ 软性指标","lean-a","萨拉赫单点","埃破局点更可靠;伊单箭头塔雷米压上能否进存疑。")],
 d6='🇪🇬 埃及 — 1-1比利时 + 3-1新西兰（能先进球的硬队·萨拉赫carry·韧性）→ <b style="color:#999">✅ 硬队·萨拉赫单点</b><br>🇮🇷 伊朗 — 2-2新西兰 + 0-0比利时（对强队铁桶·低分逼平·攻坚乏力）→ <b style="color:#999">⚠ 弹性防线·进攻有限</b><br><b style="color:#ddd">合成 lean</b>：两防硬+埃求稳+伊攻坚弱→低分闷平<br><b style="color:#e8b84b">⚖ ⑥校正</b>：主1-1平;次1-0埃(萨拉赫单点)。低分基本确定,胜负看单点效率。',
 bars=[("1-1 平","mid",100,"19"),("1-0 埃及","",86,"15"),("0-0 闷平","alt",78,"14"),("0-1 伊朗","",52,"9"),("2-1 埃及","",46,"8")],
 bars_note="浅盘·O/U偏小。⇒ 双防硬+埃求稳→1-1主;萨拉赫单点→1-0埃次。伊须赢压上被反击=0-1伊/1-2尾部。｜ 盘口采集 06-26(初盘)",
 k1="🇪🇬 萨拉赫 / 🇮🇷 塔雷米",k2="单点效率定胜负",k3="伊朗须赢压上的露空",
 verdict_title="胜负=平 · 比分 1-1（次选 埃及小胜 1-0）",
 verdict_body='<p><b>胜负关系</b>：<b style="color:#e8b84b">主=平(1-1)</b>——两防守硬队·埃及求稳不败+伊朗须赢但攻坚有限→低分闷平,各靠单点/定位球;<b>次=埃及小胜(1-0)</b>——萨拉赫单点破局后埃及控住,达成出线。</p><p><b>比分锚</b>：1-1主、1-0埃次,低分;胜负看萨拉赫/塔雷米单点。</p>',
 risk='<b>伊朗须赢压上→铁桶变进攻反被埃及萨拉赫反击(1-2伊朗输)</b>;或埃及过度求稳被伊朗定位球偷1球。低分基本确定,单点效率是胜负手。',
 srcs=SRC,
))

# ===== 6. 新西兰 vs 比利时 =====
M.append(dict(
 file="世界杯小组赛预测_新西兰vs比利时.html",
 title="2026世界杯G组末轮预测 · 新西兰 vs 比利时",
 desc="比利时须赢出线但无9号攻坚乏力,新西兰非铁桶会漏;主0-2比次1-2比;The One Risk=比便秘爆冷",
 h1="2026 世界杯 G组末轮 · 综合预测",
 sub="北京时间 2026-06-27 11:00 · G组末轮 · 比须赢出线/新3%搏一把",
 hf="🇳🇿",hn="新西兰",ht="防守4.5·不败韧性强·攻防都不稳会漏",
 af="🇧🇪",an="比利时",at="进攻6·无9号攻坚乏力(两场0运动战进球)·须赢",
 score="0 : 2",score_label="最可能比分（次选 1-2 比）· 比利时胜",win="胜负：比利时胜（次选：新咬1球 1-2 比）",
 odds_title="偏比利时·比须赢·新非铁桶会漏",
 odds_body='<b style="color:#ddd">初盘</b>：比利时 <b style="color:#e8c860">ML偏热</b>(firm盘连续不兑现需警惕)、新西兰客胜赔率高。<br><b style="color:#ddd">处境</b>：<b>比利时2分必须赢</b>才出线(两连平、压力山大)→压上；<b>新西兰1分仅3%出线</b>(需大胜+埃及赢伊朗)→搏一把。<br><b style="color:#ddd">数据</b>：比利时<b>无正牌9号·攻坚乏力是结构性</b>(两场运动战0进球,唯一进球是乌龙)·德布劳内钝；新西兰不败韧性强(别押完败)·但<b>攻防都不稳、非铁桶=会漏球</b>。<br><b style="color:#e8b84b">checklist</b>：① 比须赢压上+新非铁桶会漏→比应能打开(≠对伊朗铁桶0-0) ② 但比无9号便秘是结构隐患 ③ 新不败韧性=逼平尾部。',
 win_rel='<b style="color:#e8b84b">主=比利时胜(0-2)</b>——须赢压上+新会漏防线被打开;<b>次=1-2比</b>，新对攻咬回1球但比质量更高赢下。',
 dims=[("① 阵容硬实力","lean-b","比利时更强","比纸面质量(德布劳内/卢卡库)远高;新靠整体韧性。"),
       ("② 状态与打法","lean-even","比攻坚乏力 vs 新会漏","比无9号便秘 vs 新非铁桶会漏=对冲,看谁先破。"),
       ("③ 处境与动机","lean-b","比须赢/新搏一把","比压力下压上;新几乎出局放开搏。"),
       ("④ 赛场因素","lean-even","中立场","无主场加成。"),
       ("⑤ 软性指标","lean-a","比便秘+新不败韧性","比'控得住攻不破'前科+新不败韧性=逼平爆冷尾部不低。")],
 d6='🇳🇿 新西兰 — 2-2伊朗 + 1-3埃及（不败韧性但攻防不稳·会漏）→ <b style="color:#999">⚠ 韧性强·防守会漏</b><br>🇧🇪 比利时 — 1-1埃及 + 0-0伊朗（两场运动战0进球·无9号攻坚乏力）→ <b style="color:#999">❌ 便秘·靠乌龙</b><br><b style="color:#ddd">合成 lean</b>：比须赢压上+新会漏(非铁桶)→比终于打开;但便秘是隐患<br><b style="color:#e8b84b">⚖ ⑥校正</b>：主0-2比(对会漏队≠对伊朗铁桶);次1-2比(新咬1)。别押比大胜——攻坚乏力仍在。',
 bars=[("0-2 比利时","mid",100,"17"),("1-2 比利时","",88,"15"),("0-1 比利时","",80,"14"),("1-1 平(比爆冷)","alt",62,"11"),("0-0/1-1 平","alt",55,"10")],
 bars_note="偏比·O/U 2.5。⇒ 须赢压上+新会漏→0-2主、1-2次。⚠比便秘老毛病=1-1平/被逼平爆冷的尾部偏厚。｜ 盘口采集 06-26(初盘)",
 k1="🇧🇪 卢卡库(首发能否解攻坚荒)",k2="比攻坚 vs 新会漏防线",k3="比利时'控得住攻不破'复发风险",
 verdict_title="胜负=比利时胜 · 比分 0-2（次选 1-2 比）",
 verdict_body='<p><b>胜负关系</b>：<b style="color:#e8b84b">主=比利时胜(0-2)</b>——须赢压上+新西兰非铁桶会漏→比利时终于打开(对会漏队≠对伊朗铁桶);<b>次=1-2比</b>——新西兰对攻咬回1球,但比利时质量更高赢下。</p><p><b>比分锚</b>：0-2主、1-2次;别押比大胜(攻坚乏力仍在)。</p>',
 risk='<b>比利时"控得住≠攻得破/无9号便秘"老毛病复发→又闷平、被新西兰不败韧性逼平→比利时爆冷出局</b>(本场最大冷门点·firm盘连续不兑现的延续)。卢卡库首发能否解攻坚荒是关键。',
 srcs=SRC,
))

if __name__ == "__main__":
    for m in M:
        io.open(os.path.join(RDIR, m["file"]), "w", encoding="utf-8").write(page(m))
        print("生成:", m["file"])
    print("完成。下一步：data.js 加 matches 条目(report 指向各文件) → git push → bash deploy.sh")

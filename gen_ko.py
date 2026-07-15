# -*- coding: utf-8 -*-
"""KO专用报告生成器：复用 gen_report 的 CSS/dims/bars/srcs，加第⑦维KO成色卡+正确赛期+晋级方。"""
import io, os
import gen_report as G  # 复用 CSS / dims / bars / srcs（import 不触发其文件写入）

RDIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "reports")

def ko_page(m):
    ko_tag = m.get("ko_tag", "")
    ko_tag_html = f'<div class="ko-tag">{ko_tag}</div>' if ko_tag else ''
    adv_badge = m.get("adv_badge", "")
    adv_html = f'<div class="win" style="margin-top:6px;color:#e8b84b">晋级：<span class="adv">{adv_badge}</span></div>' if adv_badge else ''
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
{G.CSS}
.ko-tag{{display:block;text-align:center;font-size:11px;color:#caa3ff;background:rgba(150,90,230,.1);border:1px solid rgba(150,90,230,.32);border-radius:8px;padding:7px 12px;margin:0 auto 22px;max-width:680px;line-height:1.6}}
.adv{{display:inline-block;font-size:12px;font-weight:800;color:#1a1a1a;background:linear-gradient(135deg,#e8b84b,#c8941f);border-radius:6px;padding:3px 12px}}
.footer{{text-align:center;font-size:11px;color:#555;margin-top:20px}}
</style>
</head>
<body>

<h1>{m["h1"]}</h1>
<div class="sub">{m["sub"]}</div>

{ko_tag_html}
<div class="vs-banner">
  <div class="team"><div class="team-flag">{m["hf"]}</div><div class="team-name">{m["hn"]}</div><div class="team-tag">{m["ht"]}</div></div>
  <div class="score-box"><div class="score">{m["score"]}</div><div class="score-label">{m["score_label"]}</div><div class="win">{m["win"]}</div>{adv_html}</div>
  <div class="team"><div class="team-flag">{m["af"]}</div><div class="team-name">{m["an"]}</div><div class="team-tag">{m["at"]}</div></div>
</div>

<div class="card" style="border-color:rgba(232,160,4,.3)">
  <div class="card-title">🏆 晋级预测</div>
  <div style="font-size:15px;font-weight:800;color:#e8b84b">{m["advance"]}</div>
  <div class="note" style="margin-top:6px">{m["advance_note"]}</div>
</div>

<div class="card">
  <div class="card-title">🎯 盘口判读 · {m["odds_title"]}</div>
  <div class="note" style="margin-top:0;margin-bottom:10px">预测发布 {m["pub"]}｜官方首发约赛前1h揭晓</div>
  <div style="font-size:12.5px;color:#bbb;line-height:1.9">{m["odds_body"]}</div>
  <div style="margin-top:10px;padding-top:9px;border-top:1px solid #222;font-size:12px;color:#ddd;line-height:1.8"><b style="color:#e8b84b">⚖ 胜负/比分关系</b>：{m["win_rel"]}</div>
</div>

<div class="card">
  <div class="card-title">⚔ 五维综合评判</div>
{G.dims(m["dims"])}</div>

<div class="card" style="border-color:rgba(90,138,191,.45);background:linear-gradient(135deg,rgba(40,90,200,.06),rgba(17,17,17,.95))">
  <div class="card-title">🌐 第⑥维 · 本届晋级之路</div>
  <div style="font-size:12.5px;color:#bbb;line-height:1.9">{m["d6"]}</div>
</div>

<div class="card" style="border-color:rgba(200,170,20,.4);background:linear-gradient(135deg,rgba(200,170,20,.06),rgba(17,17,17,.95))">
  <div class="card-title">🏆 第⑦维 · 淘汰赛成色（KO clutch）</div>
  <div style="font-size:12.5px;color:#bbb;line-height:1.9">{m["d7"]}</div>
</div>

<div class="card">
  <div class="card-title">📊 比分概率分布（赔率市场 + ⑥⑦维收口）</div>
{G.bars(m["bars"])}  <div class="note">{m["bars_note"]}</div>
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
  <div class="srcs">{G.srcs(m["srcs"])}</div>
</div>

<div class="footer">⚽ 2026 FIFA World Cup · 娱乐向,不构成投注建议 · powered by <b>坤桑</b></div>
<div style="text-align:center;font-size:10px;margin-top:10px;padding-bottom:8px"><a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener" style="color:#666;text-decoration:none">沪ICP备2025153381号-1</a></div>
</body>
</html>'''

M = []

# ===== ① 挪威 vs 英格兰 (#99 · 1/4决赛) =====
M.append(dict(
 file="世界杯淘汰赛预测_挪威vs英格兰.html",
 title="2026世界杯1/4决赛预测 · 挪威 vs 英格兰",
 desc="两弱防+双强攻对攻大球;哈兰德高空打英重组后防·英质量+经验取胜;主3-2英·次2-1/2-2点球·晋级英格兰",
 h1="2026 世界杯 1/4决赛 · 挪威 vs 英格兰",
 sub="北京时间 2026-07-12 05:00 · 1/4决赛 · 迈阿密",
 hf="🇳🇴", hn="挪威", ht="哈兰德7球领跑·高空杀招·防线5.5遇对攻丢球",
 af="🏴󠁧󠁢󠁥󠁮󠁧󠁿", an="英格兰", at="凯恩+贝林厄姆·愿对攻·后防重组(Quansah停赛)",
 score="2 : 3", score_label="最可能比分（次选 2-1英）", win="胜负：英格兰胜（对攻大球·both score）",
 advance="英格兰晋级（置信中·挪威live威胁偏高）",
 advance_note="盘口英格兰~65%晋级、4/9进4强;挪威17/10晋级、刚2-1淘汰巴西=live冷门候选,晋级判断非高置信。",
 pub="2026-07-10（初盘）",
 odds_title="偏英格兰·英4/9进4强·挪3/1胜·对攻Over",
 odds_body='<b style="color:#ddd">晋级</b>：英格兰 <b style="color:#e8c860">~65%</b>(4/9进半决赛)·挪威 <b>17/10</b>晋级。<br><b style="color:#ddd">90分胜</b>：挪威 3/1 胜。<br><b style="color:#ddd">大小球</b>：偏 <b>Over</b>——两队防线均5.5、双方近几轮都进球多(英4-2克/3-2墨·挪4-1伊/3-2塞/2-1巴西)。<br><b style="color:#ddd">伤停</b>：⚠️英格兰 Quansah 红牌停赛→里斯·詹姆斯顶右后卫·后防重组;挪威主力齐整。<br><b style="color:#ddd">预计阵容</b>：🇳🇴(4-3-3)纽兰;后卫线;厄德高(C)中场轴;索尔洛特/哈兰德/努萨。🏴 图赫尔(4-2-3-1)凯恩;萨卡/贝林厄姆/戈登;里斯·詹姆斯顶右后卫。<br><b style="color:#e8b84b">checklist</b>：① 两弱防+双强攻=别押零封别押闷平·给两队进球档 ② 挪威高空杀招正对英重组后防(Quansah停赛) ③ 英质量+KO经验>挪威KO零经验·拖点球英占优。',
 win_rel='<b style="color:#e8b84b">主=英格兰胜(3-2)</b>——对攻大球,英质量凿开挪弱防,但后防重组+领先守不稳被哈兰德高空咬球;<b>次=2-1英</b>(英控住一点)/<b>2-2(120′)→点球英过</b>(拖加时英经验占优)。',
 dims=[("① 阵容硬实力","lean-b","英格兰略强","英质量+板凳深度更高;挪威靠哈兰德/厄德高双核,单点更致命。"),
       ("② 状态与打法","lean-even","对攻大球","两队防线均5.5;挪威高空/定位球杀招正对英重组后防,英边路速度+凯恩支点破挪弱防→双向都能进。"),
       ("③ 处境与动机","lean-even","淘汰赛生死","都全力,无留力空间;英已进4强豪门底蕴,挪威28年首进8强士气正盛。"),
       ("④ 赛场因素","lean-even","中立·迈阿密","无主场加成;高温高湿或影响体能,利板凳更深的英格兰。"),
       ("⑤ 软性指标","lean-b","经验差","英2018 4强/Euro2020亚军=大场底蕴;挪威KO零经验(28年首进世界杯)→越紧张的尾段/点球英占优。")],
 d6='🇳🇴 挪威 — 4-1伊拉克 / 3-2塞内加尔 / R16 <b style="color:#e8c860">2-1淘汰巴西(大冷)</b>·哈兰德7球领跑射手榜。高空/定位球=确认级杀招,但防线一般、遇对攻丢球(对塞丢2)。<br>🏴 英格兰 — 4-2克罗地亚 / 0-0加纳 / R32 2-1刚果金 / R16 3-2墨西哥。愿对攻火力足,但<b style="color:#999">打有组织铁桶便秘(0-0加纳)、防线会丢球+领先守不稳</b>;本场挪威愿对攻→利于英火力,但也给挪威进球空间。',
 d7='🏴 英格兰 KO成色：2018世界杯4强(点球淘汰哥伦比亚)+Euro2020亚军(决赛点球负意)=大场底蕴,但"1966后破铁桶/点球"心理包袱在;本届R32/R16均常规解决(未拖点球)避开包袱。<br>🇳🇴 挪威 KO成色：<b style="color:#999">28年来首进世界杯淘汰赛·KO经验空白</b>、哈兰德/厄德高首次大赛淘汰赛、点球无历史参照→⑦维近零。刚淘汰巴西证明当下实力,但越往深越考验大场经验。<br><b style="color:#e8b84b">⚖ ⑥⑦维收口</b>：主3-2英(对攻·英质量+经验);拖加时/点球英占优(挪KO零经验)。别押英零封(防线5.5+Quansah停赛)、别押小球闷平。',
 bars=[("3-2 英格兰(主)","","18","18"),("2-1 英格兰(次)","alt","15","15"),("2-2→点球英(次)","alt","12","12"),
       ("1-2 英格兰","mid","11","11"),("2-1 挪威(哈兰德爆)","mid","10","10"),("3-2 挪威(upset)","mid","9","9"),("其他/更大比分","mid","25","25")],
 bars_note="双弱防+双强攻→比分重心在总进球≥3的对攻区;英格兰胜(含加时点球)合计约56%(≈盘口),挪威upset约28%(哈兰德高空+英重组后防)。",
 k1="哈兰德(高空·领跑射手榜) / 凯恩(支点)",
 k2="哈兰德高空 vs 英重组后防(Quansah停赛·James顶)",
 k3="英格兰领先能否守住(领先守不稳老毛病)",
 verdict_title="英格兰对攻取胜(3-2)·挪威live冷门候选",
 ko_tag='🏆 <b>两弱防+双强攻的对攻大球局</b> · 英格兰 <b>4/9进4强(~65%)·对攻Over</b>：front four(萨卡/贝林/戈登/凯恩)质量+大赛经验更全面;挪威28年首进世界杯KO·⑦维空白,但刚2-1淘汰巴西=本届最live冷门候选。<b>晋级押英</b>但置信中等——拖加时/点球英占优(挪KO零经验)。淘汰赛无平局:结论给<b>「晋级方+走向」</b>,比分给120′双锚。',
 adv_badge='🏴 英格兰',
 verdict_body='<p>这是<b style="color:#e8b84b">两弱防+双强攻的对攻大球局</b>,不是闷平局。英格兰质量+板凳深度+大赛经验更全面,front four(萨卡/贝林厄姆/戈登/凯恩)能凿开挪威一般的防线;但英后防因Quansah停赛重组、加上"领先守不稳"老毛病,正撞挪威的高空/定位球杀招+领跑射手榜的哈兰德→大概率被咬球,难零封。</p><p>晋级押英格兰(盘口65%),但<b>置信度只给中等</b>:挪威刚2-1淘汰巴西,是本届最live的冷门候选。拖到加时/点球,英大场底蕴 vs 挪KO零经验→英占优。</p>',
 risk='哈兰德(高空+领跑射手榜7球)爆发,打穿英格兰因Quansah停赛而重组的后防+英"领先守不稳",挪威复刻2-1淘汰巴西的upset剧本掀翻晋级。挪威唯一软肋=KO经验空白(28年首进),真拖点球会露怯。',
 srcs=[("ESPN · QF preview","https://www.espn.com/soccer/story/_/id/49294844"),
       ("FIFA · Norway v England preview","https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/norway-england-preview-live-stream-team-news-tickets"),
       ("Squawka · 预测","https://www.squawka.com/us/news/world-cup/match-preview-norway-vs-england-07-11-26-world-cup-2026-quarterfinals/"),
       ("Betfair · Haaland v Kane tips","https://betting.betfair.com/football/world-cup-2026/who-will-win-norway-v-england-tips-predictions-quarter-final-latest-erling-haaland-harry-kane-060726-204.html"),
       ("OddsPortal · 欧赔+亚盘+大小球","https://www.oddsportal.com/football/world/world-championship-2026/"),
       ("AsianBookie · 亚盘中心","https://beta.asianbookie.com/en/world-cup"),
       ("Oddspedia · 欧盘/亚盘对比","https://oddspedia.com/football/world/world-cup")],
))

# ===== ② 阿根廷 vs 瑞士 (#100 · 1/4决赛) =====
M.append(dict(
 file="世界杯淘汰赛预测_阿根廷vs瑞士.html",
 title="2026世界杯1/4决赛预测 · 阿根廷 vs 瑞士",
 desc="梅西carry+零封·Under兑现;瑞士控得住攻不破+世界杯R16天花板;主2-0阿·次1-0/1-1点球·晋级阿根廷",
 h1="2026 世界杯 1/4决赛 · 阿根廷 vs 瑞士",
 sub="北京时间 2026-07-12 09:00 · 1/4决赛 · 堪萨斯城",
 hf="🇦🇷", hn="阿根廷", ht="梅西8球carry·防守强·点球之王E.马丁内斯",
 af="🇨🇭", an="瑞士", at="数据碾压但转化差·世界杯R16天花板·点球有底气",
 score="2 : 0", score_label="最可能比分（次选 1-0阿）", win="胜负：阿根廷胜（梅西carry+零封·Under）",
 advance="阿根廷晋级（置信中高·顺盘）",
 advance_note="盘口阿根廷~73%晋级、-145胜;瑞士+450胜。阿天赋碾压+KO clutch顶级,瑞士世界杯3届止步16强、攻坚上限低。",
 pub="2026-07-10（初盘）",
 odds_title="偏阿根廷·阿-145·73%晋级·Under热",
 odds_body='<b style="color:#ddd">晋级</b>：阿根廷 <b style="color:#e8c860">~73%</b>·瑞士约27%。<br><b style="color:#ddd">90分胜</b>：阿根廷 <b>-145</b>(约56%)·瑞士 <b>+450</b>。<br><b style="color:#ddd">大小球</b>：<b style="color:#e8c860">偏 Under(低总进球)</b>——阿防守强(零封能力)+瑞士攻坚上限低。<br><b style="color:#ddd">阵容</b>：🇦🇷 E.马丁内斯;莫利纳/罗梅罗/L.马丁内斯/塔利亚菲科;德保罗/帕雷德斯/麦卡利斯特/恩佐;梅西/J.阿尔瓦雷斯。🇨🇭 主力齐整·亚金稳守。<br><b style="color:#ddd">分析师</b>：多家预测 2-0 阿根廷、梅西 anytime scorer。<br><b style="color:#e8b84b">checklist</b>：① 阿根廷天赋碾压档→<b>信盘口锚别下修</b>(此前下修1-0踩过坑) ② 瑞士"控得住≠攻不破"+世界杯R16天花板→零封概率高·Under ③ 拖点球撞E.马丁内斯(点球之王)=瑞士活路却是阿最强环节。',
 win_rel='<b style="color:#e8b84b">主=阿根廷胜(2-0)</b>——梅西carry+防线零封,瑞士攻坚上限低进不了球;<b>次=1-0阿</b>(瑞士摆大巴压一分)/<b>1-1(120′)→点球阿稳过</b>(E.马丁内斯点球之王克瑞士)。',
 dims=[("① 阵容硬实力","lean-a","阿根廷碾压","卫冕冠军天赋+深度全面压过;瑞士个人能力档次差一截。"),
       ("② 状态与打法","lean-a","梅西carry vs 控得住攻不破","阿防守强(零封能力真实)+梅西8球carry可无视控球强行破局;瑞士数据碾压型但转化差、攻坚上限低。"),
       ("③ 处境与动机","lean-even","淘汰赛生死","都全力;瑞士追70年最深世界杯之路士气足,但实力差距是硬约束。"),
       ("④ 赛场因素","lean-even","中立·堪萨斯城","无主场加成。"),
       ("⑤ 软性指标","lean-a","KO成色差距","阿KO clutch顶级(2022冠军·点球之王E.马丁内斯);瑞士世界杯3届止步R16、攻坚天花板→越往深越偏被淘汰。")],
 d6='🇦🇷 阿根廷 — 3-0阿尔及利亚 / 2-0奥地利 / R32 <b>3-2佛得角(加时)</b> / R16 <b>3-2埃及</b>·梅西8球carry。天赋碾压+梅西set piece破局,但R32/R16各丢2球=<b style="color:#999">防线松/轻敌隐患</b>。<br>🇨🇭 瑞士 — 1-1卡塔尔 / 4-1波黑 / R32 2-0阿尔及利亚 / R16 <b>点球4-3淘汰哥伦比亚</b>。数据碾压型但<b style="color:#999">"控得住≠攻不破"(转化差)、世界杯R16天花板</b>(2014/18/22三届止步16强)。',
 d7='🇦🇷 阿根廷 KO成色：⭐顶级——2022世界杯冠军,点球淘汰荷兰(E.马丁内斯扑2点)、决赛点球胜法国;<b style="color:#e8c860">E.马丁内斯=点球之王</b>、斯卡洛尼调度成熟、梅西大场carry。越往后拖(加时→点球)⑦维越加权。<br>🇨🇭 瑞士 KO成色：Euro2020点球淘汰法国(Sommer扑Mbappé)有底气,但<b style="color:#999">世界杯R16天花板(2022负葡1-6)、攻坚上限低</b>。<br><b style="color:#e8b84b">⚖ ⑥⑦维收口</b>：主2-0阿(信盘口锚别下修·瑞士零封);次1-0/1-1点球。瑞士唯一活路=控死阿+拖点球,却正撞E.马丁内斯这个阿最强环节。别押瑞士常规掀翻、也别押阿4-0大胜(瑞防线7·非鱼腩+可能摆大巴)。',
 bars=[("2-0 阿根廷(主)","","20","20"),("1-0 阿根廷(次)","alt","16","16"),("2-1 阿根廷","mid","13","13"),
       ("1-1→点球阿(次)","alt","12","12"),("3-0/3-1 阿","mid","10","10"),("瑞士晋级(冷)","mid","12","12"),("其他","mid","17","17")],
 bars_note="Under基调+阿零封能力→比分重心2-0/1-0;阿根廷胜(含加时点球)合计约73%(≈盘口晋级),瑞士掀翻约27%(靠控死+门将+点球,但撞E.马丁内斯)。",
 k1="梅西(8球·set piece) / J.阿尔瓦雷斯",
 k2="梅西carry vs 瑞士门将神扑",
 k3="阿根廷防线松(R32/R16各丢2)是否被瑞士反击/定位球抓到",
 verdict_title="阿根廷梅西carry零封晋级(2-0)·Under",
 ko_tag='🏆 <b>天赋碾压+Under基调</b> · 阿根廷 <b>-145(~56%胜)·73%晋级</b>：梅西carry可无视控球强行破局、防线零封能力真实;瑞士"控得住≠攻不破"+世界杯3届止步R16、攻坚上限低。<b>晋级押阿·信盘口锚别下修</b>(此前下修1-0踩坑)。瑞士唯一活路=控死阿+拖点球,却正撞E.马丁内斯点球之王。淘汰赛无平局:结论给<b>「晋级方+走向」</b>,比分给120′双锚。',
 adv_badge='🇦🇷 阿根廷',
 verdict_body='<p>阿根廷是<b style="color:#e8b84b">天赋碾压档、非便秘型</b>——梅西8球carry可无视控球/xG强行破局,防线零封能力真实(小组两场0失球)。瑞士是"控得住≠攻不破"的典型(数据碾压但转化差)、且世界杯R16天花板压顶(3届止步16强、攻坚上限低)→大概率进不了球。<b>信盘口锚别下修</b>(阿根廷画像铁律,此前下修1-0踩过坑)。</p><p>大盘Under基调兑现,2-0是最可能。瑞士唯一活路是控死阿根廷+门将神扑拖到点球(复刻Euro2020淘汰法国)——但点球恰恰撞上E.马丁内斯这个点球之王,是瑞士最不该走到的剧本。</p>',
 risk='瑞士把"控得住攻不破"反转成"控死阿根廷"+门将连续神扑,拖到加时/点球复刻Euro2020淘汰法国剧本。但瑞士这条唯一活路正好撞上阿根廷最强环节(E.马丁内斯点球之王),且阿防线松(R32/R16各丢2)若被瑞士定位球抓到才有戏。',
 srcs=[("ESPN · QF preview","https://www.espn.com/soccer/story/_/id/49294844"),
       ("bet365 · Argentina v Switzerland preview","https://news.bet365.com/en-us/article/argentina-vs-switzerland-quarterfinal-preview-lineup-predictions/2026070916124631618"),
       ("Yahoo · prediction/odds","https://sports.yahoo.com/articles/argentina-vs-switzerland-2026-world-132433817.html"),
       ("OddsShark · picks","https://www.oddsshark.com/soccer/world-cup/argentina-switzerland-picks-odds-2026"),
       ("OddsPortal · 欧赔+亚盘+大小球","https://www.oddsportal.com/football/world/world-championship-2026/"),
       ("AsianBookie · 亚盘中心","https://beta.asianbookie.com/en/world-cup"),
       ("Oddspedia · 欧盘/亚盘对比","https://oddspedia.com/football/world/world-cup")],
))

# ===== ③ 西班牙 vs 比利时 (#98 · 1/4决赛) — 改后重生成(2-0零封) =====
M.append(dict(
 file="世界杯淘汰赛预测_西班牙vs比利时.html",
 title="2026世界杯1/4决赛预测 · 西班牙 vs 比利时",
 desc="西班牙6连零封世界杯纪录+比利时无9号攻坚乏力;主改2-0西(去both score)·次1-0/2-1·晋级西班牙",
 h1="2026 世界杯 1/4决赛 · 西班牙 vs 比利时",
 sub="北京时间 2026-07-11 03:00 · 1/4决赛 · 洛杉矶",
 hf="🇪🇸", hn="西班牙", ht="6连零封(世界杯纪录)·传控+亚马尔·防守本届最硬",
 af="🇧🇪", an="比利时", at="无正牌9号·攻坚乏力·奥纳纳伤缺·库尔图瓦门神",
 score="2 : 0", score_label="最可能比分（次选 1-0西 / 2-1西）", win="胜负：西班牙胜（零封·6连场纪录）",
 advance="西班牙晋级（置信中高·顺盘76%）",
 advance_note="盘口西班牙61%胜/76%晋级;比利时黄金一代KO脆(R32一度0-2落后险被塞淘汰)。",
 pub="2026-07-10（初盘·主预测由2-1both score下修为2-0零封）",
 odds_title="偏西班牙·西61%胜/76%晋级·比无9号",
 odds_body='<b style="color:#ddd">晋级</b>：西班牙 <b style="color:#e8c860">~76%</b>·比利时约24%。<br><b style="color:#ddd">90分胜</b>：西班牙 <b>~61%</b>·平24%·比利时17%。<br><b style="color:#ddd">关键数据</b>：西班牙 <b style="color:#e8c860">6连场零封=世界杯历史最长纪录</b>、5场未失球、R16 1-0淘汰葡萄牙。<br><b style="color:#ddd">伤停</b>：⚠️比利时奥纳纳膝伤确定缺阵;德布劳内轮休归来;卢卡库(唯一9号·老化)首发。<br><b style="color:#ddd">阵容</b>：🇧🇪(4-2-3-1)库尔图瓦;卡斯塔涅/德巴斯特/特亚特/德库珀;蒂勒曼斯+替补;多库/德布劳内/特罗萨德;卢卡库。<br><b style="color:#e8b84b">checklist</b>：① 西6连零封+比无9号攻坚乏力→<b>去掉"both score"、主押2-0零封</b>(套昨天法国2-0教训) ② 比防线5.5会漏但库尔图瓦是世界级门神→西可能被压比分 ③ 唯一克星模板=真铁桶+神门将(2022摩洛哥),库尔图瓦封神是西唯一变数。',
 win_rel='<b style="color:#e8b84b">主=西班牙胜(2-0·零封)</b>——控制+终结,比利时无9号进不了球;<b>次=1-0西</b>(库尔图瓦封神压低比分)/<b>2-1西</b>(比利时靠卢卡库/德布劳内偷1)。<b style="color:#ff6b75">改动</b>:原主"2-1both score"→<b>2-0零封</b>,因西6连零封+比攻坚乏力,不再给安慰球。',
 dims=[("① 阵容硬实力","lean-a","西班牙更强","Euro2024冠军+亚马尔/佩德里/罗德里中轴;比利时黄金一代老化、无正牌9号。"),
       ("② 状态与打法","lean-a","西控制+零封 vs 比攻坚乏力","西6连零封=本届最硬防;比利时小组两场运动战0进球、唯一进球是乌龙,无9号结构性乏力(奥纳纳伤缺)。"),
       ("③ 处境与动机","lean-even","淘汰赛生死","都全力;比利时两连平+KO险过=压力大或迫使压上露身后。"),
       ("④ 赛场因素","lean-even","中立·洛杉矶","无主场加成。"),
       ("⑤ 软性指标","lean-a","KO成色","西Euro2024七连胜夺冠=当下KO顶级;比利时黄金一代KO脆(R32一度0-2险被塞淘汰),抗压差。")],
 d6='🇪🇸 西班牙 — R1 0-0佛得角(铁桶+神门将闷平) / R2 4-0沙特 / R32 3-0奥地利 / R16 <b>1-0葡萄牙</b>·<b style="color:#e8c860">6连场零封(世界杯纪录)</b>。对会漏队火力顶级,只遇真铁桶/神门将才收口。<br>🇧🇪 比利时 — 1-1埃及 / 0-0伊朗 / R32 <b>3-2塞内加尔(加时·125′点球绝杀)</b> / R16 淘汰美国。<b style="color:#999">无9号攻坚乏力(卢卡库首发才缓解)、KO脆(R32差5分钟出局)</b>。',
 d7='🇪🇸 西班牙 KO成色：Euro2024七连胜夺冠(压德/法/英)=当下KO顶级;唯一软肋=2022被摩洛哥点球淘汰(0-0/27射0进→<b style="color:#999">真铁桶+神门将才是克星</b>)。拖点球西占优。<br>🇧🇪 比利时 KO成色：⚠️黄金一代下坡,本届R32一度0-2落后险被塞淘汰、靠末段+加时点球逆转,<b style="color:#999">抗压差、易先落后</b>。<br><b style="color:#e8b84b">⚖ ⑥⑦维收口</b>：主2-0西(零封延续);The One Risk=库尔图瓦封神(西唯一克星=神门将)。别再押both score给比利时安慰球(昨天法国2-0摩洛哥的教训)。',
 bars=[("2-0 西班牙(主)","","20","20"),("1-0 西班牙(次)","alt","18","18"),("2-1 西班牙(次)","alt","13","13"),
       ("3-0 西","mid","10","10"),("1-1→点球西","mid","11","11"),("比利时爆冷","mid","12","12"),("其他","mid","16","16")],
 bars_note="西6连零封+比攻坚乏力→重心押零封(2-0/1-0合计约38%);西班牙胜(含加时点球)合计约72%(≈盘口),比利时爆冷约24%(靠库尔图瓦封神+黄金一代自救)。",
 k1="亚马尔(效率开关) / 奥亚萨瓦尔",
 k2="西班牙终结 vs 库尔图瓦门神",
 k3="库尔图瓦能否封神拖住西班牙(唯一克星模板)",
 verdict_title="西班牙零封晋级(2-0)·主预测下修去both score",
 ko_tag='🏆 <b>本届最强防 vs 无正牌9号</b> · 西班牙 <b>~61%胜/76%晋级</b>·6连场零封=世界杯历史最长纪录;比利时黄金一代KO脆、奥纳纳伤缺、仅老化卢卡库。<b>晋级押西·主押2-0零封</b>(去both score)。唯一变数=库尔图瓦封神(西唯一克星=真铁桶+神门将·2022摩洛哥)。淘汰赛无平局:结论给<b>「晋级方+走向」</b>,比分给120′双锚。',
 adv_badge='🇪🇸 西班牙',
 verdict_body='<p>本场<b style="color:#e8b84b">主预测由「2-1西·both score」改为「2-0西·零封」</b>。理由:西班牙6连场零封=世界杯历史最长纪录、5场未失球、防守本届最硬;比利时无正牌9号(仅老化卢卡库)、小组两场运动战0进球、奥纳纳伤缺——给比利时那个"安慰球"没有依据。这正是昨天法国2-0摩洛哥栽的同一个坑(系统性低估强防队零封能力),直接纠正。</p><p>晋级押西班牙(盘口76%),Euro2024冠军KO成色顶级。唯一变数=库尔图瓦这个世界级门神——西班牙历史上唯一的克星模板就是"真铁桶+神门将"(2022摩洛哥),若库尔图瓦封神,可能把比分压到1-0甚至拖点球。</p>',
 risk='库尔图瓦封神(世界级门神=西班牙唯一克星模板·2022摩洛哥Bounou/R1佛得角Vozinha重演),连续扑救拖死西班牙到点球+比利时黄金一代绝境自救(卢卡库/蒂勒曼斯末段·复刻R32逆转塞内加尔剧本)。这是比利时唯一活路,故次选留1-1→点球偏西。',
 srcs=[("ESPN · QF preview","https://www.espn.com/soccer/story/_/id/49294844"),
       ("Squawka · Spain v Belgium","https://www.squawka.com/us/news/world-cup/match-preview-spain-vs-belgium-07-10-26-world-cup-2026-quarterfinals/"),
       ("SportPesa · team news h2h","https://blog.ke.sportpesa.com/2026/07/07/spain-vs-belgium-prediction-world-cup-2026-quarterfinal-preview-team-news-key-stats-h2h/"),
       ("RotoWire · picks/odds","https://www.rotowire.com/soccer/article/spain-vs-belgium-picks-tips-odds-best-bets-2026-world-cup-quarterfinal-121916"),
       ("OddsPortal · 欧赔+亚盘+大小球","https://www.oddsportal.com/football/world/world-championship-2026/"),
       ("AsianBookie · 亚盘中心","https://beta.asianbookie.com/en/world-cup"),
       ("Oddspedia · 欧盘/亚盘对比","https://oddspedia.com/football/world/world-cup")],
))

# ===== ④ 英格兰 vs 阿根廷 (#102 · 半决赛) =====
M.append(dict(
 file="世界杯淘汰赛预测_英格兰vs阿根廷.html",
 title="2026世界杯半决赛预测 · 英格兰 vs 阿根廷",
 desc="抛硬币级强强对话·⑦维E.马丁内斯点球之王决胜;英微favorite但拖点球利阿;主1-1(120′)点球阿·次2-1阿/1-2英·晋级阿根廷",
 h1="2026 世界杯 半决赛 · 英格兰 vs 阿根廷",
 sub="北京时间 2026-07-16 03:00 · 半决赛 · 亚特兰大",
 hf="🏴󠁧󠁢󠁥󠁮󠁧󠁿", hn="英格兰", ht="贝林厄姆KO carry·凯恩支点(哑火隐患)·防线会漏(孔萨停赛重组)",
 af="🇦🇷", an="阿根廷", at="梅西carry+set piece·⑦维顶级E.马丁内斯·连打两加时腿沉",
 score="1 : 1", score_label="最可能比分（120′·次选 2-1阿）", win="胜负：阿根廷晋级（1-1→点球·⑦维决胜）",
 advance="阿根廷晋级（置信中·near coin-flip·顺⑦维微逆最薄盘口）",
 advance_note="盘口英格兰-126晋级/阿根廷+108=英微favorite,但Squawka模型阿53%进决赛、庄家预期大概率加时(英90′胜+155/阿+205)。抛硬币局,⑦维(点球之王E.马丁内斯)做决胜层→偏阿。",
 pub="2026-07-14（初盘）",
 odds_title="抛硬币·英微favorite晋级(-126)·预期加时",
 odds_body='<b style="color:#ddd">晋级</b>：英格兰 <b>-126</b>(~56%)·阿根廷 <b>+108</b>(~48%)·<b style="color:#e8c860">Squawka模型阿根廷53%进决赛</b>。<br><b style="color:#ddd">90分胜</b>：英格兰 <b>+175</b>·平 <b>+185</b>·阿根廷 <b>+200</b>(三向近均势)。<br><b style="color:#ddd">走向</b>：<b style="color:#e8c860">庄家预期大概率加时</b>——英90′胜+155 vs 晋级-126、阿90′胜+205 vs 晋级+108,晋级赔率远低于90′胜=市场押常规难分。<br><b style="color:#ddd">伤停</b>：⚠️英格兰孔萨(Konsa)停赛→昆萨(Quansah)顶中卫、后防再度重组;阿根廷主力齐整、梅西领衔。<br><b style="color:#ddd">阵容</b>：🏴 图赫尔(4-2-3-1)凯恩;贝林厄姆/萨卡/福登;后防重组。🇦🇷 斯卡洛尼 E.马丁内斯;梅西+阿尔瓦雷斯/劳塔罗;麦卡利斯特/恩佐/德保罗。<br><b style="color:#e8b84b">checklist</b>：① 抛硬币局+两队QF常规均1-1→别押零封/别押大屠杀·往低分紧局+加时收口 ② ⑦维=决胜层:拖加时/点球撞E.马丁内斯(点球之王)=阿最强环节、英点球包袱 ③ The One Risk=阿连打两加时腿沉+英体能足+贝林厄姆carry常规内解决。',
 win_rel='<b style="color:#e8b84b">主=阿根廷晋级(1-1·120′→点球)</b>——两队都会漏也都能进但强强对话强度高、双方QF常规均1-1,拖到加时/点球撞E.马丁内斯点球之王;<b>次=2-1阿</b>(梅西/阿尔瓦雷斯常规/加时解决·both score)/<b>1-2英</b>(贝林厄姆carry+阿双加时腿沉的upset)。',
 dims=[("① 阵容硬实力","lean-even","顶级对顶级","阿根廷卫冕冠军天赋+梅西;英格兰凯恩/贝林厄姆/萨卡/福登深度=当今两支最全面之一,纸面难分。"),
       ("② 状态与打法","lean-even","对攻but强度高","两队KO防线都会漏(英领先守不稳/阿每场丢球)、都能进→both score;但半决赛防守强度高于小组赛,总进球往下收。阿连打两加时腿沉是变量。"),
       ("③ 处境与动机","lean-even","半决赛生死","都全力;梅西或末届世界杯冲卫冕、英追1966后首冠,动机拉满无留力。"),
       ("④ 赛场因素","lean-even","中立·亚特兰大(室内)","无主场加成;室内空调场利技术流。阿累计KO minutes(两场120′)>英(一场120′)=英体能微占优。"),
       ("⑤ 软性指标","lean-a","⑦维KO成色差距","⭐阿根廷2022冠军+E.马丁内斯点球之王+梅西大场carry=顶级;英格兰2018 4强/Euro2020亚军有底蕴但'1966后无冠+破铁桶/点球'包袱→越往加时/点球阿越占优。")],
 d6='🏴 英格兰 — 小组4-2克/0-0加/2-1巴拿马 · R32 2-1刚果金 · R16 3-2墨西哥 · QF <b>加时2-1挪威</b>(贝林厄姆双响carry)。<b style="color:#999">进攻高度依赖贝林厄姆(凯恩QF哑火·越位被吹)、防线会漏+领先守不稳(每场先丢或被咬)</b>,2018后首进世界杯4强。<br>🇦🇷 阿根廷 — 小组3-0阿尔/2-0奥 · R32 <b>加时3-2佛得角</b> · R16 <b>3-2埃及(0-2落后逆转)</b> · QF <b>加时3-1瑞士</b>。梅西carry+set piece破局,但<b style="color:#999">KO每场丢球(防线松)+连续两场加时=腿沉/疲劳隐患</b>。',
 d7='🇦🇷 阿根廷 KO成色：⭐顶级——2022世界杯冠军,点球淘汰荷兰(E.马丁内斯扑2点)、决赛点球胜法国;<b style="color:#e8c860">E.马丁内斯=点球之王</b>、梅西大场carry、斯卡洛尼调度成熟、阿尔瓦雷斯/劳塔罗加时爆发力(QF 112′/120′连下两城)。越往加时/点球⑦维越加权。<br>🏴 英格兰 KO成色：2018世界杯4强(点球淘汰哥伦比亚)+Euro2020亚军(决赛点球负意)=底蕴,但<b style="color:#999">"1966后无冠+破铁桶/点球"心理包袱、贝林厄姆KO carry是新变量</b>;本届KO多常规/加时解决。<br><b style="color:#e8b84b">⚖ ⑥⑦维收口</b>：主1-1(120′)→点球阿(撞E.马丁内斯这个英最不该走到的剧本);这正是庄家预期(晋级赔率≪90′胜=押加时)+两队QF常规均1-1的复现。别押英零封、别押大屠杀(强强对话收口)。',
 bars=[("1-1→点球 阿根廷(主)","","18","18"),("2-1 阿根廷(次·both score)","alt","15","15"),("1-2 英格兰(次·upset)","alt","13","13"),
       ("2-2→点球 阿根廷","mid","12","12"),("2-1 英格兰(常规)","mid","12","12"),("2-0/2-1 阿根廷(常规)","mid","11","11"),("其他/更大比分","mid","19","19")],
 bars_note="抛硬币+两队QF常规均1-1→比分重心在低分紧局+加时;阿根廷晋级(含常规/加时/点球)合计约52-53%(≈Squawka模型·顺⑦维微逆盘口),英格兰约47-48%(体能足+贝林厄姆carry常规内解决)。",
 k1="梅西/阿尔瓦雷斯(阿) vs 贝林厄姆/凯恩(英)",
 k2="梅西carry+E.马丁内斯点球 vs 贝林厄姆KO carry",
 k3="阿根廷连打两加时腿沉 / 英孔萨停赛后防重组 / 会否再拖点球",
 verdict_title="阿根廷⑦维点球占优晋级(1-1→点球)·硬币局微顺⑦维",
 ko_tag='🏆 <b>抛硬币级强强对话</b> · 盘口英格兰 <b>-126晋级</b>(微favorite)、但Squawka模型 <b>阿根廷53%</b>进决赛、庄家 <b>预期加时</b>。两队QF常规均1-1+双方KO防线都会漏都能进。<b>⑦维=决胜层</b>:拖加时/点球撞E.马丁内斯点球之王=阿最强环节、英点球包袱。<b>晋级押阿·置信中</b>(near coin-flip·顺⑦维微逆最薄盘口·非为逆而逆)。淘汰赛无平局:结论给<b>「晋级方+走向」</b>,比分给120′双锚。',
 adv_badge='🇦🇷 阿根廷',
 verdict_body='<p>这是一场<b style="color:#e8b84b">真正的抛硬币局</b>:盘口英格兰晋级-126、阿根廷+108(英微favorite),但Squawka模型阿根廷53%进决赛,两条信号几乎对冲。两队QF常规时间<b>双双打成1-1</b>(英加时2-1挪威/阿加时3-1瑞士),且双方KO防线都会漏(英"领先守不稳"、阿每场丢球)、锋线都能进→大概率又是一场往加时走的低分紧局,而非大开大合的屠杀。</p><p>在这个庄家都<b>预期加时</b>(晋级赔率远低于90′胜)的剧本里,<b>第⑦维KO成色是决胜层</b>:阿根廷2022冠军底蕴+E.马丁内斯这个点球之王+梅西大场carry,正好卡在英格兰"1966后破铁桶/点球"的心理包袱靶心上——拖到点球是英格兰最不该走到、却最可能走到的剧本。故<b>晋级押阿根廷、置信中</b>(near coin-flip·用⑦维给这枚硬币加权、非为逆而逆)。主=1-1(120′)→点球阿过,次=2-1阿(梅西/阿尔瓦雷斯常规解决)/1-2英(贝林厄姆carry掀翻)。</p>',
 risk='英格兰体能更足(阿根廷连打两场120′加时=腿沉)+贝林厄姆KO carry火力全开+抓住阿根廷松散的KO防线,在<b>常规/加时内</b>就解决战斗、不给E.马丁内斯上点球场的机会;或凯恩终于爆发。这是本场把"晋级押阿"打翻的最大不确定性——阿根廷的疲劳 vs 英格兰的质量与体能。',
 srcs=[("SI · England v Argentina opening odds","https://www.si.com/betting/england-vs-argentina-opening-odds-for-world-cup-semifinals-will-england-make-history"),
       ("Squawka · England v Argentina 预测","https://www.squawka.com/us/news/world-cup/match-preview-england-vs-argentina-07-15-26-world-cup-2026-semifinals/"),
       ("ESPN · SF preview/predictions","https://www.espn.com/soccer/story/_/id/49334623/fifa-world-cup-semifinal-preview-predictions-odds-argentina-england-france-spain"),
       ("CBS Sports · prediction/picks","https://www.cbssports.com/soccer/news/england-argentina-odds-prediction-time-2026-world-cup-semifinal-picks/"),
       ("FOX Sports · SF odds","https://www.foxsports.com/stories/soccer/2026-world-cup-odds-which-nations-favored-reach-semifinals"),
       ("OddsPortal · 欧赔+亚盘+大小球","https://www.oddsportal.com/football/world/world-championship-2026/"),
       ("Oddspedia · 欧盘/亚盘对比","https://oddspedia.com/football/world/world-cup")],
))

if __name__ == "__main__":
    for m in M:
        io.open(os.path.join(RDIR, m["file"]), "w", encoding="utf-8").write(ko_page(m))
        print("生成:", m["file"])
    print("完成。")

/* ============================================================
 * 2026 世界杯预测中心 · 数据文件
 * ------------------------------------------------------------
 * 数据分三块：
 *   matches  : 每日预测记录（动态，每日更新只动这里 + reports/）
 *   fixtures : 小组赛全 72 场静态赛程（北京时间，一次性录入，不随预测更新）
 *   groups   : 48 强 12 个小组（静态）
 *
 * 每日更新只需两步：
 *   1. 把新的预测报告 HTML 复制到 reports/ 目录
 *   2. 在下面 matches 数组【开头】追加一条记录（主页按时间排序展示，
 *      放错位置也没关系，渲染时会按 sortKey 排序）
 *
 * matches 字段说明：
 *   date     : 北京时间，展示用字符串
 *   sortKey  : 排序用，格式 "YYYY-MM-DD HH:mm"（北京时间），越大越靠前
 *   group    : 组别，如 "A组"，揭幕战可写 "A组 · 揭幕战"
 *   home/away: { flag: 国旗emoji, name: 队名 }
 *   mainPred : 主预测比分（站在 home 视角，如 "2-0"）
 *   altPred  : 次选比分
 *   actual   : 实际比分，未赛完填 null
 *   status   : 战绩三档口径 ——
 *              "exact"   ✅ 精确命中（主预测比分全对）
 *              "alt"     🟡 次选命中（次选比分对）
 *              "direction" 🔵 方向命中（仅胜平负方向对）
 *              "miss"    ❌ 未命中
 *              "pending" ⏳ 待验证
 *   report   : reports/ 目录下的文件名（中文名直接写，渲染时 encodeURI）
 *              没出报告的场次填 null
 *   note     : 一句话备注，可空字符串
 *
 * fixtures 字段说明（静态赛程，主页时间轴的骨架）：
 *   date  : 北京时间日期 "YYYY-MM-DD"
 *   time  : 北京时间开球 "HH:mm"
 *   group : 组别字母，如 "B"
 *   round : 该组第几轮（1/2/3）
 *   home/away : { flag, name }，队名与 groups 完全一致，
 *               时间轴靠队名与 matches 匹配挂载预测状态
 *
 * groups 字段说明：
 *   12 个小组 A-L，每队 { flag, name }；
 *   已出预测的队伍会被自动高亮（根据 matches 里出现过的队名匹配），
 *   不需要手动标记。某组若有未确认队伍，写 { flag:"❔", name:"待确认" }。
 * ============================================================ */

const WORLDCUP_DATA = {

  /* ---------- 赛事预测记录（新比赛往最前面加） ---------- */
  matches: [
    {
      date: "2026-06-17 12:00（北京时间）",
      sortKey: "2026-06-17 12:00",
      group: "J组",
      home: { flag: "🇦🇹", name: "奥地利" },
      away: { flag: "🇯🇴", name: "约旦" },
      mainPred: "2-0 奥地利",
      altPred: "2-1 奥地利",
      actual: null,
      status: "pending",
      report: "世界杯小组赛预测_奥地利vs约旦.html",
      note: "Levi's球场 · 奥-300/-310(市场73%)。约旦近5场全失2+球=会漏球非铁桶(区别于西班牙打的佛得角铁桶)→奥地利高压能进2;但约旦塔马里反击+亚洲杯亚军韧性会进球。主2-0/次2-1(约旦进1)。约旦爆冷不败列尾部但防守漏不支持逼平。"
    },
    {
      date: "2026-06-17 09:00（北京时间）",
      sortKey: "2026-06-17 09:00",
      group: "J组",
      home: { flag: "🇦🇷", name: "阿根廷" },
      away: { flag: "🇩🇿", name: "阿尔及利亚" },
      mainPred: "2-0 阿根廷",
      altPred: "1-0 阿根廷",
      actual: null,
      status: "pending",
      report: "世界杯小组赛预测_阿根廷vs阿尔及利亚.html",
      note: "阿根廷-245(Kalshi71%)·近5场4零封·最可能2-0。⚠️阿根廷2022首战0-2爆冷沙特+阿尔及利亚马赫雷斯单点→不押大,押零封小胜:主2-0/次1-0。阿尔及利亚不败(2022沙特+今日沙特1-1乌拉圭剧本)列live尾部。落地'天赋队别押大'。"
    },
    {
      date: "2026-06-17 06:00（北京时间）",
      sortKey: "2026-06-17 06:00",
      group: "I组",
      home: { flag: "🇮🇶", name: "伊拉克" },
      away: { flag: "🇳🇴", name: "挪威" },
      mainPred: "0-2 挪威",
      altPred: "0-3 挪威",
      actual: null,
      status: "pending",
      report: "世界杯小组赛预测_伊拉克vs挪威.html",
      note: "吉列球场 · 挪-450(超算77.4%)·预选8/8全胜场均4.6球。哈兰德/索尔洛特冲击型火力(≠西班牙传控磨)能打穿亚洲铁桶,但首战+伊拉克铁桶打折→主2-0(哈兰德破僵+1)/次3-0(火力兑现)。⚠️沙特1-1乌教训→伊拉克不败列尾部,但挪威火力远强于乌拉圭不主押平。"
    },
    {
      date: "2026-06-17 03:00（北京时间）",
      sortKey: "2026-06-17 03:00",
      group: "I组",
      home: { flag: "🇫🇷", name: "法国" },
      away: { flag: "🇸🇳", name: "塞内加尔" },
      mainPred: "2-1 法国",
      altPred: "1-1",
      actual: null,
      status: "pending",
      report: "世界杯小组赛预测_法国vs塞内加尔.html",
      note: "法-220/-225·浅盘·大小球Over2.5热(双方都进球如麻)。四场唯一'两强对攻'非'天赋打铁桶':塞内加尔非洲第一档+2002曾1-0爆冷法国。套'强队会丢球'非'打铁桶低分'→主2-1法国(小胜+失球)/次1-1(塞爆冷不败)。"
    },
    {
      date: "2026-06-16 09:00（北京时间）",
      sortKey: "2026-06-16 09:00",
      group: "G组",
      home: { flag: "🇮🇷", name: "伊朗" },
      away: { flag: "🇳🇿", name: "新西兰" },
      mainPred: "1-0 伊朗",
      altPred: "1-1",
      actual: null,
      status: "pending",
      report: "世界杯小组赛预测_伊朗vs新西兰.html",
      note: "洛杉矶SoFi · 伊朗-118极浅盘(平+250/27%很live)。两队务实低分+伊朗便秘+阿兹蒙因纪律被弃用(塔雷米单箭头),新西兰逼平基因(2010三平)。按新规:极浅盘+对手不败基因→平是live次选。主1-0伊朗(塔雷米一击)/次1-1,临场移动盘偏新西兰则扶正1-1为主。"
    },
    {
      date: "2026-06-16 06:00（北京时间）",
      sortKey: "2026-06-16 06:00",
      group: "H组",
      home: { flag: "🇸🇦", name: "沙特阿拉伯" },
      away: { flag: "🇺🇾", name: "乌拉圭" },
      mainPred: "0-1 乌拉圭",
      altPred: "0-2 乌拉圭",
      actual: "1-1",
      status: "miss",
      report: "世界杯小组赛预测_沙特vs乌拉圭.html",
      note: "迈阿密 · 乌拉圭-200浅盘(让-1),市场押2-0。但乌缺德阿拉斯卡埃塔(创造中枢)+阿劳霍+迈阿密高温雷暴+沙特铁桶→低分小胜。落地'天赋队别押大':主0-1/次0-2乌拉圭。沙特2022掀翻阿根廷的爆冷基因→不败是live尾部。"
    },
    {
      date: "2026-06-16 03:00（北京时间）",
      sortKey: "2026-06-16 03:00",
      group: "G组",
      home: { flag: "🇧🇪", name: "比利时" },
      away: { flag: "🇪🇬", name: "埃及" },
      mainPred: "1-0 比利时",
      altPred: "1-1",
      actual: "1-1",
      status: "alt",
      report: "世界杯小组赛预测_比利时vs埃及.html",
      note: "西雅图 · 比利时-150浅盘(非深盘),市场最可能比分比利时1-0。比利时黄金一代老化+卢卡库伤缺无正牌9号(德凯特拉雷顶),埃及有萨拉赫+马尔穆什会进球→低分小胜,埃及不败是live次选。落地'天赋队别押大'(澳土/巴西教训)+firm≠确认:主1-0/次1-1。临场若移动盘偏埃及→按新规把1-1扶正为主。"
    },
    {
      date: "2026-06-16 00:00（北京时间）",
      sortKey: "2026-06-16 00:00",
      group: "H组",
      home: { flag: "🇪🇸", name: "西班牙" },
      away: { flag: "🇨🇻", name: "佛得角" },
      mainPred: "3-0 西班牙",
      altPred: "2-0 西班牙",
      actual: "0-0",
      status: "miss",
      report: "世界杯小组赛预测_西班牙vs佛得角.html",
      note: "亚特兰大 · 西班牙1/10碾压(让-2.5/-3深盘),佛得角首届新军摆铁桶。盘口sharp深盘→按新规不收口、敢押2球净胜;但西班牙传控'控得住≠攻得破'风险在→主3-0(下半场拉开)/次2-0,上半场破不开密防则1-0为尾部。亚马尔/N.威廉斯替补待命=破僵局变量。"
    },
    {
      date: "2026-06-15 10:00（北京时间）",
      sortKey: "2026-06-15 10:00",
      group: "F组",
      home: { flag: "🇸🇪", name: "瑞典" },
      away: { flag: "🇹🇳", name: "突尼斯" },
      mainPred: "1-0 瑞典",
      altPred: "1-1",
      actual: "5-1 瑞典胜",
      status: "direction",
      report: "世界杯小组赛预测_瑞典vs突尼斯.html",
      note: "墨西哥蒙特雷 · 双枪vs突尼斯铁桶(9胜1平)+瑞典世界杯6/8场小球→主1-0。承澳土(铁桶掀翻大热)教训,1-1提为并列次选,突尼斯不败是最live的尾部;比分不变只调权重"
    },
    {
      date: "2026-06-15 07:00（北京时间）",
      sortKey: "2026-06-15 07:00",
      group: "E组",
      home: { flag: "🇨🇮", name: "科特迪瓦" },
      away: { flag: "🇪🇨", name: "厄瓜多尔" },
      mainPred: "1-1",
      altPred: "0-1 厄瓜多尔",
      actual: "1-0 科特迪瓦胜",
      status: "miss",
      report: "世界杯小组赛预测_科特迪瓦vs厄瓜多尔.html",
      note: "费城 · 非洲冠军(阿勒/佩佩/阿丁格拉)vs防守极硬+平局成性的厄瓜多尔(19场平11)。双防强+浅盘+低分→主锚1-1,次选0-1厄小胜"
    },
    {
      date: "2026-06-15 04:00（北京时间）",
      sortKey: "2026-06-15 04:00",
      group: "F组",
      home: { flag: "🇳🇱", name: "荷兰" },
      away: { flag: "🇯🇵", name: "日本" },
      mainPred: "2-1 荷兰",
      altPred: "1-1",
      actual: "2-2 平",
      status: "direction",
      report: "世界杯小组赛预测_荷兰vs日本.html",
      note: "阿灵顿AT&T · 浅盘(荷兰+100)+亚盘仅让-0.5且sharp偏日本不败+日本三核心(三笘/南野/町田)伤缺。收口纪律→主2-1不押3-1;亚盘偏日本→次选1-1权重抬高。移动盘往日本走则下修1-1"
    },
    {
      date: "2026-06-15 01:00（北京时间）",
      sortKey: "2026-06-15 01:00",
      group: "E组",
      home: { flag: "🇩🇪", name: "德国" },
      away: { flag: "🇨🇼", name: "库拉索" },
      mainPred: "3-0 德国",
      altPred: "4-0 德国",
      actual: "7-1 德国胜",
      status: "direction",
      report: "世界杯小组赛预测_德国vs库拉索.html",
      note: "休斯顿NRG · 身价36倍鸿沟,德国必胜。06-15盘口加深:亚盘-3.5+大小球4.5,市场重心净胜3-4。次选由2-0上调4-0,夹住3-0/4-0(库拉索是会漏的鱼腩非铁桶,便秘教训不适用)"
    },
    {
      date: "2026-06-14 12:00（北京时间）",
      sortKey: "2026-06-14 12:00",
      group: "D组",
      home: { flag: "🇦🇺", name: "澳大利亚" },
      away: { flag: "🇹🇷", name: "土耳其" },
      mainPred: "1-2 土耳其",
      altPred: "1-1",
      actual: "2-0 澳大利亚胜",
      status: "miss",
      report: "世界杯复盘_澳大利亚vs土耳其.html",
      note: "方向完全押反！土耳其全场30脚射门0进球(控得住≠攻得破第3例)，澳洲三中卫铁桶+稳守突击：伊兰昆达26'、梅特卡夫74'远射。我方五维⑤软性本就标澳占优，却被'土天赋+盘口firm'盖过=教训。点击看复盘"
    },
    {
      date: "2026-06-14 09:00（北京时间）",
      sortKey: "2026-06-14 09:00",
      group: "C组",
      home: { flag: "🇭🇹", name: "海地" },
      away: { flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", name: "苏格兰" },
      mainPred: "0-1 苏格兰",
      altPred: "1-1",
      actual: "0-1 苏格兰胜",
      status: "exact",
      report: "世界杯小组赛预测_海地vs苏格兰.html",
      note: "主预测0-1精确命中！麦金28'抢点补射(亚当斯被扑后哈姆斯长传策动)。海地控球56%略占优但射正2-2、缺转化；苏格兰'首战拉胯魔咒'这次未应验，务实小胜剧本走通"
    },
    {
      date: "2026-06-14 06:00（北京时间）",
      sortKey: "2026-06-14 06:00",
      group: "C组",
      home: { flag: "🇧🇷", name: "巴西" },
      away: { flag: "🇲🇦", name: "摩洛哥" },
      mainPred: "2-1 巴西",
      altPred: "2-0 巴西",
      actual: "1-1 平",
      status: "miss",
      report: "世界杯复盘_巴西vs摩洛哥.html",
      note: "方向未中：摩洛哥沙巴利先进，维尼修斯扳平1-1。实力误判(内马尔非关键先生,巴西中前场被摩洛哥压住、破不了密防)+流程失误(盘口退盘+转小球三连喊话没敢下修)。点击看复盘"
    },
    {
      date: "2026-06-14 03:00（北京时间）",
      sortKey: "2026-06-14 03:00",
      group: "B组",
      home: { flag: "🇶🇦", name: "卡塔尔" },
      away: { flag: "🇨🇭", name: "瑞士" },
      mainPred: "0-2 瑞士",
      altPred: "0-1 瑞士",
      actual: "1-1 平",
      status: "miss",
      report: "世界杯复盘_卡塔尔vs瑞士.html",
      note: "方向未中(被绝平)：瑞士控球68%/射正7-3/xG2.27全程压制,恩博洛17'点球0-1领先到94',穆海姆94'乌龙绝平。thesis(瑞士碾压)对,亚盘sharp让2也对,只是没赢透+终场前偶然回吐。点击看复盘"
    },
    {
      date: "2026-06-13 09:00（北京时间）",
      sortKey: "2026-06-13 09:00",
      group: "D组",
      home: { flag: "🇺🇸", name: "美国" },
      away: { flag: "🇵🇾", name: "巴拉圭" },
      mainPred: "2-1 美国",
      altPred: "1-0 美国",
      actual: "4-1 美国胜",
      status: "direction",
      report: "世界杯复盘_美国vs巴拉圭.html",
      note: "方向命中·比分未中（分差低估两球）。乌龙7'+巴洛贡31'/45+5'+雷纳98'补时，巴拉圭73'扳回；赢球+丢球形态全中。点击看复盘"
    },
    {
      date: "2026-06-13 03:00（北京时间）",
      sortKey: "2026-06-13 03:00",
      group: "B组",
      home: { flag: "🇨🇦", name: "加拿大" },
      away: { flag: "🇧🇦", name: "波黑" },
      mainPred: "1-0 加拿大",
      altPred: "1-1",
      actual: "1-1 平",
      status: "alt",
      report: "世界杯小组赛预测_加拿大vs波黑.html",
      note: "次选1-1命中：卢基奇首球波黑半场领先，替补拉林78'扳平，加拿大队史世界杯首分"
    },
    {
      date: "2026-06-12（北京时间）",
      sortKey: "2026-06-12 10:00",
      group: "A组",
      home: { flag: "🇰🇷", name: "韩国" },
      away: { flag: "🇨🇿", name: "捷克" },
      mainPred: "1-1",
      altPred: "2-1 韩国",
      actual: "2-1 韩国胜",
      status: "alt",
      report: "世界杯小组赛预测_韩国vs捷克.html",
      note: "主预测 1-1 未中，次选 2-1 韩国精准命中"
    },
    {
      date: "2026-06-12 03:00（北京时间）",
      sortKey: "2026-06-12 03:00",
      group: "A组 · 揭幕战",
      home: { flag: "🇲🇽", name: "墨西哥" },
      away: { flag: "🇿🇦", name: "南非" },
      mainPred: "2-0 墨西哥",
      altPred: "2-1 墨西哥",
      actual: "2-0 墨西哥胜",
      status: "exact",
      report: "世界杯开幕战预测_墨西哥vs南非.html",
      note: "主预测 2-0（17%概率）精确命中开门红"
    }
  ],

  /* ---------- 小组赛全 72 场静态赛程（北京时间 = GMT+8）----------
   * 数据来源：Al Jazeera 官方赛程（GMT 口径换算，2026-06-12 录入）*/
  fixtures: [
    /* —— 第 1 轮 —— */
    { date: "2026-06-12", time: "03:00", group: "A", round: 1, home: { flag: "🇲🇽", name: "墨西哥" }, away: { flag: "🇿🇦", name: "南非" } },
    { date: "2026-06-12", time: "10:00", group: "A", round: 1, home: { flag: "🇰🇷", name: "韩国" }, away: { flag: "🇨🇿", name: "捷克" } },
    { date: "2026-06-13", time: "03:00", group: "B", round: 1, home: { flag: "🇨🇦", name: "加拿大" }, away: { flag: "🇧🇦", name: "波黑" } },
    { date: "2026-06-13", time: "09:00", group: "D", round: 1, home: { flag: "🇺🇸", name: "美国" }, away: { flag: "🇵🇾", name: "巴拉圭" } },
    { date: "2026-06-14", time: "03:00", group: "B", round: 1, home: { flag: "🇶🇦", name: "卡塔尔" }, away: { flag: "🇨🇭", name: "瑞士" } },
    { date: "2026-06-14", time: "06:00", group: "C", round: 1, home: { flag: "🇧🇷", name: "巴西" }, away: { flag: "🇲🇦", name: "摩洛哥" } },
    { date: "2026-06-14", time: "09:00", group: "C", round: 1, home: { flag: "🇭🇹", name: "海地" }, away: { flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", name: "苏格兰" } },
    { date: "2026-06-14", time: "12:00", group: "D", round: 1, home: { flag: "🇦🇺", name: "澳大利亚" }, away: { flag: "🇹🇷", name: "土耳其" } },
    { date: "2026-06-15", time: "01:00", group: "E", round: 1, home: { flag: "🇩🇪", name: "德国" }, away: { flag: "🇨🇼", name: "库拉索" } },
    { date: "2026-06-15", time: "04:00", group: "F", round: 1, home: { flag: "🇳🇱", name: "荷兰" }, away: { flag: "🇯🇵", name: "日本" } },
    { date: "2026-06-15", time: "07:00", group: "E", round: 1, home: { flag: "🇨🇮", name: "科特迪瓦" }, away: { flag: "🇪🇨", name: "厄瓜多尔" } },
    { date: "2026-06-15", time: "10:00", group: "F", round: 1, home: { flag: "🇸🇪", name: "瑞典" }, away: { flag: "🇹🇳", name: "突尼斯" } },
    { date: "2026-06-16", time: "00:00", group: "H", round: 1, home: { flag: "🇪🇸", name: "西班牙" }, away: { flag: "🇨🇻", name: "佛得角" } },
    { date: "2026-06-16", time: "03:00", group: "G", round: 1, home: { flag: "🇧🇪", name: "比利时" }, away: { flag: "🇪🇬", name: "埃及" } },
    { date: "2026-06-16", time: "06:00", group: "H", round: 1, home: { flag: "🇸🇦", name: "沙特阿拉伯" }, away: { flag: "🇺🇾", name: "乌拉圭" } },
    { date: "2026-06-16", time: "09:00", group: "G", round: 1, home: { flag: "🇮🇷", name: "伊朗" }, away: { flag: "🇳🇿", name: "新西兰" } },
    { date: "2026-06-17", time: "03:00", group: "I", round: 1, home: { flag: "🇫🇷", name: "法国" }, away: { flag: "🇸🇳", name: "塞内加尔" } },
    { date: "2026-06-17", time: "06:00", group: "I", round: 1, home: { flag: "🇮🇶", name: "伊拉克" }, away: { flag: "🇳🇴", name: "挪威" } },
    { date: "2026-06-17", time: "09:00", group: "J", round: 1, home: { flag: "🇦🇷", name: "阿根廷" }, away: { flag: "🇩🇿", name: "阿尔及利亚" } },
    { date: "2026-06-17", time: "12:00", group: "J", round: 1, home: { flag: "🇦🇹", name: "奥地利" }, away: { flag: "🇯🇴", name: "约旦" } },
    { date: "2026-06-18", time: "01:00", group: "K", round: 1, home: { flag: "🇵🇹", name: "葡萄牙" }, away: { flag: "🇨🇩", name: "刚果（金）" } },
    { date: "2026-06-18", time: "04:00", group: "L", round: 1, home: { flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", name: "英格兰" }, away: { flag: "🇭🇷", name: "克罗地亚" } },
    { date: "2026-06-18", time: "07:00", group: "L", round: 1, home: { flag: "🇬🇭", name: "加纳" }, away: { flag: "🇵🇦", name: "巴拿马" } },
    { date: "2026-06-18", time: "10:00", group: "K", round: 1, home: { flag: "🇺🇿", name: "乌兹别克斯坦" }, away: { flag: "🇨🇴", name: "哥伦比亚" } },
    /* —— 第 2 轮 —— */
    { date: "2026-06-19", time: "00:00", group: "A", round: 2, home: { flag: "🇨🇿", name: "捷克" }, away: { flag: "🇿🇦", name: "南非" } },
    { date: "2026-06-19", time: "03:00", group: "B", round: 2, home: { flag: "🇨🇭", name: "瑞士" }, away: { flag: "🇧🇦", name: "波黑" } },
    { date: "2026-06-19", time: "06:00", group: "B", round: 2, home: { flag: "🇨🇦", name: "加拿大" }, away: { flag: "🇶🇦", name: "卡塔尔" } },
    { date: "2026-06-19", time: "09:00", group: "A", round: 2, home: { flag: "🇲🇽", name: "墨西哥" }, away: { flag: "🇰🇷", name: "韩国" } },
    { date: "2026-06-20", time: "03:00", group: "D", round: 2, home: { flag: "🇺🇸", name: "美国" }, away: { flag: "🇦🇺", name: "澳大利亚" } },
    { date: "2026-06-20", time: "06:00", group: "C", round: 2, home: { flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", name: "苏格兰" }, away: { flag: "🇲🇦", name: "摩洛哥" } },
    { date: "2026-06-20", time: "08:30", group: "C", round: 2, home: { flag: "🇧🇷", name: "巴西" }, away: { flag: "🇭🇹", name: "海地" } },
    { date: "2026-06-20", time: "11:00", group: "D", round: 2, home: { flag: "🇹🇷", name: "土耳其" }, away: { flag: "🇵🇾", name: "巴拉圭" } },
    { date: "2026-06-21", time: "01:00", group: "F", round: 2, home: { flag: "🇳🇱", name: "荷兰" }, away: { flag: "🇸🇪", name: "瑞典" } },
    { date: "2026-06-21", time: "04:00", group: "E", round: 2, home: { flag: "🇩🇪", name: "德国" }, away: { flag: "🇨🇮", name: "科特迪瓦" } },
    { date: "2026-06-21", time: "11:00", group: "E", round: 2, home: { flag: "🇪🇨", name: "厄瓜多尔" }, away: { flag: "🇨🇼", name: "库拉索" } },
    { date: "2026-06-21", time: "12:00", group: "F", round: 2, home: { flag: "🇹🇳", name: "突尼斯" }, away: { flag: "🇯🇵", name: "日本" } },
    { date: "2026-06-22", time: "00:00", group: "H", round: 2, home: { flag: "🇪🇸", name: "西班牙" }, away: { flag: "🇸🇦", name: "沙特阿拉伯" } },
    { date: "2026-06-22", time: "03:00", group: "G", round: 2, home: { flag: "🇧🇪", name: "比利时" }, away: { flag: "🇮🇷", name: "伊朗" } },
    { date: "2026-06-22", time: "06:00", group: "H", round: 2, home: { flag: "🇺🇾", name: "乌拉圭" }, away: { flag: "🇨🇻", name: "佛得角" } },
    { date: "2026-06-22", time: "09:00", group: "G", round: 2, home: { flag: "🇳🇿", name: "新西兰" }, away: { flag: "🇪🇬", name: "埃及" } },
    { date: "2026-06-23", time: "01:00", group: "J", round: 2, home: { flag: "🇦🇷", name: "阿根廷" }, away: { flag: "🇦🇹", name: "奥地利" } },
    { date: "2026-06-23", time: "05:00", group: "I", round: 2, home: { flag: "🇫🇷", name: "法国" }, away: { flag: "🇮🇶", name: "伊拉克" } },
    { date: "2026-06-23", time: "08:00", group: "I", round: 2, home: { flag: "🇳🇴", name: "挪威" }, away: { flag: "🇸🇳", name: "塞内加尔" } },
    { date: "2026-06-23", time: "11:00", group: "J", round: 2, home: { flag: "🇯🇴", name: "约旦" }, away: { flag: "🇩🇿", name: "阿尔及利亚" } },
    { date: "2026-06-24", time: "01:00", group: "K", round: 2, home: { flag: "🇵🇹", name: "葡萄牙" }, away: { flag: "🇺🇿", name: "乌兹别克斯坦" } },
    { date: "2026-06-24", time: "04:00", group: "L", round: 2, home: { flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", name: "英格兰" }, away: { flag: "🇬🇭", name: "加纳" } },
    { date: "2026-06-24", time: "07:00", group: "L", round: 2, home: { flag: "🇵🇦", name: "巴拿马" }, away: { flag: "🇭🇷", name: "克罗地亚" } },
    { date: "2026-06-24", time: "10:00", group: "K", round: 2, home: { flag: "🇨🇴", name: "哥伦比亚" }, away: { flag: "🇨🇩", name: "刚果（金）" } },
    /* —— 第 3 轮（同组同时开球）—— */
    { date: "2026-06-25", time: "03:00", group: "B", round: 3, home: { flag: "🇨🇭", name: "瑞士" }, away: { flag: "🇨🇦", name: "加拿大" } },
    { date: "2026-06-25", time: "03:00", group: "B", round: 3, home: { flag: "🇧🇦", name: "波黑" }, away: { flag: "🇶🇦", name: "卡塔尔" } },
    { date: "2026-06-25", time: "06:00", group: "C", round: 3, home: { flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", name: "苏格兰" }, away: { flag: "🇧🇷", name: "巴西" } },
    { date: "2026-06-25", time: "06:00", group: "C", round: 3, home: { flag: "🇲🇦", name: "摩洛哥" }, away: { flag: "🇭🇹", name: "海地" } },
    { date: "2026-06-25", time: "09:00", group: "A", round: 3, home: { flag: "🇨🇿", name: "捷克" }, away: { flag: "🇲🇽", name: "墨西哥" } },
    { date: "2026-06-25", time: "09:00", group: "A", round: 3, home: { flag: "🇿🇦", name: "南非" }, away: { flag: "🇰🇷", name: "韩国" } },
    { date: "2026-06-26", time: "04:00", group: "E", round: 3, home: { flag: "🇪🇨", name: "厄瓜多尔" }, away: { flag: "🇩🇪", name: "德国" } },
    { date: "2026-06-26", time: "04:00", group: "E", round: 3, home: { flag: "🇨🇼", name: "库拉索" }, away: { flag: "🇨🇮", name: "科特迪瓦" } },
    { date: "2026-06-26", time: "07:00", group: "F", round: 3, home: { flag: "🇯🇵", name: "日本" }, away: { flag: "🇸🇪", name: "瑞典" } },
    { date: "2026-06-26", time: "07:00", group: "F", round: 3, home: { flag: "🇹🇳", name: "突尼斯" }, away: { flag: "🇳🇱", name: "荷兰" } },
    { date: "2026-06-26", time: "10:00", group: "D", round: 3, home: { flag: "🇹🇷", name: "土耳其" }, away: { flag: "🇺🇸", name: "美国" } },
    { date: "2026-06-26", time: "10:00", group: "D", round: 3, home: { flag: "🇵🇾", name: "巴拉圭" }, away: { flag: "🇦🇺", name: "澳大利亚" } },
    { date: "2026-06-27", time: "03:00", group: "I", round: 3, home: { flag: "🇳🇴", name: "挪威" }, away: { flag: "🇫🇷", name: "法国" } },
    { date: "2026-06-27", time: "03:00", group: "I", round: 3, home: { flag: "🇸🇳", name: "塞内加尔" }, away: { flag: "🇮🇶", name: "伊拉克" } },
    { date: "2026-06-27", time: "08:00", group: "H", round: 3, home: { flag: "🇨🇻", name: "佛得角" }, away: { flag: "🇸🇦", name: "沙特阿拉伯" } },
    { date: "2026-06-27", time: "08:00", group: "H", round: 3, home: { flag: "🇺🇾", name: "乌拉圭" }, away: { flag: "🇪🇸", name: "西班牙" } },
    { date: "2026-06-27", time: "11:00", group: "G", round: 3, home: { flag: "🇪🇬", name: "埃及" }, away: { flag: "🇮🇷", name: "伊朗" } },
    { date: "2026-06-27", time: "11:00", group: "G", round: 3, home: { flag: "🇳🇿", name: "新西兰" }, away: { flag: "🇧🇪", name: "比利时" } },
    { date: "2026-06-28", time: "05:00", group: "L", round: 3, home: { flag: "🇵🇦", name: "巴拿马" }, away: { flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", name: "英格兰" } },
    { date: "2026-06-28", time: "05:00", group: "L", round: 3, home: { flag: "🇭🇷", name: "克罗地亚" }, away: { flag: "🇬🇭", name: "加纳" } },
    { date: "2026-06-28", time: "07:30", group: "K", round: 3, home: { flag: "🇨🇴", name: "哥伦比亚" }, away: { flag: "🇵🇹", name: "葡萄牙" } },
    { date: "2026-06-28", time: "07:30", group: "K", round: 3, home: { flag: "🇨🇩", name: "刚果（金）" }, away: { flag: "🇺🇿", name: "乌兹别克斯坦" } },
    { date: "2026-06-28", time: "10:00", group: "J", round: 3, home: { flag: "🇩🇿", name: "阿尔及利亚" }, away: { flag: "🇦🇹", name: "奥地利" } },
    { date: "2026-06-28", time: "10:00", group: "J", round: 3, home: { flag: "🇯🇴", name: "约旦" }, away: { flag: "🇦🇷", name: "阿根廷" } }
  ],

  /* ---------- 48强 · 12个小组（A-L）----------
   * 数据来源：FIFA官网 / Sky Sports / ESPN / Wikipedia（2026-06-12 核对）*/
  groups: [
    { name: "A", teams: [
      { flag: "🇲🇽", name: "墨西哥" },
      { flag: "🇿🇦", name: "南非" },
      { flag: "🇰🇷", name: "韩国" },
      { flag: "🇨🇿", name: "捷克" }
    ]},
    { name: "B", teams: [
      { flag: "🇨🇦", name: "加拿大" },
      { flag: "🇧🇦", name: "波黑" },
      { flag: "🇶🇦", name: "卡塔尔" },
      { flag: "🇨🇭", name: "瑞士" }
    ]},
    { name: "C", teams: [
      { flag: "🇧🇷", name: "巴西" },
      { flag: "🇲🇦", name: "摩洛哥" },
      { flag: "🇭🇹", name: "海地" },
      { flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", name: "苏格兰" }
    ]},
    { name: "D", teams: [
      { flag: "🇺🇸", name: "美国" },
      { flag: "🇵🇾", name: "巴拉圭" },
      { flag: "🇦🇺", name: "澳大利亚" },
      { flag: "🇹🇷", name: "土耳其" }
    ]},
    { name: "E", teams: [
      { flag: "🇩🇪", name: "德国" },
      { flag: "🇨🇼", name: "库拉索" },
      { flag: "🇨🇮", name: "科特迪瓦" },
      { flag: "🇪🇨", name: "厄瓜多尔" }
    ]},
    { name: "F", teams: [
      { flag: "🇳🇱", name: "荷兰" },
      { flag: "🇯🇵", name: "日本" },
      { flag: "🇸🇪", name: "瑞典" },
      { flag: "🇹🇳", name: "突尼斯" }
    ]},
    { name: "G", teams: [
      { flag: "🇧🇪", name: "比利时" },
      { flag: "🇪🇬", name: "埃及" },
      { flag: "🇮🇷", name: "伊朗" },
      { flag: "🇳🇿", name: "新西兰" }
    ]},
    { name: "H", teams: [
      { flag: "🇪🇸", name: "西班牙" },
      { flag: "🇨🇻", name: "佛得角" },
      { flag: "🇸🇦", name: "沙特阿拉伯" },
      { flag: "🇺🇾", name: "乌拉圭" }
    ]},
    { name: "I", teams: [
      { flag: "🇫🇷", name: "法国" },
      { flag: "🇸🇳", name: "塞内加尔" },
      { flag: "🇮🇶", name: "伊拉克" },
      { flag: "🇳🇴", name: "挪威" }
    ]},
    { name: "J", teams: [
      { flag: "🇦🇷", name: "阿根廷" },
      { flag: "🇩🇿", name: "阿尔及利亚" },
      { flag: "🇦🇹", name: "奥地利" },
      { flag: "🇯🇴", name: "约旦" }
    ]},
    { name: "K", teams: [
      { flag: "🇵🇹", name: "葡萄牙" },
      { flag: "🇨🇩", name: "刚果（金）" },
      { flag: "🇺🇿", name: "乌兹别克斯坦" },
      { flag: "🇨🇴", name: "哥伦比亚" }
    ]},
    { name: "L", teams: [
      { flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", name: "英格兰" },
      { flag: "🇭🇷", name: "克罗地亚" },
      { flag: "🇬🇭", name: "加纳" },
      { flag: "🇵🇦", name: "巴拿马" }
    ]}
  ]
};

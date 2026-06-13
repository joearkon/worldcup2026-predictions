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
      date: "2026-06-14 12:00（北京时间）",
      sortKey: "2026-06-14 12:00",
      group: "D组",
      home: { flag: "🇦🇺", name: "澳大利亚" },
      away: { flag: "🇹🇷", name: "土耳其" },
      mainPred: "1-2 土耳其",
      altPred: "1-1",
      actual: null,
      status: "pending",
      report: "世界杯小组赛预测_澳大利亚vs土耳其.html",
      note: "温哥华BC Place · 土耳其黄金一代五连胜 vs 澳式铁桶，冷门系数最高的一场"
    },
    {
      date: "2026-06-14 09:00（北京时间）",
      sortKey: "2026-06-14 09:00",
      group: "C组",
      home: { flag: "🇭🇹", name: "海地" },
      away: { flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", name: "苏格兰" },
      mainPred: "0-1 苏格兰",
      altPred: "1-1",
      actual: null,
      status: "pending",
      report: "世界杯小组赛预测_海地vs苏格兰.html",
      note: "波士顿Gillette · 苏格兰背负出线魔咒，海地52年重返+加勒比准主场声浪"
    },
    {
      date: "2026-06-14 06:00（北京时间）",
      sortKey: "2026-06-14 06:00",
      group: "C组",
      home: { flag: "🇧🇷", name: "巴西" },
      away: { flag: "🇲🇦", name: "摩洛哥" },
      mainPred: "2-1 巴西",
      altPred: "2-0 巴西",
      actual: null,
      status: "pending",
      report: "世界杯小组赛预测_巴西vs摩洛哥.html",
      note: "新泽西MetLife重头戏 · 摩洛哥阿圭尔德伤缺(残阵→大球试验场)，2023曾2-1掀翻巴西"
    },
    {
      date: "2026-06-14 03:00（北京时间）",
      sortKey: "2026-06-14 03:00",
      group: "B组",
      home: { flag: "🇶🇦", name: "卡塔尔" },
      away: { flag: "🇨🇭", name: "瑞士" },
      mainPred: "0-2 瑞士",
      altPred: "0-1 瑞士",
      actual: null,
      status: "pending",
      report: "世界杯小组赛预测_卡塔尔vs瑞士.html",
      note: "湾区Levi's · 瑞士-334大热控制局，周日四场最一边倒盘口"
    },
    {
      date: "2026-06-13 09:00（北京时间）",
      sortKey: "2026-06-13 09:00",
      group: "D组",
      home: { flag: "🇺🇸", name: "美国" },
      away: { flag: "🇵🇾", name: "巴拉圭" },
      mainPred: "2-1 美国",
      altPred: "1-0 美国",
      actual: "3-0 美国胜",
      status: "direction",
      report: "世界杯复盘_美国vs巴拉圭.html",
      note: "方向命中·比分未中。巴博士乌龙(7')+巴洛贡梅开二度(31'/45+5')，半场3-0。点击查看赛后复盘（差距拆解+两条规则）"
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

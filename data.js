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
 *              "direction" 🔵 胜负命中（仅胜平负对）
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
      date: "2026-06-20 11:00（北京时间）",
      sortKey: "2026-06-20 11:00",
      group: "D组",
      home: { flag: "🇹🇷", name: "土耳其" },
      away: { flag: "🇵🇾", name: "巴拉圭" },
      mainPred: "1-0 土耳其（土胜）",
      altPred: "1-1（平）",
      actual: null,
      status: "pending",
      report: "世界杯小组赛预测_土耳其vs巴拉圭.html",
      note: "【胜负关系:主=土耳其胜/次=平】圣克拉拉Levi's·近土主场。土ML约+105(微热)、平5/2、巴10/3=浅盘偏土。双双0分·生死战(负者基本出局)。土天赋齐整(居莱尔/耶尔德兹/恰尔汗均可用·比首轮强)但⚠️首轮30射0进=便秘典型+怕反击;巴拉圭身体流5后卫+防反、脊柱完整。【0619按checklist#9总进球档重跑】①O/U~2.5但土便秘+巴锋无力=under、生死战压上微抬→②总进球档低(1-2);③土天赋稍胜净+1;④反解:总1净1=1-0土、总2净0=1-1。⇒主1-0土(天赋凿开但便秘低分);原次选2-1土需总进球3、与under打架→#9把次选下修到1-1(土便秘复发+巴防反偷分更合低总),2-1降为over尾部。The One Risk=土'30射0进'复刻+压上露身后→巴防反偷1-1/0-1(参考澳零封土)。不押土大胜(便秘+巴非鱼腩)。"
    },
    {
      date: "2026-06-20 08:30（北京时间）",
      sortKey: "2026-06-20 08:30",
      group: "C组",
      home: { flag: "🇧🇷", name: "巴西" },
      away: { flag: "🇭🇹", name: "海地" },
      mainPred: "2-0 巴西（巴西胜）",
      altPred: "3-0 巴西（巴西胜）",
      actual: null,
      status: "pending",
      report: "世界杯小组赛预测_巴西vs海地.html",
      note: "【胜负关系:巴西胜】费城Lincoln Financial·准主场。巴西ML约-800、Opta超算87.3%、海地+2500;历史3战全胜(总比17-1)。巴西1分须赢稳出线、海地0分光脚搏。内马尔小腿伤继续缺(按既定:非关键先生),安帅预计轮换。关键判断=海地不是真铁桶(对苏格兰控球56%却射正仅2、控而不进、会留空间)→适用checklist#2'对会漏球弱队敢往上够'、押净胜2+(区别于打摩洛哥密防的收口):主2-0、次3-0(维尼修斯领衔)。海地锋线转化差→巴西大概率零封。The One Risk=巴'破密防钝'复发+轮换磨合慢+1分压力急躁→闷成1-0(列15%尾部);海地控而偶进则2-1。深盘但对手非铁桶=可信、不强行反指。"
    },
    {
      date: "2026-06-20 06:00（北京时间）",
      sortKey: "2026-06-20 06:00",
      group: "C组",
      home: { flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", name: "苏格兰" },
      away: { flag: "🇲🇦", name: "摩洛哥" },
      mainPred: "1-1（平）",
      altPred: "1-0 摩洛哥（摩胜）",
      actual: null,
      status: "pending",
      report: "世界杯小组赛预测_苏格兰vs摩洛哥.html",
      note: "【胜负关系:主=平/次=摩洛哥胜】波士顿Gillette(中立)。摩洛哥客观更强ML约-130(favorite)、平+272。苏格兰1-0海地领头(3分)、一场平占出线主动→做局求稳;摩洛哥1分几乎必须赢(否则末轮打巴西被动)。⚠️摩门将布努手臂伤存疑+阿格尔德热身伤=摩后防隐患。checklist角色反转:摩=有质量进攻方、苏=防7铁桶+定位球→'控得住≠攻得破'默认收口到平/一球(摩只攻破巴西1球=便秘风险);#5弱势方苏'不败扶正'→主1-1、次1-0摩(质量+必须赢凿开)。The One Risk=摩哈基米/B.迪亚斯个人质量+紧迫感早进球→滑向2-0摩;或布努缺阵让苏一记定位球偷走(1-0苏)。临场资金涌摩(让球加深)则把1-0摩扶正为主。"
    },
    {
      date: "2026-06-20 03:00（北京时间）",
      sortKey: "2026-06-20 03:00",
      group: "D组",
      home: { flag: "🇺🇸", name: "美国" },
      away: { flag: "🇦🇺", name: "澳大利亚" },
      mainPred: "1-1（平）",
      altPred: "2-1 美国（美胜）",
      actual: null,
      status: "pending",
      report: "世界杯小组赛预测_美国vs澳大利亚.html",
      note: "【胜负关系:主=平/次=美国胜】西雅图Lumen Field·美主场。欧赔美1.60(62%)/平4.00/澳5.50,亚盘美让-1(+110)。两队均3分、胜者直接出线。【0619按checklist#9总进球档重跑】①O/U2.5+澳近3场全小球+刚用三中卫铁桶让土耳其30射0进=强under→②总进球档低(2);③美防线场场丢(both teams to score)→低总+双方进球的交点=1-1;④反解:总2净0=1-1、总3净1=2-1美。⇒原押2-1(主)需总进球3、与强under信号打架→#9把主预测下修到1-1(博精确),次选2-1美兜胜负方向(市场仍偏美胜62%)。checklist#7盘口类型别混(欧赔62%赢/亚盘让-1=赢1球是中位数)→美小胜非碾压;#1澳=有组织铁桶非鱼腩→不押美大胜。The One Risk=美70'前凿不开滑成1-1/1-0,或终于打开变2-1。临场澳退盘则更坚定1-1。"
    },
    {
      date: "2026-06-19 09:00（北京时间）",
      sortKey: "2026-06-19 09:00",
      group: "A组",
      home: { flag: "🇲🇽", name: "墨西哥" },
      away: { flag: "🇰🇷", name: "韩国" },
      mainPred: "1-1（平）",
      altPred: "2-1 墨西哥（墨胜）",
      actual: "1-0 墨西哥胜",
      status: "direction",
      report: "世界杯小组赛预测_墨西哥vs韩国.html",
      note: "【A组·胜负命中(墨西哥胜·押次选方向)·墨率先出线】实际1-0墨西哥:罗莫(Romo)50'抢点volley凿穿——基尼奥内斯传中、韩国门将基姆扑脱,罗莫补射破门。主1-1平未中、次2-1墨西哥比分未中但方向(墨胜)对→记胜负命中。浅盘紧局如期低分(全场仅1球),墨西哥主场效率型一击制胜,成本届首支锁定出线的球队;韩国连续被零封、攻不破,出线压力陡增。'浅盘紧局可live平'这次没兑现,东道主主场效率压过求稳。"
    },
    {
      date: "2026-06-19 06:00（北京时间）",
      sortKey: "2026-06-19 06:00",
      group: "B组",
      home: { flag: "🇨🇦", name: "加拿大" },
      away: { flag: "🇶🇦", name: "卡塔尔" },
      mainPred: "2-0 加拿大（加胜）",
      altPred: "1-0 加拿大（加胜）",
      actual: "6-0 加拿大胜",
      status: "direction",
      report: "世界杯小组赛预测_加拿大vs卡塔尔.html",
      note: "【B组·胜负命中(加拿大胜)·净胜球史诗级低估】实际6-0加拿大狂胜:乔纳森·戴维帽子戏法+拉林(Larin)+萨利巴(Saliba)等,卡塔尔两度染红(2黄变红)剩9人彻底崩盘。加拿大队史世界杯首胜,创Concacaf球队单场进球纪录,登顶B组。⇒主2-0加拿大胜负对但低估4球——'加拿大慢热+卡塔尔铁桶=低分小胜'判读严重失真:卡塔尔减员后大溃败,铁桶根本没立住。净胜球低估这次最夸张(押2实际6),与瑞士同日4-1构成净胜球系统性低估又两例。"
    },
    {
      date: "2026-06-19 03:00（北京时间）",
      sortKey: "2026-06-19 03:00",
      group: "B组",
      home: { flag: "🇨🇭", name: "瑞士" },
      away: { flag: "🇧🇦", name: "波黑" },
      mainPred: "2-1 瑞士（瑞士胜）",
      altPred: "1-1（平）",
      actual: "4-1 瑞士胜",
      status: "direction",
      report: "世界杯小组赛预测_瑞士vs波黑.html",
      note: "【B组·胜负命中(瑞士胜)·净胜球大幅低估·'别押大胜'反被打脸】实际4-1瑞士:0-0闷到74',替补曼藏比(Manzambi)74'打破僵局+90'梅开二度、巴尔加斯(Vargas)84'(恩博洛做球)、扎卡(Xhaka)90+7'点球;波黑穆哈雷莫维奇(Muharemović)80'直红→10人,马赫米奇(Mahmić)90+3'扳回。⇒主2-1瑞士胜负对但低估2球——上半场仍是'控得住≠攻得破'的剧本,但换人+对手红牌后5分钟内连灌,残阵崩盘把比分撑爆;我此前'瑞士别押大胜'这次被推翻。净胜球系统性低估再添一例,和同日加拿大6-0共振。"
    },
    {
      date: "2026-06-19 00:00（北京时间）",
      sortKey: "2026-06-19 00:00",
      group: "A组",
      home: { flag: "🇨🇿", name: "捷克" },
      away: { flag: "🇿🇦", name: "南非" },
      mainPred: "2-0 捷克（捷克胜）",
      altPred: "1-0 捷克（捷克胜）",
      actual: "1-1 平",
      status: "miss",
      report: "世界杯小组赛预测_捷克vs南非.html",
      note: "【A组爆冷·主次全错·'控得住≠攻得破'第6例】实际1-1平,南非拿队史本届首分:萨迪莱克(Sadilek)6'闪击(索伊卡助攻)闪电先进,南非莫科埃纳(Mokoena)约83'点球绝平(马塞科射门打中苏尔茨Sulc手臂判点)。⇒押2-0/1-0捷克全错——捷克控场却把握不住机会、生死战没拿下,A组双弱(捷克/南非同积1分)缠斗。净胜球这次反而高估(押2实际0),与同日瑞士/加拿大低估相反——'强队碾压打软对手'再次证明便秘风险常在。临场担心的南非中场减员没成为破绽,反靠点球抢分。"
    },
    {
      date: "2026-06-18 10:00（北京时间）",
      sortKey: "2026-06-18 10:00",
      group: "K组",
      home: { flag: "🇺🇿", name: "乌兹别克斯坦" },
      away: { flag: "🇨🇴", name: "哥伦比亚" },
      mainPred: "0-2 哥伦比亚",
      altPred: "0-1 哥伦比亚",
      actual: "1-3 哥伦比亚胜",
      status: "direction",
      report: "世界杯小组赛预测_乌兹别克斯坦vs哥伦比亚.html",
      note: "【K组·胜负命中(哥伦比亚胜·净胜2对)】实际1-3哥伦比亚胜:穆尼奥斯41'、乌兹法伊祖拉耶夫60'(队史世界杯首球)、L.迪亚斯65'、坎帕斯。盘口锚-250兑现——哥伦比亚多核(迪亚斯/坎帕斯/穆尼奥斯/J罗组织)破密防工具多元、不便秘,主预测0-2方向+净胜球2全对;唯'掐单核零封'没实现(乌兹靠法伊祖拉耶夫扳1)。第一轮48队收官:哥伦比亚战术成色真实,乌兹首秀虽负但能进球非鱼腩。"
    },
    {
      date: "2026-06-18 07:00（北京时间）",
      sortKey: "2026-06-18 07:00",
      group: "L组",
      home: { flag: "🇬🇭", name: "加纳" },
      away: { flag: "🇵🇦", name: "巴拿马" },
      mainPred: "1-0 加纳",
      altPred: "1-1",
      actual: "1-0 加纳胜",
      status: "exact",
      report: "世界杯小组赛预测_加纳vs巴拿马.html",
      note: "【L组·主预测精确命中🎯(本届第3个exact·继墨西哥/海地)】实际1-0加纳:卡莱布·伊伦基(Yirenkyi)补时绝杀,1-0险胜巴拿马铁桶。'技术流打铁桶→低分闷局'判读完全对路(加纳+100极浅盘+巴拿马5-4-1真铁桶+加纳失中场引擎帕特伊组织钝),全场闷到补时才凿开;主1-0精确命中(虽绝杀来自伊伦基而非库杜斯/努阿马)。送加纳小组第二,巴拿马铁桶补时一击被攻破。"
    },
    {
      date: "2026-06-18 04:00（北京时间）",
      sortKey: "2026-06-18 04:00",
      group: "L组",
      home: { flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", name: "英格兰" },
      away: { flag: "🇭🇷", name: "克罗地亚" },
      mainPred: "1-0 英格兰",
      altPred: "1-1",
      actual: "4-2 英格兰胜",
      status: "direction",
      report: "世界杯小组赛预测_英格兰vs克罗地亚.html",
      note: "【L组·胜负命中(英胜)·比分大幅低估·净胜球低估又一例】实际4-2英格兰胜(6球混战):凯恩12'点球+42'梅开二度、贝林厄姆47'、拉什福德85';克罗地亚巴图里纳36'、穆萨45+5'(半场2-2)。⇒押1-0/次1-1判'两支好队紧局低分胶着'错得离谱——英格兰首战慢热魔咒未现(12'点球先进)、克罗地亚老辣中场没控住节奏反而被拖入对攻打成6球大战;胜负对(英格兰胜)但低估4球。净胜球系统性低估再添一例,'紧局低分'对两支愿对攻的好队同样不成立。"
    },
    {
      date: "2026-06-18 01:00（北京时间）",
      sortKey: "2026-06-18 01:00",
      group: "K组",
      home: { flag: "🇵🇹", name: "葡萄牙" },
      away: { flag: "🇨🇩", name: "刚果（金）" },
      mainPred: "2-0 葡萄牙",
      altPred: "3-1 葡萄牙",
      actual: "1-1 平",
      status: "miss",
      report: "世界杯小组赛预测_葡萄牙vs刚果金.html",
      note: "【K组爆冷·主次全错·'控得住≠攻得破'第5例】实际1-1平,送刚果(金)队史世界杯首分:若昂·内维斯6'(内托助攻)闪击,刚果金维萨90+5'(马苏巴库助攻)补时绝平。葡萄牙控球75%(半场高达80%)、射门7-8但射正仅1-2、xG0.69-0.82(半场xG 0.07-0.49反被压)=传控碾压杀不死比赛;C罗41岁第6届世界杯首战3射0正、25触球0过人、坎塞洛55'倒钩越位被吹、赛后沮丧提前离场。⇒押2-0/3-1葡萄牙押反:中深盘-360失效,'刚果金会漏非铁桶→信盘口锚'判错——它就是能拖住葡萄牙的中下游,西0-0佛得角/卡塔尔逼瑞士同型;净胜球这次反而高估(押净胜2-3,实际0)。"
    },
    {
      date: "2026-06-17 12:00（北京时间）",
      sortKey: "2026-06-17 12:00",
      group: "J组",
      home: { flag: "🇦🇹", name: "奥地利" },
      away: { flag: "🇯🇴", name: "约旦" },
      mainPred: "2-0 奥地利",
      altPred: "1-0 奥地利",
      actual: "3-1 奥地利胜",
      status: "direction",
      report: "世界杯小组赛预测_奥地利vs约旦.html",
      note: "【八维试点·样本3·胜负命中·零封微调踩坑】实际3-1奥地利胜(36年世界杯首胜):施密德20'、约旦奥尔万50'扳平、约旦76'乌龙、阿瑙90+12'点球。胜负对(净胜+2与2-0一致),但八维'掐单核塔马里→零封'把次选2-1改1-0=帮倒忙——约旦靠奥尔万(非塔马里)进球,遏制单核≠零封、对手有第二出口,原次选2-1才对。奥地利运动战仅1球(另含乌龙+点球)攻坚乏力。⇒八维'聪明修正'连续0/3(法/阿下修+奥零封),信盘口锚少过度修正。"
    },
    {
      date: "2026-06-17 09:00（北京时间）",
      sortKey: "2026-06-17 09:00",
      group: "J组",
      home: { flag: "🇦🇷", name: "阿根廷" },
      away: { flag: "🇩🇿", name: "阿尔及利亚" },
      mainPred: "1-0 阿根廷",
      altPred: "1-1",
      actual: "3-0 阿根廷胜",
      status: "direction",
      report: "世界杯小组赛预测_阿根廷vs阿尔及利亚.html",
      note: "【八维试点·样本2·胜负命中(盘口锚)·八维下修再次踩坑】实际3-0阿根廷胜:梅西帽子戏法17'/60'/76'(38岁国家队200场·追平克洛泽世界杯16球纪录)。八维把盘口锚2-0下修到1-0=与法塞同一失败模式——阿根廷非便秘型,梅西个人能力低xG下轰3,'控球打铁桶→破密防慢'类比错了,盘口锚2-0胜负对。⚠️阿尔及利亚踢得不差(半场控球占优·早段xG反超)但缺质量点;马赫雷斯还替补未首发。教训:天赋碾压档信盘口锚、净胜球别压小。八维下修连续2例踩坑,再看几次。"
    },
    {
      date: "2026-06-17 06:00（北京时间）",
      sortKey: "2026-06-17 06:00",
      group: "I组",
      home: { flag: "🇮🇶", name: "伊拉克" },
      away: { flag: "🇳🇴", name: "挪威" },
      mainPred: "0-2 挪威",
      altPred: "0-3 挪威",
      actual: "1-4 挪威胜",
      status: "direction",
      note: "【八维试点·样本1·胜负+形态全中(盘口锚)】实际1-4挪威胜:哈兰德28'抢点头球+42'抓门将哈桑回传失误(世界杯首秀梅开二度)、厄斯蒂高头球来自厄德高角球、伊拉克侯赛因38'头球扳平。盘口锚0-2胜负+形态全中——进球全来自高空/定位球/门将失误,'高空克防空弱铁桶'完美兑现;唯净胜球仍偏小(押2实际4)。与法塞八维下修踩坑形成干净对照。",
      report: "世界杯小组赛预测_伊拉克vs挪威.html"
    },
    {
      date: "2026-06-17 03:00（北京时间）",
      sortKey: "2026-06-17 03:00",
      group: "I组",
      home: { flag: "🇫🇷", name: "法国" },
      away: { flag: "🇸🇳", name: "塞内加尔" },
      mainPred: "1-1",
      altPred: "1-0 法国",
      actual: "3-1 法国胜",
      status: "direction",
      note: "【八维试点·样本1·胜负命中(盘口锚)·八维下修踩坑】实际3-1法国胜:姆巴佩66'+90+6'梅开二度、巴尔科拉82',塞内加尔姆巴耶90+5'。八维把盘口锚2-1下修到1-1=踩坑——法国下半场天赋效率碾压,盘口锚2-1胜负对。上半场塞反击占优(杰克逊中柱/萨尔错失)印证'法国高位线怕速度反击',但塞锋线转化差;门迪/库利巴利防线下半场被打穿。倾向观察(再看几次):八维'相克→压平'疑只对便秘型强队,天赋碾压档信盘口锚。",
      report: "世界杯小组赛预测_法国vs塞内加尔.html"
    },
    {
      date: "2026-06-16 09:00（北京时间）",
      sortKey: "2026-06-16 09:00",
      group: "G组",
      home: { flag: "🇮🇷", name: "伊朗" },
      away: { flag: "🇳🇿", name: "新西兰" },
      mainPred: "1-0 伊朗",
      altPred: "1-1",
      actual: "2-2",
      status: "direction",
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
      note: "胜负完全押反！土耳其全场30脚射门0进球(控得住≠攻得破第3例)，澳洲三中卫铁桶+稳守突击：伊兰昆达26'、梅特卡夫74'远射。我方五维⑤软性本就标澳占优，却被'土天赋+盘口firm'盖过=教训。点击看复盘"
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
      note: "胜负未中：摩洛哥沙巴利先进，维尼修斯扳平1-1。实力误判(内马尔非关键先生,巴西中前场被摩洛哥压住、破不了密防)+流程失误(盘口退盘+转小球三连喊话没敢下修)。点击看复盘"
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
      note: "胜负未中(被绝平)：瑞士控球68%/射正7-3/xG2.27全程压制,恩博洛17'点球0-1领先到94',穆海姆94'乌龙绝平。thesis(瑞士碾压)对,亚盘sharp让2也对,只是没赢透+终场前偶然回吐。点击看复盘"
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
      note: "胜负命中·比分未中（分差低估两球）。乌龙7'+巴洛贡31'/45+5'+雷纳98'补时，巴拉圭73'扳回；赢球+丢球形态全中。点击看复盘"
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

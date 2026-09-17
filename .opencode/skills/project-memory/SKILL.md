---
name: project-memory
description: |
  个人主页作业项目的跨对话记忆锚点。加载它可恢复项目的全部关键上下文，
  包括阶段、版本、目录结构、需求约束、作业提交规则等，确保新对话开启时不丢失之前信息。

  Triggers when user mentions:
  - "新对话"
  - "继续之前"
  - "第二版本"
  - "第三版本"
  - "接着上次"
  - "项目记忆"
  - "意见反馈"
  - "后台表格"
metadata:
  author: "ASUS"
---

# 项目记忆 — 个人主页作业

本技能是该项目**跨对话的记忆锚点**。当你开启新对话（例如做第二个版本）时，加载此技能即可恢复项目关键上下文，避免遗漏历史信息。

## 项目概述

- **项目**：蓝喜阳的个人主页（本人作品，一门课程的作业）
- **当前阶段**：第三阶段（**V3 进行中**：在 V2「黄白杂志风」定稿基础上新增**「意见反馈」**功能 —— 访客侧**只写不读**、作者侧只有本人能看的**本地后台 + 简明表格 + CSV 导出**；V2 已定稿并归档）
- **制作流程**：共四个阶段，第一版原型已完成并定稿，第二版已定稿归档，当前进入第三阶段
- **技术路线**：静态 HTML / CSS / JS + **Tailwind CSS**（本地化引入 `assets/vendor/tailwind-play.js`，关闭 preflight，`darkMode: "class"`）+ **Lucide 线条图标**（内联 SVG）+ **原创围棋子 SVG**（本地预览）+ **原生 Canvas 交互组件**（`js/go-board.js`，无第三方动画库）+ **原生 JS + CSS 微特效**（鼠标跟随光晕卡片、雷达脉冲光环、打字机输出、点击形象跳「铁山靠」、悬停围棋盘浮现「欢迎切磋」，全部零依赖）
- **第三版新增技术栈（意见反馈）**：前端纯静态 `js/feedback.js`（ES5/IIFE，**只提交、不读取**）+ `js/feedback-config.js`（双模式适配层）+ 本地后端 `server.py`（**Python 标准库 `http.server` + `sqlite3`，零第三方依赖**）；线上模式预留 Supabase PostgREST（同一份前端代码，只改配置）
- **发布**：本地预览为主（`python server.py --port 8000`）；**第三版已定方向为 GitHub Pages 公开部署**（仓库公开 → 源码与邮箱一并公开，用户已知悉），等用户提供 GitHub 用户名/仓库名后再执行；静态托管时反馈走 Supabase

## 主体信息（用户本人）

- **名字**：蓝喜阳
- **网名**：棋路漫漫
- **个性签名**：棋路漫漫兮，吾将上下而求索
- **一句话介绍**：一个正在大学认真读书的男大学生
- **身份**：天津大学 · 香港理工大学 · 深圳未来技术学院 大一新生
- **当前在做**：进行脑机接口专业的学习
- **兴趣**：脑机接口、前沿生物领域
- **爱好**：围棋（网名「棋路漫漫」来源）、健身、跑步
- **记忆点**：颜值高，工作态度负责
- **主要访客**：大学教授或 HR
- **联系方式**：QQ邮箱 2762858226@qq.com

## 第一版要求（来自需求文档 word）

- **页面必须有**：头像、名字与一句话介绍、个人信息展示区、可提问的数字分身聊天区
- **风格**：简洁、轻色调（淡色）、可爱 + 脑机接口现代感；偏好黄、蓝、绿；**适配手机**
- **数字分身知识**：职业/身份（天津大学香港理工大学深圳未来技术学院大一新生）、最近在学脑机接口、关心生物医学领域；高频问题=成就/技能/联系方式
- **第一版原则**：结构清楚、能用、不过度复杂、可预览

## 需求约束（务必牢记）

1. **本地预览**：每次生成内容，只需本地打开预览，不发布上线。
2. **作业需截图**：作业需要保留每个版本的**完整截图**（整页截图，不是局部）。
3. **版本备份**：进入下一个版本前，先完整保留上一个版本的**备份**。
4. **跨版本开新对话**：做第二个版本时会开启新对话，新对话必须能恢复本记忆。

## 版本 / 进度状态

> 每次进入新阶段或新版本时，在此更新。

- 当前版本：**V3（进行中 · 第三版）** —— 在 V2「黄白杂志风」定稿基础上新增「意见反馈」；页脚已改为「个人主页（第三版）」，存档目录用 `V3-*`。V2 已定稿归档（`版本存档/V2-黄白杂志风/`，含第 18 次撤图 + 废图移出），V1 已定稿并归档。
- **版本归属（第 19–20 次讨论更新）**：此前「不新建第三版、页脚保持第二版」的约定**已作废**。用户已确认**正式升为第三版**：页脚版本号、`README.md`、存档目录名、`作业提交区` 截图命名一并更新为第三版。
- **第 23–25 次讨论**：V3 已接 Supabase 并**发布上线**（https://qilumanman.github.io/，见下文「GitHub Pages 发布」）；**第 25 次**把关系选项「网友」换成「恋人」并已发布推送 —— 遗留一步：线上 Supabase 需手动执行 `db/migration_relation_lover.sql`（改 `ck_feedback_relation` 约束）。

## 视觉规范（当前在线版本 · 黄白杂志风）

- 配色令牌（`css/main.css` 顶部 `:root`）：`--bg:#fdfbf4`、`--bg-soft:#f7f0e1`、`--surface:#ffffff`、`--surface-2:#fffdf7`、`--text:#241b0e`、`--text-soft:#6d5c44`、`--text-faint:#9c8b70`、`--line:#ece1c9`、`--line-strong:#dccdae`、`--gold:#c2811b`、`--gold-deep:#96610f`、`--gold-soft:#fdf1d6`、`--sun:#f0c04a`、`--amber:#d99a2b`、`--amber-soft:#fdf3e0`、`--clay:#a85a33`、`--clay-soft:#f8ece2`、`--olive:#74772f`、`--rule:#e6d7b4`、`--paper-line:rgba(184,121,26,0.07)`。
- 字体：正文用系统字体栈；**标题族用 `--font-display`**（`Georgia, "Times New Roman", "Songti SC", "Noto Serif SC", "Source Han Serif SC", "SimSun", serif`），字重 700。全站**不用 Emoji 装饰**。
- 纸感与学术感：`body::before` 铺 46px 稿纸细网格 + 4 层暖色径向光雾；区块小标题为琥珀金 + 右侧发丝线（`.sec-eyebrow::after`，「居中版」`.sec-eyebrow-center` 不画线）。
- **黄底上禁止白字**：黄色渐变（`.btn-primary` / `.bubble-user` / `.go-board-cheer`）的文字色统一墨色 `#3a2c12`。
- 便签配色区分：`.note-amber`（琥珀）/ `.note-clay`（陶土，原蓝色那张）/ 其余白底卡。
- V1 进度：已完成。包含头像、名字与介绍、个人信息卡、数字分身聊天区、联系区；淡色黄蓝绿风格，适配手机。
- V2 进度：进行中。数字分身形象改为「原创玻璃拟态（glassmorphism）立体天蓝色玻璃球」；聊天组件整体玻璃化；背景加天蓝色柔光斑；修复手机端导航横向溢出。
  - V2 形象调整（第 6 次讨论）：去掉头顶三个彩色小点、提升玻璃通透度与科技感（外发光 + 球内全息经纬线）、为形象加上下肢（带腿站立的玻璃小人）；聊天区小头像同步更通透。
  - V2 形象互动（第 7 次讨论）：新增双臂；鼠标悬停到形象上时会轻轻上浮并**挥右手**打招呼；手机端**点按 / 触摸**形象也会挥动约 1.6 秒。
  - V2 图标修正（第 8 次讨论）：把页面里的「国际象棋兵 ♟️」（标语 / 标签 / 板块标题共 3 处）换成**原创黑白围棋子 SVG 图标**；聊天回答里的 ♟️ 改为 ⚫⚪。
  - V2 Tailwind 重构（第 9 次讨论）：**用 Tailwind CSS 重构「个人信息」和「我的爱好」板块**。「个人信息」改为 **Bento Grid**（lg 4 列：身份卡跨 2×2、当前研究跨 2 列、兴趣 / 特点各 1 列，无落单）；去 Emoji 改 **Lucide 线条图标**（graduation-cap / brain / compass / smile / grid-3x3 / dumbbell / footprints）；卡片改 `border-slate-200/60` 细边框 + `bg-white/60` + `backdrop-blur-md` 毛玻璃；删除废弃卡片 CSS。
  - V2 深色科技风（第 10 次讨论）：设计语言整体升级为 **Linear / Apple 深色科技风**。主色改为**深邃科技蓝 `#0F172A` + 电光青 `#06B6D4` + 冷紫 `#8B5CF6` 点缀**（去掉粉 / 黄杂色）；Hero 名字「蓝喜阳」改用 Tailwind **流光渐变**（`bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 bg-clip-text text-transparent`）；标签栏重构为 **Glow Tag**（发光微边框胶囊，青 / 紫两色）；聊天区、卡片、棋盘、按钮、页脚全部改深色玻璃质感；`<html class="dark">` 激活 `dark:` 变体；移除 👋/🎤/🤖/📮/🧠 等装饰 Emoji（聊天内容里的 😊 保留）。
  - V2 棋盘交互（第 11 次讨论）：把「我的爱好」里**静态的内联 SVG 围棋盘**改写为**暗黑科技风的 Canvas 交互组件** `js/go-board.js`（原生 JS、零依赖）。要求：①棋线为**细微发光冷色调**；②**预置棋子**带微弱内阴影与高光；③**悬停 / 点击交叉点出现落子动画并扩散一圈微弱能量波纹**。实现：双层渲染（静态层离屏缓存、动态层逐帧合成）；19 路 + 9 星位 + 深空渐变底 + 青边角标；棋子为径向渐变球体 + 内圈压暗（内阴影）+ 高光点 + 冷色轮廓光；预置 5 子 黑(3,3)/白(15,3)/黑(3,15)/白(15,15)/黑(9,9) 且落子黑白自动交替；悬停显示**幽灵子 + 呼吸波纹**（已占点显示青色定位环）；点击触发**落子回弹动画（260ms）+ 能量波纹（780ms 渐隐）**并留最后一手标记；按容器宽度 × DPR 自适应。`index.html` 中原 SVG 棋盘已删除，替换为 `<canvas id="goBoard">` + 提示「悬停预览 · 点击交叉点落子」。
  - V2 微特效（第 12 次讨论）：新增两处**原生 JS + CSS 微特效**。①**鼠标跟随光晕卡片（Glow Card / Spotlight）**：8 个元素（7 张信息/爱好卡片 + 聊天卡）加 `glow-card` 类，JS 只把光标坐标写进卡片 CSS 变量 `--mx` / `--my`（`pointermove`，无 rAF），CSS 用 `radial-gradient(... circle at var(--mx) var(--my) ...)` 同时画 `.glow-card::before`（背景光晕）与 `.glow-card::after`（**mask 描边边框光环**：`padding:1px` + `mask` 双层 + `mask-composite: exclude`），靠 `opacity` 过渡淡入淡出。②**数字分身呼吸态**：需求原文要求「右下角」的头像，而此前页面只在聊天卡内才有数字分身头像，故**新增右下角悬浮头像** `<button class="ai-fab">`（fixed、68×68、3 层 `.ai-fab-pulse` 同心环 + `.ai-fab-core` 玻璃球 + 悬停气泡），`@keyframes radarPulse`（3.6s，`scale .92→2.05` 且 opacity 渐隐）用**负延时 `-1.2s` / `-2.4s`** 让三层一开始就处在不同相位（避免静态叠环），本体加 `@keyframes fabBreath` 呼吸式 box-shadow，点击平滑滚动到对话区并聚焦输入框。③**聊天打字机特效**：`js/main.js` 新增 `typeMessage()`，用 `Array.from` 按**码点**切分（emoji/中文不被截断）+ `setInterval` 逐字回填，速度按句长自适应（`1600/字数`，钳制 14–30ms），闪烁光标 `.bubble.is-typing::after`；并加 `finishTyping()`：用户连续提问时**上一条没打完的消息立即补全**。三处特效均遵守 `prefers-reduced-motion: reduce`；手机端悬浮头像缩至 56px、贴边 14px、隐藏气泡。
  - V2 人物向互动（第 14 次讨论）：①**点击数字分身 → 跳「铁山靠」**：把身体图形包进 `<g class="avatar-body">`（**落地投影与冲击层故意留在组外**），用 CSS 关键帧 `@keyframes bumpShoulder`（2.2s，蓄力 +7px → 前顶 -11px/-3.6° → 二靠 -9px → 9px 起跳落地）做「蓄力—侧倾—前顶回正」；`transform-box: view-box` + `transform-origin: 110px 226px`（双脚位置）保证**脚不离地**；双臂各自关键帧（`bumpArmLeft` 0/-56/4/-48/-16/0 deg、`bumpArmRight` 0/18/-10/16/22/0 deg，右臂声明在 `waveHand` 之后故跳舞时覆盖挥手）；「靠」的瞬间点亮 `.bump-fx`（2 同心环 `.bump-ring` + 3 条速度线 `.bump-line`，默认 `opacity:0` + 0.25s 过渡，子元素带 0.05–0.1s 错位延时）；点击同时仍挥手 1.6s，**2.2s 后自动收势**（`js/main.js` 两套定时器各自 `clearTimeout`；加类前先 `classList.remove` + `getBoundingClientRect()` 强制重排以支持连点重播）；形象加 `cursor:pointer` 与 SVG 原生 `<title>点我，给你来一段铁山靠</title>`。②**悬停围棋盘 → 盘侧竖排「欢迎切磋」**：棋盘外包一层 `.go-board-stage`，竖排文字 `p.go-board-cheer` 必须是**棋盘的兄弟节点**（`.go-board-frame` 自身 `overflow:hidden`，放内部会被裁掉），触发用 `.go-board-frame:hover ~ .go-board-cheer` + JS `pointerenter/pointerleave` 给 stage 加/去 `.is-sparring` 的**双通道**；文字 `writing-mode: vertical-rl`、青白双层发光、大字距，默认 `opacity:0` 并左偏 12px（`transform: translateY(-50%) translateX(-12px)`），点亮时回位；`pointer-events:none` 不挡落子；悬停时棋盘外框同步加强发光。两处均遵守 `prefers-reduced-motion`；手机端 ≤720px 文字更靠内（`left: calc(100% + 10px)`），≤430px 改为贴棋盘右下角内部避免溢出。
  - V2 图文素材 + 灯箱（第 15 次讨论）：用户上传三张图（①需求说明截图 ②双校学籍公众号封面海报 ③双校学位培养框架信息图），要求把**②③两张图补进「身份」卡下方那片留白**（本轮只做图片融合，需求截图里的另外 3 条版式优化未做）。做法：两张图先用 System.Drawing 等比压缩入项目（封面 1260×1340 → **1000×1063 / 149,176 字节**、信息图 1280×640 → **1200×600 / 96,565 字节**，存 `assets/images/`）；「身份」卡内新增 `<figure class="media-strip">`（`grid grid-cols-2` + 两个 `<button class="media-thumb" data-caption="…">` 包住 `<img>`，下面一行 `<figcaption>天津大学 × 香港理工大学 · 双校联合培养</figcaption>`）；缩略图 **`object-fit: contain` 不裁剪**（信息图边缘有字）；点击缩略图开**原生 `<dialog id="mediaViewer">` 灯箱**（Esc / `::backdrop` 由浏览器原生提供，自己加关闭按钮与「点空白关闭」两个出口，打开时才把缩略图的 `src`/`alt`/图注赋进去——**灯箱里那张 `<img>` 故意不写初始 `src`**，否则同一张 base64 会在单文件版里出现两次）。缩略图**不加 `loading="lazy"`**（无头截图会拍不到）。该改动**零布局位移**（桌面 `scrollH` 仍 2665，靠卡片原有留白吸收），单文件版因此从 490,776 涨到 **824,824 字节**。
  - V2 整页改版 · 浅色新风（第 16 次讨论）：用户给出一张**浅色系整页参考稿**，要求「整体照图重做」并**保留全部交互**；文案以真实信息为准（年级仍是**大一新生**，与参考稿冲突处按真实情况写）；版本号保持第二版（页脚 `© 2026 蓝喜阳 · 个人主页（第二版）`）。做法：① **弃用 Tailwind Play，改为手写一整套 CSS**（19 段结构），副作用是单文件版从 824,824 → **422,118 字节**；② 围棋盘改**双主题**——`DARK = document.documentElement.classList.contains("dark")`，旧深色配色整块保留为 `C_DARK`、新增 `C_LIGHT`，两套只切令牌，绘制逻辑一行没动；③ 复制邮箱按钮改**三段反馈**（「已复制」/「请手动复制」），不允许静默失败；④ 数字分身问答新增**「学习方式」**条目（keys 含「学习方式/学习方法/怎么学/如何学/学什么/学习」，位于「技能」后、「联系」前），同时不误吞「如何联系他？」。所有 JS 钩子 ID / 类名逐字保留。**顺手修掉一个真 bug**：`go-board.js` 的 `fit()` 原来只在「容器尺寸真的变化」时才重建离屏底纹层，而画布 `width/height` 被直接写成 340（没乘 dpr），两者不一致 → 重绘时把离屏层画到一张**空白的默认 300×150 画布**上，棋盘底纹整片消失（静态截图看不出来，只有 `getImageData` 取色才发现）。修法：`fit()` 里把「离屏层尺寸与画布不一致就重建」也纳入条件。
    - V2 视觉第三次迭代 · 黄白杂志风（第 17 次讨论，配色定型）：
用户定风格为**清新编辑杂志风 + 轻科技学术风**，主调**黄白色**，并逐轮确认：① 主色 = **奶油暖黄 + 琥珀金**（米白纸感底、琥珀金主色、墨黑正文）② **蓝色全部换成黄白暖色**（含数字分身卡通形象身上的蓝色件）③ **只换视觉皮肤、版式沿用**（严格按上一轮结构，不重排 / 不改文案 / 不动交互）。做法：① 写一次性脚本 `.deepworks/tmp/theme_warm.ps1`（**纯 ASCII**，映射表 + 残留扫描）做「令牌 + 硬编码颜色」双轨替换，**改名而不是删名**（`--blue-dark→--gold-deep`、`--blue→--gold`、`--blue-soft→--gold-soft`、`--sky→--sun`、`--violet→--clay`、`--violet-soft→--clay-soft`、`--green→--olive`），规则条数与引用关系一个没变 → 结构零风险；② 新增三个令牌：`--rule`（发丝线）、`--paper-line`（稿纸网格线色）、`--font-display`（衬线字体栈）；③ 内联 SVG 21 组颜色换暖金（`#EAF9FF→#FFF8E4`、`#3B9BE0→#D9A02B`、`#2563EB→#C8891F`、`#20405C→#3A2C12` …），类名 `note-blue → note-clay`；④ 排版：`body::before` 加 **46px 稿纸细网格** + 4 层暖色径向光雾，标题族（hero / sec-title / cta-title / card-title / 品牌名 / 区块编号）改衬线体、字重 800→700、字距收紧，`.sec-eyebrow` 改琥珀金并右侧接发丝线；⑤ **把「黄」提到「面」上**（第一版换完偏棕）：`.btn-primary` 改 `linear-gradient(135deg,#f0c04a,#dda032 52%,#c8891f)` + **墨色文字 `#3a2c12`**，`.bubble-user`、`.go-board-cheer` 同样改渐变 + 墨字，`--gold` 由 `#b8791a` 提到 `#c2811b`，并把 CSS 里残留的 `color:#fff` 全部改成墨色；⑥ `C_LIGHT` 里的蓝色点缀（悬停幽灵子 / 涟漪 / 最后一手标记）改琥珀金，`C_DARK` 整块保留。结果：CSS 替换 108 处、`index.html` 56 处、`go-board.js` 9 处，**冷色残留扫描 0 命中**；`index.html` 字节数不变（映射表全是「7 位十六进制 → 7 位十六进制」），`main.css` 28,999 → **30,156**，`go-board.js` 16,616 → **16,670**，单文件版 422,118 → **423,654 字节**。
  - V2 撤下双校配图（第 18 次讨论，**当前在线版本**）：用户指令「把身份那栏的两张照片删掉，然后替换第二版的存档和截图」。做法：① `index.html` 删掉「身份」卡里的整块 `<figure class="media-strip">`（两个 `.media-thumb` 缩略图按钮 + `<figcaption>天津大学 × 香港理工大学 · 双校联合培养</figcaption>`）与上方注释；② `css/main.css` 给 `.card-identity` 补 **`align-self: stretch`** —— 删图后左卡只剩 141px 高，而 `.about-grid` 是 `align-items: start`、右列三张信息卡 358px，左列会留 217px 空白，撑满后两列齐平（644×358 = 488×358）；③ **有意保留**：`<dialog id="mediaViewer">` 灯箱的 HTML / `.media-viewer*` CSS / `js/main.js` 里那段灯箱逻辑全部留着（页面已无 `.media-thumb`，它是**休眠代码**，不加载、不报错；留着便于日后把照片放回来），`assets/images/` 两张图也仍在磁盘上但已不被任何页面引用。实测：桌面 `scrollH` 4420 → **4403**、手机 5505 → **5053**（手机也走了单列，身份卡 617 → 165）；**单文件版 423,654 → 94,843 字节（−328,811，两张 base64 照片原本占约 329 KB，占原体积的 78%）**；`index.html` 33,672 → **32,360**、`main.css` 30,156 → **30,283**。探针：结构 / 棋盘 / 重叠 / 单文件四项全绿，`errs:[]`、`thumbs:0`、`mediaImgs:0`、`performance` 里 `assets/images/*` 请求 **0 条**。
- 主要文件：`index.html`（32,360 字节，**已无图文素材块**）；`css/main.css`（30,283 字节，手写样式，黄白杂志风）；`js/main.js`（数字分身关键词问答 + 打字机 + 光晕卡片 / 悬浮头像 / 铁山靠 / 图文灯箱，**无颜色逻辑**；灯箱那段自第 18 次撤图后已**休眠**，仅剩 `if (mediaViewer && …)` 守卫下的死代码）；`js/go-board.js`（Canvas 围棋交互组件，双主题：`C_LIGHT` 黄白暖色纸面风 / `C_DARK` 深色科技风）；`assets/images/`（**只剩 `sample-avatar.svg`** —— 两张双校配图已于第 18 次经用户确认移出到 `.deepworks/tmp/removed_images18/`，可随时取回）。
**现役页面不引用任何外链框架**：`assets/vendor/`（Tailwind Play 替身 + 8 个 Lucide 图标）保留在仓库里但已不被 `index.html` 引用（探针实测 `tailwind:false`、`stylesheets:1`）。
- 截图与备份：V1 存 `版本存档/V1-前期准备/`；V2 现有三份存档 —— `V2-深色科技风/`、`V2-浅色新风/`、**`V2-黄白杂志风/`（当前，第 18 次讨论同步：`备份/` 16 个文件 + `完整截图/` 2 张，备份含 `index.html`/`README.md`/`opencode.jsonc`/`css/`/`js/`/`assets/`；两张双校配图已按用户确认移出）**；
作业截图存 `作业提交区/01-截图/`（第二版桌面 **1440 × 4403** = 1,328,458 字节 / MD5 `7116E353AF2DF720E00CA2F5DAF3C0BE`，手机 **504 × 5053** = 830,022 字节 / MD5 `5EBEEA4C6EA3725ABCAF1B37ABBEE0F2`；`作业提交区/01-截图/`、`作业提交区/` **根目录下的两份同名遗留截图** 与 `版本存档/…/完整截图/` 三处已全部同步为当前终稿、MD5 一致。第 17 次那两张 1440×4420 / 504×5505 的截图已被本轮取代）
- 交付物：`outputs/源码/`（**14 个文件**：`index.html` 32,360 字节 / `css/main.css` 30,283 字节 / `js/main.js` 15,586 字节 / `js/go-board.js` 16,670 字节 / `assets/`（**只剩 `sample-avatar.svg`** + `vendor/`，两张双校配图已于第 18 次移出））、
`outputs/棋路漫漫-个人主页-单文件版.html`（**94,843 字节**，纯内联、零外链，**已内联图片 0 张**，本地引用 0 / CDN 引用 0）、`outputs/预览/`：**`第二版-黄白-hero.png` / `-avatar.png` / `-notes.png` / `-board.png` / `-about.png`**（黄白版裁切图），另有上一轮四张 `第二版-浅色-*.png`、三张微特效图、**`第二版-图文素材-双校联合培养.png`（第 18 次后已失效）**、一张深色整页样机（**旧预览图是否删除必须等用户确认**）。
- 下一步：第 18 次的删除 + 存档 / 截图替换已全部完成；**用户已拍板：只清掉 `assets/images/` 两张废图（已完成，见下）**，其余三项仍待拍板：① 是否把**已休眠的灯箱代码**（`<dialog id="mediaViewer">` + `.media-viewer*` CSS + `js/main.js` 里那段）也彻底删除（可再瘦一点、目录更干净；**必须用户确认，不擅自删文件**）；② `outputs/预览/` 里旧预览图（含已失效的 `第二版-图文素材-双校联合培养.png`）是否删除；③ `pages/`（关于 / 作品 / 博客）三个二级页面仍是第一版旧样式，是否统一成黄白杂志风（**未确认前不要动**）；④ 需求截图里另有 3 条版式优化始终未做（卡片去固定高度改紧凑 Bento；脑机接口卡加内联静态 EEG 波形 + 2–3 个技术关键词标签；`📍 深圳` 拟用 Lucide `map-pin` + 文字胶囊替代 Emoji）。三份 V2 存档均已验证归档副本可独立打开、渲染与项目根一致。
- **第 18 次收尾 · 用户确认后的废图清理（已完成）**：用户在多选里只勾了「删 `assets/images` 两张废图」。做法：写 `.deepworks/tmp/remove_unused_images18.ps1`（纯 ASCII、CJK 用 `[char]0x…`），把三处**当前版本**副本（项目根 `assets/images/`、`outputs/源码/assets/images/`、`版本存档/V2-黄白杂志风/备份/assets/images/`）里的 `dual-campus-cover.jpg`(149,176) 与 `dual-degree-framework.jpg`(96,565) 共 6 个文件**移动到** `.deepworks/tmp/removed_images18/{root,outputs-src,archive-bak}/`（沿用第 15 次「移动而不是硬删」的习惯，可随时取回），三处各只剩 `sample-avatar.svg`。**注意：`版本存档/V2-浅色新风/备份/`、`V2-深色科技风/备份/` 和 `首页替换前快照/` 里的同名图必须保留** —— 那几版的 `index.html` 仍引用它们（grep 实测各 2 处引用），删了会破坏历史存档的自包含性。清理后计数：备份 18 → **16**、`outputs/源码` 16 → **14**；`verify18.ps1` 复跑仍 **FAILURES: 0**；版面探针 @1440×4403 复测 `errs:[]`、`scrollH 4403`、`gapUnderIdentity 0`、`reqs []`，与清理前逐项一致（单文件版内联图片本就是 0 张，无需重建）。
- **第 18 次收尾 · V2 定稿 + 提交区截图三处对齐（已完成）**：用户指出「作业提交区的截图还没改，这个版本作为第二版的最终结果」。排查发现 `作业提交区/01-截图/` 那两张**已经是**终稿（MD5 `7116E353` / `5EBEEA4C`），但 `作业提交区/` **根目录下还留着两份第 15 次深色科技风时期的同名旧截图**（`第二版-桌面端截图.png` 1,041,346 字节 / `F75CB6EA`、`第二版-手机端截图.png` 689,048 字节 / `17B5516E`，时间戳 09-10），用户看到的是这两个。用 `.deepworks/tmp/sync_submission18.ps1` 覆盖为终稿并三处比对，**FAILURES: 0**。同时把 `README.md` 改为「第二版（V2）已定稿——当前在线版本即第二版最终结果」（6,313 字节 / `4A0C2BB6`，已用 `sync_readme18.ps1` 同步到 `版本存档/V2-黄白杂志风/备份/`；`verify18.ps1` 复跑仍 **FAILURES: 0**，backup 16 / source 14 / submission shots 4 / 单文件 94,843）。**待用户拍板**：`作业提交区/` 根目录下这两份重复截图是否删掉（`01-截图/` 才是规范位置）；注意 `outputs/源码/` 里**没有** `README.md`（`verify18.ps1` 只比对根与备份两处）。

## 第三版（V3）进行中 · 意见反馈

> 第 19–22 次讨论。**第三版（V3）已定稿（截图 / 交付 / 归档 / 交付物全部就位），只剩「上线」一步**：Supabase 建表 + anon key + GitHub Pages。本地预览命令见下。

- **需求来源**：用户希望在主页上加「意见反馈」，但**反馈内容不能让其他人看到**（隐私优先），并希望作者本人能在一个**清晰的表格**里整理查看。
- **方案定稿（第 19 次）**：① 官方**匿名反馈 + 本地管理后台**（自建，零依赖）；② 明确排除 **Google Sheets**（`script.google.com` 本机不通）与 **Cloudflare Workers**（需 node/wrangler，而本机 **node 缺失**）；③ 数据表用 `feedback`（原 `comments(nickname/body/page/is_hidden)` 方案作废）；④ 线上发布走 **Supabase PostgREST**，前端一行不改，只改配置。
- **双模式适配层**：`js/feedback-config.js` → `mode:"local"|"supabase"`、`apiBase:"/api/feedback"`、`supabaseUrl` / `supabaseAnonKey`、`table:"feedback"`、`page:"index.html"`；默认 `mode:"local"`（走 `server.py`），线上切 `supabase`。
- **⭐ 第 20 次讨论（用户两点新要求，已全部实现）**：
  1. **公众不得查看/修改他人反馈** → 页面改为**「只写不读」**：`index.html` 删掉整块留言墙（`.fb-wall` / `#fbList` / `#fbCount` / `#fbRefresh`），换成右侧**隐私说明卡 `.fb-side`**（标题「你写的话，去哪了？」+ 4 条 `.fb-side-list` + 兜底邮箱）；`js/feedback.js` **重写为纯提交版**（无 `loadList`/`renderList`、无 `innerHTML`、不发 GET）；`server.py` 把 **`GET /api/feedback` 关闭**（返回 **405** + 「该接口只接受反馈提交，不提供读取。反馈内容仅作者本人在后台可见。」），并删除 `list_public()` / `PUBLIC_LIMIT`；公开接口永不返回 `contact`。
  2. **后台用一张简明表格** → `server.py` 的 `admin_page_html()` 重写：**5 列**「编号 / 时间」「称呼 / 联系方式」「类型 / 满意度」「反馈内容」「状态 / 操作」（**去掉独立的「来源页」列**），>60 字内容用 `<details>展开全文（共 N 字）</details>` 折叠，紧凑字号 + 斑马纹 + 粘性表头 + 未读行左侧金条；顶部「全部 / 未读 / 已读 / 已解决」统计卡 + `.btn` 状态筛选 + **「导出 CSV」** 与「刷新」按钮；副标题「只有你能看到这些内容。访客页面只写不读……」。`list_admin()` 改为返回 `(rows, stats, total)`，新增 `export_rows()` 与 `send_csv()`（UTF-8 BOM + `Content-Disposition: attachment; filename="feedback.csv"`，表头「编号,提交时间,称呼,联系方式,类型,满意度,状态,反馈内容,来源页,浏览器,更新时间」）。
- **⭐⭐ 第 21 次讨论（用户点名：反馈表单必须涵盖 5 项，已全部实现并实测）**：
  1. **访客要填的 5 项** = ①**名字或昵称** `name` ②**与主页主人的关系** `relation` ③**本条反馈针对的设备** `device` ④**反馈内容** `message` ⑤**提交时间** `created_at`（**后端/数据库自动生成，页面上不设输入框**，隐私卡第 5 条已写明「提交时间由系统自动记录，不用你填」）。`contact`/`category`/`rating` 作为**额外交互项保留**，`page_url`/`user_agent` 仍由后端自动采集。
  2. **前端**：`index.html` 在「名字或昵称」后新增两个 `.fb-field` → `<select class="fb-select" id="fbRelation" name="relation">`（请选择…/同学/朋友/家人/老师/恋人/其他）与 `<select class="fb-select" id="fbDevice" name="device">`（请选择…/手机/平板/电脑/其他设备）；标签文案由「怎么称呼你」→「名字或昵称」，「想说的话」→「反馈内容」。
  3. **后端**：`validate()` 对两个新字段**严格校验**（留空放行，填了必须在枚举内），非法值返回 **400** +「「与主页主人的关系」取值不合法。」/「「本条反馈针对的设备」取值不合法。」；`insert_feedback()` 落库 9 列；CSV 导出新增「与主页主人的关系」「本条反馈针对的设备」两列（用中文标签）；后台表格把两者以小字 `<span class="meta">同学 · 手机</span>` 并入「称呼 / 联系方式」单元格（缺省显示「关系 / 设备未填」），**表头仍是 5 列**（`probe_api.py` / `check_rows.py` 都硬断言 5 个 `<th>`，别改成 6 列）。
  4. **迁移**：`db/init_db.py` 新增 `migrate(conn)` + `EXTRA_COLUMNS`，`python db/init_db.py` 会打印 `[OK] migrate : added relation, device`（老库自动补列，不丢数据）。
- **⭐⭐⭐ 第 22 次讨论（V3 定稿完成：截图 / 交付 / 归档 / 交付物重建）**：
  1. **V3 整页截图定稿**：桌面 **1440×5548**（深色像素 1.60%、内容行占比 83%、内容 y=15..5547）、手机 **504×6452**（深色 3.23%、内容行 84.7%、y=15..6450）；后台页内容止于 y≈305 → 后台截图裁 **1280×400**；反馈区裁 **1440×1210**（y 4250–5460，依据探针 `fbTop=4278` / `fbH=1145`）。相对第 20 次（5354 / 6221）的高度增长＝第 21 次新增「关系 / 设备」两个下拉。
  2. **交付（`作业提交区/01-截图/`，新增 4 张）**：`第三版-桌面端截图.png` 1440×5548 / 1,613,241 / `D7024FFF1494454F31B82B80144A6470`；`第三版-手机端截图.png` 504×6452 / 889,496 / `768D7ED0A790E028A84138542B01CDB3`；`第三版-反馈区截图.png` 1440×1210 / 345,212 / `7AFE0227892A2C0FFC0B152030BBF0F9`；`第三版-后台截图.png` 1280×400 / 25,489 / `E98C170EACF1230843B29994422763BB`（该目录现共 8 张）。视觉复核：桌面整页图首页采样均色 **246.4**、背景 `253,251,241`（米白）＝黄白杂志风 V3，且画面含「05 / 意见反馈」区块。
  3. **归档**：新建 `版本存档/V3-意见反馈/` = `备份/`（**21 文件**：index.html / README.md / opencode.jsonc / css/main.css / js×4 / pages×3 / assets）+ `服务端源码/`（**4 文件**：server.py、db/schema.sql、db/supabase_feedback.sql、db/init_db.py，**刻意不含 `*.db` 与 `admin_token.txt`**，脚本断言泄漏计数 0）+ `完整截图/`（4 张，与交付件 **MD5 逐张一致**）。脚本 `.deepworks/tmp/sync_archive_v3.ps1`（纯 ASCII + 路径守卫 + MD5 比对 + 泄漏计数）。
  4. **交付物重建**：`outputs/源码/` 17 → **19 文件**（补 `js/feedback.js`、`js/feedback-config.js`；`index.html` 同步为 37,064 / `387BB371DCE5A5D3510F343425DAA19A`）；`outputs/棋路漫漫-个人主页-单文件版.html` 92,367 → **112,059 字节**（`build_outputs.ps1` 已补两个 feedback 脚本；`remaining local refs 0`、`cdn refs 0`）。**`css/main.css` 无 `url()`、`index.html` 与 `pages/` 无 `<img src="assets/…">` → 单文件版本来就零图片依赖**（所以「`inlined images: 0`」是正确的，离线打开完整）。
  5. **README 更新为 V3**（新增反馈功能说明 + 本地运行/后台命令 + 体积表）：6,782 → **9,417 字节 / `72DED4CB441AFE453997B1F20ED87A08`**，已同步到 `版本存档/V3-意见反馈/备份/README.md`；**`版本存档/V2-黄白杂志风/备份/README.md` 保持 V2 版原样**（历史快照不覆盖）。`作业提交区/02-对话记录/对话记录.md` **953 → 1103 行 / 108,476 字节 / `3074A3F1935B7F4CE709A487B32D9EC6`**，补齐了 `## 第 20 / 21 / 22 次讨论`（第 20、21 次为按磁盘证据反向补记）。
  6. **⛔ 推翻第 20 次的截图结论**：真因是**当时 8000 服务已死**（系统里 python 进程全无，8000/8010 均不可达），所有「大面积空白 / 只有左半幅」的截图其实都是 Edge 错误页「嗯... 无法访问此页面 · 127.0.0.1 拒绝连接。」（像素证据：角落色 `246,246,246`、内容包围盒 x 60..496 / y 166..978）。**`--headless=new` 完全可用**（配方见「截图与预览」一节），`--headless=old` 反而会挂住（>120 秒）；`--force-device-scale-factor=1` 与不加的产物字节完全相同（DPI 不是变量）。**规则：每次拍照前先确认 `GET /` 返回 200；截图异常先怀疑服务、再怀疑渲染。**
  7. **8000 服务恢复配方（WMI 分离启动）**：`([wmiclass]"Win32_Process").Create('cmd.exe /c python "<server.py>" --port 8000 >> "<log>" 2>> "<err>"', $root)` → 返回 `ProcessId=21892`；复核 `GET /` **200 / 37,064 字节**、`GET /admin` **200 / 7,211 字节**。**`Start-Process` 起的后台进程会被 bash 工具调用超时带走**，长期服务一律用 WMI 配方。
  8. **顺带确认**：`outputs/预览/` 下第 19 次遗留的 3 个 Edge 用户数据目录**已经不在了**（该目录下无子目录）。

- **⚠️⚠️ SQLite 迁移坑（第 21 次踩过）**：`ALTER TABLE ADD COLUMN` **不能带 CHECK 约束**，所以老库经自动补列后**缺少 `ck_feedback_relation` / `ck_feedback_device`**，与 `db/schema.sql` 不一致。一次性重建脚本：`.deepworks/tmp/rebuild_feedback_v3.py`（无参＝预演；`--apply` 才真改；先备份到 `.deepworks/tmp/feedback_backup_<时间戳>.db`，用临时库跑 `schema.sql` 取权威 DDL 后改名建新表 → 事务内搬运（**含 `id`**，保证编号不变）→ DROP → RENAME → 重跑 `schema.sql` 恢复索引与触发器 → 校验行数/列/integrity）。**已于第 21 次 `--apply` 成功**：4 行数据完好、`relation 约束 : True` / `device 约束 : True` / `integrity : ok`。修过两个 bug：①源列要取交集；②必须用 `conn.execute(rebuilt_ddl)` 而不是 `executescript`（后者会隐式提交、破坏事务）。
- **后端接口（`server.py`，零第三方依赖）**：`POST /api/feedback`（字段校验 + 蜜罐 + 每 IP 10 分钟 5 条限流）、`GET /api/feedback` → **405 只写不读**、`GET /admin?token=…`（后台页）、`POST /api/admin`（改状态）、**`GET /export?token=…`（CSV 导出，无令牌 403）**；静态服务**拒绝** `/db/`、`/.deepworks/`、`/.opencode/`、`/.git/`、`/版本存档/`、`/作业提交区/`；启动参数 `--port(8000) --host(127.0.0.1) --db --token --open`。
- **后台令牌**：存在 `db/admin_token.txt`（**必须 gitignore，绝不入库**）；当前值 `_sG-4x4NmiM2KPbl`，后台地址 `http://127.0.0.1:8000/admin?token=_sG-4x4NmiM2KPbl`。
- **数据表约束**：`STATUSES=("new","read","resolved")`、`STATUS_LABELS={new:未读, read:已读, resolved:已解决}`、`CATEGORY_LABELS={bug:问题反馈, suggestion:功能建议, content:内容意见, other:其他}`（**第 21 次核对：`server.py` 与 `index.html` 都用「内容意见」，两者一致；早期记的「内容补充」是错的**）；**第 21 次新增两个枚举**：`RELATIONS=("classmate","friend","family","teacher","lover","other")` → 同学/朋友/家人/老师/恋人/其他（**第 25 次讨论：原 `online`/网友 已移除，改为 `lover`/恋人，前端 `index.html`、后端 `server.py`、`db/schema.sql`、`db/supabase_feedback.sql` 四处＋线上 `ck_feedback_relation` 约束必须同步**），`DEVICES=("phone","tablet","computer","other")` → 手机/平板/电脑/其他设备（分别对应 `RELATION_LABELS` / `DEVICE_LABELS`，可留空＝`None`）；限长 `MAX_MESSAGE=1000 / MAX_NAME=60 / MAX_CONTACT=120 / MAX_URL=300 / MAX_LABEL=20`。
- **验证（第 20 次，三层全绿）**：接口自测 `.deepworks/tmp/probe_api.py` → **45/45 通过**（含「GET /api/feedback 必须 405 且文案含『不提供读取』」「无令牌 `/export` 必须 403」「带令牌 `/export` 正文须以『编号,提交时间』开头」等断言）；前端结构检查 `.deepworks/tmp/verify_feedback2.py` → **41/41 通过**（含「已移除留言墙」「CSS 无 `.fb-wall`/`.fb-item`/`.fb-chip` 残留」「`.fb-side` 在位」「`feedback.js` 无 `innerHTML`/无列表逻辑」）；整页与后台截图经视觉确认渲染正常（后台可见 5 列表格 + 统计卡；访客区可见表单 + 隐私卡，无留言墙）。
- **关键文件（第 21 次改动后实测，旧值见下）**：`index.html` **37,064 字节 / `387BB371DCE5A5D3510F343425DAA19A`**；`js/feedback.js` **8,022 字节 / `C5EA80FEF74CA6E1832D0DBE1C3E14A9`**；`server.py` **30,558 字节 / `F725BD4F41C25780AD2F1830E2F815C0`**；`db/schema.sql` **4,181 字节 / `B1325996A0BBDF7E2A4F34683E83DCF4`**（**已整文件重写**：新增 `relation`/`device` 列 + `ck_feedback_relation`/`ck_feedback_device`）；`db/supabase_feedback.sql` **10,549 字节 / `2E77CEB351873B47BD011B2D4388E9BE`**（**⛔⛔ 第 22 次踩坑结论（最终，两次实测）：Supabase SQL Editor 完全无法执行 `CREATE FUNCTION` / `CREATE TRIGGER` —— 一律报 `ERROR: 42601: syntax error at or near "returns"`（`LINE 45: returns trigger`）：① `$$ … $$` 美元引用包裹函数体 → 报错；② 改用单引号包裹 `as 'begin … end'` → **仍然报错**。它会把这类语句切错位置再发送，与函数体写法无关。→ 最终处置：**把函数 + 触发器整段注释掉（默认关闭）**，并注明「想要 `updated_at` 自动更新就单独新开一个 query 只跑那 9 行」；脚本由此变成 **66 行纯净可粘贴版**（已核对零 `CREATE FUNCTION/TRIGGER` 命中），表结构 / 注释 / 索引 / RLS / grant / 自检全部不受影响。**③ 第 3 次实测又踩一坑：粘贴时 `now()` 的括号丢了（编辑器收到的是 `default now,`），报 `ERROR: 0A000: cannot use column reference in DEFAULT expression`（`LINE 13: created_at timestamptz not null default now,`）→ 已把 `created_at` / `updated_at` 两处默认值改成**关键字 `current_timestamp`**（标准 SQL，不带括号，复制过程不可能再丢）**）（**第 22 次最后加了一段 4.5 防御性授权** `grant usage on schema public to anon;` + `grant insert on table public.feedback to anon;` —— 部分 Supabase 新项目不再自动给 `public` 架构的表级权限，缺了会报 `42501 permission denied for table feedback`；**只授 insert、不授 select/update/delete**。全文＝新列 + 约束 + `comment on column` + 2 索引 + 触发器 + RLS 仅 `anon` INSERT + **4.5 表级 grant** + **老表补列段** + 自检 select，期望 `table_ok=1, five_fields_ok=5, index_count=3, policy_count=1, rls_enabled=true`；归档副本已同步同 MD5）；`db/init_db.py` **9,292 字节 / `7AE3F0D7BB44E987663D6EC92D645C35`**（含 `migrate()` + 新枚举自检用例）；`db/feedback.db` **32,768 字节 / `E27D7701D42B76B294EEFC9CD275132F`**（5 行、13 列、约束已补齐）。**未改动**：`css/main.css` 34,824 / `3A7A20FD662F30514AF0A00AC9961955`、`js/feedback-config.js` 1,592 / `48068D229175C16CD3E7ECE50E0D3A22`、`README.md` 6,782 / `2114B140F7B4977F6C9F9AD37D6B3352`、`js/main.js` 13,984 / `BBD298E33BAB6AC5A00330EBF93B0A85`、`js/go-board.js` 16,670 / `CEDCC0A97CAF625CFA379980EFBD26FC`。（**第 20 次旧值**：`index.html` 35,805 / `C0F2B27BE277BA87FD7685BBFA606944`；`js/feedback.js` 7,215 / `6AF42FF5556CABE7C7486CFFFC9161F4`；`server.py` 24,945 / `3B16E865812E0EBEC9FD4F5BE5405B46`；`db/supabase_feedback.sql` 6,209 / `6CAD523739711DD23C78C899AA7F8A22`。）
- **验证（第 21 次，四层全绿）**：`python db/init_db.py --selftest` → **12/12 PASS**（新增「reject illegal relation」「reject illegal device」）；`.deepworks/tmp/verify_feedback2.py` → **61/61**（新增「1b. 访客要填的 5 项」检查块）；`probe_api.py` → **45/45**；`probe_delete.py` → **31/31**；`check_rows.py` → 表头 5 列 / 每行都有删除按钮；**新写的端到端探针 `.deepworks/tmp/e2e_fields.py` → 22/22 全过**（真 HTTP：带 relation/device 提交 201 且落库正确、非法 relation/device → 400 且错误信息点名、两字段留空可提交且落库为 NULL、后台能看到「同学 · 手机」与「关系 / 设备未填」、CSV 两新列、`GET /api/feedback` 仍 405、**最后自己删掉自测数据不留垃圾**）。
- **⚠️ 跑探针前先重启 8000 服务**：限流是**每 IP 10 分钟 5 条**且存在内存里，探针会消耗额度（`probe_api.py` 自己就会造自测行）；**重启即清零**。（第 21 次实测：探针跑完库里留下 `#1/#3/#5/#6` 四条「【自测】自测同学」，用户真实那条是 `#2`「可以可以」。）

- **Supabase / GitHub 现状（第 21 次，用户已自行注册，截图确认）**：Supabase 组织 `Qilumanman's Org`（FREE），项目 `Qilumanman's Project`，**URL `https://knvgdbyzckdoiukafsrh.supabase.co`**，Health / NANO / Singapore `ap-southeast-1`；**No migrations / No backups / GitHub: No repository connected → 库里还没有任何表**，需要用户把 `db/supabase_feedback.sql` 粘到 **SQL Editor** 执行（建表 + RLS + 自检查询）。GitHub 账号 **`Qilumanman`**，Projects 看板 `@Qilumanman的无题项目`（空），**仓库未建**；本机 **`gh` CLI 未安装**（`winget` 可用）。**`anon public` key 是公开密钥，写进 `js/feedback-config.js` 是设计如此（RLS 只允许 INSERT、禁止 SELECT，所以公开无风险）；但 `service_role` key 绝不能进仓库。**
- **待办（第 22 次定稿后，只剩「上线」这一步）**：① **等用户粘贴 Supabase `anon public` key**（用户已选「我现在粘贴给你」但还没贴）→ 把 `js/feedback-config.js` 的 `mode` 从 `"local"` 切成 `"supabase"` 并填 `supabaseUrl` / `supabaseAnonKey`，线上实测一条；② **等用户在 Supabase SQL Editor 执行 `db/supabase_feedback.sql`**（当前库里还没有表；执行成功判据＝自检行 `table_ok=1 / five_fields_ok=5 / index_count=3 / policy_count=1 / rls_enabled=true`；⚠️ 脚本里**不能出现 `CREATE FUNCTION` / `CREATE TRIGGER`**（编辑器会切错位置、必报 42601 `syntax error at or near "returns"`，换写法也无效），已整段注释掉）；③ **GitHub Pages 发布**：仓库名已定 **`Qilumanman.github.io`**（上线地址 `https://qilumanman.github.io/`），需 `git init` + `.gitignore` 排除 `版本存档/`、`作业提交区/`、`.deepworks/`、`db/*.db`、`db/admin_token.txt`、`__pycache__/`；本机 `gh` 未安装，需用户授权 `winget install GitHub.cli` 或给 PAT；④ **待用户确认删除**：项目根那个**空的乱码目录**（0 子项，09-17 18:34 创建）与 `作业提交区/` 根目录的重复截图（`v18_desktop.png` 及第二版两份，规范位置只在 `01-截图/`）。
## 项目目录结构

```
deepworks个人主页/
├── .opencode/skills/
│   ├── skill-creator/
│   └── project-memory/        # ← 本记忆技能（跨对话恢复用）
├── 01-文案写作/                # 素材分类：文字内容
├── 02-图片素材/                # 素材分类：图片
├── 03-图标与Logo/              # 素材分类：图标/logo
├── 04-文档原件/                # 素材分类：原始文档（Word/PDF/PPT/Excel）
├── 05-Markdown内容/            # 素材分类：转为 Markdown 的内容
├── 06-参考与灵感/              # 素材分类：参考与灵感
├── 07-数据/                    # 素材分类：结构化数据
├── 08-音频视频/                # 素材分类：音视频
├── 作业提交区/                  # 作业上传素材区
│   ├── 01-截图/                # 存放作业展示截图
│   └── 02-对话记录/            # 存放与助手的对话（Markdown）
│       └── 对话记录.md
├── 版本存档/                    # V1 / V2（三稿）/ V3 备份与完整截图；V3-意见反馈/ = 备份 + 服务端源码 + 完整截图（4 张）
├── index.html                 # 首页（项目主体；黄白杂志风，无外链框架；第三版含「05 意见反馈」区）
├── pages/                     # 二级页面（关于 / 博客 / 作品；第 19 次已统一为黄白杂志风皮肤）
├── css/main.css               # 手写样式（黄白杂志风：令牌 / 稿纸网格底纹 / 衬线标题族 / 围棋盘容器 / 黑卡通形象动效 / 光晕卡片 / 打字机光标 / 第三版反馈区 .fb-* 与隐私卡 .fb-side；灯箱与 .media-* 样式已于第 19 次删除）
├── js/main.js                 # 数字分身问答 + 打字机输出 + 形象互动（挥手/铁山靠）+ 卡片光晕 + 悬浮头像 + 棋盘切磋提示 + 复制邮箱（灯箱逻辑已于第 19 次删除）
├── js/go-board.js             # Canvas 围棋交互组件（19 路 / 落子动画 / 涟漪；双主题 C_LIGHT 黄白纸面 · C_DARK 深色科技）
├── js/feedback.js             # 第三版：意见反馈前端（只提交、不读取；无 innerHTML）—— 第 20 次重写为纯提交版
├── js/feedback-config.js      # 第三版：反馈双模式配置（local 走 server.py / supabase 走 PostgREST）
├── server.py                  # 第三版：本地反馈后端（http.server + sqlite3，零依赖）：POST 提交 / GET 405 / admin 后台 / export CSV
├── db/                        # 第三版：数据库脚本与数据（schema.sql、supabase_feedback.sql、init_db.py、feedback.db、admin_token.txt⚠️勿入库）
├── assets/vendor/             # 第三方资源：tailwind-play.js、icons/（8 个 Lucide 图标）—— 已不被首页引用，保留备用
├── assets/images/             # 页面图片素材（第 18 次后只剩 sample-avatar.svg；两张双校配图已移出到 .deepworks/tmp/removed_images18/）
├── .deepworks/tmp/            # 中间产物与脚本（截图 / 探针 / 备份中转；含含隐私的临时 profile，勿提交）
├── outputs/                   # 交付物：单文件版 HTML + 源码目录 + 预览图
└── README.md                 # 目录与用途说明
```

## 角色约定

- **我**：用户（作业作者，技能作者为 ASUS）
- **DeepWorks**：助手 / 网站设计师，负责生成与截图、备份、记录对话

## 当前对话记录存放位置

`作业提交区/02-对话记录/对话记录.md` —— 每次讨论后追加整理（Markdown），供作业上传使用。

## 完整截图约定

- 使用本机 Microsoft Edge（`C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`）无头模式做**整页截图**：
  `msedge.exe --headless --disable-gpu --no-sandbox --hide-scrollbars --user-data-dir="<临时profile>" --screenshot="<输出.png>" --window-size=W,H --virtual-time-budget=9000 "file:///本地页面"`
- **中文路径必须做百分号编码**，例如 `deepworks个人主页` → `deepworks%E4%B8%AA%E4%BA%BA%E4%B8%BB%E9%A1%B5`。
- **⚠️ 重要坑：Windows 上无头模式有最小窗口宽度限制（实测约 489–504 CSS px）。** 若请求宽度低于该值（例如 390px），输出的 PNG 虽然是 390px 宽，但页面实际按约 489–504px 排版，**截图右侧内容会被裁掉**。手机端请直接用 **504 宽**（此时 `scrollWidth == 视口宽`，无裁剪、无溢出）。
- **⚠️ 重要坑（第 13 次讨论发现）：窗口高度必须 ≥ 文档真实高度，否则页面底部会被裁掉。** 页面内容高度与视窗高无关：桌面端（1440 宽）**2665px → 第 16 次整页改版后 4419px → 第 17 次换黄白后 4420px → 第 18 次撤下两张配图后 4403px → 第 20 次（V3 新增反馈区）5354px → 第 21 次（加「关系 / 设备」两个下拉）5548px（第 22 次实拍确认）**、手机端（504 宽）**3720px → 3894px（第 15 次加图）→ 5505px（第 16 次整页改版）→ 5053px（第 18 次撤图）→ 6221px（第 20 次 V3）→ 6452px（第 21 次加两字段，第 22 次实拍确认）**。⚠️ **不能用「把画布加高再找内容底」判断页高**：页面有 `min-height:100vh` 拉伸（1440×6400 时页脚被推到 y≈6350、5760 以下全空），只能以探针实测 + 底部裁条目视确认。
  - **第 20 次实测（HTTP 直连探针，`http://127.0.0.1:8000/__probe_v3.html`）**：桌面 1440 → `scrollH=5354 / scrollW=1410`，反馈区 `#feedback` 位于 y=4278、高 951px；手机 504 → `scrollH=6221 / scrollW=504`，反馈区 y=4878、高 1218px。两端均 `overCount=0`（无横向溢出）、`sheets=1`、`errs=[]`、`goBoard=340`、`footerHasThird=true`；桌面反馈区**双列并排**（表单 420px + 隐私卡 706px，`sameRow=true`），手机端自动堆叠（各 468px，`sameRow=false`）—— 即 V3 的整页截图应取 **1440×5354 / 504×6221**（此前误用 1440×7800 拍出的图底部有大片空白）。
。此前用 2600 高截图，导致页脚版权行「© 2026 蓝喜阳 · 个人主页（第二版）」**整行丢失**（该行实际位于 y 2600–2619）。正确做法：窗口高取 `scrollHeight`（当前：桌面 **1440 × 4403**、手机 **504 × 5053**）
——此时 PNG 画布高恰好等于文档高，内容完整且不浪费空白。**⚠️ 文档高度会随内容与版式变化（第 15 次加图手机端 +174px；第 16 次整页改版桌面 2665 → 4419、手机 3894 → 5505；第 17 次只换配色，高度不变：桌面 4420 / 手机 5505；第 18 次撤图桌面 −17px、手机 −452px），每次截图前都要重新量一遍 `scrollHeight`，不要沿用旧数字。**
- **画布 / 视口的换算关系（实测）**：`--window-size=W,H` 产出的 PNG 画布**恰好 W×H**；但 `window.innerWidth/innerHeight` 会小一圈（桌面 1440 → `innerW=1410`、`innerH=H-95`），且 **PNG 的 y 与文档 CSS y 是 1:1**（用色块页面验证过 y=0/1000/2000），`position: fixed` 元素会画在**画布底部**而不是布局视口底部（所以悬浮头像在 PNG 里离底 22px，而不是离 `innerHeight` 22px）。
- 截图前先确认整页高度，避免空白或裁切：把 `scrollHeight`/`scrollWidth`/视口宽写进 `document.title`，再用 `--dump-dom` 读取（`.deepworks/tmp/bottom_probe.js` 还会报页脚与最后一行文字的 `LAST-TEXT-BOTTOM`，用来判断有没有被裁）。注意 PowerShell 直接管道匹配中文会乱码，需先 `Out-File -Encoding UTF8` 再 `Select-String -Encoding UTF8`。
- 当前约定尺寸：桌面端 **1440 × 4403**、手机端 **504 × 5053**（第 18 次撤下两张配图后确定；比第 17 次的 4420 / 5505 分别少 17px 与 452px）。
- 截图存入对应版本的 `版本存档/<版本>/完整截图/` 或 `作业提交区/01-截图/`。**每次都要同时覆盖这两处**（两处应为同一文件、MD5 相同）。

## 本地反馈后端（第三版）启动与使用

- **启动**（项目根，零第三方依赖）：`python server.py --port 8000`；日志建议重定向到 `.deepworks/tmp/server.log` / `.err`。
- **访客预览**：`http://127.0.0.1:8000/` → 页面底部「05 / 意见反馈」（表单 + 隐私说明卡）。
- **作者后台**：`http://127.0.0.1:8000/admin?token=_sG-4x4NmiM2KPbl`（令牌明文在 `db/admin_token.txt`；**该文件与 `db/feedback.db` 都必须 gitignore**）。
- **CSV 导出**：`http://127.0.0.1:8000/export?token=_sG-4x4NmiM2KPbl`（无令牌 → 403）。
- **重启（改完 `server.py` 必须重启，否则跑的还是旧代码）**：`Get-NetTCPConnection -LocalPort 8000 -State Listen` 查 PID → `Stop-Process -Id <PID>` → 重新 `Start-Process`；确认方式：`GET /api/feedback` 应回 405，且后台应含「导出 CSV」。
- **自测脚本**：`.deepworks/tmp/probe_api.py`（接口 45 项）与 `.deepworks/tmp/verify_feedback2.py`（前端结构 41 项），改完反馈相关代码后复跑这两个。
- **版面探针（第 20 次新增，可复用）**：`.deepworks/tmp/run_probe_http_v3.ps1` —— 把**当前** `index.html` 复制成根目录的 `__probe_v3.html`（注入 `.deepworks/tmp/probe_v3.js`）后**用 HTTP 打开**（`http://127.0.0.1:8000/__probe_v3.html`），用 `--headless=old --dump-dom` 把 `RESULT::{...}` 从 `<title>` 读回。**要点：一定要走 HTTP，不要用 `file://` + `<base href>` 的拷贝页** —— 第 20 次实测那种方式 CSS 会加载失败（探针读到 `body` 默认 8px 边距、页高 19967px 的假数据）。
  - 用法：`powershell -NoProfile -ExecutionPolicy Bypass -File ".deepworks\tmp\run_probe_http_v3.ps1" -Tag http1440 -W 1440 -H 600`（脚本内 `$ErrorActionPreference` 必须是 `Continue`，否则 msedge 打到 stderr 的 `libpng warning` 会被当成终止性错误、导致 `--dump-dom` 输出为空）。
  - 探针返回项：`scrollH/scrollW/innerW/sheets/bodyBg/eyebrowColor/fbTop/fbH/fbWall/fbList/fbSide/fbForm/submitBtn/statusEl/fields/honeypot/radios/emails/formW/sideW/sameRow/sideRightOfForm/sideSaysPrivate/sideSaysCantDelete/overCount/maxRight/goBoard/footerHasThird/errs`。
  - **用完记得删掉根目录的 `__probe_v3.html`**（它是临时探针页，不该留在交付目录）。
  - ⚠️ 探针页里的 ID 必须与页面**逐字一致**：本项目实际是 `#feedbackForm` / `#feedbackSubmit` / `#feedbackStatus`（第 20 次曾误写成 `#fbSubmit` 得到假的「按钮缺失」结论）。

### 后台「删除反馈」功能（第 20 次新增，用户点名要的）

- 后台每行操作区在状态按钮之后多一个红色「删除」按钮（`.ops button.danger`），点击先 `confirm()` 二次确认（提示语提醒先导出 CSV 备份），再 `POST /api/admin`，body 为 `{"action":"delete","id":N}`。
- 后端语义：`action` 缺省仍是 `status`（旧写法完全兼容）；`action=delete` + 令牌正确 → 200 `{"ok":true,"deleted":1}`；id 不存在 → 404；`action` 未知 → 400；id 非数字 → 400；无/错令牌 → 403（在解析 body 前就拦掉）。
- 访客侧**没有任何删除入口**（页面无 `data-del`，公开侧只有 `POST /api/feedback` 新增）。
- 自测脚本 `.deepworks/tmp/probe_delete.py`（**31 项**，报告 `.deepworks/tmp/probe_delete.txt`）：先记录基线 id → 自己造一条自测数据 → 验证 403/403/404/400 全部被拒且没误删 → 回归（旧写法标记已读仍可用）→ 正常删除 → 验证 CSV 里也不再有它 → **最终 id 列表 == 基线**。配套 `.deepworks/tmp/check_rows.py` 用来看后台数据与每行按钮数量（只读）。

### ⚠️ 第 20 次新增的两个工具链坑（都坑过一次）

- **`powershell -NoProfile -ExecutionPolicy Bypass -File "xxx.ps1"` 在本环境里输出会被丢掉（回显为空）**，脚本其实执行了 —— 曾因此误判「服务器没起来 / 命令没跑」。**规则：需要看结果就不要嵌套 powershell，直接在 bash 工具里内联 PowerShell 执行**（内联代码保持纯 ASCII，中文路径用 `[char]0x….` 拼）。
  - **⚠️ 连「脚本的路径」也不能内联写中文**：第 20 次用 `-File "C:\Users\ASUS\Desktop\deepworks个人主页\.deepworks\tmp\xxx.ps1"` 这种写法调了两次脚本，结果在**项目根里生成了一个空的乱码目录 `deepworks` + `U+6D93 U+E043 U+6C49 U+6D93 U+5A5A U+3009`（0 子项，创建于 09-17 18:34）** —— 正是 GBK 误解码的产物（脚本仍然跑成功了，所以完全没察觉）。**正确姿势：内联 PowerShell → 用 `[char]0x….` 拼出 `$root` → `Join-Path` 求脚本路径 → `& $script` 执行。**
  - 判别沿用同一标准：目录名含私用区字符（`U+E0xx`）、**内容为空或无任何项目文件**，即为这类误写残留。
- **用 `Start-Process` 起的服务器会被工具调用结束时一起带走**（父 shell 一退出，子进程就没了，8000 端口空着、日志无新行）。**正确做法：用 WMI 分离启动**（父进程是 WMI，节点结束也不死）：

```powershell
$line = 'cmd.exe /c python "' + $srv + '" --port 8000 >> "' + $log + '" 2>> "' + $err + '"'
([wmiclass]"Win32_Process").Create($line, $root)   # ReturnValue=0 即成功
```

  （项目根目录**不含空格**，所以路径可以不引号；中文根目录照样用 `[char]0x….` 拼出来。）

### 独立预览服务 8010（看临时预览页用，第 20 次新增）

- `python -m http.server 8010 --bind 127.0.0.1 --directory <项目根>`：它**没有** `server.py` 那套拒绝规则，所以 `.deepworks/tmp/` 下的文件也能通过 `http://127.0.0.1:8010/.deepworks/tmp/preview/xxx.html` 直接打开。
- 临时预览页一律放 `.deepworks/tmp/preview/`（既不进产物面板，也不污染项目根）。脚本：`.deepworks/tmp/start_preview_server.ps1`。
- 第 20 次的实际产物：`.deepworks/tmp/preview/feedback-options.html` —— 反馈区「现状 / A 星星 / B 类型按钮组 / C 字数统计+成功态 / D 隐私卡图标 / E 全都要」六块可点击对比页，供用户挑改进方向。它只引用 `../../../css/main.css`，不含任何正式站逻辑。

## 单文件版构建

- `outputs/棋路漫漫-个人主页-单文件版.html` 的生成方式：把 `index.html` 中的
  `<link rel="stylesheet" href="css/main.css" />`、`<script src="assets/vendor/tailwind-play.js"></script>`、`<script src="js/go-board.js"></script>`、`<script src="js/main.js"></script>`
  分别替换成内联 `<style>` / `<script>` 后另存；用 `[System.IO.File]::WriteAllText(路径, 内容, (New-Object System.Text.UTF8Encoding($false)))` 写出 **UTF-8 无 BOM**。
- 更通用的写法（推荐）：用正则把页面里所有 `href="css/…"` / `src="assets/…"` / `src="js/…"` 的引用逐个内联，脚本见 `.deepworks/tmp/build_outputs.ps1`（纯 ASCII + `-Root` 参数）；本机执行需 `powershell -NoProfile -ExecutionPolicy Bypass -File "<脚本>" -Root "<根目录>"`（直接 `& 脚本.ps1` 会被执行策略拦下）。
- **⚠️ 坑：`build_outputs.ps1` 必须保持纯 ASCII（含注释）**。PowerShell 5.1 读取无 BOM 的 `.ps1` 时按 ANSI 解析，中文注释的字节序列会被误判，导致 `UnexpectedToken` 之类的解析错误（甚至把换行"吃掉"）。中文目录名一律用 `[char]0x….` 拼接。
- **⚠️⚠️ 真实事故（第 15 次讨论）：上面这条不只是"会报解析错误"，还可能静默写错位置。** 备份脚本里一行以中文注释结尾的赋值（`$bakName = ...  # 备份`）被乱码吞掉了换行，导致 `$bakName` 为空、`$bak` 解析成**版本目录本身**，17 个文件被写到了 `版本存档/V2-深色科技风/` 根目录而不是 `备份/`，脚本还照常打印计数、看起来"成功"。**教训：① 所有 `.ps1` 注释一律纯 ASCII；② 涉及复制的脚本必须加"目标路径末端名校验"这类守卫（本项目用 `if ((Split-Path -Leaf $bak) -ne $bakName) { throw }`）；③ 看到计数和上次不一样（34 vs 17）时立刻停下来查。** 补救：逐一 MD5 比对确认误写文件与项目根一致后**移动**（不是删除）到 `.deepworks/tmp/v2_stray_cleanup/`，改动前的旧备份另存 `.deepworks/tmp/v2_backup_prev/`。
- **⚠️ 坑：`Copy-Item <目录> -Destination <已存在的目录> -Recurse` 会生成嵌套副本**（如 `源码/assets/assets/…`）。同步 `assets/` 时应**逐个文件**复制到显式目标路径。
- 验证方式：对「单文件版」与「源页面」各截一张**同尺寸**整页图比对渲染。**⚠️ 页面已含持续运行的脉冲动画，MD5 会因两次截图的动画相位不同而不稳定（实测相差 127 字节），不要再依赖 MD5 相等**。改用**逐像素差异包围盒**：用 `LockBits` 把两张图读成字节数组，统计差异像素数并算出 bbox —— 若 bbox 恰好是右下角悬浮头像的脉冲光环区域，其余百万级像素差异为 0，即视为渲染一致。当前约定：合格 bbox 落在**画布右下角的悬浮头像脉冲区**（第 18 次讨论后画布为 1440 × 4403，按相对底边偏移推算约 `(1303,4266)-(1439,4402)`，相位不同时几千到一万余像素都算正常；**每次改尺寸后都要重新量一次**）。当前单文件版 **94,843 字节**（本地引用 0 / CDN 引用 0）。
- **同一方法也用来验证「版本存档/备份/」的副本是否自包含**：直接对 `版本存档/<版本>/备份/index.html` 截图，与项目根 `index.html` 的同尺寸截图比对——bbox 落在悬浮头像脉冲区（同样约 9.8 千像素）说明备份的 `css/` `js/` `assets/` 引用完整、可独立打开。
- **⚠️ 不要用「裁剪后的图」做比对**（把 1440×2900 的图裁到 2600 再和 2600 的图比），实测会报出百万级差异（背景渐变随画布高度变化）。只做**同尺寸**截图比对。
- 差异工具已写好可复用（C# 片段经 `Add-Type` 注入的 `[ImgDiff]::BBox(p1,p2)`，`LockBits` + `Marshal.Copy` 比逐点 `GetPixel` 快几个数量级；注意 `GetPixel` 对 1440×2665 的图会非常慢，只适合抽样几行）。

## 无头浏览器验证踩坑（重要）

- **`--screenshot` 命令不要加 `2>$null`**：PowerShell 会因此不等子进程结束，导致截图"看起来没生成"（实际是假失败）。去掉即可正常拿到文件。
- **别用 `--dump-dom` / `--screenshot` 验证动画**：无头模式下 `requestAnimationFrame` 几乎不被调度（实测计数恒为 2），动画永远停在第一帧。**正确做法**：给组件暴露一个**同步重绘接口**（本项目为 `window.GoBoard.redraw(t)`，`t` 为时间戳），在页面里用 `setTimeout` + `dispatchEvent(new PointerEvent(...))` 手动推进时间轴，再把结果写进 `document.title` 用 `--dump-dom` 读回。
- **⚠️ 坑：CSS 过渡值在无头下同样被冻结**（没有帧时钟，`transition` 不会推进，`getComputedStyle` 读到的是**起点值**）。测「点亮后是否真的显示」这类效果时，先注入 `.xxx::before,.xxx::after{transition:none !important;}` 再读目标 `opacity`；动效是否存在则另用 `transitionDuration` / `animationName` / `animationDuration` 断言。本项目 8 张卡片用 `:hover` + `.is-lit` **双通道**点亮（`pointerenter` 加类、`pointerleave` 移类并清变量），触摸设备也能有反馈。
- **像素级证明「效果真的画出来了」**：分别拍「点亮 / 不点亮」两张同版式图逐点比对，检查光晕中心颜色抬升且**距离越远衰减越大**、卡片远角与未点亮卡片差异为 0（证明是局部径向渐变而非整体滤镜）。实测光晕中心 `(27,34,52)` → `(30,58,80)`（G +24、B +28、R 仅 +3，明确的青蓝色），未点亮处差异 `(0,0,0)`。
- **⚠️ 坑：PowerShell 变量名不区分大小写**，`$a` 会覆盖 `$A`（`$imgA` / `$colA` 这类前缀区分才安全）。写成 `$a = $A.GetPixel(...)` 会静默污染后续迭代，产出全表相同的假数据。
- **把悬停效果做成可看的静态图**：无头无法真实 `:hover`，可写一个 demo 脚本，在 `load` 后隐藏 `header.site-header` / `section.hero` / `footer.site-footer`、给目标卡片设 `--mx`/`--my` 并加 `is-lit`（同时注入 `transition:none`），再截图，即为 `outputs/预览/第二版-微特效-光晕卡片.png` 这类预览图。
- **可复用的探针脚本**：`.deepworks/tmp/effects_probe.js`（纯 ASCII）。做法：结果写进 `document.title`（前缀 `RESULT::`），跑 `--dump-dom` 后 `Out-File -Encoding UTF8` 再 `Select-String -Pattern 'RESULT::'` 读回。要验证**真实页面**时，把 `index.html` 复制成 `.deepworks/tmp/effects_test.html` 并在 `<head>` 后插入 `<base href="<项目根的 file URL>/">`，这样相对引用的 `css/` `js/` `assets/` 仍能正常加载。**`setInterval` / `setTimeout` 在 `--virtual-time-budget` 下会正常推进**（只有 rAF 被节流），所以打字机这类定时器动画可以这样验证；CSS 动画可用 `getComputedStyle(el).animationName/animationDuration` 断言，光晕可用 `el.style.getPropertyValue('--mx')` 断言。
- `--force-device-scale-factor=2` 与无头截图同时使用时不产出文件。
- 用 `powershell -File` 执行含中文路径的 `.ps1` 会按 ANSI 解析而乱码报 `DirectoryNotFoundException`：**脚本写成纯 ASCII 并用 `param([string]$Root)` 传路径**；生成 file URL 用 `(New-Object System.Uri($path)).AbsoluteUri`。
- 同一浏览器 profile 不能并发截图，需用不同的 `--user-data-dir`。
- PowerShell 直接管道匹配中文会乱码：先 `Out-File -Encoding UTF8`，再 `Select-String -Encoding UTF8`。

- **⭐ 把 CSS 动画冻结到指定帧（第 14 次讨论新增手法）**：无头没有帧时钟，`transition` 读到的永远是起点值；但 **`animation` 可以用「负延时 + `paused`」静态解析到任意时刻的关键帧**：注入 `.xxx{animation-delay:-0.352s !important;animation-play-state:paused !important;}` 后，`getComputedStyle(el).transform` 就会给出该时刻的矩阵（本项目用 6% / 16% / 48% 三帧验证铁山靠的前顶幅度、左臂 -56°、冲击环 scale 0.77）。
- **⚠️ 坑：`getBoundingClientRect()` 包含 transform**。`.go-board-cheer` 空闲态带 `translateX(-12px)`，量到的 left 会比布局盒左偏 12px（实测 879 vs 布局 891），做几何换算时要减掉，否则会误判文字位置。
- **⚠️ 坑：无头窗口最小宽度约 500px（实测 489–504）**，所以 `@media (max-width: 430px)` 之类的窄屏规则**无法直接用 `--window-size` 触发**。绕过办法：把页面的 `.container { max-width: 390px }` 与「不带媒体查询的同一条规则」一起注入，模拟窄屏再量 `overflow`（本项目用此法确认 ≤430px 时「欢迎切磋」不会溢出）。
- **判定「包一层 `<g>` 会不会改变静态外观」**：整页逐像素比对，若差异只有**最大色差 ≤3/255、平均 ~1.1** 的一片，即抗锯齿级差异（肉眼不可见、无布局位移），视为通过；**不要**当成 bug 去改结构。
- **可复用脚本清单（都在 `.deepworks/tmp/`，纯 ASCII）**：`shot.ps1`（截一张整页图，`-Url -Out -W -H -Tag -Budget`，带落盘重试 + 字节校验）、`crop.ps1`（`-Src -Dst -X -Y -W -H` 裁预览图并用采样点回读校验）、`imgdiff.ps1`（整页差异像素数 + bbox）、`imgdiff2.ps1`（同上，但支持 `-X0 -Y0 -X1 -Y1` 限定区域，并额外报 `maxDelta` / `meanDelta`，用来区分「几何位移」和「抗锯齿噪声」）、`make_interact_test.ps1` + `run_interact_probe.ps1`（`-Root -Tag -W -H -Page`，结果经 `<title>RESULT::…` 读回）+ `interact_probe.js`（铁山靠 / 欢迎切磋全套断言）、`make_preview.ps1` + `preview_probe.js`（生成 `preview_dance.html` / `preview_cheer.html` 两张可截图的特效预览页）、`make_narrow_test.ps1` + `narrow_probe.js`（窄屏溢出模拟）。
- **单文件版也要跑交互探针**：把 `outputs/棋路漫漫-个人主页-单文件版.html` 读成字符串，在 `</body>` 前插入 `<script>` 包住 `interact_probe.js`，用 `[System.IO.File]::WriteAllText(…, UTF8Encoding($false))` 写成 `.deepworks/tmp/sf_interact_test.html`，再用 `run_interact_probe.ps1 -Page sf_interact_test.html` —— 本次实测结果与源码版**逐项相同**。

- **⚠️ 坑（第 17 次讨论）：批量替换颜色时，缩写色值会误匹配 SVG 里的 `url(#…)` 片段。** 内联 SVG 里 `<linearGradient id="fabGlass">` 的引用写成 `url(#fabGlass)`，正则匹配颜色时 `#fab`（及 `#fabc`）会被当成 3/4 位颜色替换掉，整块渐变引用就废了。**规则：颜色替换表里只认 6 位十六进制与 `rgba(...)`，禁止出现 3 位 / 4 位缩写；替换后跑一遍「冷色残留扫描」与结构探针双重确认。**
- **⚠️ 坑（第 17 次讨论）：PowerShell 命令行里的中文参数会被解析破坏，而且失败是静默的。** 直接用带中文的字符串拼路径发包（例如循环调用 `crop.ps1` 批量裁图）会出现「**一条输出都没有、也没报错**」的情况。正确姿势：把中文路径全部写在**脚本内部**用 `[char]0x….` 拼接，用 `-File "<脚本>" -Root "<根目录>"` 调用；要批量做的事一律落到一个脚本里，不要靠命令行拼中文。
- **「换配色」远比想象中费事的两点**（第 17 次讨论）：① 只把颜色值换掉，页面会变成「棕色系」而不是「黄白色」——**黄色必须出现在「面」上（按钮 / 气泡 / 高亮块的填充）而不只是「线」上（描边 / 文字色）**，配套还要把金色主色提亮一档；② 黄色底必须配**墨色文字**，原先写死的 `color:#fff` 在黄底上对比度完全不够，要全库搜出来改掉。
- **⚠️⚠️ 坑（第 18 次讨论）：`.deepworks/tmp/t16*.html` 是 `index.html` 的「快照」，不是实时页面。** 探针页之所以能跑，是因为在 `<head>` 后插入了 `<base href="<项目根的 file URL>/">`，让相对引用的 `css/` `js/` 仍加载**现役文件**——但**HTML 本身是拷贝**。所以改完 `index.html` 若不重新生成探针页，测到的还是旧结构（本轮实测踩到：`index.html` 已删图，旧探针页仍报 `scrollH 4420`、`thumbs 2`，差点误判「改动没生效」）。**正确顺序：改 HTML → 跑 `make_test.ps1 -Root <根> -Probe <探针.js> -Page <out.html>` 重新生成 → 再 `run_probe.ps1` 测量。** 只改 CSS / JS 时无需重新生成。
- **⚠️ 坑（第 18 次讨论）：视觉理解模型读「文本与数字」不可靠，且会间歇性返回「当前无法读取图片内容」。** 本轮它把邮箱 `2762858226@qq.com` 连读两次成 `276258226@qq.com`（少一位），还误报过 about 区信息卡数量与 hero 标签内容。**规则：颜色 / 布局 / 几何 / 文案一律以 `getComputedStyle`、`getBoundingClientRect`、像素取色、HTML 正则与 MD5 为准；视觉模型只用于「照片是否真的消失」这类整体性确认。** 本次已 grep 确认邮箱为 `2762858226@qq.com`，全站共 3 处（联系区文案 / 复制按钮 / `mailto:`）。

- **✅ 正确配方（第 22 次实测定稿，优先用这条）**：`Start-Process -FilePath $edge -ArgumentList @('--headless=new','--no-sandbox','--no-first-run','--disable-gpu','--hide-scrollbars','--force-device-scale-factor=1','--run-all-compositor-stages-before-draw','--disable-new-content-rendering-timeout',"--user-data-dir=<纯 ASCII 临时目录>","--window-size=$w,$h",'--virtual-time-budget=9000',"--screenshot=$png",$url) -PassThru -Wait -RedirectStandardError <err> -RedirectStandardOutput <out>`，进程退出后 `Start-Sleep -Milliseconds 1500` 再校验；`--window-size` / `--screenshot=` **不带引号**。**必查前置条件：`GET /` 必须返回 200**（服务不在时截到的是 Edge 错误页，看起来像「渲染坏了」）。
- **⚠️⚠️ 坑（第 20 次讨论，**新增**）：Edge 无头截图在这台机器上必须用 `--headless=old`。**（**⛔ 第 22 次修正：这条结论是错的** —— 当时真因是 8000 服务已死、截到的是 Edge 错误页；`--headless=new` 配 `Start-Process -Wait` 完全可用，而 `--headless=old` 反而会挂住 >120 秒；`& msedge.exe … --screenshot=` 内联调用不产出文件这一条仍然成立。） `--headless=new --screenshot=…` **不产出文件**（静默失败）。另外调 `msedge.exe` 时**不要**用加引号的 `--screenshot="$png"` + `2>$null | Out-Null` 组合（实测同样拿不到文件）；正确写法是 **不带引号** 的 `--screenshot=$png` + 重定向 `*> $log`（不要 `2>$null`），并在进程退出后 `Start-Sleep 4` 秒 —— 截图文件是**异步落盘**的，等太短会以为失败。可复用脚本：`.deepworks/tmp/shot_v3.ps1`（整页 + 后台两连拍）。
- **⚠️⚠️ 坑（第 20 次讨论，**新增**）：把含中文的路径**内联写在 bash→PowerShell 命令行里**，会被按 GBK 误解码，静默指向一个**乱码的兄弟目录**（实测在桌面生成了 `Desktop\deepworks??????\` 这样的垃圾目录，脚本还照常报「已保存」）。表现极具误导性：`Get-ChildItem <中文路径>` 能列出文件，但列的是那个乱码目录里的内容，而真实项目目录里看不到。**规则：涉及中文路径的操作一律写进纯 ASCII 的 `.ps1`（中文用 `[char]0x….` 拼），或用 `-File` 调用；做截图 / 裁剪 / 复制这类产出文件的操作时，把输出目录设为纯 ASCII 临时目录（如 `C:\Users\ASUS\AppData\Local\Temp\opencode\`）再去读图。**（第 17 次讨论记的「命令行中文参数被破坏」这次得到了更严重的复现：不只是乱码报错，而是**悄悄写错位置**。）
  - **⚠️ 更阴的一点（第 20 次实测）：桌面同时存在两个「看起来都像项目」的目录，控制台里显示的名字可能是反的。** 实测：真项目 `Desktop\deepworks个人主页`（名字码点 `U+4E2A U+4EBA U+4E3B U+9875`，含 `server.py`/`index.html`/`db/feedback.db`）在控制台里**打印成乱码**；而垃圾目录（真名含私用区字符 `U+6D93 U+E043 U+6C49 U+6D93 U+5A5A U+3009`，**顶层 0 文件、内容全是历次误写**）却**打印成漂亮的「deepworks个人主页」**。**判别方法：不要看打印出来的名字，要把目录名的码点打出来对比**（`.deepworks/tmp/whichdir_v3.ps1` 就是干这个的：打印 `Name` 的 `U+XXXX` 序列 + 探测 `server.py`/`index.html`/`SKILL.md`/`db\feedback.db` 是否存在）。**判定标准：含 `server.py` 与 `db\feedback.db` 的那个才是真项目。**
  - **✅ 已于第 20 次清理：那个乱码垃圾目录已删除**（含 239 目录 / 495 文件 / 22.7 MB，内容是历次被误写的 `eprof_s1`、`eprof_s2`、`shots_v3` 截图副本与 edge 日志，**无任何项目文件**）。删除后复核：`server.py`、`db/feedback.db`、`index.html` 全在，桌面只剩真项目。
  - **✅ 同批清理真项目 `.deepworks\tmp` 的 Edge 临时 profile**（脚本 `.deepworks/tmp/cleanup_profiles_v3.ps1`，按目录名 `^(edge|eprof|cdpprof)` 匹配 + 守卫「必须含 `server.py` 才是真项目」）：删掉 **126 个目录、释放 1303.9 MB**，`tmp` 从 **1382.3 MB → 78.5 MB**。**保留**：所有 `.ps1`/`.py` 脚本、报告 `.txt`、探针 `.js`、`shots_v3` 截图、以及 `prev_dark_v2`/`removed_images18`/`removed_previews18`/`v2_backup_prev`/`v2_stray_cleanup`/`stray_assets_dupe` 这些「已移除素材」的备份目录（约 78 MB，别乱删）。复核：`index.html`/`css\main.css`/`js\feedback.js`/`db\feedback.db` 全在。
  - **⚠️ 删除外部目录的安全配方（务必照抄）**：用 `[System.IO.Directory]::Delete($path, $true)`（精确路径，不走通配符语义），且删除前必须过**严格守卫**：①`(Get-Item -LiteralPath $p).FullName` 不等于桌面本身；②`$_.Name -eq $realName` 为 false；③`$_.Name -eq $junkName` 为 true；④反查 `server.py`/`index.html`/`db\feedback.db` 都不存在。脚本见 `.deepworks/tmp/remove_junkdir_v3b.ps1`（先跑 dry run 看清单，再 `-Apply`）。**注意：本轮第一次尝试（`remove_junkdir_v3.ps1`）里 `Get-ChildItem -LiteralPath $junk -Recurse` 竟然列出了整个桌面的内容（4.88 GB）—— 所以守卫里的「名字码点比对」是必需的，光靠 `Test-Path` 会误判。**
  - **⚠️ PowerShell 函数命名坑（第 20 次，踩过）**：自定义辅助函数**不要取名 `CP`**（PowerShell 别名大小写不敏感，`cp` = `Copy-Item`）——实测调用 `CP $path` 被解析成 `Copy-Item`，抛出一堆 `PathNotFound/DirectoryExist` 并把诊断输出全打成乱码，白排查一轮。命名请用 `Show-CodePoints` 这类明确名字。**同理不要用 `%`、`?`、`where`、`sc`、`curl` 之类做函数名。**
- **⚠️ 坑（第 20 次讨论）：`read` 工具读**.deepworks/tmp** 下的中文绝对路径图片可能报 `File not found`（即使文件确实存在且 MD5 正常）。绕过办法：先用纯 ASCII 脚本把图复制到 `C:\Users\ASUS\AppData\Local\Temp\opencode\`，再读那个 ASCII 路径 —— 实测立刻可读，视觉理解也能正常返回。**

## GitHub Pages 发布（第 24 次讨论完成）

- **线上地址**：https://qilumanman.github.io/ ｜ 仓库 `Qilumanman/Qilumanman.github.io`（public，`main` 分支根目录，`https_enforced=true`）。
- **首个提交**：`d20d37a`「第三版：新增「意见反馈」功能并接入 Supabase 线上存储」，**33 个文件 / 6472 行**。身份**只写本仓库**：`git config --local user.name Qilumanman` / `user.email Qilumanman@users.noreply.github.com`（全局仍为空，未动）。
- **⚠️⚠️ 坑（本轮最重要的一条）：DeepWorks 的常规 shell 读不到 Windows 凭据管理器。** 症状极具误导性 —— `gh auth login` 的后台日志明确写着 `✓ Logged in as Qilumanman`、`%APPDATA%\GitHub CLI\hosts.yml` 也落盘（内容为 `github.com: / git_protocol: https / users: Qilumanman: / user: Qilumanman`，**没有 `oauth_token` 行是正常的，令牌在凭据管理器里**）、`cmdkey /list` 能看到 `gh:github.com:Qilumanman`，但常规 shell 里 `gh auth status`、`gh api`、`gh repo create` 一律报「You are not logged into any GitHub hosts」。
  - **判据**：`gh auth status` 说没登录，但 `cmdkey /list | Select-String github` 有 `gh:github.com:<用户>`，且分离进程里同一命令正常返回 → 就是本坑，不要去重新登录。
  - **✅ 解法**：所有需要 gh / git 凭据的操作**一律走 WMI 分离进程**：把命令写成纯 ASCII 的 `.cmd` 落 `.deepworks/tmp/`，用 `([wmiclass]"Win32_Process").Create('cmd.exe /c .deepworks\tmp\xxx.cmd', $root)` 启动，输出重定向到 `.deepworks/tmp\*.log`，`Start-Sleep` 后再回读日志。本轮 `ghlogin.cmd` / `ghprobe.cmd` / `publish.cmd` 三个脚本即为此模式。
  - 登录用 `echo. | "<gh.exe 全路径>" auth login --hostname github.com --git-protocol https --web`（`set BROWSER=echo` 阻止它弹系统浏览器），一次性码 15 分钟内有效，日志里会打印 `! One-time code (XXXX-XXXX) copied to clipboard`。
- **`<用户名>.github.io` 仓库的 Pages 会自动开启**，再显式 `POST /repos/{owner}/{repo}/pages` 会返回 `409 GitHub Pages is already enabled` —— 这是**正常结果不是失败**，用 `GET /repos/{owner}/{repo}/pages` 读 `status: building → built` 即可。
- **⚠️ 坑：`.gitignore` 对「已被跟踪的文件」完全不生效。** 本轮先 `git add -A`（当时 `uploads/` 未入忽略表）→ 再往 `.gitignore` 补 `uploads/` → 重新 `git add -A` **依然是 60 个文件**。`git check-ignore -v uploads/<file>` 返回「未忽略」正是这个原因。**正确姿势：`git rm -r --cached uploads` 显式取消跟踪**（只动索引、磁盘文件照旧保留），之后忽略规则才生效（60 → 33 个文件）。诊断口诀：**目录本身 `check-ignore` 命中、里面的文件却不命中 = 文件已被跟踪。**
- **发布前必查清单（脚本化，命中必须为 0）**：`uploads/`（会话上传素材）、`.deepworks/`、`版本存档/`、`作业提交区/`、`outputs/`、`db/feedback.db`、`db/admin_token.txt`。
- **线上保真核验配方（强烈推荐，替代肉眼看图）**：① `curl.exe -s "https://api.github.com/repos/<o>/<r>/git/trees/main?recursive=1"` → `ConvertFrom-Json` 数文件、按文件名模式扫私有内容；② 用 `curl.exe -s -o <tmp> -w "%{http_code}"` 把线上文件抓回来与本地**逐文件 MD5 比对**（本轮 8 个文件不一致数 0）；③ 私有地址逐个探 `HTTP 404`（`db/admin_token.txt`、`db/feedback.db`、`.deepworks/tmp/publish.log`）；④ 线上 HTML 里 `[regex]::Matches` 扫本地令牌明文出现次数（必须 0）。**注意 `mode: "supabase"` 与 `sb_publishable_` 在 `index.html` 中出现 0 次是正常的 —— 它们在外链的 `js/feedback-config.js` 里，不是内联的。**
- **截图窗口高比内容高时不要慌**：`--window-size=1440,6200` 截线上页会得到 1440×6200（内容只有 5548，多出的是空白底），文件大小会比本地整页图大一点（1,667,529 B vs 1,613,241 B），这不是渲染异常。

## Markdown 转换

- 项目自带转换工具：`C:\Users\ASUS\.deepworks\tools\dw-markitdown.exe`，用法 `dw-markitdown <input> <output>`。
- 可把 Word/PDF/PPT/Excel/网页/图片转成 Markdown，用于 `05-Markdown内容/`。

## 第 25 次讨论：关系选项 online（网友）→ lover（恋人）（已发布上线）

- 需求原话：「在关系那栏删掉网友，加上恋人，然后发布并给我网址即可」→ **同位置替换**，最终选项顺序：同学 / 朋友 / 家人 / 老师 / **恋人** / 其他。
- **必须同步改 4 处代码，漏一处就提交失败**（第 5 处是线上数据库约束）：
  1. `index.html`（反馈表单）`<option value="lover">恋人</option>`，删掉 `value="online">网友`
  2. `server.py`：`RELATIONS` 元组里的 `"online"` → `"lover"`，`RELATION_LABELS` 里 `"online": "网友"` → `"lover": "恋人"`
  3. `db/schema.sql`（本地 SQLite）`CONSTRAINT ck_feedback_relation` 的取值列表
  4. `db/supabase_feedback.sql`（线上建表脚本）同名约束的取值列表 + `comment on column ... relation`
  5. 线上已存在的库：**check 约束不能就地改**，必须 drop + add（见下）
- **约束名是显式的 `ck_feedback_relation`**，不是 Postgres 自动命名的 `feedback_relation_check`（这是本轮能一次改对的关键）。
- 线上迁移脚本已新增：**`db/migration_relation_lover.sql`**（Supabase SQL Editor 直接跑）＝ `update ... set relation='other' where relation='online'` 兜底老数据 → `drop constraint if exists ck_feedback_relation` → `add constraint ... ('classmate','friend','family','teacher','lover','other')` → 更新 comment → `select pg_get_constraintdef` 自检。
  - ⚠️ **用户尚未执行该脚本**：不执行的话，线上页面已经能选「恋人」，但提交会被 PostgREST 以 check 约束拒绝（400）。这是本轮遗留的唯一手动步骤。
- **SQLite 无法 ALTER CHECK 约束** → 本地 `db/feedback.db` 用「重建表」方式迁移：备份 → 读出全部行 → `drop table feedback` → `executescript(db/schema.sql)`（顺带重建 2 个索引 + updated_at 触发器）→ 按原 id 回插 → 修 `sqlite_sequence` → 探针验证。脚本 `.deepworks/tmp/migrate_local_db.py`，备份 `.deepworks/tmp/feedback_backup_before_lover_20260917-223326.db`。迁移后本地仍是 1 行（id=2「可以可以」，relation 为 NULL）。
- 本地端到端实测脚本 `.deepworks/tmp/probe_lover.py`（**先重启 8000 加载新 `server.py` 并清限流**）：`relation=lover` → **201 `{"ok": true, "id": 6}`**；`relation=online` → **400 `{"ok": false, "error": "「与主页主人的关系」取值不合法。"}`**；`/admin` 页面含「恋人」、**不含**「网友」；classmate/friend/family 均 201；探针行已全部 `action=delete` 清掉。
- 限流再次复现：连打第 4、5 条时命中 `RATE_MAX=5 / RATE_WINDOW=600` → **HTTP 429**，**属于正常保护而不是代码错误**；验证脚本要分批或重启服务。
- 交付物已重建：`outputs/源码/`（19 文件，index.html 含 lover 无 online）+ 单文件版 **112,775 B / MD5 `3D40E14F96E35D987210786C2815E566`**，`remaining local refs 0` / `cdn refs 0`。
- **故意不改**：`版本存档/V3-意见反馈/`（V3 交付时的历史快照，里面仍是「网友」）、`作业提交区/01-截图/`（已交付的旧截图）。这是「历史快照不追改」原则的延续。

## 新对话启动流程

当用户在新对话中要求继续该项目时：

1. 加载本 `project-memory` 技能。
2. 读取 `作业提交区/02-对话记录/对话记录.md` 了解最近进度。
3. 读取 `README.md` 确认目录结构。
4. 基于「版本 / 进度状态」向用户确认当前版本与要做的内容，再继续工作。

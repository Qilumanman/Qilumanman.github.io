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
- **当前阶段**：第四阶段（**V4 已定稿并完成收尾归档**：在 V3「意见反馈」基础上做了**内容真实化改写 + 二级页统一 + 背景大图**；已归档、已出交付截图、已重建单文件版、已追加对话记录，**仅差用户决定是否 `git commit` / `push` 上线**）
- **制作流程**：共四个阶段，第一版原型已完成并定稿，第二版已定稿归档，第三版已定稿归档并上线，当前进入第四阶段
- **技术路线**：静态 HTML / CSS / JS + **Tailwind CSS**（本地化引入 `assets/vendor/tailwind-play.js`，关闭 preflight，`darkMode: "class"`）+ **Lucide 线条图标**（内联 SVG）+ **原创围棋子 SVG**（本地预览）+ **原生 Canvas 交互组件**（`js/go-board.js`，无第三方动画库）+ **原生 JS + CSS 微特效**（鼠标跟随光晕卡片、雷达脉冲光环、打字机输出、点击形象跳「铁山靠」、悬停围棋盘浮现「欢迎切磋」，全部零依赖）
- **第三版新增技术栈（意见反馈）**：前端纯静态 `js/feedback.js`（ES5/IIFE，**只提交、不读取**）+ `js/feedback-config.js`（双模式适配层）+ 本地后端 `server.py`（**Python 标准库 `http.server` + `sqlite3`，零第三方依赖**）；线上模式预留 Supabase PostgREST（同一份前端代码，只改配置）
- **发布**：本地预览为主（`python server.py --port 8000`）；**第三版已定方向为 GitHub Pages 公开部署**（仓库公开 → 源码与邮箱一并公开，用户已知悉），等用户提供 GitHub 用户名/仓库名后再执行；静态托管时反馈走 Supabase

## 主体信息（用户本人）

- **名字**：蓝喜阳
- **网名**：棋路漫漫
- **个性签名**：棋路漫漫兮，吾将上下而求索
- **一句话介绍**：一个正在大学认真读书的男大学生（V4 首页实际文案：「大一新生 / 这学期主线是高等数学」）
- **身份**：天津大学 · 香港理工大学 · 深圳未来技术学院 大一新生
- **当前在做**：进行脑机接口专业的学习（专业方向 **脑机接口**，现阶段打基础：微积分、线性代数）
- **兴趣**：脑机接口、前沿生物领域
- **爱好**：围棋（**业余四段**，常看比赛、偶尔下网棋；网名「棋路漫漫」来源）、**跑步**（**三年累计 3000 公里**，最长一次**十公里**）、**街头健身**（**双力臂、单力臂、卷腹上杠**，正在解锁**前水平**）
- **记忆点**：颜值高，做事认真负责（答应下来的事会做完）
- **第四版口述真实素材（唯一写作原料，不得扩写编造）**：这学期学**高等数学**；用 **AI** 搭建个人主页；**备战英语四级**；难点是**学懂微积分和线性代数**；图片素材用户尚未提供。
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

- 当前版本：**V5（第五版）· 本地已定稿并归档，线上仍为 V3**（2026-10-02 定稿）—— 页脚为「个人主页（第五版）」，存档目录 `版本存档/V5-回归修复与图片优化/`。V4（内容精简与背景大图）已定稿归档、被 V5 取代。V3（意见反馈）已定稿归档**且仍在线上**（`main` = `065d717` → https://qilumanman.github.io/ ）。以下 V3 段落保留为线上形态的记录。
  - **V3 定稿快照（第 26 次实测）**：`index.html` **37,063 字节 / `5E9FC5B595393F968678FBF8925FC88A`**（与线上逐字节一致）；归档 `版本存档/V3-意见反馈/`（`备份/` 21 文件 + `服务端源码/` 5 文件 + `完整截图/` 4 张 + `归档说明.md`）。全部现行校验值见「第 26 次讨论」一节。
  - **⏭️ 第四版（V4）· 已开工（2026-09-24 开工前核查通过）**：核查证实项目根 13 个关键文件 MD5 与第 26 次定稿快照**逐项一致**，V3 归档 / 各历史存档 / 提交区 8 张截图 / git 全部完好（明细见「第 28 次讨论」）。**第四版在项目根就地修改**，回滚点为 `C:\Users\ASUS\AppData\Local\Temp\opencode\v4_baseline_20260924\`（57 文件 / 3.51 MB，`index.html` MD5 一致）+ `版本存档/V3-意见反馈/` + `.deepworks/tmp/backup_before_v3_final_20260917-2310/`。改完按老规矩新建 `版本存档/V4-*/`。
  - **🟡 第四版（V4）· 内容改写已落改（2026-09-27，第 29 次）**：三个文件（`index.html` / `css/main.css` / `js/main.js`）已完成**内容真实化改写**，页脚已改为「第四版」，自动化验证全绿（见「第 29 次讨论」）。
  - **🟢 第四版（V4）· 已定稿并完成收尾归档（2026-09-27，第 31 次 = 本文件对应讨论）**：新增**背景大图**（首屏 `.sec-bg--hero` 樱花插画 63.23% 可见 + 底部联系横幅 `.sec-bg--cta` 龙族截图底纹 73.71% 可见，两张均为用户自供素材），用户拍板「用自供龙族图 / 浓度保持 / 不再增加展示位」。收尾已完成：归档 `版本存档/V4-内容精简与背景大图/`（`备份/` 26 + `服务端源码/` 5 + `完整截图/` 2 + `归档说明.md`）、交付截图（桌面 1440×5323 / 手机 504×6555，同源覆盖提交区与预览，MD5 一致）、重建单文件版 **878,417 B / `F6FF4092D152B2568961C0576F7DF623`**、`outputs/源码/` 24 文件、`README.md` 改写、对话记录追加第 28–30 次。**V4 定稿指纹**：`index.html` **37,952 / `EA290675874B2FE435AE9B9DA0216C8C`**、`css/main.css` **35,145 / `05D49A80B5D91BEC27AE824051F1ED36`**；页高桌面 **5323** / 手机 **6555**。**唯一未做**：`git commit` / `push`（线上仍是第三版）。
- **版本归属（第 19–20 次讨论更新）**：此前「不新建第三版、页脚保持第二版」的约定**已作废**。用户已确认**正式升为第三版**：页脚版本号、`README.md`、存档目录名、`作业提交区` 截图命名一并更新为第三版。
  - **🟢 第五版（V5）· 已定稿并完成收尾归档（2026-10-02，第 32 次）**：本版 = **六项回归体检 + 修缺陷 + 图片优化**（文案与结构沿用 V4）。修掉 4 个真实缺陷：锚点被 69px 吸顶页头盖住（`.cta{scroll-margin-top:78px}`）、手机上锚点同样被盖（≤720 `.section{scroll-margin-top:20px}`）、手机点按区域 <44px（11 → 6 处）、**输入控件 <16px 的修复规则原本被后续媒体查询覆盖而失效**（规则移到样式表最末尾，8 → 0 处）。5 张位图转 WebP（988 KB → **254 KB / −74.3%**，首屏 1068.8 → **337.9 KB**；PSNR 36.6–48.5 dB、alpha 差 0.00）。反馈通道改为按域名自动识别（`window.pickFeedbackMode()`，单测 9/9）。页脚与二级页版本标记改「第五版」（`projects.html` 正文「第四版重点改的是内容」**有意保留** = 历史事实）。本地 `db/feedback.db` 删去 2 条测试行（仅剩 id=2）。归档 `版本存档/V5-回归修复与图片优化/`（`备份/` 29 + `服务端源码/` 5（与 V4 逐字节一致）+ `完整截图/` 2 + `原始位图/` 5 + `归档说明.md`）；截图（桌面 **1440×5391** / 手机 **390×7456**，与提交区、预览三处 MD5 一致）、重建单文件版 **791,188 B / `0370D3DD3D3F0855C5224356ED6FF498`**（与源页面逐像素差 0.22%，仅两处动效相位差；数字分身 4 问全对）、刷新 `outputs/源码/`（**27 站点文件** = 站点实际引用文件，不含仓库级 `README.md` / `opencode.jsonc`；+ 单文件版副本）、改写 `README.md`、新建 `outputs/第五版-内容改动清单.md`。**V5 定稿指纹**：`index.html` **25,975 / `A0BBA5E8F2A3A7363F6AD031E162B5BF`**、`css/main.css` **40,335 / `89B8743D2E6F19755CF5BE80704F9D42`**、`js/feedback-config.js` **3,593 / `97F87A1F5FC5C3A6E62671B58CE8BE49`**、`pages/about|blog|projects.html` 3,976 / 3,644 / 3,439；页高 1440→**5391**、1024→6039、720→6696、430→7150、390→**7456**、320→8297。**唯一未做**：`git commit` / `push`（线上仍是第三版）。详见「第 32 次讨论」。
- **第 23–25 次讨论**：V3 已接 Supabase 并**发布上线**（https://qilumanman.github.io/，见下文「GitHub Pages 发布」）；**第 25 次**把关系选项「网友」换成「恋人」并已发布推送，**线上约束 `ck_feedback_relation` 已完成迁移**（用户已在 SQL Editor 执行 `db/migration_relation_lover.sql`；anon 探针实测 `lover`→201、`online`→400）。
- **第 26 次讨论（2026-09-17）**：**第三版最终形态定稿归档完成** —— 重拍 4 张最终截图（同时覆盖 `作业提交区/01-截图/第三版-*.png`）、刷新 `版本存档/V3-意见反馈/` 的 `备份/`（21/21 与仓库根逐字节一致）与 `服务端源码/`（4 → **5** 文件，新增 `migration_relation_lover.sql`）、新建 **`版本存档/V3-意见反馈/归档说明.md`**、追加对话记录、**订正 `index.html` MD5**。详见下文「第 26 次讨论」一节。

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
- 截图与备份：V1 存 `版本存档/V1-前期准备/`；V2 现有三份存档 —— `V2-深色科技风/`、`V2-浅色新风/`、**`V2-黄白杂志风/`（第 18 次定稿、第 19 次随二级页统一一并更新：`备份/` **19 文件** + `完整截图/` 2 张，备份含 `index.html`/`README.md`/`opencode.jsonc`/`css/`/`js/`/`pages/`×3/`assets/`；两张双校配图已按用户确认移出）** —— **第 28 次核查订正**（此前记的「16 文件 / index.html 32,360」为第 18 次时点值）：实测 `备份/index.html` **31,690 字节 / `E16E09C0404E9501B163FF6AAD0C7502`**（页脚「个人主页（第二版）」、无 `media-strip`、无反馈引用，确为 V2 最终形态）、`备份/README.md` 6,782；
作业截图存 `作业提交区/01-截图/`（第二版桌面 **1440 × 4403** = 1,328,458 字节 / MD5 `7116E353AF2DF720E00CA2F5DAF3C0BE`，手机 **504 × 5053** = 830,022 字节 / MD5 `5EBEEA4C6EA3725ABCAF1B37ABBEE0F2`；`作业提交区/01-截图/`、`作业提交区/` **根目录下的两份同名遗留截图** 与 `版本存档/…/完整截图/` 三处已全部同步为当前终稿、MD5 一致。第 17 次那两张 1440×4420 / 504×5505 的截图已被本轮取代）
- 交付物：`outputs/源码/`（**14 个文件**：`index.html` 32,360 字节 / `css/main.css` 30,283 字节 / `js/main.js` 15,586 字节 / `js/go-board.js` 16,670 字节 / `assets/`（**只剩 `sample-avatar.svg`** + `vendor/`，两张双校配图已于第 18 次移出））、
`outputs/棋路漫漫-个人主页-单文件版.html`（**94,843 字节**，纯内联、零外链，**已内联图片 0 张**，本地引用 0 / CDN 引用 0）、`outputs/预览/`：**`第二版-黄白-hero.png` / `-avatar.png` / `-notes.png` / `-board.png` / `-about.png`**（黄白版裁切图），另有上一轮四张 `第二版-浅色-*.png`、三张微特效图、**`第二版-图文素材-双校联合培养.png`（第 18 次后已失效）**、一张深色整页样机（**旧预览图是否删除必须等用户确认**）。
- 下一步：第 18 次的删除 + 存档 / 截图替换已全部完成；**用户已拍板：只清掉 `assets/images/` 两张废图（已完成，见下）**，其余三项仍待拍板：① 是否把**已休眠的灯箱代码**（`<dialog id="mediaViewer">` + `.media-viewer*` CSS + `js/main.js` 里那段）也彻底删除（可再瘦一点、目录更干净；**必须用户确认，不擅自删文件**）；② `outputs/预览/` 里旧预览图（含已失效的 `第二版-图文素材-双校联合培养.png`）是否删除；③ `pages/`（关于 / 作品 / 博客）三个二级页面仍是第一版旧样式，是否统一成黄白杂志风（**未确认前不要动**）；④ 需求截图里另有 3 条版式优化始终未做（卡片去固定高度改紧凑 Bento；脑机接口卡加内联静态 EEG 波形 + 2–3 个技术关键词标签；`📍 深圳` 拟用 Lucide `map-pin` + 文字胶囊替代 Emoji）。三份 V2 存档均已验证归档副本可独立打开、渲染与项目根一致。
- **第 18 次收尾 · 用户确认后的废图清理（已完成）**：用户在多选里只勾了「删 `assets/images` 两张废图」。做法：写 `.deepworks/tmp/remove_unused_images18.ps1`（纯 ASCII、CJK 用 `[char]0x…`），把三处**当前版本**副本（项目根 `assets/images/`、`outputs/源码/assets/images/`、`版本存档/V2-黄白杂志风/备份/assets/images/`）里的 `dual-campus-cover.jpg`(149,176) 与 `dual-degree-framework.jpg`(96,565) 共 6 个文件**移动到** `.deepworks/tmp/removed_images18/{root,outputs-src,archive-bak}/`（沿用第 15 次「移动而不是硬删」的习惯，可随时取回），三处各只剩 `sample-avatar.svg`。**注意：`版本存档/V2-浅色新风/备份/`、`V2-深色科技风/备份/` 和 `首页替换前快照/` 里的同名图必须保留** —— 那几版的 `index.html` 仍引用它们（grep 实测各 2 处引用），删了会破坏历史存档的自包含性。清理后计数：备份 18 → **16**、`outputs/源码` 16 → **14**；`verify18.ps1` 复跑仍 **FAILURES: 0**；版面探针 @1440×4403 复测 `errs:[]`、`scrollH 4403`、`gapUnderIdentity 0`、`reqs []`，与清理前逐项一致（单文件版内联图片本就是 0 张，无需重建）。
- **第 18 次收尾 · V2 定稿 + 提交区截图三处对齐（已完成）**：用户指出「作业提交区的截图还没改，这个版本作为第二版的最终结果」。排查发现 `作业提交区/01-截图/` 那两张**已经是**终稿（MD5 `7116E353` / `5EBEEA4C`），但 `作业提交区/` **根目录下还留着两份第 15 次深色科技风时期的同名旧截图**（`第二版-桌面端截图.png` 1,041,346 字节 / `F75CB6EA`、`第二版-手机端截图.png` 689,048 字节 / `17B5516E`，时间戳 09-10），用户看到的是这两个。用 `.deepworks/tmp/sync_submission18.ps1` 覆盖为终稿并三处比对，**FAILURES: 0**。同时把 `README.md` 改为「第二版（V2）已定稿——当前在线版本即第二版最终结果」（6,313 字节 / `4A0C2BB6`，已用 `sync_readme18.ps1` 同步到 `版本存档/V2-黄白杂志风/备份/`；`verify18.ps1` 复跑仍 **FAILURES: 0**，backup 16 / source 14 / submission shots 4 / 单文件 94,843）。**待用户拍板**：`作业提交区/` 根目录下这两份重复截图是否删掉（`01-截图/` 才是规范位置）；注意 `outputs/源码/` 里**没有** `README.md`（`verify18.ps1` 只比对根与备份两处）。

## 第三版（V3）已定稿并归档 · 意见反馈

> 第 19–26 次讨论。**第三版（V3）已完成：Supabase 线上存储已接入、GitHub Pages 已发布上线、截图 / 交付 / 归档 / 交付物全部就位，并于第 26 次完成最终归档**。本地预览命令见下。

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
  5. **README 更新为 V3**（新增反馈功能说明 + 本地运行/后台命令 + 体积表）：6,782 → **9,417 字节 / `72DED4CB441AFE453997B1F20ED87A08`**，已同步到 `版本存档/V3-意见反馈/备份/README.md`；**`版本存档/V2-黄白杂志风/备份/README.md` 保持 V2 版原样**（历史快照不覆盖）。`作业提交区/02-对话记录/对话记录.md` **953 → 1103 行 / 108,476 字节 / `3074A3F1935B7F4CE709A487B32D9EC6`**，补齐了 `## 第 20 / 21 / 22 次讨论`（第 20、21 次为按磁盘证据反向补记）。**（第 28 次核查订正现值：该文件已续写至 1,220 行 / 124,404 字节 / `54962879F0CBB62673C60FFF214A5281`，mtime 2026-09-17 23:14，含 `## 第 27 次讨论（安全修复：后台令牌脱敏与轮换）`。⚠️ 它是 LF-only 文件，PowerShell `Get-Content` 直接取 `.Count` 会误报约 571 行 —— 统计行数必须用 `-Raw` 后 `-split \"`n\"`。）**
  6. **⛔ 推翻第 20 次的截图结论**：真因是**当时 8000 服务已死**（系统里 python 进程全无，8000/8010 均不可达），所有「大面积空白 / 只有左半幅」的截图其实都是 Edge 错误页「嗯... 无法访问此页面 · 127.0.0.1 拒绝连接。」（像素证据：角落色 `246,246,246`、内容包围盒 x 60..496 / y 166..978）。**`--headless=new` 完全可用**（配方见「截图与预览」一节），`--headless=old` 反而会挂住（>120 秒）；`--force-device-scale-factor=1` 与不加的产物字节完全相同（DPI 不是变量）。**规则：每次拍照前先确认 `GET /` 返回 200；截图异常先怀疑服务、再怀疑渲染。**
  7. **8000 服务恢复配方（WMI 分离启动）**：`([wmiclass]"Win32_Process").Create('cmd.exe /c python "<server.py>" --port 8000 >> "<log>" 2>> "<err>"', $root)` → 返回 `ProcessId=21892`；复核 `GET /` **200 / 37,064 字节**、`GET /admin` **200 / 7,211 字节**。**`Start-Process` 起的后台进程会被 bash 工具调用超时带走**，长期服务一律用 WMI 配方。
  8. **顺带确认**：`outputs/预览/` 下第 19 次遗留的 3 个 Edge 用户数据目录**已经不在了**（该目录下无子目录）。

- **⚠️⚠️ SQLite 迁移坑（第 21 次踩过）**：`ALTER TABLE ADD COLUMN` **不能带 CHECK 约束**，所以老库经自动补列后**缺少 `ck_feedback_relation` / `ck_feedback_device`**，与 `db/schema.sql` 不一致。一次性重建脚本：`.deepworks/tmp/rebuild_feedback_v3.py`（无参＝预演；`--apply` 才真改；先备份到 `.deepworks/tmp/feedback_backup_<时间戳>.db`，用临时库跑 `schema.sql` 取权威 DDL 后改名建新表 → 事务内搬运（**含 `id`**，保证编号不变）→ DROP → RENAME → 重跑 `schema.sql` 恢复索引与触发器 → 校验行数/列/integrity）。**已于第 21 次 `--apply` 成功**：4 行数据完好、`relation 约束 : True` / `device 约束 : True` / `integrity : ok`。修过两个 bug：①源列要取交集；②必须用 `conn.execute(rebuilt_ddl)` 而不是 `executescript`（后者会隐式提交、破坏事务）。
- **后端接口（`server.py`，零第三方依赖）**：`POST /api/feedback`（字段校验 + 蜜罐 + 每 IP 10 分钟 5 条限流）、`GET /api/feedback` → **405 只写不读**、`GET /admin?token=…`（后台页）、`POST /api/admin`（改状态）、**`GET /export?token=…`（CSV 导出，无令牌 403）**；静态服务**拒绝** `/db/`、`/.deepworks/`、`/.opencode/`、`/.git/`、`/版本存档/`、`/作业提交区/`；启动参数 `--port(8000) --host(127.0.0.1) --db --token --open`。
- **后台令牌**：存在 `db/admin_token.txt`（**必须 gitignore，绝不入库，也绝不写进本记忆文件**）；**令牌值一律不记录**，后台地址 `http://127.0.0.1:8000/admin?token=<见 db/admin_token.txt>`。
  - **⛔ 第 26 次教训（已修复）**：本记忆文件此前把令牌明文写了进去，而它**被 git 跟踪并推送到了公开仓库** → `raw.githubusercontent.com/.../.opencode/skills/project-memory/SKILL.md` 任何人可直接读到（实测命中 4 处）。处置：① 全文脱敏并推送；② **本地令牌已轮换**（删除 `db/admin_token.txt`，`server.py` 的 `load_token()` 会在重启时重新生成），**老令牌作废**；③ 规则升级：**任何入库文件（含 `.opencode/`）都不得出现令牌明文**，只记录「令牌在 `db/admin_token.txt`」这个指针。注意 git 历史里仍留有旧值（未做历史重写），**所以轮换才是真正的止损手段**。
- **数据表约束**：`STATUSES=("new","read","resolved")`、`STATUS_LABELS={new:未读, read:已读, resolved:已解决}`、`CATEGORY_LABELS={bug:问题反馈, suggestion:功能建议, content:内容意见, other:其他}`（**第 21 次核对：`server.py` 与 `index.html` 都用「内容意见」，两者一致；早期记的「内容补充」是错的**）；**第 21 次新增两个枚举**：`RELATIONS=("classmate","friend","family","teacher","lover","other")` → 同学/朋友/家人/老师/恋人/其他（**第 25 次讨论：原 `online`/网友 已移除，改为 `lover`/恋人，前端 `index.html`、后端 `server.py`、`db/schema.sql`、`db/supabase_feedback.sql` 四处＋线上 `ck_feedback_relation` 约束必须同步**），`DEVICES=("phone","tablet","computer","other")` → 手机/平板/电脑/其他设备（分别对应 `RELATION_LABELS` / `DEVICE_LABELS`，可留空＝`None`）；限长 `MAX_MESSAGE=1000 / MAX_NAME=60 / MAX_CONTACT=120 / MAX_URL=300 / MAX_LABEL=20`。
- **验证（第 20 次，三层全绿）**：接口自测 `.deepworks/tmp/probe_api.py` → **45/45 通过**（含「GET /api/feedback 必须 405 且文案含『不提供读取』」「无令牌 `/export` 必须 403」「带令牌 `/export` 正文须以『编号,提交时间』开头」等断言）；前端结构检查 `.deepworks/tmp/verify_feedback2.py` → **41/41 通过**（含「已移除留言墙」「CSS 无 `.fb-wall`/`.fb-item`/`.fb-chip` 残留」「`.fb-side` 在位」「`feedback.js` 无 `innerHTML`/无列表逻辑」）；整页与后台截图经视觉确认渲染正常（后台可见 5 列表格 + 统计卡；访客区可见表单 + 隐私卡，无留言墙）。
- **关键文件（第 21 次改动后实测，旧值见下）**：`index.html` **37,064 字节 / `387BB371DCE5A5D3510F343425DAA19A`**；`js/feedback.js` **8,022 字节 / `C5EA80FEF74CA6E1832D0DBE1C3E14A9`**；`server.py` **30,558 字节 / `F725BD4F41C25780AD2F1830E2F815C0`**；`db/schema.sql` **4,181 字节 / `B1325996A0BBDF7E2A4F34683E83DCF4`**（**已整文件重写**：新增 `relation`/`device` 列 + `ck_feedback_relation`/`ck_feedback_device`）；`db/supabase_feedback.sql` **10,549 字节 / `2E77CEB351873B47BD011B2D4388E9BE`**（**⛔⛔ 第 22 次踩坑结论（最终，两次实测）：Supabase SQL Editor 完全无法执行 `CREATE FUNCTION` / `CREATE TRIGGER` —— 一律报 `ERROR: 42601: syntax error at or near "returns"`（`LINE 45: returns trigger`）：① `$$ … $$` 美元引用包裹函数体 → 报错；② 改用单引号包裹 `as 'begin … end'` → **仍然报错**。它会把这类语句切错位置再发送，与函数体写法无关。→ 最终处置：**把函数 + 触发器整段注释掉（默认关闭）**，并注明「想要 `updated_at` 自动更新就单独新开一个 query 只跑那 9 行」；脚本由此变成 **66 行纯净可粘贴版**（已核对零 `CREATE FUNCTION/TRIGGER` 命中），表结构 / 注释 / 索引 / RLS / grant / 自检全部不受影响。**③ 第 3 次实测又踩一坑：粘贴时 `now()` 的括号丢了（编辑器收到的是 `default now,`），报 `ERROR: 0A000: cannot use column reference in DEFAULT expression`（`LINE 13: created_at timestamptz not null default now,`）→ 已把 `created_at` / `updated_at` 两处默认值改成**关键字 `current_timestamp`**（标准 SQL，不带括号，复制过程不可能再丢）**）（**第 22 次最后加了一段 4.5 防御性授权** `grant usage on schema public to anon;` + `grant insert on table public.feedback to anon;` —— 部分 Supabase 新项目不再自动给 `public` 架构的表级权限，缺了会报 `42501 permission denied for table feedback`；**只授 insert、不授 select/update/delete**。全文＝新列 + 约束 + `comment on column` + 2 索引 + 触发器 + RLS 仅 `anon` INSERT + **4.5 表级 grant** + **老表补列段** + 自检 select，期望 `table_ok=1, five_fields_ok=5, index_count=3, policy_count=1, rls_enabled=true`；归档副本已同步同 MD5）；`db/init_db.py` **9,292 字节 / `7AE3F0D7BB44E987663D6EC92D645C35`**（含 `migrate()` + 新枚举自检用例）；`db/feedback.db` **32,768 字节 / `E27D7701D42B76B294EEFC9CD275132F`**（5 行、13 列、约束已补齐）。**未改动**：`css/main.css` 34,824 / `3A7A20FD662F30514AF0A00AC9961955`、`js/feedback-config.js` 1,592 / `48068D229175C16CD3E7ECE50E0D3A22`、`README.md` 6,782 / `2114B140F7B4977F6C9F9AD37D6B3352`、`js/main.js` 13,984 / `BBD298E33BAB6AC5A00330EBF93B0A85`、`js/go-board.js` 16,670 / `CEDCC0A97CAF625CFA379980EFBD26FC`。（**第 20 次旧值**：`index.html` 35,805 / `C0F2B27BE277BA87FD7685BBFA606944`；`js/feedback.js` 7,215 / `6AF42FF5556CABE7C7486CFFFC9161F4`；`server.py` 24,945 / `3B16E865812E0EBEC9FD4F5BE5405B46`；`db/supabase_feedback.sql` 6,209 / `6CAD523739711DD23C78C899AA7F8A22`。）
- **验证（第 21 次，四层全绿）**：`python db/init_db.py --selftest` → **12/12 PASS**（新增「reject illegal relation」「reject illegal device」）；`.deepworks/tmp/verify_feedback2.py` → **61/61**（新增「1b. 访客要填的 5 项」检查块）；`probe_api.py` → **45/45**；`probe_delete.py` → **31/31**；`check_rows.py` → 表头 5 列 / 每行都有删除按钮；**新写的端到端探针 `.deepworks/tmp/e2e_fields.py` → 22/22 全过**（真 HTTP：带 relation/device 提交 201 且落库正确、非法 relation/device → 400 且错误信息点名、两字段留空可提交且落库为 NULL、后台能看到「同学 · 手机」与「关系 / 设备未填」、CSV 两新列、`GET /api/feedback` 仍 405、**最后自己删掉自测数据不留垃圾**）。
- **⚠️ 跑探针前先重启 8000 服务**：限流是**每 IP 10 分钟 5 条**且存在内存里，探针会消耗额度（`probe_api.py` 自己就会造自测行）；**重启即清零**。（第 21 次实测：探针跑完库里留下 `#1/#3/#5/#6` 四条「【自测】自测同学」，用户真实那条是 `#2`「可以可以」。）

- **Supabase / GitHub 现状（第 21 次，用户已自行注册，截图确认）**：Supabase 组织 `Qilumanman's Org`（FREE），项目 `Qilumanman's Project`，**URL `https://knvgdbyzckdoiukafsrh.supabase.co`**，Health / NANO / Singapore `ap-southeast-1`；**No migrations / No backups / GitHub: No repository connected → 库里还没有任何表**，需要用户把 `db/supabase_feedback.sql` 粘到 **SQL Editor** 执行（建表 + RLS + 自检查询）。GitHub 账号 **`Qilumanman`**，Projects 看板 `@Qilumanman的无题项目`（空），**仓库未建**；本机 **`gh` CLI 未安装**（`winget` 可用）。**`anon public` key 是公开密钥，写进 `js/feedback-config.js` 是设计如此（RLS 只允许 INSERT、禁止 SELECT，所以公开无风险）；但 `service_role` key 绝不能进仓库。**
- **⚠️ 历史待办（第 22 次时点的记录；第 23–25 次已全部完成 —— Supabase 密钥已接入、SQL 已执行、Pages 已发布上线；以下保留供溯源）**：① **等用户粘贴 Supabase `anon public` key**（用户已选「我现在粘贴给你」但还没贴）→ 把 `js/feedback-config.js` 的 `mode` 从 `"local"` 切成 `"supabase"` 并填 `supabaseUrl` / `supabaseAnonKey`，线上实测一条；② **等用户在 Supabase SQL Editor 执行 `db/supabase_feedback.sql`**（当前库里还没有表；执行成功判据＝自检行 `table_ok=1 / five_fields_ok=5 / index_count=3 / policy_count=1 / rls_enabled=true`；⚠️ 脚本里**不能出现 `CREATE FUNCTION` / `CREATE TRIGGER`**（编辑器会切错位置、必报 42601 `syntax error at or near "returns"`，换写法也无效），已整段注释掉）；③ **GitHub Pages 发布**：仓库名已定 **`Qilumanman.github.io`**（上线地址 `https://qilumanman.github.io/`），需 `git init` + `.gitignore` 排除 `版本存档/`、`作业提交区/`、`.deepworks/`、`db/*.db`、`db/admin_token.txt`、`__pycache__/`；本机 `gh` 未安装，需用户授权 `winget install GitHub.cli` 或给 PAT；④ **待用户确认删除**：项目根那个**空的乱码目录**（0 子项，09-17 18:34 创建）与 `作业提交区/` 根目录的重复截图（`v18_desktop.png` 及第二版两份，规范位置只在 `01-截图/`）。
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
- **作者后台**：`http://127.0.0.1:8000/admin?token=<见 db/admin_token.txt>`（令牌明文在 `db/admin_token.txt`；**该文件与 `db/feedback.db` 都必须 gitignore**；令牌值不要抄进任何入库文件）。
- **CSV 导出**：`http://127.0.0.1:8000/export?token=<见 db/admin_token.txt>`（无令牌 → 403）。
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
  - ✅ **用户已在 Supabase SQL Editor 执行该脚本，线上约束已迁移完成**（SQL Editor 只回显「Success. No rows returned」，因为末尾那条自检 select 没一起跑，**这不代表失败**）。
  - **线上实测证据**（`.deepworks/tmp/probe_live_lover.py`，用与网页一致的公开 anon 密钥走真实访客链路）：`relation=lover` → **HTTP 201**（能存下「恋人」）；`relation=online` → **HTTP 400 `23514 ... violates check constraint "ck_feedback_relation"`**（证明库里的约束已是包含 lover 的新版，且约束名确实叫 `ck_feedback_relation`）；`GET /rest/v1/feedback`（匿名）→ **HTTP 401 `42501 permission denied`**（只写不读仍然成立）。
  - ⚠️ 判断「线上数据库改动是否生效」的通用做法：**不要看 SQL Editor 的 "Success. No rows returned"，要用公开密钥打一次真实的 insert 探针**（能 201 就是生效），再用旧值打一次（应 400）反向确认。
- **SQLite 无法 ALTER CHECK 约束** → 本地 `db/feedback.db` 用「重建表」方式迁移：备份 → 读出全部行 → `drop table feedback` → `executescript(db/schema.sql)`（顺带重建 2 个索引 + updated_at 触发器）→ 按原 id 回插 → 修 `sqlite_sequence` → 探针验证。脚本 `.deepworks/tmp/migrate_local_db.py`，备份 `.deepworks/tmp/feedback_backup_before_lover_20260917-223326.db`。迁移后本地仍是 1 行（id=2「可以可以」，relation 为 NULL）。
- 本地端到端实测脚本 `.deepworks/tmp/probe_lover.py`（**先重启 8000 加载新 `server.py` 并清限流**）：`relation=lover` → **201 `{"ok": true, "id": 6}`**；`relation=online` → **400 `{"ok": false, "error": "「与主页主人的关系」取值不合法。"}`**；`/admin` 页面含「恋人」、**不含**「网友」；classmate/friend/family 均 201；探针行已全部 `action=delete` 清掉。
- 限流再次复现：连打第 4、5 条时命中 `RATE_MAX=5 / RATE_WINDOW=600` → **HTTP 429**，**属于正常保护而不是代码错误**；验证脚本要分批或重启服务。
- 交付物已重建：`outputs/源码/`（19 文件，index.html 含 lover 无 online）+ 单文件版 **112,775 B / MD5 `3D40E14F96E35D987210786C2815E566`**，`remaining local refs 0` / `cdn refs 0`。
- ~~**故意不改**：`版本存档/V3-意见反馈/`（V3 交付时的历史快照，里面仍是「网友」）、`作业提交区/01-截图/`（已交付的旧截图）~~ → **⛔ 已在第 26 次被用户推翻并更新**：用户要求「当作第三版最终形态保存」，故 `版本存档/V3-意见反馈/` 与新截图**已刷新为「恋人」版最终形态**（旧版整体备份在 `.deepworks/tmp/backup_before_v3_final_20260917-2310/`，可回滚）。**「历史快照不追改」原则仍适用于 V1 / V2 存档与更早的交付截图**（那些不动）。

## 第 26 次讨论：第三版最终形态定稿归档（2026-09-17）

- **用户指令**：把当前状态**当作第三版最终形态保存** —— 重拍截图、刷新版本存档与提交区、追加对话记录。
- **归档落点**：`版本存档/V3-意见反馈/` = `备份/`（21 文件）+ `服务端源码/`（5 文件）+ `完整截图/`（4 张）+ **`归档说明.md`（本轮新建，含逐文件 MD5 清单 / 截图规格 / 取图方式 / 核验结论 / 遗留事项）**；交付截图同写入 `作业提交区/01-截图/第三版-*.png`。

### 一、⭐ 截图流水线新知识（本轮踩全了，务必照抄）

1. **⛔ 不要从线上一页抓整页图**：`--virtual-time-budget=9000` 抓 `https://qilumanman.github.io/` 会得到 **1440×5548 但只有约 60 KB** 的图（Tailwind Play JS 还没跑完 → 页面没上样式）。**整页截图一律走本地镜像 `http://127.0.0.1:8000/`**，`--virtual-time-budget=15000` → 稳定得到 ~1.6 MB 正常图。本地与线上 `index.html`/`css`/`js` 已逐字节一致，截图等价。
2. **⚠️ Edge 写 PNG 是异步的**：`Start-Process -Wait` 返回（进程已退出）时文件**可能还没落盘**；固定 `Start-Sleep` 太短会误报失败。**正确姿势：轮询等「文件存在且大小连续两次相同」再收图**（脚本 `.deepworks/tmp/shot_final2.ps1`）。
3. **反馈区裁切 y=4250（不是 4278）**：用整页图与旧归档图做**模板匹配**定出真实偏移（99.3% 一致）；按 4278 裁会与归档有 48% 像素不同。
4. **逐像素核验结论**：① 同一页面**两次独立抓拍逐像素完全相同**（渲染是确定的）；② 后台图与旧归档**逐字节相同**；③ 反馈区图仅 **998 px** 不同；④ 桌面整页仅 2 个动画块不同（首屏数字分身 y638..872 / 右下悬浮按钮 y5434..5540），手机仅 1 块（悬浮按钮）→ **差异 100% 来自动画相位（`--virtual-time-budget` 停在哪一帧），不是内容差异**。
5. 工具：`.deepworks/tmp/crop_final.ps1`（裁图 + `DiffPng`）、`.deepworks/tmp/analyze.ps1`、`.deepworks/tmp/cluster.ps1`（`-A -B -Step -Label` 通用分块差异聚类）、`.deepworks/tmp/shot_final.ps1` / `shot_final2.ps1`（拍照 + 等文件稳定）。
6. **⚠️ PowerShell 函数命名坑再现**：函数名 **`Diff` 撞别名 `diff`（=Compare-Object）** → 必须改名（本轮改成 `DiffPng`）。同类：`CP`、`%`、`?`、`where`、`sc`、`curl`。

### 二、定稿快照（本轮实测，取代第 21/22 次的旧值）

- **`index.html` = 37,063 字节 / `5E9FC5B595393F968678FBF8925FC88A`**（**订正**：第 21/22 次记的 `387BB371DCE5A5D3510F343425DAA19A` / 37,064 是更早的值；另有 `5E9FC595393F968678FBF8925FC88A` 是**漏抄一位的错误值**，正确为 `5E9FC5B595393F968678FBF8925FC88A`）。
- 其他前端：`README.md` 9,930 / `66BC9DB59D860114412A2C55A8F1F050`；`css/main.css` 34,824 / `3A7A20FD662F30514AF0A00AC9961955`；`js/main.js` 13,984 / `BBD298E33BAB6AC5A00330EBF93B0A85`；`js/feedback.js` **8,444 / `ACB8C88642B6D477F1703185A0A0CEB3`**（第 23–25 次后已变，旧值 8,022 / `C5EA80FE…`）；`js/feedback-config.js` **1,887 / `5734687671542B43E7031C10AE57475D`**（线上模式，含公开 anon 密钥；旧值 1,592 / `48068D22…`）；`js/go-board.js` 16,670 / `CEDCC0A97CAF625CFA379980EFBD26FC`；`pages/` 3 个 2,846 / 2,782 / 2,780。
- 服务端：`server.py` 30,556 / `E1CDA08F5A72816AE241FECE25B96BDA`；`db/schema.sql` 4,180 / `7176B40E5A9ED8F42CDB0E78CCD98CCB`；`db/supabase_feedback.sql` **10,727** / `A0C48A909E78A28256FAB826EADBFEB5`；`db/init_db.py` 9,292 / `7AE3F0D7BB44E987663D6EC92D645C35`；`db/migration_relation_lover.sql` 1,703 / `77CE2256D6959AB7F727317B70552FFD`。
- **定稿截图 4 张**（新 MD5，`作业提交区/01-截图/第三版-*.png` 与归档 `完整截图/` **完全一致**）：桌面 1440×5548 / 1,613,591 / `36938E03F58322A101EB9046ADAEDE85`；手机 504×6452 / 889,313 / `B8ECE686733705380E505A63040B9E50`；反馈区 1440×1210 / 345,300 / `C7EBDE0C3DAE41E451233FBEEB0EDAF7`；后台 1280×400 / 25,489 / `E98C170EACF1230843B29994422763BB`（后台图与旧值**逐字节相同**，说明该页无动画）。
- 交付物：`outputs/源码/` 19 文件（**无 `server.py`**，是纯前端快照）；`outputs/棋路漫漫-个人主页-单文件版.html` 112,775 / `3D40E14F96E35D987210786C2815E566`。

### 三、归档刷新与回滚点

- `备份/` **21/21 与仓库根逐字节一致**（本轮变化：`index.html` 37,064 → 37,063；`README.md` 9,417 → 9,930）。
- `服务端源码/` **4 → 5 文件**：`init_db.py` 9,292 / `schema.sql` 4,180 / `server.py` 30,556 / `supabase_feedback.sql` 10,727 / **新增 `migration_relation_lover.sql` 1,703**（MD5 全部与源文件一致，`*.db` 与 `admin_token.txt` 仍然刻意不含）。
- **旧版整体备份（回滚点）**：`.deepworks/tmp/backup_before_v3_final_20260917-2310/`（**38 文件 / 9,391,786 字节**：旧 `V3-意见反馈/`、旧 `01-截图/`、旧 `对话记录.md`）。
- 残留复核：归档内**无「网友/online」残留**（只有 `migration_relation_lover.sql` 与 `supabase_feedback.sql` 注释里**有意保留**的迁移说明）；`index.html` 内 `<option value="lover">恋人</option>` ✓。

### 四、README 的决定

- **本轮不改 `README.md` 文案**（不加「第三版已定稿」字样），以保持**本地与线上 README 完全一致**（均为 9,930 字节 / `66BC9DB59D860114412A2C55A8F1F050`）；归档已按当前 README 同步。若日后要加定稿字样，需**一并推送**才不让线上落后。

### 五、遗留（需用户手动 / 拍板）

- Supabase 线上表仍有 **2 条测试行**待手动删除（anon 无 delete 权限）：`[lover-check]`（第 25 次探针）与 `【联通测试】…`（更早探针）——
  `delete from public.feedback where name = '[lover-check]' or message like '【联通测试】%';`
- 清理类待拍板项（沿用旧账）：`作业提交区/` 根目录重复截图与 `v18_desktop.png`、`outputs/预览/` 旧预览图、已休眠的灯箱代码、`pages/` 三个二级页面是否统一成黄白杂志风。**删除类操作一律先经用户确认。**

## 第 28 次讨论：第四版（V4）开工前全量核查（2026-09-24）

- **用户指令**：确认「没有忘记之前网页的关键信息、确保原版本等记录的保存」，随后开始第四版改进。
- **核查方式**：全部以磁盘实测为据（`Get-Item.Length` + `Get-FileHash -Algorithm MD5`），不依赖任何历史结论。

### 一、项目根关键文件（13 项）——与第 26 次定稿快照逐项一致 ✅

| 文件 | 字节 | MD5 |
| --- | --- | --- |
| `index.html` | 37,063 | `5E9FC5B595393F968678FBF8925FC88A` |
| `README.md` | 9,930 | `66BC9DB59D860114412A2C55A8F1F050` |
| `css/main.css` | 34,824 | `3A7A20FD662F30514AF0A00AC9961955` |
| `js/main.js` | 13,984 | `BBD298E33BAB6AC5A00330EBF93B0A85` |
| `js/feedback.js` | 8,444 | `ACB8C88642B6D477F1703185A0A0CEB3` |
| `js/feedback-config.js` | 1,887 | `5734687671542B43E7031C10AE57475D` |
| `js/go-board.js` | 16,670 | `CEDCC0A97CAF625CFA379980EFBD26FC` |
| `server.py` | 30,556 | `E1CDA08F5A72816AE241FECE25B96BDA` |
| `db/schema.sql` | 4,180 | `7176B40E5A9ED8F42CDB0E78CCD98CCB` |
| `db/supabase_feedback.sql` | 10,727 | `A0C48A909E78A28256FAB826EADBFEB5` |
| `db/init_db.py` | 9,292 | `7AE3F0D7BB44E987663D6EC92D645C35` |
| `db/migration_relation_lover.sql` | 1,703 | `77CE2256D6959AB7F727317B70552FFD` |
| `outputs/棋路漫漫-个人主页-单文件版.html` | 112,775 | `3D40E14F96E35D987210786C2815E566` |

### 二、版本存档 6 个（全部在位）✅

- `V1-前期准备/`：6 文件，`备份/index.html` 13,012 / `F03858E5B4133C04E9A8F63E232221C7`。
- `V2-浅色新风/`：20 文件，`备份/index.html` 33,672 / `EF5DC66737FE2A7095034BF52BA0D970`。
- `V2-深色科技风/`：19 文件，`备份/index.html` 32,345 / `014C9DA2F703098517E18E5A2E0F765C`。
- `V2-黄白杂志风/`：21 文件（备份 19 + 完整截图 2），`备份/index.html` 31,690 / `E16E09C0404E9501B163FF6AAD0C7502`。
- `V3-意见反馈/`：**31 文件** = 备份 21 + `完整截图/` 4 张 + `服务端源码/` 5 + `归档说明.md` 6,628；`备份/index.html` 37,063 / `5E9FC5B595393F968678FBF8925FC88A`（**与项目根逐字节一致**）。
- `首页替换前快照-20260913-210438/`：1 文件 `index.html` 32,345。

### 三、作业提交区 ✅

- `01-截图/` 共 **8 张**：第一版 2 张、第二版 2 张、第三版 4 张；第三版 4 张 MD5 = `36938E03F58322A101EB9046ADAEDE85`（桌面 1440×5548）/ `B8ECE686733705380E505A63040B9E50`（手机 504×6452）/ `C7EBDE0C3DAE41E451233FBEEB0EDAF7`（反馈区 1440×1210）/ `E98C170EACF1230843B29994422763BB`（后台 1280×400），与 `版本存档/V3-意见反馈/完整截图/` **一致**。
- **`作业提交区/` 根目录已无残留文件**（旧账里那两份第二版重复截图已不在）。

### 四、git 与安全 ✅

- `main` 分支 `git status --short` **0 项变更**；remote = `https://github.com/Qilumanman/Qilumanman.github.io.git`（线上 https://qilumanman.github.io/）。
- 提交史：`065d717` 项目记忆：脱敏后台令牌明文并轮换本地令牌 → `0e3ea77` 关系选项：网友改为恋人 → `dbd26cd` README：补上线上地址 → `d20d37a` 第三版：新增「意见反馈」功能并接入 Supabase 线上存储。
- `.gitignore` 生效实测：`db/admin_token.txt` / `db/feedback.db` / `版本存档/` / `作业提交区/` / `.deepworks/` / `outputs/` **6 项全部 IGNORED**；`db/admin_token.txt` 与 `db/feedback.db` 均在本地磁盘、未入库。

### 五、本轮回滚点（新建）

- `C:\Users\ASUS\AppData\Local\Temp\opencode\v4_baseline_20260924\`：把项目根运行态（`index.html`、`README.md`、`opencode.jsonc`、`css/`、`js/`、`pages/`、`assets/`、`server.py`、`db/`、`outputs/`）整份复制，**57 文件 / 3.51 MB**，`index.html` MD5 与源一致。**第四版若改坏，从这里整目录回拷即可复原。**

### 六、本轮订正的两处过时记录

1. `版本存档/V2-黄白杂志风/`：由「备份 16 文件 / `index.html` 32,360」订正为「备份 19 文件（含 `pages/`×3）/ 31,690 / `E16E09C0…`」（第 19 次随二级页统一时更新，属正常演进，不是丢失）。
2. `作业提交区/02-对话记录/对话记录.md`：由「1,103 行 / 108,476 / `3074A3F1…`」订正为「**1,220 行 / 124,404 / `54962879F0CBB62673C60FFF214A5281`**」（已含第 27 次讨论）。

### 七、仍待用户拍板（沿用旧账，未动）

- Supabase 线上表 2 条测试行（`[lover-check]`、`【联通测试】…`）需用户在 SQL Editor 手动删。
- 清理类：`outputs/预览/` 旧预览图、已休眠的灯箱代码、`pages/` 三页是否统一黄白杂志风 —— **删除类操作一律先经用户确认**。
- 需求截图里 3 条版式优化始终未做（卡片改紧凑 Bento / 脑机接口卡加 EEG 波形 + 关键词标签 / `📍 深圳` 换 Lucide `map-pin` 胶囊）。

### 八、第四版第一步：内容对照表已交付（2026-09-25）

- **用户需求**：「根据意见的反馈，我觉得这个版本在内容上存在问题，请你给我一个内容的表格，我在上面进行更改」——即先出**可编辑内容表**，由用户填改，再落改代码。
- **交付物**：`outputs/第四版-内容对照表.xlsx`（20,234 字节，4 个工作表）＝`0-使用说明`（9 条操作规则）+ `1-首页文案`（**111 条**，`index.html` 全部可见文案，含 `meta description` / `title` / 所有 `aria-label`）+ `2-数字分身问答`（**16 条**＝`js/main.js` 的 14 组 QA + 兜底回答 + 未使用的 `KNOWLEDGE` 备用资料）+ `3-二级页文案`（**19 条**，`pages/` 三页）。
- **表结构**：序号 | 区域 | 位置（`文件:行`）| 当前内容 | `✍️ 修改为（请填写）` | 备注；表头金底墨字、隔行浅底、冻结首行、开启筛选，填写列浅黄提示。
- **工具链**：生成脚本 `.deepworks/tmp/make_content_xlsx.py`，校验脚本 `.deepworks/tmp/verify_content_xlsx.py`，全文导出 `.deepworks/tmp/content_dump.txt`（168 行，已逐条比对与页面一致）。`openpyxl 3.1.5` 可用（`pip install` 曾报 ReadTimeout，但本机已存在可用版本）。
- **抽文时发现 3 处内容瑕疵（尚未改，等用户定夺）**：
  1. `js/main.js:52` 健身问答「…打磨身体和意志，**是要一种**自律的生活方式」疑为「是**一种**」笔误。
  2. `pages/about.html|blog.html|projects.html` 页脚三处仍写「个人主页（**第二版**）」，与首页「第三版」不一致。
  3. 对话卡副标题仍是「个人知识库 · **测试版**」。
- **下一步**：等用户填表回传后逐行落改，再重新整页截图 + 留档 `版本存档/V4-*/`。用户若要按具体反馈逐条给修改建议，需他把反馈内容贴出，或明确授权读取本地后台（`db/feedback.db` / `server.py` 后台页）。

## 第 29 次讨论：第四版（V4）内容真实化改写已落改完成（2026-09-27）

### 一、用户决策

- 用户看过内容对照表后**没有填表**，改为直接口述真实素材，让 AI 落改（＝「方案 C 学习日志式」）。
- 用户口述的**唯一写作原料**（不得自行添加任何他没说过的事）：
  1. 这学期在学**高等数学**；在读的专业方向是**脑机接口**，现在打基础：微积分、线性代数。
  2. 在**学习用 AI 建立个人主页**（「你正在看的这个页面就是练习成果」）。
  3. 最近在**坚持健身**、**备战英语四级**。
  4. 现阶段最大难点：**学懂微积分和线性代数**。
  5. **围棋业余四段**，常看围棋比赛、偶尔下网棋。
  6. 跑步资深跑者「**三年三千里**」，**最长跑过十公里**。
  7. 健身主攻**街健**：**双力臂、单力臂卷腹上杠**，正在解锁**前水平**。
  8. 个人特点：**颜值高，做事认真负责（答应下来的事会做完）**。
  9. 图片素材：用户说「等会先吧」→ **本轮未放任何新图**。

### 二、写作铁律（第四版内容标准，后续沿用）

数字必须可核对，核不出就不写；一个具体名词 > 三个形容词；一句话至少一个事实；删同义反复；不写「每周更新」这类未来承诺；**不编造用户未提供的事实**。

### 三、落改结果（三个文件）

- `index.html`：Hero desc/tags、三张便签、迷你标签行、01 认识一下 + 当前研究/兴趣领域/个人特点、**02 整块重写为 4 张学习日志卡**（这学期·高等数学 / 正在做·用 AI 搭主页 / 在坚持·备战四级 / 现在的难点·学懂微积分和线性代数）、04 三张爱好卡、数字分身欢迎语与 2 个推荐问题、页脚 → 第四版。
- **已删除的编造内容**：徽章 `+18%`、整段假折线图 SVG、徽章「每周更新」、「近两周的学习时长，一点点往上走。」，以及 04 三卡的套话（运筹帷幄 / 心流般的专注感 / 追求一种自律的生活方式）。
- `js/main.js`：9 组 QA 答案 + `KNOWLEDGE` 四项改写；修掉病句「是要一种」→「是一种」；`keys` 去掉重复的「成就」并补入「街健」「跑量」「这学期」等口语说法。
- `css/main.css`：删除 `.notes-grid .note-card:first-child` 跨列规则（桌面 / 1040 / 720 **三处**），02 区块改为 4 张等宽卡。
- 改后指纹：`index.html` 37,373 / `CE8FEBE92379E62738DFB2C03297A91E`；`css/main.css` 34,625 / `B61824AFE0742918CDE9283CC0094B02`；`js/main.js` 14,082 / `1B6153AB261D3C12B01A4F26BE7A82C3`。
- 改前基线备份 `.deepworks/tmp/v4_content_baseline/`（三个文件）；回滚点 `C:\Users\ASUS\AppData\Local\Temp\opencode\v4_baseline_20260924\`。

### 四、⭐ 本轮踩到的两个坑（务必记住）

1. **`edit` 工具在 `css/main.css` 上出现「回写覆盖」**：一条已删除的规则被重新写回文件（报错 `DEEPWORKS_FILE_WRITE_LOCK_TIMEOUT` 的重试导致），首轮截图因此仍是旧错位版式。→ 改 `main.css` **优先用 Python 读写**（无 BOM UTF-8），改完必须回读复验（花括号计数 + `rg` 关键字）；脚本 `.deepworks/tmp/fix_css.py`（dry-run 看 diff，`--apply` 落改）。
2. **无头 Edge 的 `file://` CSS 缓存**：必须给每次运行加**全新的 `--user-data-dir`**，否则可能加载旧 CSS，截出来的图和实测数据全是假的。→ 已写进 `v4_verify.py`（`tempfile.mkdtemp` 随机 profile）。
3. 环境事实：**DeepWorks 视觉理解当前不可用**（无法读取图片）→ 不能靠「看截图」验收，必须用 DOM 数值验证（见下）。本机**无 `node`**、**无 `PIL`**；`glob` 不支持 `*.{ps1,py}` 花括号。

### 五、验证流水线（`v4_verify.py`，四种模式，可复用）

- `shot`：整页截图（`--window-size=W,H` + `--hide-scrollbars`）；`e2e`：注入脚本模拟提问并从 `.bubble-ai` 抽答案写进 `document.title`，再用 `--dump-dom` 读回；`layout`：`getBoundingClientRect` 量栅格 + 横向溢出 + `gridTemplateColumns`；`icons`：图标盒子尺寸与节点数。
- 本轮实测：桌面截图 1440×5348、手机 504×6582；桌面 4 张卡同一行 x=129/422/714/1007 宽各 275，平板 2×2，手机 4 张堆叠 456，三档 `scrollWidth == clientWidth`；4 个图标均 21×21；端到端 4 问全中；花括号 303/303。
- ⚠️ Windows 控制台 GBK：Python `print` 遇到 emoji（😊）会 `UnicodeEncodeError` → 结果写 UTF-8 文件或用 ASCII 摘要输出。

### 六、本轮交付物

- `outputs/第四版-内容改动清单.md`（before/after 全量对照 + 删除项理由 + 验证记录 + 待确认 4 项）。
- `outputs/第四版-预览/index_desktop_1440x5388.png`、`index_mobile_504x6622.png`（首轮错位版式图已移出产物目录，存 `.deepworks/tmp/shots_v4_stale/`）。

### 七、待用户拍板（等确认后才动）

1. 「三千里」单位：是否改为「三年累计跑量 3000 公里」（与「最长十公里」并列易误读）。
2. 「单力臂卷腹上杠」：一个动作还是两个动作（单力臂 / 卷腹上杠）。
3. 数字分身状态标签「个人知识库 · **测试版**」是否改（本轮故意未动）。
4. `pages/` 三页页脚仍「第二版」+ 旧配色，是否统一到第四版。
5. 下列已失效 CSS 类是否删除（`index.html` 与 `pages/` 均已无引用）：`.chart-svg`、`.chart-grid`、`.chart-area`、`.chart-line`、`.chart-dot`、`.note-card-head`、`.badge`、`.badge-soft`、`.dot-pattern`、`.aa-mark`。
6. `outputs/第四版-内容对照表.xlsx`（111+16+19 条）已被本次改写取代，是否重出为「改后内容表」。

### 八、确认后的收尾清单

归档 `版本存档/V4-*/` → 重建 `outputs/棋路漫漫-个人主页-单文件版.html` → 更新 `作业提交区/01-截图/` 与 `02-对话记录/对话记录.md` → 按需统一 `pages/` 三页。

## 第 30 次讨论：第四版（V4）二级页与内容源文件统一（2026-09-27）

### 一、用户决策（承第 29 次）

1. 「三千里」→ 已改为「**3000 公里**」（`index.html` 与 `js/main.js` 全站统一）。
2. 「单力臂卷腹上杠」→ 确认为**两个动作**，写作「**单力臂、卷腹上杠**」。
3. 已失效的 CSS 类 → **同意删除**（见第三节）。
4. 下一步 → **统一 `pages/` 三个二级页**（本轮完成）。

### 二、落改结果：`pages/` 三页 + `content/*.md` 三文件

- **改前状态**：`pages/about.html`(2,846) / `blog.html`(2,782) / `projects.html`(2,780) 只是「空壳」——正文靠 JS 去 fetch 渲染、内容为模板占位（技能一/技能二、`example@email.com`、`2026-01-01`），且页脚仍是「个人主页（**第二版**）」，旧口号「让好奇，慢慢有迹可循。」「下一页，留给实践。」残留。
- **改后**：三页改为**静态真实内容 + 第四版页脚**（不再依赖占位数据）。
  - `pages/about.html`：标题区「关于我 / 关于 / 认真学习，也认真生活。」；4 张卡＝自我介绍（大一新生 / 脑机接口 / 这学期主线）、这学期在学（高等数学 + 微积分·线性代数·英语四级标签）、课堂之外（围棋 · 跑步 3000 公里 · 街健 + 标签）、联系我（2762858226@qq.com + 「问问我的数字分身」按钮）。
  - `pages/blog.html`：副标题「这学期在学什么，就记什么。」；3 条学习记录（01 高等数学 / 02 用 AI 搭自己的主页 / 03 备战英语四级，均「进行中」）+ 说明卡「只写发生过的事」。
  - `pages/projects.html`：副标题「边学边做，做出来的放这里。」；作品 001「这个个人主页」（黄白杂志风、手写 CSS + 原生 JS、数字分身 / 19 路围棋盘 / 意见入口 + HTML·CSS·原生 JS 标签）、正在学「用 AI 把想法变成页面」、后面想做「先学好，再做下一个」。
  - 三页页脚均 `© 2026 蓝喜阳 · 个人主页（第四版）`。
- **`content/` 三个 `.md`** 从模板改写为与页面同源的真实内容（含「对应页面：`pages/xxx.html`」）：`about.md` 889B / `blog.md` 754B / `projects.md` 863B（改前 399 / 312 / 361）。
- **子页面加载 `../js/main.js` 是安全的**：聊天 / 复制按钮等全部有 `if (el)` 守卫，未命中时直接跳过，不影响二级页渲染。

### 三、CSS 清理（第 29 次拍板后执行）

- 删除 13 条失效规则：`.note-card-head`、`.badge`、`.badge-soft`、`.chart-svg`、`.chart-grid line`、`.chart-area`、`.chart-line`、`.chart-dot`、`.dot-pattern`、`.dot-pattern span`、`.dot-pattern span:nth-child(2n)`、`.dot-pattern span:nth-child(3n)`、`.aa-mark`。
- **`.mascot-badge` 保留**（`index.html:218` 仍在用）。`.notes-grid .note-card:first-child` 跨列规则（桌面/1040/720 三处）已删。
- 结果：`css/main.css` **34,824 → 33,048 字节**，花括号 **290/290**。

### 四、⭐ 本轮新增踩坑（务必记住）

1. **Python 打印非 GBK 字符会崩**：含 `©` 的脚本报 `UnicodeEncodeError: 'gbk' codec can't encode character '\xa9'` → 运行前加 `$env:PYTHONIOENCODING="utf-8"`（第 29 次记的 emoji 😊 是同一个坑）。
2. **探针脚本自身的字面量会污染检查**：注入的 JS 里含「占位句 / `.md`」等关键字，若对 `document.body.innerHTML` 做检查会**假阳性**。→ 只查 `main.textContent` 与 `.footer-note` 的文本。
3. **`--dump-dom` 偶发超时**（手机档 blog 页出现过）→ `v4_verify.py` 的 `get_title()` 已加 `attempts=2` 重试，截图调用也加了 `TimeoutExpired` 兜底。
4. 探针页用完必须移出：本轮以 `pages/_probe_*.html` 写入后 `os.replace` 到 `.deepworks/tmp/probe_pages/`，另有一个漏掉的 `_probe_blog.html` 已手工移入；`pages/` 现仅剩 3 个正式页。

### 五、验证结果（`v4_verify.py` 的 `pages` 模式）

- 3 页 × 2 档视口全部：`placeholder=false`、`oldver=false`（无「第二版」）、`contentmd=false`、`footer=© 2026 蓝喜阳 · 个人主页（第四版）`，且 `scrollWidth == clientWidth`（无横向溢出）。
- 页高：`about` 桌面 **1250** / 手机 **1348**（cards=4）；`blog` **1187** / **1256**（4）；`projects` **1026** / **1135**（3）。
- `shot` 模式首页复测：桌面 1440×**5348**、手机 504×**6607**。
- 事实复核（`rg`）：`index.html:56` 「跑步三年 3000 公里」、`:477` 「三年累计跑量 3000 公里，最长的一次跑了十公里」、`:488` 「双力臂、单力臂、卷腹上杠不在话下，正在解锁前水平」、`:616` 页脚「（第四版）」。
- ⚠️ 视觉模型不可用 + 会误读图片细节（曾把「3000 公里」读成「1000 公里」）→ **数字一律以 `rg` 文本复核为准**。

### 六、改后指纹（9 文件，2026-09-27 定稿）

| 文件 | 字节 | MD5 |
| --- | --- | --- |
| `index.html` | 37,382 | `42C3CF8F8B9748917B5777977FD37F22` |
| `css/main.css` | 33,048 | `B57576FF5AB436AA7FBA395BA470C81C` |
| `js/main.js` | 14,094 | `CBBA54403ABE39725392200882D073E4` |
| `pages/about.html` | 4,815 | `36EA1CCC75B6B60A080559CAD46C711C` |
| `pages/blog.html` | 4,483 | `C349D4D8A089506464DF154473B864AF` |
| `pages/projects.html` | 4,278 | `B49E19DC71F4511B379886A20DF4647E` |
| `content/about.md` | 889 | `33B5FBA1E5D66BFDFC2F709D592335BF` |
| `content/blog.md` | 754 | `0D00FCA21544CE3474FDAC4BB223A56A` |
| `content/projects.md` | 863 | `5654A36EDF873A57D8549858733A011F` |

- 改前对照：`index.html` 37,063 / `5E9FC5B5…`；`css/main.css` 34,824 / `3A7A20FD…`（prune 前 34,625 / `B61824AF…`）；`js/main.js` 13,984 / `BBD298E3…`；旧二级页 2,846 / 2,782 / 2,780；旧 `content/*.md` 399 / 312 / 361。

### 七、⭐ 本轮重要发现：二级页是「孤儿页」

- **`index.html` 顶部导航只有「关于（`#about` 锚点）+ 联系我（`#contact` 锚点）」，全站没有任何指向 `pages/` 的链接** → 三个二级页只能靠直接输网址访问。
- `pages/*.html` 自己的导航为 首页 / 关于 / 博客 / 作品 + 「联系我」按钮。
- 是否给首页加「关于 · 博客 · 作品」入口（导航或页脚），**等用户拍板**。

### 八、预览图与交付文档

- `outputs/第四版-预览/index_desktop_1440x5388.png`（1,606,704 B）、`index_mobile_504x6647.png`（907,338 B）；旧 `index_mobile_504x6622.png` 已 **Move** 到 `.deepworks/tmp/shots_v4_stale/`（未删除）。
- 新增 `outputs/第四版-预览/二级页/` 6 张：about 1440×1290 / 504×1388、blog 1440×1227 / 504×1296、projects 1440×1066 / 504×1175。
- `outputs/第四版-内容改动清单.md` 已重写为**定稿版**：纠正六组 QA「新答案」为 `js/main.js` 实际原文、新增「五、二级页与内容源文件统一」、「七、已执行 / 剩余待确认」、「八、文件指纹」与踩坑留档。

### 九、2 项拍板结果（同日已执行）

1. 数字分身状态标签：**已按用户选择改为「个人知识库」**（去掉「测试版」三字）——`index.html:415` `<span class="chat-status">个人知识库</span>`。
2. 二级页入口：**已按用户选择在首页页脚加入口** ——
   ```html
   <p class="footer-brand">蓝喜阳 · 棋路漫漫</p>
   <nav class="footer-links" aria-label="二级页导航">
     <a href="pages/about.html">关于</a>
     <a href="pages/blog.html">博客</a>
     <a href="pages/projects.html">作品</a>
   </nav>
   <p class="footer-note">© 2026 蓝喜阳 · 个人主页（第四版）</p>
   ```
   - 新增 CSS（`.footer-note` 规则之后、第 16 节 `.ai-fab` 之前）：`.footer-links`（`display:flex; align-items:center; gap:20px; flex-wrap:wrap`）、`.footer-links a`（13px / `--text-soft` / 无下划线 / 透明底边框 / 0.2s 过渡）、`.footer-links a:hover`（`--gold-deep` + 金色下边框）。脚本 `.deepworks/tmp/add_footer_links_css.py`（dry-run 默认 + `--apply`，带花括号增量守卫 +3/+3）。
   - 实测：`.footer-links` 与 `.footer-brand` / `.footer-note` **同一行居中对齐**（top 均 5291/5292），3 个链接文案「关于 / 博客 / 作品」，`display:flex`、`gap:20px`。
   - 页高变化：桌面 5348 → **5350**，手机 6607 → **6608**；三档视口仍 `scrollWidth == clientWidth`。
   - ⚠️ **单文件版取舍**：`outputs/棋路漫漫-个人主页-单文件版.html` 是单文件产物，那三个 `pages/*.html` 链接需与 `pages/` 目录并存才可点开，单独一个 HTML 文件时链接失效（正文不受影响）。
3. **⚠️ 用户明确说「先别收尾，我还有别的内容要改」** → 归档 / 单文件版重建 / 提交区截图更新**全部暂缓**，等用户继续给内容修改。**（→ 已于第 31 次全部执行完毕）**

- 本轮最新指纹：`index.html` **37,584 / `3385ECF1D34E713F21747ACA91E5A7D7`**；`css/main.css` **33,439 / `6221FD3EE9BC1ACD0B2727B37F904AE8`**（其余 7 个文件同上表未变）。
- 新增/更新工具：`.deepworks/tmp/footer_check.py`（页脚链接 + `.chat-status` 探针；**必须注入 `<base href="<项目根 file URL>/">`，否则 CSS 不加载、会误判 `display:block`**；「测试版」检查用 `body.innerText` 而非 `textContent`，否则探针自身字面量造成假阳性）；`.deepworks/tmp/add_footer_links_css.py`。

### 十、其余遗留（低优先）

- `outputs/第四版-内容对照表.xlsx`（111+16+19 条）是否重出为「改后内容表」。
- Supabase 线上 2 条测试行需用户在 SQL Editor 手动删：`delete from public.feedback where name = '[lover-check]' or message like '【联通测试】%';`
- `outputs/预览/` 旧预览图、已休眠的灯箱代码。
- 需求截图里 3 条版式优化未做（卡片改紧凑 Bento / 脑机接口卡加 EEG 波形 + 关键词标签 / `📍 深圳` 换 Lucide `map-pin` 胶囊）。

### 十一、确认后的收尾清单（✅ 已于第 31 次全部执行完毕）

归档 `版本存档/V4-内容精简与背景大图/`（`备份/` 26 + `服务端源码/` 5 + `完整截图/` 2 + `归档说明.md`）→ 重建 `outputs/棋路漫漫-个人主页-单文件版.html`（878,417 B + 逐像素/交互双重验证）→ 更新 `作业提交区/01-截图/`（第四版桌面 + 手机整页图）与 `作业提交区/02-对话记录/对话记录.md`（追加第 28–30 次）→ 刷新 `README.md` / `outputs/第四版-内容改动清单.md` / 本 SKILL.md → **仅剩**：是否 `git commit` + `push` 推送线上（线上仍为第三版）。

## 第 31 次讨论：第四版（V4）背景大图定稿 + 收尾交付归档（2026-09-27）

> 本次是新对话（上下文已压缩）后的收尾轮。**用户拍板三件事**：① 横幅底纹用**用户自供的龙族截图**（不用 AI 生成候选）；② 浓度**保持现在**（`opacity .34` + `contrast(1.4) saturate(1.25) brightness(1.05)`）；③ **不再增加**龙族展示位。

### 一、本次新增的功能改动

- **首屏背景大图**：`.sec-bg--hero` + `assets/images/figures/april-violin-piano.jpg`（841×1870 / 267,297 B，用户自供），`opacity:.4` + `mix-blend-mode:multiply` + `object-fit:cover`，并覆盖 `aspect-ratio` / `max-height` 让图铺满整屏。
- **底部联系横幅底纹**：`.wrap.cta-inner` 内 `.sec-bg--cta` + `assets/images/figures/dragon-portrait.png`（1080×528 / 305,982 B，用户自供龙族截图），`opacity:.34` + `filter:contrast(1.4) saturate(1.25) brightness(1.05)`。
- 页面上共 **2 层** `.sec-bg`（hero + cta）；`#about` / `#hobby` / `#feedback` **无背景图**。
- **试过并放弃的落点**（勿回退）：`#about`/`#hobby` 卡片底下（仅 10.8% / 13.4% 受影响）、`#feedback` 右下（meanDelta 0.00，被卡片完全遮住）。
- **素材取舍记录**：另生成 2 张**原创**候选（`output/imagegen/dragon-candidate-01.png` / `-02-nw.png`，1413×901，已裁掉右下角水印）并产出对照图 `outputs/第四版-预览/龙族横幅-三素材对比.png`（1,096,132 B）；用户最终选定**自供的龙族截图**。

### 二、本次的实测数据（逐像素 / 探针）

| 项目 | 结果 |
| --- | --- |
| 首屏背景可见度 | meanDelta **10.44** / maxDelta **86** / **63.23%** 像素有变化 |
| 横幅背景可见度 | meanDelta **53.11** / maxDelta **84.33** / **73.71%** 像素有变化 |
| `#hobby` / `#feedback` | meanDelta 0.01 / **0.00**（= 无背景图，符合预期） |
| 页高（定稿） | 桌面 1440 → **5323**；手机 504 → **6555**（探针实测，截图按此精确取高） |
| 版式体检 | 两档视口 `overCount=0`；末行文字距页底 **34 px** |
| 结构探针 | `.sec-bg` = 2（hero 1 + cta 1）、`.footer-links` = 3、`.chat-status` = 「个人知识库」、页脚含「第四版」 |
| 单文件版保真 | vs 源页面：桌面差 **14,316 px**（0.19% / meanDelta 4，全在悬浮头像脉冲区）、手机差 4,280 px（meanDelta 1.68） |
| 单文件版交互 | 数字分身注入 4 问全部命中（高等数学 / 业余四段 / 街头健身 / 3000 公里），无「正在思考中」卡死 |

### 三、本次交付的产物（全部已落盘）

| 产物 | 规格 / 校验值 |
| --- | --- |
| `版本存档/V4-内容精简与背景大图/` | `备份/` 26 文件 + `服务端源码/` 5 文件（与 V3 逐字节一致）+ `完整截图/` 2 张 + `归档说明.md`；共 33 文件 / 4,195,836 B |
| `作业提交区/01-截图/第四版-桌面端截图.png` | 1440×5323 / 1,982,244 B / `521FA648A9EDEE3869EE7C4DEC27ED7A` |
| `作业提交区/01-截图/第四版-手机端截图.png` | 504×6555 / 1,023,092 B / `8176385C9D0C419FA2FD011EEB869129` |
| `outputs/第四版-预览/最新-首页-桌面端.png` / `-手机端.png` | 与上面两张**同源同 MD5**（预览、归档、提交区三处一致） |
| `outputs/棋路漫漫-个人主页-单文件版.html` | **878,417 B / `F6FF4092D152B2568961C0576F7DF623`**；1 个 `<style>` + 4 个内联 `<script>` + **2 张图内联为 `data:` URI**；正文本地引用 0 / 外链 0（仅剩 3 个 `pages/*.html` 页脚链接） |
| `outputs/源码/` | 24 个文件（含 `content/*.md` 与两张背景图，本次起一并纳入） |
| `README.md` | 11,704 B / `97078F19EA521639DB26343A9542CF1A`（新增 V4 段落、存档树、体积表更新） |
| `作业提交区/02-对话记录/对话记录.md` | 1,271 行 / 130,473 B / `21091E1859182E4623B31F113ADFF807`（追加第 28–30 次） |
| `outputs/第四版-内容改动清单.md` | 已刷新为定稿版（新增「八、背景大图」+「九、文件指纹（定稿）」） |

清理：`outputs/第四版-预览/t2.png` / `t3.png`（本轮诊断残留 319 B ×2）已 **Move** 到 `.deepworks/tmp/junk_v4/`（不删除）。

### 四、本次踩到的工具坑（重要，别再犯）

1. **PowerShell 5.1 的方法调用异常多为「非终止错误」**：`$bmp.Save(...)` 失败后脚本照常继续并照常打印结果，只有错误流里有痕迹 → 造成「文件已生成」的假结论。**必须显式打印 `$Error` 与子进程 stderr**。
2. **GDI+ 拼图路线整体放弃**：先撞「Graphics 未 Dispose 导致 `Save` 静默失败」，又撞 `New-Object System.Drawing.Bitmap($w,$h)` 报 `Parameter is not valid.`；改用 **「生成 HTML 页 → 无头 Edge 截图」**一次成功（`compare.html` 方案）。
3. **无头 Edge `--screenshot=` 是异步落盘**：进程返回时文件还没写完 → 直接复制会拿到旧/空文件，**必须轮询等待文件出现**。
4. **无头 Edge 写中文路径不可靠**：先截到 ASCII 路径（`%TEMP%\opencode\…`），再 `Copy-Item` 到中文目录。
5. **截图前必须实测页高**：`scrollHeight` 不能沿用旧记录（本轮实测 5323 / 6555，与上一轮记录的 5350 / 6608 不同），否则会裁掉页脚或留下大片空白。
6. 老规矩复述：不要用 `python -c` 写复杂脚本（引号/`$`/`%` 会被 PowerShell 吃掉），一律落成独立 `.py` 文件；`css/main.css` 一律用 Python 以 **LF** 写回并复验。

### 五、本次遗留（交给下一轮 / 用户决定）

- **未推送**：线上仍是第三版（`main` = `065d717`），`git commit` + `push` 待用户拍板；`.gitignore` 已排除 `版本存档/`、`作业提交区/`、`outputs/`、`.deepworks/`。
- 单文件版页脚 3 个 `pages/*.html` 链接需与 `pages/` 并存才可点开（既有取舍）。
- Supabase 线上 2 条测试行待用户手删；`outputs/第四版-内容对照表.xlsx` 是否重出；`outputs/预览/` 旧图；需求截图里 3 条版式优化未做。
- 用户尚未反馈「数字分身不再回答这两部作品」是否接受。

## 第 32 次讨论：第五版（V5）六项回归体检 + 缺陷修复 + 图片优化（2026-10-02）

### 一、用户指令与拍板

- 用户要求对已定稿的第四版做**六项回归测试**：①桌面布局 ②手机布局 ③导航与按钮 ④图片与链接 ⑤反馈表单 ⑥加载速度，测出的问题要修。
- 本轮用户 4 项明确决定：① 图片转 WebP「**做**」；② 反馈通道「**改成自动识别**」；③ 本地 db 测试行「**删掉这 2 条**」；④ 问 Supabase 控制台情况时答「**项目已暂停或不存在**」。
- 一轮 `question`（是否升第五版 / 两处小修范围 / 是否立即发布）被用户回「继续」打断 → 按**推荐默认值**执行并已在回复中说明：**升为第五版**、两处小修**只做 width/height（CLS）**不做字号、**暂不发布**（证据在流程记录中，用户未反对）。

### 二、测出并修掉的 4 个缺陷（`css/main.css` 39,112 → 40,335 B）

| # | 缺陷 | 修法 |
| --- | --- | --- |
| 1 | 点锚点时标题被 69px 吸顶页头盖住 | 新增 `.cta { scroll-margin-top: 78px; }` |
| 2 | 手机上锚点同样被盖 | ≤720 新增 `.section { scroll-margin-top: 20px; }` |
| 3 | 手机点按区域 < 44px 共 11 处（导航胶囊 42 / 邮件按钮 37 / 页脚链接 26×25） | `.chip, .mail-row .btn-sm, .footer-links a, .fb-side-foot a { min-height: 44px }` + inline-flex 居中 → 降到 6 处（页头 3 + 页脚 3 个文字链接，满足 WCAG 2.5.8 例外） |
| 4 | **iOS 聚焦自动放大**：输入控件 < 16px 的修复规则写在样式表中段，被后面的媒体查询覆盖而失效（实测仍 8 处 < 16px） | 把「≤720 输入控件 16px」规则**移到样式表最末尾**（第 20 节）→ 8 → **0** 处 |

修复后复测：锚点 1440/720/430/390 全部落点正确（内容顶 74–78px、回顶 `scrollY=0`）、输入 <16px = 0、点按 <44 = 6；**6 个宽度页高与修复前完全一致**（5391 / 6039 / 6696 / 7150 / 7456 / 8297），零回退。

### 三、图片转 WebP（q=0.85）

| 素材 | 原格式 | 原大小 | WebP | 变化 | PSNR |
| --- | --- | --- | --- | --- | --- |
| `april-violin-piano` 841×1870 | `.jpg` | 267,297 | **193,634** | −27.6% | 41.6 |
| `dragon-portrait` 1080×528 | `.png` | 305,982 | **11,466** | −96.3% | 48.5 |
| `agent-v2` 512×512 | `.png` | 234,158 | **29,118** | −87.6% | 38.4 |
| `identity-portrait` 216×384 | `.png` | 143,719 | **15,924** | −88.9% | 40.4 |
| `agent-avatar` 192×192 | `.png` | 60,085 | **9,698** | −83.9% | 36.6 |
| **合计** | — | **1,011,241 B** | **259,840 B** | **−74.3%** | ≥36.6 |

- alpha 平均差 **0.00**；引用改动 **11 处**（`index.html` 7 / `css/main.css` 1 / `pages/` 各 1）；断言站内无 `.png|.jpg|.jpeg` 图片引用残留。
- 换图后整页重测：溢出 0、坏图 0、页高与换图前**完全一致**、6 张图自然尺寸与原图逐一相同。**首屏桌面 1068.8 KB → 337.9 KB（−68.4%）**。
- 原图保留在 `版本存档/V5-回归修复与图片优化/原始位图/`（5 张 988 KB），备份另在 `.deepworks/tmp/figs_src_v4/`。

### 四、反馈通道改为自动识别（`js/feedback-config.js` 1,887 → 3,593 B）

- 新增 `window.pickFeedbackMode(hostname, protocol)`：`file:` 与公网域名 → `supabase`；`localhost` / `127.0.0.1` / `::1` / `[::1]` / `0.0.0.0` / `192.168.*` / `10.*` / `172.16–31.*` → `local`；`mode: window.pickFeedbackMode(location.hostname, location.protocol)`。
- 单测 **9/9** 通过；本机真实填表提交 → 落库字段正确 + 三段状态文案正确（测试行 id=12 已自删）。
- 收尾更正 `js/feedback.js` 头部注释（8,444 → 8,485 B）：原写「数据通道两选一」→ 改「按运行环境自动识别」，并去掉注释里的本机数据库文件名（发布前必查首次命中 2 处就在这两个文件的注释里）。**逻辑零改动**，改后重跑 9/9 + 真实提交（id=13 已自删）结果一致。
- 历史事实（本轮已解决，见「第 33 次讨论」）：当时 **Supabase 项目 `knvgdbyzckdoiukafsrh`** 被用户确认「已暂停或不存在」→ 线上提交必然失败（前端**如实提示失败**，不假成功）；本机 DNS 对该域名全 NXDOMAIN（8.8.8.8 / 1.1.1.1 同样、DoH 被掐、常见代理端口 closed）。**教训（重要）**：对 `*.supabase.co` 全 NXDOMAIN 不是本地网络问题，而是**该项目的 DNS 已被 Supabase 撤下（项目被删/暂停过久）**；项目 2026-10-02 恢复为 Active 后，同一台机器上 DNS 立刻恢复正常解析（104.18.38.10 / 172.64.149.246），URL 与 anon key 都无需改动。

### 五、版本标记 / CLS / 清理

- `index.html` **25,925 → 25,975 B（+50）**：页脚改「（第五版）」；`agent-v2.webp` 的 2 处 `<img class="avatar-pic">`（第 244、469 行）补 `width="512" height="512"`（纯 CLS 提示，`css/main.css:678` 的 `.avatar-pic{width:100%;height:100%;object-fit:cover;object-position:50% 24%;transform:scale(1.14)}` 不变 → 视觉零变化）。
- 二级页页脚改「（第五版）」：`about.html` 3,976 / `blog.html` 3,644（含正文「现在到第五版。」）/ `projects.html` 3,439。
- **`pages/projects.html` 正文「第四版重点改的是内容 ——」有意保留**：第五版改的是图片与回归缺陷、不是内容，改成「第五版」会变假话（已在 README / 清单 / 归档说明中说明）。
- 本地 `db/feedback.db` 删去 id=10、id=11 两条测试行 → **仅剩 id=2「可以可以」**（备份 `.deepworks/tmp/feedback.db.before-clean-20261001-205036.bak`）。
- 未改动：文案内容（除版本号）、页面结构、`js/main.js` / `js/go-board.js` / `content/*.md` / `assets/vendor/*` / 图标 / **服务端与数据库脚本**（5 个文件与 V4 逐字节一致）；`js/feedback.js` 仅改了注释（见第四节），逻辑未动。

### 六、交付与校验

| 项目 | 结果 |
| --- | --- |
| 归档 | `版本存档/V5-回归修复与图片优化/`：`备份/` **29** 文件（与线上 29 个站点文件逐一比对，无缺无多）+ `服务端源码/` 5（与 V4 逐字节一致）+ `完整截图/` 2 + `原始位图/` 5 + `归档说明.md` |
| 截图 | `V5-桌面端截图.png` 1440×5391 / 2,831,495 B / `EAEDA2C3E2BDBB66A32478584503E80D`；`V5-手机端截图.png` 390×7456 / 1,317,648 B / `9CEF347699910486189FF83C06AB621C`；**归档 / 提交区 / 预览三处 MD5 一致** |
| 二级页截图 | `outputs/第五版-预览/二级页/` 6 张：about 1440×1252 / 390×1436、blog 1440×1189 / 390×1344、projects 1440×1028 / 390×1195 |
| 单文件版 | `outputs/棋路漫漫-个人主页-单文件版.html` **791,188 B / `0370D3DD3D3F0855C5224356ED6FF498`**；内联 1 个 `<style>` + 4 个 `<script>` + 5 张图（`data:image` 8 处）+ 12 个内联 `<svg>`；正文本地引用仅 3 个 `pages/*.html` 导航链接、外链 0；与源页面 1440 宽逐像素差 **0.22%**（差异全部落在两处动效：首屏 `.avatar-float` 浮动 ±9px、右下 `.fabPulse`）；数字分身 4 问全对 |
| `outputs/源码/` | **27 个站点文件**（= 站点实际引用的全部文件，不含仓库级 `README.md` / `opencode.jsonc`；二次同步：更新 2 = `feedback-config.js` + `feedback.js`）+ 单文件版副本（MD5 一致）= **28 文件**；V4 时代 2 张旧位图**已按用户确认移出**到 `.deepworks/tmp/leftover_v4_imgs/`（未删除、MD5 一致可取回） |
| 发布前必查 | 站点 22 个文本文件扫描 `uploads/` / `.deepworks/` / `版本存档/` / `作业提交区/` / `outputs/` / 本机 db 与令牌文件 → 首次 2 处命中（上述两条 JS 注释）、改后 **0 处**；位图残留 0 处（`.deepworks/tmp/prepublish_check_v5.py`） |
| 文档 | `README.md` 改写（V5 段 + 体积表 + 目录清单 + 自动识别说明）、`outputs/第五版-内容改动清单.md` 新建、`版本存档/V5-*/归档说明.md` 新建 |

### 七、关键踩坑（下一轮必读）

1. **本版截图方法与 V4 不同**：无头 Edge 会把窗口宽度**钳到 1410（请求 1440）与 504（请求 390/430）**——V4 的「1440×5323 / 504×6555」截图其实**不是 1440 与 390**。V5 改用「外层页面放**精确宽度 iframe**（CSS 宽 = 目标宽，位于 0,0）→ 整窗截图 → GDI+ 裁左侧目标尺寸」，才拿到真实 1440 / 390。
2. **测页高不能读 iframe 的 `documentElement.scrollHeight`**（至少等于 iframe 视口高 → 恒返回 12000 假值）→ 改为遍历 `querySelectorAll("*")` 取 `getBoundingClientRect().bottom` 最大值 + `body` 兜底 + `Math.ceil(...+2)`。
3. **`file://` iframe 不能被 http 父页面加载**（本地资源被拦）→ 校验单文件版时必须**父页面也用 `file://`**，否则会出现全页级假差异。
4. **Python bytes 字面量不支持 `\u` 转义**（`b"\u00a9"` 是反斜杠+u）→ 中文一律写普通 `str` 后 `.encode("utf-8")`。
5. **视觉理解模型本轮仍严重不可靠**：把页脚读成 2025、把「蓝喜阳」读成蓝喜鹊、多次「无法读取图片内容」→ **判定一律以像素 / DOM 实测为准**。
6. 本地服务曾停 → 用 `.deepworks/tmp/start_server.cmd`（独立控制台 `python -u server.py --port 8000`）重启；进程里 14 个 `msedge.exe` 全非无头 = 用户自己的浏览器，**禁止 kill**；无头截图偶发挂起 300s，已加重试（3×150s），长命令用 `python -u` + 分批，避免看起来像卡死。

### 八、本版遗留（交给下一轮 / 用户决定）

- **已推送**（2026-10-02）：`main` = `76a18ab`（提交信息「第四、五版：内容精简与背景大图，六项回归修复与 WebP 图片优化」），`push` 成功 `065d717..76a18ab`；线上 <https://qilumanman.github.io/> 首页 **25,975 B 与本地逐字节一致**，`assets/images/figures/agent-v2.webp` 线上 200 / 29,118 B。
- **线上反馈已恢复**（2026-10-02）：Supabase 项目由 Paused 恢复为 Active，URL 与 anon key 未变，无需改代码；三项实测见「第 33 次讨论」。
- 低优先版式小项（本轮未做）：品牌副标题 11.5px 是否提到 12px；首屏 Bento 卡是否再紧凑；「脑机接口」卡是否加 EEG 波形装饰；`📍 深圳` 是否换 Lucide `map-pin`（去 Emoji）。
- `outputs/源码/` 内 2 个 V4 时代旧位图**已按用户确认清理**（移入 `.deepworks/tmp/leftover_v4_imgs/`，未删除、MD5 一致可随时取回）→ 现 `outputs/源码/` = **28 文件**（27 站点文件 + 单文件版副本）；`outputs/预览/` 旧图、`outputs/第四版-内容对照表.xlsx` 是否重出仍未定。
- V5 归档说明已记录一处版本遗留不一致：V4 归档写的 `index.html` = 37,952 B，而 V4 定稿当轮构建脚本文档里出现过 22,522（那是**字符数**不是字节数）等不同口径，V5 一律以**本轮实测值**为准。

## 第 33 次讨论：交付形态升级 —— 发布 V5 + 恢复线上通道 + 改交「英文报告 PDF」

### 一、触发：作业要求变了（用户上传要求截图，2026-10-02）

新要求共 3 条（英文原文要点）：

1. **提交已发布个人主页的链接**（明确注明「actual digital twin function not required」——不要求真的做出数字孪生）。
2. **提交一份报告（pdf preferred）**，内容包括但不限于：
   - **a) Development history** —— 各版本记录 + 截图；
   - **b) Major functions added or modified** —— 需说明 **sources of idea**；
   - **c) Problems occurred and solved** —— 要讲清 **why and how**；
   - **d) Feedbacks collected and decision-making** —— 含 **reasons and discussion**。
3. **文件名格式**：`Firstname Lastname_Personal Homepage.pdf`。

**结论（架构级）**：`作业提交区/02-对话记录/对话记录.md`（28 次讨论、136 KB）**不再是交付物**，降级为**报告素材/附录**；交付物改为「线上链接 + 提炼过的报告」。

### 二、用户本轮 6 项决定（question 结构化回答，勿再自行更改）

| 问题 | 用户选择 |
| --- | --- |
| 报告语言 | **英文** |
| 发布哪个版本 | **发布第五版** |
| 线上反馈表单（Supabase 已暂停） | **重建/恢复 Supabase 项目修好** |
| 报告文件名用名 | **`Lan Xiyang`**（中文习惯「姓 名」拼音；与要求里 Firstname Lastname 的顺序相反，已向用户说明，最终以用户选择为准） |
| 报告篇幅 | **精简版 8–14 页** |
| 「想法来源」主要出处（多选） | **课程作业要求**（另需逐功能确认，见遗留） |

### 三、执行结果一：发布第五版成功

- `git add -A` 已暂存 **19 个文件**（14 改 + 5 新增 `assets/images/figures/*.webp`）；提交 `76a18ab`，推送 `065d717..76a18ab`，`main...origin/main` 已同步。
- **发布前令牌扫描配方（务必照抄）**：`$tok = (Get-Content db/admin_token.txt -Raw).Trim()` → 遍历 `git ls-files` 逐文件 `Get-Content -Raw -Encoding UTF8` → `$c.Contains($tok)`；**命中必须为 0** 才推。本次 0 命中（命中的 `admin_token` 字样都只是"路径说明文字"）。另扫 `BEGIN (RSA|OPENSSH) PRIVATE KEY|service_role|sk-[A-Za-z0-9]{20,}` → 仅文档措辞命中，无真实密钥。
- **提交信息必须走 `-F` 文件**：PowerShell 5.1 直接把中文当参数传给 `git commit -m` 会按系统中编码（936）编码 → 消息乱码；改用 write 工具写 UTF-8 消息文件 + `git commit -F .deepworks/tmp/commit_msg.txt`（`git log --format=%B` 复核正常）。
- **线上保真核验**：`Invoke-WebRequest https://qilumanman.github.io/` 读 `RawContentStream.ToArray()` + 显式 UTF-8 解码，比对**字节数 = 本地 25,975 B** 并检索「第五版」与 `april-violin-piano.webp`；首次尝试仍是旧版（37,063 B），**第 2 次（约 25 秒后）即为新版** → GitHub Pages 构建有延迟，必须**轮询**而不是测一次就下结论。`push` 时设 `$env:GIT_TERMINAL_PROMPT="0"` 可避免凭据提示挂死。

### 四、执行结果二：Supabase 线上通道恢复（URL/key 未变，代码零改动）

- 用户在控制台把旧项目 `knvgdbyzckdoiukafsrh` 由 **Paused 恢复为 Active**（免费版暂停后一般在 90 天内可恢复）→ **URL 与 anon key 都没变**，`js/feedback-config.js` 的 `supabaseUrl` / `supabaseAnonKey` **一行都不用改**。
- 同一台机器上 **DNS 立刻恢复正常**（104.18.38.10 / 172.64.149.246）—— 反证此前的全 NXDOMAIN 是「项目被撤下 DNS」，不是本机网络/代理问题。
- **线上通道三探针配方（可复用）**：`POST {url}/rest/v1/feedback` + 头 `apikey` / `Authorization: Bearer <anon key>`：
  1. **真实写入**（合法 body）→ 期望 **HTTP 201** = 线上能收信；
  2. **故意空正文**（`{"message":"","category":"other","status":"new"}`）→ 期望 **HTTP 400 / 23514 ck_feedback_message** = 表、字段约束、表级授权都在位，且**不写脏数据**；
  3. **匿名读取**（`GET /rest/v1/feedback?select=id`）→ 期望 **HTTP 401 / 42501 permission denied for table feedback** = "只写不读"的隐私策略完好。
  本次三条全部符合预期。⚠️ 探针 1 会真实留下 1 行 `DeepWorks self-test` 测试留言（已告知用户可在 Table Editor 删除）。
- ⚠️ **`curl.exe --doh-url` 本机不可用**（返回 `000000`，curl 版本/参数不兼容）→ 一律用 `Invoke-WebRequest` 显式 UTF-8 解码，不要依赖 curl 的 DoH。

### 五、文档同步（本轮已改）

- `js/feedback-config.js` 头部「⚠️ 当前云端状态」整段改写为「✅ 已恢复 + 三项实测数值」（这是**会被发布的站点文件**，过时陈述必须清掉）。
- `README.md`：45 行「线上反馈目前收不到」→「线上反馈已恢复可用（含 201 / 400 / 401 实测）」；第 50 行「未发布」→「已发布（`065d717..76a18ab`，线上 25,975 B 逐字节一致）」。
- `SKILL.md`：第 32 次讨论第四节的历史陈述标注为「本轮已解决」并补 DNS 教训；第八节遗留两项改写为已推送 / 已恢复；新增本节。
- 仍需同步：`outputs/第五版-内容改动清单.md`、`版本存档/V5-*/归档说明.md`、`作业提交区/02-对话记录/对话记录.md`。
- 记一个环境坑：**`.ps1` 被执行策略拦截**（`UnauthorizedAccess`）→ 必须 `powershell -NoProfile -ExecutionPolicy Bypass -File "<脚本>"` 调用，不能直接 `& script.ps1`。

### 六、本轮遗留（交给下一轮）

- **英文报告 PDF 尚未生成**：目标 `Lan Xiyang_Personal Homepage.pdf`，精简版 8–14 页，四节结构 a/b/c/d；计划用「写 HTML → Edge 无头 `--print-to-pdf`」出 PDF（本机无 LaTeX/PIL/Node，但 Edge 可直接打印 PDF，能带中文与截图）。
- **b) 节「想法来源」需逐功能确认**：用户只勾了「课程作业要求」，其余（数字分身、围棋落子、意见反馈 + 后台、二级页、背景大图、WebP 优化、自动识别通道）尚未逐个定源。
- 报告可复用素材：`对话记录.md` 第 1–33 次、`outputs/第五版-内容改动清单.md`、各版 `归档说明.md`、`作业提交区/01-截图/`（第一至第五版）、本 SKILL 各版指纹。
- 上一轮未决项照旧：`outputs/预览/` 旧图清理、`outputs/第四版-内容对照表.xlsx` 是否重出、3 条低优先版式小项、01 区是否补真实素材。

## 新对话启动流程

当用户在新对话中要求继续该项目时：

1. 加载本 `project-memory` 技能。
2. 读取 `作业提交区/02-对话记录/对话记录.md` 了解最近进度。
3. 读取 `README.md` 确认目录结构。
4. 基于「版本 / 进度状态」向用户确认当前版本与要做的内容，再继续工作。

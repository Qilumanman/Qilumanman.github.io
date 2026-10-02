/* ============================================
   蓝喜阳 · 个人主页
   意见反馈 —— 数据通道配置
   ============================================

   本文件自动识别运行环境，**发布前不需要手改任何一行**：

     · 本地预览（http://127.0.0.1:8000/ 或局域网地址）
       → 自动走本机接口，数据落到本机 SQLite（python server.py 提供）
     · 线上发布（qilumanman.github.io 等）
       → 自动走 Supabase 云数据库，匿名角色只有 insert 权限，读不到任何留言
     · 双击 index.html（file:// 打开）
       → 走云数据库（本机接口是相对路径，file:// 下用不了）

   判断逻辑见下方 pickMode()：只看主机名，本地/局域网 → local，其余 → supabase。
   想强制指定通道，把 mode 改成 "local" 或 "supabase" 即可（不推荐）。

   ⚠️ 当前云端状态（重要）：
      作者已确认 Supabase 项目「已暂停或不存在」。
      也就是说：线上通道现在**提交不了**，访客会看到页面自己的失败提示
      （js/feedback.js 不会假报成功，文案是「提交没成功」一类，不会误导访客）。
      要让线上反馈真正可用，需要先到 supabase.com 恢复/重建项目，
      再把下面的 supabaseUrl / supabaseAnonKey 换成新项目的值，
      并在 SQL Editor 执行 db/supabase_feedback.sql（建表 + 只给匿名角色 insert 权限）。

   隐私约定（重要）：
     页面【只写不读】—— 前端不调用任何读取接口，
     访客无法查看、修改、删除别人的反馈。
     反馈只有作者本人在后台（本机 /admin，或 Supabase 控制台 Table Editor）能看到。
     发布版靠数据库 RLS 保证：匿名角色只被授予 insert 权限，没有任何 select 权限，
     详见 db/supabase_feedback.sql。
   ============================================ */

/* 通道判断：纯函数，只依赖主机名与协议，便于单独验证。
   hostname 形如 "127.0.0.1" / "localhost" / "qilumanman.github.io" */
window.pickFeedbackMode = function (hostname, protocol) {
  var h = String(hostname || "").toLowerCase();
  var p = String(protocol || "").toLowerCase();

  /* file:// 打开时没有可用的相对接口地址，交给云数据库 */
  if (p === "file:") return "supabase";

  /* 本机 */
  if (h === "localhost" || h === "127.0.0.1" || h === "::1" || h === "[::1]" || h === "0.0.0.0") return "local";

  /* 局域网（用手机连电脑预览时常见） */
  if (/^192\.168\./.test(h)) return "local";
  if (/^10\./.test(h)) return "local";
  if (/^172\.(1[6-9]|2[0-9]|3[01])\./.test(h)) return "local";

  /* 其余一律走线上数据库 */
  return "supabase";
};

window.FEEDBACK_CONFIG = {
  /* "local" = 本机接口（本地预览） | "supabase" = 线上数据库（发布后）
     默认自动判断；如需强制，直接改成字符串 "local" 或 "supabase"。 */
  mode: window.pickFeedbackMode(window.location.hostname, window.location.protocol),

  /* mode = "local" 时使用：由 server.py 提供 */
  apiBase: "/api/feedback",

  /* mode = "supabase" 时使用（已填好）。
     这两项本来就是公开信息：它随网页源码一起发给每一位访客，
     所以放进仓库是设计如此，不算泄露。 */
  supabaseUrl: "https://knvgdbyzckdoiukafsrh.supabase.co",
  supabaseAnonKey: "sb_publishable_W453eTTOmcV7ArpgYioR3w_45A18HbT",
  table: "feedback",

  /* 标记这条反馈来自哪个页面 */
  page: "index.html"
};

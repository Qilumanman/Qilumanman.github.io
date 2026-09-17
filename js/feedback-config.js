/* ============================================
   蓝喜阳 · 个人主页（第三版）
   意见反馈 —— 数据通道配置
   ============================================

   这个文件是唯一需要改动的配置点。

    ① 线上发布（当前状态：已启用）
      mode: "supabase"
      数据直接写进 Supabase 云数据库，匿名角色只有 insert 权限，
      读不到任何留言；作者本人到 Supabase 控制台 Table Editor 查看。

    ② 本地预览（备用）
      mode: "local"
      数据落到本机 db/feedback.db，由 python server.py 提供接口。
      必须通过 server.py 启动的地址访问（如 http://127.0.0.1:8000/），
      直接双击打开 index.html 是连不上接口的。

   隐私约定（重要）：
     页面【只写不读】—— 前端不调用任何读取接口，
     访客无法查看、修改、删除别人的反馈。
     反馈只有作者本人在后台（本机 /admin，或 Supabase 控制台 Table Editor）能看到。
     发布版靠数据库 RLS 保证：匿名角色只被授予 insert 权限，没有任何 select 权限，
     详见 db/supabase_feedback.sql。
   ============================================ */

window.FEEDBACK_CONFIG = {
  /* "local" = 本机接口（本地预览） | "supabase" = 线上数据库（发布后） */
  mode: "supabase",

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

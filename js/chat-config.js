/* ============================================
   数字分身 · 接口配置（期末版）
   双模式，与 feedback-config.js 同思路：
     mode "local"  → 走本地 python server.py 的 /api/chat
     mode "cloud"  → 走阿里云函数计算代理（部署后填 URL）
   ============================================ */
(function () {
  "use strict";

  var config = {
    mode: "cloud", // "local" | "cloud"
    apiBase: "/api/chat",
    cloudUrl: "https://avatar-chat-cozaidhpqu.cn-shenzhen.fcapp.run/api/chat", // 阿里云 FC 云函数（2026-11-12 部署）
  };

  window.CHAT_CONFIG = {
    // 访客页面实际请求的地址
    get apiBase() {
      return config.mode === "cloud" ? config.cloudUrl : config.apiBase;
    },
  };
})();

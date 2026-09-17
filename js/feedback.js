/* ============================================
   蓝喜阳 · 个人主页（第三版新增）
   意见反馈 —— 前端逻辑
   ------------------------------------------------------------
   · 访客无需注册、无需登录即可提交反馈
   · 页面【只写不读】：前端没有任何读取他人反馈的接口调用，
     反馈内容只进后台，公开页面上不会显示任何人的留言
   · 数据通道两选一（见 js/feedback-config.js）：
       local    → 本机接口 POST /api/feedback（python server.py 提供，落 db/feedback.db）
       supabase → 线上 Supabase REST（发布后用；RLS 策略为匿名只可 insert、不可 select）
   · 访客要填的 5 项（第 5 项「提交时间」由后端自动生成，页面不设输入框）：
       ① 名字或昵称         -> name
       ② 与主页主人的关系    -> relation
       ③ 本条反馈针对的设备  -> device
       ④ 反馈内容           -> message
       ⑤ 提交时间           -> created_at（数据库默认当前时间）
     另有可选的 contact / category / rating，以及自动附带的 page_url / user_agent。
   · 字段与 db/schema.sql 的 feedback 表严格对应
   · 所有提示文本一律用 textContent 写入，不拼 HTML
   ============================================ */

(function () {
  "use strict";

  var CFG = window.FEEDBACK_CONFIG || {};
  var MODE = CFG.mode === "supabase" ? "supabase" : "local";

  var MAX_MESSAGE = 1000;
  var MAX_NAME = 60;
  var MAX_CONTACT = 120;
  var TIMEOUT_MS = 15000;

  var form = document.getElementById("feedbackForm");
  if (!form) return; // 页面里没有反馈区块（例如旧的单文件版）就直接退出

  var nameEl = document.getElementById("fbName");
  var relationEl = document.getElementById("fbRelation");
  var deviceEl = document.getElementById("fbDevice");
  var contactEl = document.getElementById("fbContact");
  var categoryEl = document.getElementById("fbCategory");
  var messageEl = document.getElementById("fbMessage");
  var honeypotEl = form.querySelector('[name="company"]');
  var submitBtn = document.getElementById("feedbackSubmit");
  var statusEl = document.getElementById("feedbackStatus");

  /* ---------- 通道与可用性 ---------- */

  function supabaseEndpoint() {
    var base = String(CFG.supabaseUrl || "").replace(/\/+$/, "");
    return base + "/rest/v1/" + (CFG.table || "feedback");
  }

  /* 兼容两种密钥：
     ① 旧版 anon key 是 JWT（eyJ 开头）——按官方约定同时放进 Authorization: Bearer
     ② 新版 publishable key（sb_publishable_ 开头）不是 JWT，只放 apikey 头，
        否则网关会当作无效 JWT 拒掉（401 Invalid JWT） */
  function supabaseHeaders() {
    var key = String(CFG.supabaseAnonKey || "");
    var headers = {
      apikey: key,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    };
    if (key.indexOf("eyJ") === 0) headers.Authorization = "Bearer " + key;
    return headers;
  }

  function configured() {
    if (typeof fetch !== "function") return false;
    if (MODE === "local") {
      return String(CFG.apiBase || "").length > 0;
    }
    return /^https?:\/\/.+/i.test(CFG.supabaseUrl || "") &&
      String(CFG.supabaseAnonKey || "").length > 20;
  }

  /* ---------- 小工具 ---------- */

  function setStatus(text, kind) {
    if (!statusEl) return;
    statusEl.textContent = text || "";
    statusEl.className = "fb-status" + (kind ? " is-" + kind : "");
  }

  function request(url, options) {
    var controller = window.AbortController ? new AbortController() : null;
    var opts = options || {};
    var timer = null;

    if (controller) {
      opts.signal = controller.signal;
      timer = setTimeout(function () {
        controller.abort();
      }, TIMEOUT_MS);
    }

    return fetch(url, opts).then(
      function (res) {
        if (timer) clearTimeout(timer);
        return res;
      },
      function (err) {
        if (timer) clearTimeout(timer);
        throw err;
      }
    );
  }

  function setBusy(busy) {
    if (!submitBtn) return;
    submitBtn.disabled = busy;
    submitBtn.textContent = busy ? "正在提交…" : "提交反馈";
  }

  /* ---------- 收集与校验 ---------- */

  function trim(value) {
    return String(value == null ? "" : value).replace(/^\s+|\s+$/g, "");
  }

  function collectPayload() {
    var ratingEl = form.querySelector('input[name="rating"]:checked');
    return {
      name: trim(nameEl && nameEl.value) || null,
      relation: trim(relationEl && relationEl.value) || null,
      device: trim(deviceEl && deviceEl.value) || null,
      contact: trim(contactEl && contactEl.value) || null,
      category: (categoryEl && categoryEl.value) || "other",
      rating: ratingEl ? parseInt(ratingEl.value, 10) : null,
      message: trim(messageEl && messageEl.value),
      page_url: String(location.href).slice(0, 300),
      company: honeypotEl ? honeypotEl.value : ""
    };
  }

  function validate(payload) {
    if (!payload.message) return "请先写下你的反馈内容，再提交。";
    if (payload.message.length > MAX_MESSAGE) return "内容最多 " + MAX_MESSAGE + " 字。";
    if (payload.name && payload.name.length > MAX_NAME) return "名字或昵称最多 " + MAX_NAME + " 字。";
    if (payload.contact && payload.contact.length > MAX_CONTACT) {
      return "联系方式最多 " + MAX_CONTACT + " 字。";
    }
    return null;
  }

  /* ---------- 提交 ---------- */

  function buildRequest(payload) {
    if (MODE === "local") {
      return {
        url: String(CFG.apiBase),
        options: {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      };
    }
    return {
      url: supabaseEndpoint(),
      options: {
        method: "POST",
        headers: supabaseHeaders(),
        body: JSON.stringify({
          name: payload.name,
          relation: payload.relation,
          device: payload.device,
          contact: payload.contact,
          category: payload.category,
          rating: payload.rating,
          message: payload.message,
          page_url: payload.page_url,
          user_agent: String(navigator.userAgent || "").slice(0, 300)
        })
      }
    };
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!configured()) {
      setStatus("反馈通道尚未配置，暂时无法提交。", "warn");
      return;
    }
    if (submitBtn && submitBtn.disabled) return;

    var payload = collectPayload();
    var error = validate(payload);
    if (error) {
      setStatus(error, "warn");
      if (messageEl) messageEl.focus();
      return;
    }

    var req = buildRequest(payload);
    setBusy(true);
    setStatus("正在提交…");

    request(req.url, req.options).then(function (res) {
      return res.text().then(function (body) {
        var parsed = null;
        try {
          parsed = JSON.parse(body);
        } catch (e) {
          parsed = null;
        }
        return { res: res, data: parsed };
      });
    }).then(function (out) {
      setBusy(false);
      if (out.res.ok) {
        form.reset();
        setStatus("已收到，只有我能看到。谢谢你！", "ok");
        return;
      }
      var detail = out.data && out.data.error;
      setStatus(detail || ("提交失败（HTTP " + out.res.status + "），请稍后再试。"), "err");
    }).catch(function (err) {
      setBusy(false);
      if (err && err.name === "AbortError") {
        setStatus("提交超时，请检查网络后重试，或直接给我写邮件。", "err");
      } else {
        setStatus("网络连接失败，请稍后重试，或直接给我写邮件。", "err");
      }
    });
  });

  /* ---------- 启动 ---------- */

  if (!configured()) {
    if (submitBtn) submitBtn.disabled = true;
    if (nameEl) nameEl.disabled = true;
    if (relationEl) relationEl.disabled = true;
    if (deviceEl) deviceEl.disabled = true;
    if (contactEl) contactEl.disabled = true;
    if (categoryEl) categoryEl.disabled = true;
    if (messageEl) messageEl.disabled = true;
    setStatus("反馈通道尚未配置。", "warn");
  }

  console.log(
    "[意见反馈] 已加载 · 通道=" + MODE + " · 可用=" + configured() + " · 页面只写不读"
  );
})();

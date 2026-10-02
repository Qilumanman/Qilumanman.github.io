/* ============================================
   蓝喜阳 · 个人主页 — 数字分身聊天逻辑
   第一版：基于关键词匹配的预设问答
   ============================================ */

(function () {
  "use strict";

  // 数字分身的"知识库"
  var KNOWLEDGE = {
    name: "蓝喜阳",
    intro: "天津大学 · 香港理工大学 · 深圳未来技术学院大一新生，脑机接口方向",
    school: "天津大学 · 香港理工大学 · 深圳未来技术学院 大一新生",
    doing: "这学期在学高等数学，也在用 AI 学着做一个自己的主页",
    interest: "脑机接口、前沿生物；课外是围棋、跑步、街头健身",
    trait: "颜值高，做事认真负责",
    contact: "QQ邮箱：2762858226@qq.com",
  };

  // 预设问答（优先精确关键词匹配）
  var QA = [
    {
      keys: ["成就", "做了什么", "成果", "荣誉"],
      answer: "比较拿得出手的几件事：围棋业余四段；跑步三年，累计跑量 3000 公里；街头健身的双力臂、单力臂、卷腹上杠都不在话下。学业上还在打基础，这学期主攻高等数学。💪",
    },
    {
      keys: ["技能", "擅长", "一句话", "概括"],
      answer: "一句话概括：会下棋（业余四段）、能跑能练，现在主攻高等数学，也在用 AI 学着做一个自己的主页。🧠",
    },
    {
      keys: ["学习方式", "学习方法", "怎么学", "如何学", "学什么", "学习", "这学期"],
      answer: "这学期主要是啃高等数学：先把概念和推导捋清楚，再回头做题；卡住的地方先自己查、自己推，再去问同学。另外，我还在用 AI 一点点搭自己的主页——你看到的这个页面，就是边学边做的成果。📚",
    },
    {
      keys: ["联系", "联系方式", "怎么", "找到", "邮箱", "qq", "QQ"],
      answer: "可以通过 QQ 邮箱联系我：2762858226@qq.com 📮 欢迎交流！",
    },
    {
      keys: ["学校", "大学", "学院", "天津", "香港", "深圳", "身份", "专业", "哪里"],
      answer: "我就读于天津大学 · 香港理工大学 · 深圳未来技术学院，是大一新生，主攻脑机接口专业。🎓",
    },
    {
      keys: ["兴趣", "喜欢", "关注", "方向", "领域", "生物", "脑机"],
      answer: "专业上我关注脑机接口和前沿生物；课外最喜欢下围棋和练街头健身。🧠",
    },
    {
      keys: ["围棋", "棋", "爱好", "兴趣", "喜欢什么"],
      answer: "我下围棋，业余四段⚫⚪ 平时经常关注围棋比赛，有空也会在网上下几盘。网名「棋路漫漫」就是从这儿来的～",
    },
    {
      keys: ["健身", "街健", "锻炼", "运动", "撸铁", "力量"],
      answer: "我练街头健身🏋️ 双力臂、单力臂、卷腹上杠都不在话下，现在正在解锁前水平。",
    },
    {
      keys: ["跑步", "跑量", "跑", "马拉松", "夜跑"],
      answer: "跑步我坚持了三年，累计跑量 3000 公里，最长一次跑过十公里。🏃",
    },
    {
      keys: ["棋路", "网名", "名字含义", "签名", "id", "ID", "漫漫"],
      answer: "我的网名是「棋路漫漫」⚫⚪ 取自个性签名「棋路漫漫兮，吾将上下而求索」——源自屈原《离骚》，寓意求索之路漫长，而我愿不断探寻。",
    },
    {
      keys: ["在做什么", "最近", "近况", "事情", "现状"],
      answer: "最近主要在做三件事：啃高等数学、用 AI 搭自己的主页、备战英语四级。另外还在坚持健身和跑步。📚",
    },
    {
      keys: ["特点", "记忆点", "吸引", "优点", "负责", "颜值"],
      answer: "嗯…让我比较有记忆点的特点是：颜值高，而且工作态度负责。😊 这两点都挺让人印象深刻的。",
    },
    {
      keys: ["是谁", "你", "介绍", "自我介绍", "名字", "who"],
      answer: "我是蓝喜阳的数字分身！本尊是大一新生，脑机接口方向，业余四段棋手，也爱跑步和街头健身。很高兴认识你～",
    },
    {
      keys: ["年龄", "几岁", "年级"],
      answer: "我是大一新生，今年刚进入天津大学香港理工大学深圳未来技术学院。🎓",
    },
  ];

  var DEFAULT_ANSWER =
    "这个问题我还在学习中～我是蓝喜阳的数字分身，你可以问我：成就、擅长的技能、如何去联系他，或者关于学校和兴趣哦 😊";

  var chatWindow = document.getElementById("chatWindow");
  var chatForm = document.getElementById("chatForm");
  var chatInput = document.getElementById("chatInput");
  var suggestions = document.getElementById("chatSuggestions");

  // 添加消息
  function addMessage(text, isUser) {
    var msg = document.createElement("div");
    msg.className = "msg" + (isUser ? " msg-user" : "");
    var bubble = document.createElement("div");
    bubble.className = "bubble " + (isUser ? "bubble-user" : "bubble-ai");
    bubble.textContent = text;
    msg.appendChild(bubble);
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    return bubble;
  }

  // 匹配回答
  function getAnswer(question) {
    var q = question.toLowerCase();
    for (var i = 0; i < QA.length; i++) {
      for (var j = 0; j < QA[i].keys.length; j++) {
        if (q.indexOf(QA[i].keys[j].toLowerCase()) !== -1) {
          return QA[i].answer;
        }
      }
    }
    return DEFAULT_ANSWER;
  }

  // ============================================
  // 微特效 3：聊天文字的打字机特效（逐字输出 + 闪烁光标）
  // ============================================
  var typeTimer = null;
  var typingBubble = null;
  var typingFull = "";

  // 把上一条还没打完的消息立即补全
  function finishTyping() {
    if (typeTimer) {
      clearInterval(typeTimer);
      typeTimer = null;
    }
    if (typingBubble) {
      typingBubble.textContent = typingFull;
      typingBubble.classList.remove("is-typing");
      typingBubble = null;
      typingFull = "";
    }
  }

  function typeMessage(bubble, text) {
    // 尊重系统「减少动态效果」偏好：直接整段显示
    var reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      bubble.textContent = text;
      chatWindow.scrollTop = chatWindow.scrollHeight;
      return;
    }

    finishTyping();

    var chars = Array.from(text);
    // 长句自动提速，保证整段输出不超过约 1.6 秒
    var speed = Math.max(14, Math.min(30, Math.round(1600 / Math.max(1, chars.length))));
    var i = 0;

    typingBubble = bubble;
    typingFull = text;
    bubble.textContent = "";
    bubble.classList.add("is-typing");

    typeTimer = setInterval(function () {
      i += 1;
      bubble.textContent = chars.slice(0, i).join("");
      if (i % 3 === 0) chatWindow.scrollTop = chatWindow.scrollHeight;
      if (i >= chars.length) {
        clearInterval(typeTimer);
        typeTimer = null;
        bubble.classList.remove("is-typing");
        typingBubble = null;
        typingFull = "";
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }
    }, speed);
  }

  // 发送并回复（"正在思考" → 打字机逐字输出）
  function ask(question) {
    if (!question.trim()) return;
    addMessage(question.trim(), true);
    var bubble = addMessage("正在思考中", false);
    bubble.classList.add("typing");
    setTimeout(function () {
      bubble.classList.remove("typing");
      typeMessage(bubble, getAnswer(question));
    }, 600);
  }

  // 表单发送
  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var q = chatInput.value;
    ask(q);
    chatInput.value = "";
  });

  // 推荐问题点击
  if (suggestions) {
    suggestions.addEventListener("click", function (e) {
      if (e.target.classList.contains("chip")) {
        ask(e.target.textContent);
      }
    });
  }

  // ============================================
  // 数字分身互动 1：点按 / 触摸形象 → 挥手打招呼
  // 数字分身互动 2：点一下还会跳一段「铁山靠」舞蹈
  // （桌面端鼠标悬停的挥手由 CSS :hover 自动触发）
  // ============================================
  var avatarSvg = document.querySelector(".avatar-svg");
  if (avatarSvg) {
    var waveTimer = null;
    var danceTimer = null;
    avatarSvg.addEventListener("click", function () {
      // ① 挥手打招呼
      avatarSvg.classList.add("is-waving");
      clearTimeout(waveTimer);
      waveTimer = setTimeout(function () {
        avatarSvg.classList.remove("is-waving");
      }, 1600);

      // ② 铁山靠：蓄力 → 两连靠 → 收势小跳，2.2s 后自动复位
      avatarSvg.classList.remove("is-dancing");
      avatarSvg.getBoundingClientRect(); // 强制重排：连点也能重新起跳
      avatarSvg.classList.add("is-dancing");
      clearTimeout(danceTimer);
      danceTimer = setTimeout(function () {
        avatarSvg.classList.remove("is-dancing");
      }, 2200);
    });
  }

  // ============================================
  // 棋盘互动：鼠标移到棋盘上 → 盘侧浮现「欢迎切磋」
  // （CSS .go-board-frame:hover ~ .go-board-cheer 已可触发；
  //   再给父级加 is-sparring，兜底触屏 / 程序化触发）
  // ============================================
  var goStage = document.querySelector(".go-board-stage");
  var goFrame = document.querySelector(".go-board-frame");
  if (goStage && goFrame) {
    goFrame.addEventListener("pointerenter", function () {
      goStage.classList.add("is-sparring");
    });
    goFrame.addEventListener("pointerleave", function () {
      goStage.classList.remove("is-sparring");
    });
  }

  // ============================================
  // 微特效 1：鼠标跟随光晕卡片（Glow Card / Spotlight）
  // 把光标相对卡片的坐标写进 CSS 变量 --mx / --my，
  // 由 CSS 的径向渐变同时点亮卡片背景与边框
  // ============================================
  var glowCards = document.querySelectorAll(".glow-card");
  Array.prototype.forEach.call(glowCards, function (card) {
    card.addEventListener(
      "pointermove",
      function (e) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - rect.left + "px");
        card.style.setProperty("--my", e.clientY - rect.top + "px");
      },
      { passive: true }
    );
    // is-lit 与 :hover 双通道：CSS :hover 负责常规鼠标，is-lit 兜底
    // （触摸设备、程序化模拟等都可靠地点亮光晕）
    card.addEventListener("pointerenter", function () {
      card.classList.add("is-lit");
    });
    card.addEventListener("pointerleave", function () {
      card.classList.remove("is-lit");
      card.style.removeProperty("--mx");
      card.style.removeProperty("--my");
    });
  });

  // ============================================
  // 微特效 2：右下角 AI 数字分身悬浮头像
  // 点击平滑滚动到对话区并聚焦输入框
  // ============================================
  var aiFab = document.getElementById("aiFab");
  if (aiFab) {
    aiFab.addEventListener("click", function () {
      var anchor = document.getElementById("avatar-chat");
      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setTimeout(function () {
        if (chatInput) chatInput.focus({ preventScroll: true });
      }, 420);
    });
  }

  // ============================================
  // 浅色新风：底部 CTA「复制邮箱」按钮
  // 优先用剪贴板 API；旧环境回退到临时 textarea + execCommand
  // ============================================
  var copyEmailBtn = document.getElementById("copyEmail");
  if (copyEmailBtn) {
    var copyEmailText = copyEmailBtn.getAttribute("data-email") || "";
    var copyEmailTimer = null;

    var fallbackCopy = function (text) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "readonly");
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, text.length);
      var ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (err) {
        ok = false;
      }
      document.body.removeChild(ta);
      return ok;
    };

    var flashCopied = function () {
      copyEmailBtn.textContent = "已复制";
      copyEmailBtn.classList.add("is-copied");
      clearTimeout(copyEmailTimer);
      copyEmailTimer = setTimeout(function () {
        copyEmailBtn.textContent = "复制";
        copyEmailBtn.classList.remove("is-copied");
      }, 1600);
    };

    // 两条路径都失败时的兜底提示（不静默失败）
    var flashManual = function () {
      copyEmailBtn.textContent = "请手动复制";
      clearTimeout(copyEmailTimer);
      copyEmailTimer = setTimeout(function () {
        copyEmailBtn.textContent = "复制";
      }, 1800);
    };

    copyEmailBtn.addEventListener("click", function () {
      if (!copyEmailText) return;
      var settled = false;
      var fallback = function () {
        if (settled) return;
        settled = true;
        if (fallbackCopy(copyEmailText)) flashCopied();
        else flashManual();
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        // 无头 / 无权限时 writeText 的 promise 可能一直不 settle，
        // 所以给它 700ms 的兜底窗口，保证按钮一定有反馈。
        navigator.clipboard.writeText(copyEmailText).then(function () {
          if (!settled) {
            settled = true;
            flashCopied();
          }
        }, fallback);
        setTimeout(fallback, 700);
      } else {
        fallback();
      }
    });
  }

  console.log("[数字分身] 已加载");
})();

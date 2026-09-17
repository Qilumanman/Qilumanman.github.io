/* ============================================
   蓝喜阳 · 个人主页 — 「我的爱好」围棋组件
   ------------------------------------------------------------
   19×19 交互棋盘（HTML5 Canvas）· 双主题（浅色纸面风 / 暗色科技风）
   主题由 <html> 上是否存在 dark 类决定；浅色版为默认（纸面木色盘）
   1) 棋盘线条：浅色为墨棕细线，暗色为细微发光的冷色调（电光青）
   2) 预置棋子：黑白各若干，带微弱内阴影与高光
   3) 交互：悬停交叉点出现幽灵棋子 + 呼吸波纹；
            点击交叉点落子（缩放落下动画）+ 扩散一圈波纹
   ============================================ */

(function () {
  "use strict";

  var canvas = document.getElementById("goBoard");
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");

  // ---------- 逻辑坐标（固定 640×640，实际像素按 DPR 缩放） ----------
  var SIZE = 640;
  var N = 19; // 19 路
  var PAD = 36; // 棋盘外留白
  var STEP = (SIZE - PAD * 2) / (N - 1); // 交叉点间距
  var R = STEP * 0.46; // 棋子半径

  // ---------- 配色：按主题二选一 ----------
  var DARK = document.documentElement.classList.contains("dark");

  // 暗色科技风（第二版原配色，保留可切回）
  var C_DARK = {
    bg: ["#0C1626", "#0A1120", "#060B14"],
    halo: [
      [0, "rgba(6, 182, 212, 0.13)"],
      [0.6, "rgba(99, 102, 241, 0.05)"],
      [1, "rgba(2, 6, 23, 0)"]
    ],
    fineGrid: "rgba(14, 116, 144, 0.35)",
    fineAlpha: 0.35,
    line: "rgba(34, 211, 238, 0.22)",
    lineGlow: "rgba(6, 182, 212, 0.50)",
    lineBlur: 5,
    frame: "rgba(103, 232, 249, 0.45)",
    frameGlow: "rgba(34, 211, 238, 0.75)",
    star: "rgba(103, 232, 249, 0.75)",
    starBlur: 8,
    black: {
      hi: "#4C5A6E",
      mid: "#1B2433",
      low: "#05080F",
      ring: "rgba(0, 0, 0, 0.85)",
      glow: "rgba(56, 189, 248, 0.42)",
      glowBlur: 14,
      edge: "rgba(125, 211, 252, 0.30)"
    },
    white: {
      hi: "#FFFFFF",
      mid: "#E4ECF8",
      low: "#9FB1C8",
      ring: "rgba(120, 138, 160, 0.45)",
      glow: "rgba(186, 230, 253, 0.55)",
      glowBlur: 14,
      edge: "rgba(186, 230, 253, 0.55)"
    },
    rippleSoft: "rgba(165, 243, 252, 0.9)",
    hoverRipple: "rgba(34, 211, 238, 0.9)",
    hoverRing: "rgba(103, 232, 249, 0.85)",
    mark: "rgba(34, 211, 238, 0.95)",
    dropRipple: "rgba(34, 211, 238, 0.85)",
    log: "[围棋组件] 已加载 · 19 路暗黑科技风棋盘"
  };

  // 黄白暖色纸面风（第二版 · 黄白杂志风，默认）：木质盘面 + 琥珀金落子微光
  var C_LIGHT = {
    bg: ["#FBF1DA", "#F7E9CB", "#F1DFBB"],
    halo: [
      [0, "rgba(255, 255, 255, 0.55)"],
      [0.6, "rgba(255, 255, 255, 0.18)"],
      [1, "rgba(255, 255, 255, 0)"]
    ],
    fineGrid: "rgba(168, 138, 96, 0.20)",
    fineAlpha: 0.5,
    line: "rgba(120, 92, 56, 0.46)",
    lineGlow: "rgba(178, 146, 96, 0.28)",
    lineBlur: 2,
    frame: "rgba(110, 82, 44, 0.62)",
    frameGlow: "rgba(178, 146, 96, 0.45)",
    star: "rgba(92, 68, 36, 0.78)",
    starBlur: 3,
    black: {
      hi: "#6B7A8D",
      mid: "#2A3446",
      low: "#10161F",
      ring: "rgba(0, 0, 0, 0.5)",
      glow: "rgba(184, 121, 26, 0.20)",
      glowBlur: 8,
      edge: "rgba(184, 121, 26, 0.24)"
    },
    white: {
      hi: "#FFFFFF",
      mid: "#F1F5FA",
      low: "#C7D2DE",
      ring: "rgba(140, 155, 175, 0.45)",
      glow: "rgba(184, 121, 26, 0.16)",
      glowBlur: 8,
      edge: "rgba(160, 178, 198, 0.75)"
    },
    rippleSoft: "rgba(184, 121, 26, 0.40)",
    hoverRipple: "rgba(184, 121, 26, 0.78)",
    hoverRing: "rgba(184, 121, 26, 0.85)",
    mark: "rgba(184, 74, 26, 0.92)",
    dropRipple: "rgba(184, 121, 26, 0.72)",
    log: "[围棋组件] 已加载 · 19 路黄白暖色棋盘"
  };

  var C = DARK ? C_DARK : C_LIGHT;

  // ---------- 预置棋型（19 路坐标，左上角为 0,0） ----------
  var PRESET = [
    { c: 3, r: 3, color: "black" },
    { c: 15, r: 3, color: "white" },
    { c: 3, r: 15, color: "black" },
    { c: 15, r: 15, color: "white" },
    { c: 9, r: 9, color: "black" }
  ];

  // 星位（第 4、10、16 路）
  var STAR_AT = [3, 9, 15];

  var stones = {}; // "c,r" -> "black" | "white"
  var drops = []; // 落子动画
  var ripples = []; // 能量波纹
  var hover = null; // 当前悬停的交叉点
  var lastMove = null; // 最后一手（绘制标记）
  var nextColor = "white"; // 预置棋型之后轮到白棋

  var gridLayer = document.createElement("canvas");
  var scheduled = false;
  var now = 0;

  // ============================================
  // 坐标换算
  // ============================================
  function px(c) {
    return PAD + c * STEP;
  }

  // 逻辑坐标 -> 最近交叉点（超出吸附半径返回 null）
  function nearest(lx, ly) {
    var c = Math.round((lx - PAD) / STEP);
    var r = Math.round((ly - PAD) / STEP);
    if (c < 0 || c > N - 1 || r < 0 || r > N - 1) return null;
    var x = px(c);
    var y = px(r);
    var d = Math.sqrt((lx - x) * (lx - x) + (ly - y) * (ly - y));
    if (d > STEP * 0.62) return null;
    return { c: c, r: r, x: x, y: y };
  }

  function toLogical(clientX, clientY) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * SIZE,
      y: ((clientY - rect.top) / rect.height) * SIZE
    };
  }

  // ============================================
  // 静态层：棋盘底 + 发光冷色网格 + 星位（只绘制一次，避免重复阴影开销）
  // ============================================
  function buildGridLayer() {
    var w = canvas.width;
    var h = canvas.height;
    gridLayer.width = w;
    gridLayer.height = h;

    var g = gridLayer.getContext("2d");
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.scale(w / SIZE, h / SIZE);

    // 底色：浅色为纸面木色，暗色为深空蓝 → 近黑
    var bg = g.createLinearGradient(0, 0, SIZE, SIZE);
    bg.addColorStop(0, C.bg[0]);
    bg.addColorStop(0.55, C.bg[1]);
    bg.addColorStop(1, C.bg[2]);
    g.fillStyle = bg;
    g.fillRect(0, 0, SIZE, SIZE);

    var halo = g.createRadialGradient(SIZE * 0.5, SIZE * 0.42, 0, SIZE * 0.5, SIZE * 0.42, SIZE * 0.62);
    for (var hi = 0; hi < C.halo.length; hi++) {
      halo.addColorStop(C.halo[hi][0], C.halo[hi][1]);
    }
    g.fillStyle = halo;
    g.fillRect(0, 0, SIZE, SIZE);

    // 细网格（交叉辅助线，更淡，仅作底纹）
    g.save();
    g.globalAlpha = C.fineAlpha;
    g.strokeStyle = C.fineGrid;
    g.lineWidth = 0.5;
    for (var i = 0; i <= N; i++) {
      var m = PAD + (i - 0.5) * STEP;
      g.beginPath();
      g.moveTo(m, PAD - STEP * 0.5);
      g.lineTo(m, SIZE - PAD + STEP * 0.5);
      g.moveTo(PAD - STEP * 0.5, m);
      g.lineTo(SIZE - PAD + STEP * 0.5, m);
      g.stroke();
    }
    g.restore();

    // 19 路棋线：细微发光冷色调
    g.save();
    g.strokeStyle = C.line;
    g.lineWidth = 1;
    g.shadowColor = C.lineGlow;
    g.shadowBlur = C.lineBlur;
    for (var k = 0; k < N; k++) {
      var v = px(k);
      g.beginPath();
      g.moveTo(v, PAD);
      g.lineTo(v, SIZE - PAD);
      g.stroke();
      g.beginPath();
      g.moveTo(PAD, v);
      g.lineTo(SIZE - PAD, v);
      g.stroke();
    }
    g.restore();

    // 外框加重
    g.save();
    g.strokeStyle = C.frame;
    g.lineWidth = 1.6;
    g.shadowColor = C.frameGlow;
    g.shadowBlur = DARK ? 12 : 3;
    g.strokeRect(PAD, PAD, SIZE - PAD * 2, SIZE - PAD * 2);
    g.restore();

    // 星位
    g.save();
    g.fillStyle = C.star;
    g.shadowColor = C.frameGlow;
    g.shadowBlur = C.starBlur;
    for (var a = 0; a < STAR_AT.length; a++) {
      for (var b = 0; b < STAR_AT.length; b++) {
        g.beginPath();
        g.arc(px(STAR_AT[a]), px(STAR_AT[b]), 3, 0, Math.PI * 2);
        g.fill();
      }
    }
    g.restore();
  }

  // ============================================
  // 棋子：微弱内阴影 + 高光
  // ============================================
  function drawStone(x, y, color, alpha, scale) {
    var p = color === "black" ? C.black : C.white;
    var r = R * (scale || 1);

    ctx.save();
    ctx.globalAlpha = alpha * 0.9;
    // 落子时的外发光
    ctx.beginPath();
    ctx.arc(x, y, r * 1.06, 0, Math.PI * 2);
    ctx.fillStyle = p.glow;
    ctx.shadowColor = p.glow;
    ctx.shadowBlur = p.glowBlur;
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = alpha;

    // 主体：光源在左上，形成球体高光
    var g = ctx.createRadialGradient(x - r * 0.34, y - r * 0.38, r * 0.08, x, y, r * 1.02);
    g.addColorStop(0, p.hi);
    g.addColorStop(color === "black" ? 0.44 : 0.52, p.mid);
    g.addColorStop(1, p.low);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();

    // 微弱内阴影：内圈压暗，形成厚度
    ctx.beginPath();
    ctx.arc(x, y, r * 0.88, Math.PI * 0.15, Math.PI * 0.95);
    ctx.strokeStyle = p.ring;
    ctx.lineWidth = r * 0.22;
    ctx.stroke();

    // 高光点
    ctx.beginPath();
    ctx.ellipse(x - r * 0.30, y - r * 0.36, r * 0.24, r * 0.15, -0.62, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, " + (color === "black" ? 0.42 : 0.95) + ")";
    ctx.fill();

    // 轮廓光（浅色为细冷边，暗色为科技感冷色描边）
    ctx.beginPath();
    ctx.arc(x, y, r - 0.5, 0, Math.PI * 2);
    ctx.strokeStyle = p.edge;
    ctx.lineWidth = 0.9;
    ctx.stroke();
    ctx.restore();
  }

  // ============================================
  // 能量波纹
  // ============================================
  function drawRipple(x, y, progress, color, strength) {
    var radius = R * (1.05 + progress * 3.6);
    ctx.save();
    ctx.globalAlpha = (1 - progress) * strength;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.2 * (1 - progress) + 0.4;
    ctx.shadowColor = color;
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 内侧一圈更淡的伴随波纹
    ctx.save();
    ctx.globalAlpha = (1 - progress) * strength * 0.5;
    ctx.strokeStyle = C.rippleSoft;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.62, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // ============================================
  // 绘制
  // ============================================
  function draw() {
    var w = canvas.width;
    var h = canvas.height;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.scale(w / SIZE, h / SIZE);
    ctx.drawImage(gridLayer, 0, 0, SIZE, SIZE);

    var i, s, key;

    // 悬停提示：幽灵棋子 + 呼吸波纹
    if (hover) {
      key = hover.c + "," + hover.r;
      if (!stones[key]) {
        var pulse = (now % 1600) / 1600;
        drawRipple(hover.x, hover.y, pulse, C.hoverRipple, 0.30);
        drawStone(hover.x, hover.y, nextColor, 0.34, 1);
      } else {
        // 已有棋子：淡淡的定位环
        ctx.save();
        ctx.globalAlpha = 0.45;
        ctx.strokeStyle = C.hoverRing;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(hover.x, hover.y, R * 1.28, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    // 已落子（含预置）
    for (key in stones) {
      if (!Object.prototype.hasOwnProperty.call(stones, key)) continue;
      var parts = key.split(",");
      var p = { c: +parts[0], r: +parts[1] };
      drawStone(px(p.c), px(p.r), stones[key], 1, 1);
    }

    // 落子动画（在静态棋子之上重绘，带缩放与淡入）
    for (i = drops.length - 1; i >= 0; i--) {
      s = drops[i];
      var dp = (now - s.t0) / 260;
      if (dp >= 1) {
        drops.splice(i, 1);
        continue;
      }
      if (dp < 0) dp = 0; // 时钟抖动保护
      var ease = 1 - Math.pow(1 - dp, 3);
      var da = dp * 4.5;
      if (da > 1) da = 1;
      drawStone(s.x, s.y, s.color, da, 1.42 - 0.42 * ease);
    }

    // 能量波纹
    for (i = ripples.length - 1; i >= 0; i--) {
      s = ripples[i];
      var rp = (now - s.t0) / 780;
      if (rp >= 1) {
        ripples.splice(i, 1);
        continue;
      }
      if (rp < 0) rp = 0;
      drawRipple(s.x, s.y, rp, s.color, 0.62);
    }

    // 最后一手标记
    if (lastMove && stones[lastMove]) {
      var lm = lastMove.split(",");
      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = C.mark;
      ctx.shadowColor = C.mark;
      ctx.shadowBlur = DARK ? 10 : 0;
      ctx.beginPath();
      ctx.arc(px(+lm[0]), px(+lm[1]), R * 0.20, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function needsAnim() {
    return drops.length > 0 || ripples.length > 0 || !!hover;
  }

  function loop(t) {
    scheduled = false; // 先解锁，保证动画进行中能继续排帧
    now = t;
    draw();
    if (needsAnim()) kick();
  }

  // 请求重绘（自动去重；悬停 / 动画进行中会持续排帧）
  function kick() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(loop);
  }

  // ============================================
  // 交互
  // ============================================
  function place(pt) {
    var key = pt.c + "," + pt.r;
    if (stones[key]) return;
    stones[key] = nextColor;
    nextColor = nextColor === "black" ? "white" : "black";
    lastMove = key;

    var t = window.performance && performance.now ? performance.now() : Date.now();
    drops.push({ x: pt.x, y: pt.y, color: stones[key], t0: t });
    ripples.push({ x: pt.x, y: pt.y, t0: t, color: C.dropRipple });
    now = t;
    kick();
  }

  function refreshHover(e) {
    var lp = toLogical(e.clientX, e.clientY);
    var hit = nearest(lp.x, lp.y);
    var changed = (!!hit !== !!hover) || (hit && hover && (hit.c !== hover.c || hit.r !== hover.r));
    hover = hit;
    if (changed || hit) kick();
    canvas.style.cursor = hit && !stones[hit.c + "," + hit.r] ? "pointer" : "crosshair";
  }

  canvas.addEventListener("pointermove", refreshHover);

  canvas.addEventListener("pointerleave", function () {
    hover = null;
    kick();
  });

  canvas.addEventListener("pointerdown", function (e) {
    var lp = toLogical(e.clientX, e.clientY);
    var hit = nearest(lp.x, lp.y);
    if (!hit) return;
    e.preventDefault();
    hover = hit;
    place(hit);
  });

  // 阻止长按菜单，保证移动端手感
  canvas.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  // ============================================
  // 尺寸适配
  // ============================================
  function fit() {
    var rect = canvas.getBoundingClientRect();
    var cssW = rect.width || 340;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var target = Math.max(1, Math.round(cssW * dpr));
    if (canvas.width !== target || canvas.height !== target) {
      canvas.width = target;
      canvas.height = target;
    }
    // 尺寸未变时也必须保证底纹层与画布同尺寸，
    // 否则 drawImage 会贴上一张空白的 300×150 画布（棋盘线不显示）
    if (gridLayer.width !== canvas.width || gridLayer.height !== canvas.height) {
      buildGridLayer();
    }
    kick();
  }

  // 初始化
  (function init() {
    for (var i = 0; i < PRESET.length; i++) {
      stones[PRESET[i].c + "," + PRESET[i].r] = PRESET[i].color;
    }
    fit();
    kick();
    if (window.ResizeObserver) {
      new ResizeObserver(fit).observe(canvas);
    } else {
      window.addEventListener("resize", fit);
    }
    console.log(C.log);
  })();

  // ============================================
  // 轻量对外接口（调试 / 主题切换后强制重绘 / 程序化落子）
  // ============================================
  window.GoBoard = {
    // 立即重绘；可传入时间戳以驱动动画帧（默认沿用上一帧时间）
    redraw: function (t) {
      if (typeof t === "number") now = t;
      draw();
    },
    // 在指定交叉点落子（19 路坐标，左上角为 0,0）
    put: function (c, r) {
      if (c < 0 || c > N - 1 || r < 0 || r > N - 1) return false;
      if (stones[c + "," + r]) return false;
      place({ c: c, r: r, x: px(c), y: px(r) });
      return true;
    },
    state: function () {
      return {
        count: Object.keys(stones).length,
        drops: drops.length,
        ripples: ripples.length,
        hover: hover ? hover.c + "," + hover.r : null,
        last: lastMove,
        next: nextColor
      };
    }
  };
})();

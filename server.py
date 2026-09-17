#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
蓝喜阳 · 个人主页（第三版）—— 本地预览服务器

零依赖：只用 Python 标准库（http.server + sqlite3），不需要安装任何包。

它做三件事：
    1. 把项目目录当作静态网站托管（index.html / css / js / pages / assets）
    2. 提供意见反馈【提交】接口，数据落到 db/feedback.db：
           POST /api/feedback        访客提交反馈（唯一开放给访客的接口）
       注意：公开接口【只写不读】。没有读取接口，页面也不展示任何反馈，
       因此访客既看不到别人的内容，也无法修改或删除。
    3. 提供一个本地管理后台（只有作者带令牌能进）：
           GET  /admin?token=...     后台表格页（含联系方式，可筛选、标记状态）
           POST /api/admin           后台更新处理状态；action=delete 时删除某条反馈
           GET  /export?token=...    导出 CSV（可用 Excel 打开）

    删除权限说明：只有带正确令牌的后台能删。访客页面没有任何删除入口，
    公开接口也没有删除方法（POST /api/feedback 只做新增），所以在页面上、
    在接口上都删不掉别人的反馈。

启动时自动执行 db/schema.sql，保证 feedback 表存在（可重复执行，不清空数据）。

用法：
    python server.py                    # http://127.0.0.1:8000
    python server.py --port 8123        # 换端口
    python server.py --token mysecret   # 指定后台令牌
    python server.py --open            # 启动后自动打开浏览器
"""

import argparse
import csv
import io
import json
import os
import secrets
import sqlite3
import sys
import threading
import time
from html import escape
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

# 让中文在任意终端编码下都能正常输出
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_DIR = os.path.join(BASE_DIR, "db")
SCHEMA_PATH = os.path.join(DB_DIR, "schema.sql")
DEFAULT_DB = os.path.join(DB_DIR, "feedback.db")
TOKEN_PATH = os.path.join(DB_DIR, "admin_token.txt")

TABLE = "feedback"
CATEGORIES = ("bug", "suggestion", "content", "other")
STATUSES = ("new", "read", "resolved")
CATEGORY_LABELS = {
    "bug": "问题反馈",
    "suggestion": "功能建议",
    "content": "内容意见",
    "other": "其他",
}
STATUS_LABELS = {"new": "未读", "read": "已读", "resolved": "已解决"}

# 访客填的「与主页主人的关系」「本条反馈针对的设备」：只收固定几档，防止乱填
RELATIONS = ("classmate", "friend", "family", "teacher", "lover", "other")
RELATION_LABELS = {
    "classmate": "同学",
    "friend": "朋友",
    "family": "家人",
    "teacher": "老师",
    "lover": "恋人",
    "other": "其他",
}
DEVICES = ("phone", "tablet", "computer", "other")
DEVICE_LABELS = {
    "phone": "手机",
    "tablet": "平板",
    "computer": "电脑",
    "other": "其他设备",
}

MAX_MESSAGE = 1000
MAX_NAME = 60
MAX_CONTACT = 120
MAX_URL = 300
MAX_LABEL = 20

# 后加的列：老数据库（db/feedback.db）建表时没有这两列，启动时用
# ALTER TABLE ADD COLUMN 补齐。ADD COLUMN 是安全操作，不会动已有数据。
EXTRA_COLUMNS = (
    ("relation", "TEXT"),
    ("device", "TEXT"),
)

# 不允许通过静态服务访问的目录（数据库、临时文件、存档、作业区等）
DENY_PREFIXES = (
    "/db/",
    "/.deepworks/",
    "/.opencode/",
    "/.git/",
    "/版本存档/",
    "/作业提交区/",
)

# 简易限流：同一 IP 10 分钟内最多 5 条
RATE_WINDOW = 600
RATE_MAX = 5
_rate_lock = threading.Lock()
_rate_hits = {}

DB_LOCK = threading.Lock()


# ---------------------------------------------------------------- 数据库

def init_db(db_path):
    """执行 schema.sql，保证 feedback 表存在；并给老库补上后加的列。"""
    if not os.path.isfile(SCHEMA_PATH):
        raise SystemExit("[FAIL] 找不到建表脚本：%s" % SCHEMA_PATH)
    with open(SCHEMA_PATH, "r", encoding="utf-8") as fh:
        sql = fh.read()
    conn = sqlite3.connect(db_path)
    try:
        conn.executescript(sql)
        ensure_columns(conn)
        conn.commit()
    finally:
        conn.close()


def ensure_columns(conn):
    """
    补齐后加的列（relation / device）。

    CREATE TABLE IF NOT EXISTS 不会给已存在的表加列，所以这里显式检查
    PRAGMA table_info，缺哪列就 ADD COLUMN 哪列。已存在的行该列填 NULL，
    历史数据不受影响。返回本次新增的列名列表。
    """
    have = {row[1] for row in conn.execute("PRAGMA table_info(%s)" % TABLE)}
    added = []
    for column, decl in EXTRA_COLUMNS:
        if column not in have:
            conn.execute("ALTER TABLE %s ADD COLUMN %s %s" % (TABLE, column, decl))
            added.append(column)
    return added


def connect(db_path):
    conn = sqlite3.connect(db_path, timeout=5)
    conn.row_factory = sqlite3.Row
    return conn


def insert_feedback(db_path, payload):
    sql = (
        "INSERT INTO %s (name, relation, device, contact, category, rating, "
        "message, page_url, user_agent) "
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)" % TABLE
    )
    with DB_LOCK:
        conn = connect(db_path)
        try:
            cur = conn.execute(
                sql,
                (
                    payload["name"],
                    payload["relation"],
                    payload["device"],
                    payload["contact"],
                    payload["category"],
                    payload["rating"],
                    payload["message"],
                    payload["page_url"],
                    payload["user_agent"],
                ),
            )
            conn.commit()
            return cur.lastrowid
        finally:
            conn.close()


def list_admin(db_path, status=None):
    sql = "SELECT * FROM %s" % TABLE
    args = ()
    if status in STATUSES:
        sql += " WHERE status = ?"
        args = (status,)
    sql += " ORDER BY id DESC LIMIT 500"
    with DB_LOCK:
        conn = connect(db_path)
        try:
            rows = conn.execute(sql, args).fetchall()
            stats = {
                s: conn.execute(
                    "SELECT COUNT(*) FROM %s WHERE status = ?" % TABLE, (s,)
                ).fetchone()[0]
                for s in STATUSES
            }
            total = conn.execute("SELECT COUNT(*) FROM %s" % TABLE).fetchone()[0]
        finally:
            conn.close()
    return [dict(r) for r in rows], stats, total


def export_rows(db_path):
    """导出用：全部字段，按提交时间正序。"""
    with DB_LOCK:
        conn = connect(db_path)
        try:
            rows = conn.execute(
                "SELECT * FROM %s ORDER BY id ASC" % TABLE
            ).fetchall()
        finally:
            conn.close()
    return [dict(r) for r in rows]


def update_status(db_path, row_id, status):
    with DB_LOCK:
        conn = connect(db_path)
        try:
            cur = conn.execute(
                "UPDATE %s SET status = ? WHERE id = ?" % TABLE, (status, row_id)
            )
            conn.commit()
            return cur.rowcount
        finally:
            conn.close()


def delete_feedback(db_path, row_id):
    """删除单条反馈（仅后台、带令牌可用）。返回实际删除的行数，0 表示不存在。"""
    with DB_LOCK:
        conn = connect(db_path)
        try:
            cur = conn.execute("DELETE FROM %s WHERE id = ?" % TABLE, (row_id,))
            conn.commit()
            return cur.rowcount
        finally:
            conn.close()


# ---------------------------------------------------------------- 校验

def clean(value, max_len):
    if value is None:
        return None
    text = str(value).strip()
    if not text:
        return None
    return text[:max_len]


def validate(data, user_agent):
    message = clean(data.get("message"), MAX_MESSAGE + 1)
    if not message:
        return None, "反馈内容不能为空。"
    if len(message) > MAX_MESSAGE:
        return None, "反馈内容最多 %d 字。" % MAX_MESSAGE

    category = clean(data.get("category"), 20) or "other"
    if category not in CATEGORIES:
        return None, "反馈类型不合法。"

    # 「与主页主人的关系」：可留空；填了就必须在下拉给出的几档里
    relation = clean(data.get("relation"), MAX_LABEL)
    if relation and relation not in RELATIONS:
        return None, "「与主页主人的关系」取值不合法。"

    # 「本条反馈针对的设备」：同上
    device = clean(data.get("device"), MAX_LABEL)
    if device and device not in DEVICES:
        return None, "「本条反馈针对的设备」取值不合法。"

    rating = data.get("rating")
    if rating in ("", None):
        rating = None
    else:
        try:
            rating = int(rating)
        except (TypeError, ValueError):
            return None, "满意度需要是 1-5 的整数。"
        if not 1 <= rating <= 5:
            return None, "满意度需要在 1-5 之间。"

    return (
        {
            "name": clean(data.get("name"), MAX_NAME),
            "relation": relation,
            "device": device,
            "contact": clean(data.get("contact"), MAX_CONTACT),
            "category": category,
            "rating": rating,
            "message": message,
            "page_url": clean(data.get("page_url"), MAX_URL),
            "user_agent": (user_agent or "")[:MAX_URL] or None,
        },
        None,
    )


def rate_limited(ip):
    now = time.time()
    with _rate_lock:
        hits = [t for t in _rate_hits.get(ip, []) if now - t < RATE_WINDOW]
        if len(hits) >= RATE_MAX:
            _rate_hits[ip] = hits
            return True
        hits.append(now)
        _rate_hits[ip] = hits
        return False


# ---------------------------------------------------------------- 请求处理

class Handler(SimpleHTTPRequestHandler):
    db_path = DEFAULT_DB
    token = ""
    server_version = "LanXiyangPreview/1.0"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    # ---- 工具

    def send_json(self, obj, status=200):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)

    def send_html(self, html, status=200):
        body = html.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def send_csv(self, rows):
        """导出 CSV：带 UTF-8 BOM，Excel 直接打开不乱码。"""
        buf = io.StringIO()
        writer = csv.writer(buf)
        writer.writerow(
            ["编号", "提交时间", "名字或昵称", "与主页主人的关系", "本条反馈针对的设备",
             "联系方式", "类型", "满意度", "状态", "反馈内容", "来源页", "浏览器", "更新时间"]
        )
        for r in rows:
            writer.writerow([
                r.get("id"),
                r.get("created_at"),
                r.get("name") or "匿名访客",
                RELATION_LABELS.get(r.get("relation"), "") or "",
                DEVICE_LABELS.get(r.get("device"), "") or "",
                r.get("contact") or "",
                CATEGORY_LABELS.get(r.get("category"), r.get("category") or ""),
                r.get("rating") if r.get("rating") else "",
                STATUS_LABELS.get(r.get("status"), r.get("status") or ""),
                r.get("message") or "",
                r.get("page_url") or "",
                r.get("user_agent") or "",
                r.get("updated_at") or "",
            ])
        body = ("\ufeff" + buf.getvalue()).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/csv; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Content-Disposition", 'attachment; filename="feedback.csv"')
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)

    def read_json(self):
        try:
            length = int(self.headers.get("Content-Length") or 0)
        except ValueError:
            return {}
        if length <= 0 or length > 64 * 1024:
            return {}
        raw = self.rfile.read(length)
        try:
            return json.loads(raw.decode("utf-8"))
        except Exception:
            return {}

    def is_blocked(self, path):
        return any(path.startswith(p) for p in DENY_PREFIXES)

    def check_token(self, query):
        given = (query.get("token") or [""])[0]
        return self.token and secrets.compare_digest(given, self.token)

    # ---- GET

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        query = parse_qs(parsed.query)

        # 公开接口只写不读：不提供任何读取能力
        if path == "/api/feedback":
            return self.send_json(
                {
                    "ok": False,
                    "error": "该接口只接受反馈提交，不提供读取。反馈内容仅作者本人在后台可见。",
                },
                405,
            )

        if path == "/admin":
            if not self.check_token(query):
                return self.send_html(admin_denied_html(), 403)
            status = (query.get("status") or [""])[0]
            rows, stats, total = list_admin(self.db_path, status)
            return self.send_html(
                admin_page_html(rows, stats, total, status, self.token)
            )

        if path == "/export":
            if not self.check_token(query):
                return self.send_html(admin_denied_html(), 403)
            return self.send_csv(export_rows(self.db_path))

        if self.is_blocked(path):
            return self.send_error(403, "Forbidden")

        return super().do_GET()

    # ---- POST

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path
        query = parse_qs(parsed.query)
        data = self.read_json()

        if path == "/api/feedback":
            # 蜜罐：机器人填了隐藏字段，直接假装成功
            if data.get("company"):
                return self.send_json({"ok": True, "id": None, "spam": True}, 201)

            ip = self.client_address[0]
            if rate_limited(ip):
                return self.send_json(
                    {"ok": False, "error": "提交太频繁了，请稍后再试。"}, 429
                )

            payload, error = validate(data, self.headers.get("User-Agent"))
            if error:
                return self.send_json({"ok": False, "error": error}, 400)

            row_id = insert_feedback(self.db_path, payload)
            return self.send_json({"ok": True, "id": row_id}, 201)

        if path == "/api/admin":
            if not self.check_token(query):
                return self.send_json({"ok": False, "error": "令牌无效。"}, 403)
            action = str(data.get("action") or "status").strip()
            try:
                row_id = int(data.get("id"))
            except (TypeError, ValueError):
                return self.send_json({"ok": False, "error": "id 不合法。"}, 400)

            if action == "delete":
                removed = delete_feedback(self.db_path, row_id)
                if not removed:
                    return self.send_json(
                        {"ok": False, "error": "没找到这条反馈，可能已经被删掉了。"}, 404
                    )
                return self.send_json({"ok": True, "deleted": removed})

            if action != "status":
                return self.send_json({"ok": False, "error": "操作不合法。"}, 400)

            status = data.get("status")
            if status not in STATUSES:
                return self.send_json({"ok": False, "error": "状态不合法。"}, 400)
            changed = update_status(self.db_path, row_id, status)
            return self.send_json({"ok": True, "changed": changed})

        return self.send_error(404, "Not Found")

    # ---- 其它

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()

    def log_message(self, fmt, *args):
        sys.stdout.write("  %s  %s\n" % (time.strftime("%H:%M:%S"), fmt % args))
        sys.stdout.flush()


# ---------------------------------------------------------------- 后台页面

ADMIN_CSS = """
* { box-sizing: border-box; }
body { margin: 0; padding: 24px 28px 44px; background: #fdfbf4; color: #241b0e;
  font: 13.5px/1.65 -apple-system, "Segoe UI", "Microsoft YaHei", sans-serif; }
header { margin-bottom: 16px; }
h1 { font-size: 21px; margin: 0 0 4px; }
.sub { margin: 0; color: #9c8b70; font-size: 12.5px; }
.bar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  margin-bottom: 12px; }
.stats { display: flex; gap: 8px; flex-wrap: wrap; }
.stat { display: flex; align-items: baseline; gap: 7px; background: #fff;
  border: 1px solid #ece1c9; border-radius: 10px; padding: 5px 13px; }
.stat b { font-size: 17px; color: #c2811b; }
.stat span { color: #9c8b70; font-size: 12px; }
.spacer { flex: 1; }
.btn { text-decoration: none; border: 1px solid #dccdae; border-radius: 8px;
  padding: 5px 12px; color: #6d5c44; background: #fff; font-size: 12.5px;
  white-space: nowrap; }
.btn:hover { border-color: #c2811b; color: #96610f; }
.btn.on { background: #c2811b; border-color: #c2811b; color: #fff; }
table { width: 100%; border-collapse: collapse; background: #fff;
  border: 1px solid #ece1c9; border-radius: 12px; overflow: hidden; }
th { position: sticky; top: 0; z-index: 1; background: #fdf6e6; color: #96610f;
  font-size: 12px; font-weight: 600; text-align: left; white-space: nowrap;
  padding: 9px 12px; border-bottom: 1px solid #ece1c9; }
td { padding: 10px 12px; border-bottom: 1px solid #f4ecda; vertical-align: top; }
tbody tr:nth-child(even) { background: #fffdf7; }
tbody tr:last-child td { border-bottom: none; }
tr.r-new td:first-child { box-shadow: inset 3px 0 0 #d99a2b; }
.c-id { color: #9c8b70; font-size: 12px; white-space: nowrap; }
.c-id .when { display: block; }
.c-who b { display: block; font-size: 13.5px; }
.c-who .meta { display: block; color: #9c8b70; font-size: 12px; }
.contact { color: #96610f; font-size: 12.5px; word-break: break-all; }
.tag { display: inline-block; padding: 1px 8px; border-radius: 999px;
  font-size: 11.5px; line-height: 1.75; white-space: nowrap;
  background: #f4ecda; color: #6d5c44; }
.t-bug { background: #f8ece2; color: #a85a33; }
.t-suggestion { background: #fdf1d6; color: #96610f; }
.t-content { background: #eef0dd; color: #5f6226; }
.s-new { background: #f8ece2; color: #a85a33; }
.s-read { background: #fdf1d6; color: #96610f; }
.s-resolved { background: #eef0dd; color: #5f6226; }
.score { margin-left: 6px; color: #d99a2b; font-size: 12px; letter-spacing: 1px; }
.c-msg { max-width: 520px; }
.cell-msg { white-space: pre-wrap; word-break: break-word; }
.cell-msg.full { margin-top: 8px; padding: 8px 10px; background: #fbf6ea;
  border-radius: 8px; color: #6d5c44; }
.ellipsis { color: #9c8b70; }
details.more summary { margin-top: 4px; color: #96610f; cursor: pointer;
  font-size: 12px; }
.ops { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 7px; }
.ops button { font: inherit; font-size: 12px; border: 1px solid #dccdae;
  background: #fff; color: #6d5c44; border-radius: 7px; padding: 3px 9px;
  cursor: pointer; }
.ops button:hover { border-color: #c2811b; color: #96610f; }
.ops button.danger { color: #a85a33; border-color: #e3c9b6; }
.ops button.danger:hover { background: #f8ece2; border-color: #a85a33; color: #8e4622; }
.empty { background: #fff; border: 1px dashed #dccdae; border-radius: 12px;
  padding: 48px; text-align: center; color: #9c8b70; }
"""

ADMIN_JS = """
document.addEventListener('click', function (e) {

  /* ---- 删除：先二次确认，再请求后端 ---- */
  var del = e.target.closest('button[data-del]');
  if (del) {
    var delId = Number(del.dataset.id);
    if (!confirm('确定删除 ' + (del.dataset.who || ('#' + delId)) + ' 这条反馈吗？\\n\\n'
        + '删掉之后就找不回来了，建议先点「导出 CSV」备份。')) return;
    del.disabled = true;
    del.textContent = '删除中…';
    fetch('/api/admin?token=' + encodeURIComponent(window.__TOKEN__), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id: delId })
    }).then(function (r) { return r.json().then(function (j) { return [r.status, j]; }); })
      .then(function (pair) {
        var res = pair[1] || {};
        if (res.ok) { location.reload(); }
        else { alert(res.error || '删除失败'); del.disabled = false; del.textContent = '删除'; }
      }).catch(function () {
        alert('网络错误，没删成'); del.disabled = false; del.textContent = '删除';
      });
    return;
  }

  /* ---- 标记状态 ---- */
  var btn = e.target.closest('button[data-status]');
  if (!btn) return;
  btn.disabled = true;
  fetch('/api/admin?token=' + encodeURIComponent(window.__TOKEN__), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: Number(btn.dataset.id), status: btn.dataset.status })
  }).then(function (r) { return r.json(); }).then(function (res) {
    if (res.ok) { location.reload(); }
    else { alert(res.error || '更新失败'); btn.disabled = false; }
  }).catch(function () { alert('网络错误'); btn.disabled = false; });
});
"""


def admin_denied_html():
    return (
        "<!doctype html><html lang=\"zh-CN\"><meta charset=\"utf-8\">"
        "<title>后台 · 需要令牌</title>"
        "<body style=\"font:14px/1.8 -apple-system,'Microsoft YaHei',sans-serif;"
        "padding:40px;background:#fdfbf4;color:#241b0e\">"
        "<h1 style=\"font-size:20px\">需要正确的后台令牌</h1>"
        "<p style=\"color:#6d5c44\">请在网址后面带上 <code>?token=...</code>。"
        "令牌在服务器启动时打印，也存在 <code>db/admin_token.txt</code>。</p>"
        "</body></html>"
    )


def admin_page_html(rows, stats, total, current_status, token):
    filters = [("", "全部")]
    for key in STATUSES:
        filters.append((key, STATUS_LABELS[key]))
    filter_html = "".join(
        '<a class="btn%s" href="/admin?token=%s%s">%s</a>'
        % (
            " on" if key == current_status else "",
            escape(token),
            ("&status=" + key) if key else "",
            escape(label),
        )
        for key, label in filters
    )

    def message_cell(text, limit=60):
        """长文折叠：前 60 字直出，其余收进「展开全文」，表格才不会被撑爆。"""
        full = str(text or "")
        if len(full) <= limit:
            return '<div class="cell-msg">%s</div>' % escape(full)
        return (
            '<div class="cell-msg">%s<span class="ellipsis">…</span></div>'
            '<details class="more"><summary>展开全文（共 %d 字）</summary>'
            '<div class="cell-msg full">%s</div></details>'
            % (escape(full[:limit]), len(full), escape(full[limit:]))
        )

    if rows:
        body = []
        for r in rows:
            status = r.get("status") or "new"
            rating = r.get("rating")
            actions = "".join(
                '<button data-id="%s" data-status="%s">%s</button>'
                % (r["id"], s, escape(STATUS_LABELS[s]))
                for s in STATUSES
                if s != status
            )
            actions += (
                '<button class="danger" data-del="1" data-id="%s" data-who="#%s">删除</button>'
                % (r["id"], r["id"])
            )
            meta = " · ".join(
                [
                    label
                    for label in (
                        RELATION_LABELS.get(r.get("relation")),
                        DEVICE_LABELS.get(r.get("device")),
                    )
                    if label
                ]
            ) or "关系 / 设备未填"
            body.append(
                "<tr class=\"r-%s\">"
                "<td class=\"c-id\">#%s<span class=\"when\">%s</span></td>"
                "<td class=\"c-who\"><b>%s</b><span class=\"meta\">%s</span>"
                "<span class=\"contact\">%s</span></td>"
                "<td><span class=\"tag t-%s\">%s</span>"
                "<span class=\"score\">%s</span></td>"
                "<td class=\"c-msg\">%s</td>"
                "<td><span class=\"tag s-%s\">%s</span>"
                "<div class=\"ops\">%s</div></td>"
                "</tr>"
                % (
                    escape(status),
                    r["id"],
                    escape(str(r.get("created_at") or "")[:16]),
                    escape(str(r.get("name") or "匿名访客")),
                    escape(meta),
                    escape(str(r.get("contact") or "未留联系方式")),
                    escape(str(r.get("category") or "other")),
                    escape(
                        CATEGORY_LABELS.get(
                            r.get("category"), r.get("category") or "其他"
                        )
                    ),
                    escape(("★" * rating) if rating else "—"),
                    message_cell(r.get("message")),
                    escape(status),
                    escape(STATUS_LABELS.get(status, status)),
                    actions,
                )
            )
        table = (
            "<table><thead><tr>"
            "<th>编号 / 时间</th><th>称呼 / 联系方式</th><th>类型 / 满意度</th>"
            "<th>反馈内容</th><th>状态 / 操作</th>"
            "</tr></thead><tbody>" + "".join(body) + "</tbody></table>"
        )
    else:
        table = '<div class="empty">这里还没有反馈。</div>'

    stat_cards = '<div class="stat"><b>%s</b><span>全部</span></div>' % total
    stat_cards += "".join(
        '<div class="stat"><b>%s</b><span>%s</span></div>'
        % (stats.get(k, 0), escape(STATUS_LABELS[k]))
        for k in STATUSES
    )

    html = (
        "<!doctype html><html lang=\"zh-CN\"><head><meta charset=\"utf-8\">"
        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"
        "<title>意见反馈 · 后台</title><style>" + ADMIN_CSS + "</style></head><body>"
        "<header><h1>意见反馈 · 后台</h1>"
        "<p class=\"sub\">只有你能看到这些内容。访客页面只写不读，"
        "任何人都看不到别人的反馈，也没有修改或删除的权限。"
        "你可以在这里标记「已读 / 已解决」，也可以删除不想要的反馈。</p></header>"
        "<div class=\"bar\"><div class=\"stats\">" + stat_cards + "</div>"
        "<span class=\"spacer\"></span>"
        "<a class=\"btn\" href=\"/export?token=" + escape(token) + "\">导出 CSV</a>"
        "<a class=\"btn\" href=\"/admin?token=" + escape(token) + "\">刷新</a></div>"
        "<div class=\"bar\">" + filter_html + "</div>"
        + table +
        "<script>window.__TOKEN__=" + json.dumps(token) + ";" + ADMIN_JS + "</script>"
        "</body></html>"
    )
    return html


# ---------------------------------------------------------------- 主入口

def load_token(explicit=None):
    if explicit:
        return explicit
    if os.path.isfile(TOKEN_PATH):
        with open(TOKEN_PATH, "r", encoding="utf-8") as fh:
            saved = fh.read().strip()
        if saved:
            return saved
    token = secrets.token_urlsafe(12)
    os.makedirs(DB_DIR, exist_ok=True)
    with open(TOKEN_PATH, "w", encoding="utf-8") as fh:
        fh.write(token)
    return token


def main():
    parser = argparse.ArgumentParser(description="个人主页本地预览服务器")
    parser.add_argument("--port", type=int, default=8000, help="端口，默认 8000")
    parser.add_argument("--host", default="127.0.0.1", help="监听地址，默认本机")
    parser.add_argument("--db", default=DEFAULT_DB, help="SQLite 数据库文件路径")
    parser.add_argument("--token", default=None, help="后台令牌，默认读取/生成 db/admin_token.txt")
    parser.add_argument("--open", action="store_true", help="启动后自动打开浏览器")
    args = parser.parse_args()

    init_db(args.db)
    token = load_token(args.token)

    Handler.db_path = args.db
    Handler.token = token

    httpd = ThreadingHTTPServer((args.host, args.port), Handler)
    base = "http://%s:%d" % (args.host, args.port)

    print("")
    print("  个人主页本地预览已启动")
    print("  ------------------------------------------------------------")
    print("  网站首页 : %s/" % base)
    print("  管理后台 : %s/admin?token=%s" % (base, token))
    print("  接口地址 : %s/api/feedback" % base)
    print("  数据库   : %s" % args.db)
    print("  建表脚本 : %s" % SCHEMA_PATH)
    print("  ------------------------------------------------------------")
    print("  按 Ctrl+C 停止")
    print("")

    if args.open:
        import webbrowser

        threading.Timer(0.6, lambda: webbrowser.open(base + "/")).start()

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n  已停止。")
    finally:
        httpd.server_close()


if __name__ == "__main__":
    main()

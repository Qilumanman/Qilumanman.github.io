#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
意见反馈功能 · 数据库初始化脚本（SQLite / Python 标准库，零依赖）

用途：
    读取同目录下的 schema.sql，创建 feedback 表（含索引与触发器）。
    可重复执行：表已存在时不会重建、不会清空数据。

用法：
    python db/init_db.py                 # 创建/校验 feedback 表（默认 db/feedback.db）
    python db/init_db.py --selftest      # 额外跑一遍约束自检（写入后回滚，不留数据）
    python db/init_db.py --show          # 打印表结构 DDL
    python db/init_db.py --db other.db   # 指定数据库文件位置

项目：蓝喜阳个人主页（第二版 · 黄白杂志风）
"""

import argparse
import os
import sqlite3
import sys

# 让中文输出在任意终端编码下都不炸
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_SCHEMA = os.path.join(BASE_DIR, "schema.sql")
DEFAULT_DB = os.path.join(BASE_DIR, "feedback.db")

TABLE = "feedback"


def read_sql(path):
    """以 UTF-8 读取 SQL 脚本内容。"""
    if not os.path.isfile(path):
        raise SystemExit("[FAIL] schema file not found: %s" % path)
    with open(path, "r", encoding="utf-8") as fh:
        return fh.read()


def connect(db_path):
    conn = sqlite3.connect(db_path)
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def apply_schema(conn, sql):
    """执行建表脚本。executescript 内部自带事务提交。"""
    conn.executescript(sql)


# 后加的列：老数据库里没有这两列，靠 ALTER TABLE ADD COLUMN 补齐（不动已有数据）
EXTRA_COLUMNS = (
    ("relation", "TEXT"),   # 与主页主人的关系
    ("device", "TEXT"),     # 本条反馈针对的设备
)


def migrate(conn):
    """给已存在的 feedback 表补上后加的列，返回本次新增的列名列表。"""
    have = {row[1] for row in conn.execute("PRAGMA table_info(%s)" % TABLE)}
    added = []
    for column, decl in EXTRA_COLUMNS:
        if column not in have:
            conn.execute("ALTER TABLE %s ADD COLUMN %s %s" % (TABLE, column, decl))
            added.append(column)
    if added:
        conn.commit()
    return added


def inspect(conn):
    """读取并返回 feedback 表的实际结构信息。"""
    cur = conn.cursor()

    row = cur.execute(
        "SELECT name FROM sqlite_master WHERE type='table' AND name=?", (TABLE,)
    ).fetchone()
    exists = row is not None

    columns = []
    indexes = []
    triggers = []
    count = None

    if exists:
        columns = [r[1] for r in cur.execute("PRAGMA table_info(%s)" % TABLE)]
        indexes = [r[1] for r in cur.execute("PRAGMA index_list(%s)" % TABLE)]
        triggers = [
            r[0]
            for r in cur.execute(
                "SELECT name FROM sqlite_master WHERE type='trigger' AND tbl_name=?",
                (TABLE,),
            )
        ]
        count = cur.execute("SELECT COUNT(*) FROM %s" % TABLE).fetchone()[0]

    return {
        "exists": exists,
        "columns": columns,
        "indexes": indexes,
        "triggers": triggers,
        "count": count,
    }


def show_ddl(conn):
    cur = conn.cursor()
    print("--- DDL ---")
    for row in cur.execute(
        "SELECT type, name, sql FROM sqlite_master "
        "WHERE tbl_name=? OR name=? ORDER BY type DESC, name",
        (TABLE, TABLE),
    ):
        print("-- [%s] %s" % (row[0], row[1]))
        print(row[2])
        print("")


def selftest(conn):
    """
    约束自检：先写入合法数据，再逐条尝试违规数据。
    全部放在同一事务里，最后 rollback，保证数据库不留痕迹。
    """
    cur = conn.cursor()
    results = []

    def expect_ok(label, fn):
        try:
            fn()
            results.append((True, label))
        except Exception as exc:  # noqa: BLE001
            results.append((False, "%s -> %s" % (label, exc)))

    def expect_fail(label, fn):
        try:
            fn()
            results.append((False, "%s -> 未拦截（约束缺失）" % label))
        except sqlite3.IntegrityError:
            results.append((True, "%s -> 已拦截" % label))
        except Exception as exc:  # noqa: BLE001
            results.append((False, "%s -> 意外错误 %s" % (label, exc)))

    expect_ok(
        "insert legal row",
        lambda: cur.execute(
            "INSERT INTO feedback (name, relation, device, contact, category, rating, "
            "message, page_url) VALUES (?,?,?,?,?,?,?,?)",
            ("测试访客", "classmate", "phone", "test@example.com", "suggestion", 5,
             "这是一条自检数据", "index.html"),
        ),
    )
    expect_fail(
        "reject illegal category",
        lambda: cur.execute(
            "INSERT INTO feedback (category, message) VALUES ('spam', 'x')"
        ),
    )
    expect_fail(
        "reject illegal relation",
        lambda: cur.execute(
            "INSERT INTO feedback (relation, message) VALUES ('boss', 'x')"
        ),
    )
    expect_fail(
        "reject illegal device",
        lambda: cur.execute(
            "INSERT INTO feedback (device, message) VALUES ('watch', 'x')"
        ),
    )
    expect_fail(
        "reject illegal status",
        lambda: cur.execute(
            "INSERT INTO feedback (status, message) VALUES ('done', 'x')"
        ),
    )
    expect_fail(
        "reject rating out of range",
        lambda: cur.execute("INSERT INTO feedback (rating, message) VALUES (9, 'x')"),
    )
    expect_fail(
        "reject blank message",
        lambda: cur.execute("INSERT INTO feedback (message) VALUES ('   ')"),
    )
    expect_ok(
        "auto fill created_at",
        lambda: cur.execute("INSERT INTO feedback (message) VALUES ('时间戳自检')"),
    )

    last_id = cur.lastrowid
    row = cur.execute(
        "SELECT created_at, updated_at, status FROM feedback WHERE id=?", (last_id,)
    ).fetchone()
    results.append((bool(row and row[0] and row[1]), "created_at/updated_at auto filled: %s" % (row,)))
    results.append((row and row[2] == "new", "status defaults to 'new': %s" % (row and row[2],)))

    # 触发器自检：把 updated_at 压回旧值，再改 status，应被触发器自动刷新
    cur.execute(
        "UPDATE feedback SET updated_at = '2000-01-01 00:00:00' WHERE id=?", (last_id,)
    )
    cur.execute("UPDATE feedback SET status = 'read' WHERE id=?", (last_id,))
    touched = cur.execute(
        "SELECT updated_at, status FROM feedback WHERE id=?", (last_id,)
    ).fetchone()
    results.append(
        (
            bool(touched and touched[0] != "2000-01-01 00:00:00"),
            "trigger refreshes updated_at: %s" % (touched,),
        )
    )
    results.append(
        (
            bool(touched and touched[1] == "read"),
            "status update persisted: %s" % (touched and touched[1],),
        )
    )

    # 查看当前事务内的数据量，然后整体回滚
    inside = cur.execute("SELECT COUNT(*) FROM feedback").fetchone()[0]
    print("    (selftest rows before rollback: %d)" % inside)
    conn.rollback()

    print("--- selftest ---")
    failed = 0
    for ok, label in results:
        print("  [%s] %s" % ("PASS" if ok else "FAIL", label))
        if not ok:
            failed += 1
    return failed


def main():
    parser = argparse.ArgumentParser(
        description="Create/verify the feedback table for the personal homepage."
    )
    parser.add_argument("--db", default=DEFAULT_DB, help="SQLite database file path")
    parser.add_argument("--schema", default=DEFAULT_SCHEMA, help="SQL schema file path")
    parser.add_argument("--show", action="store_true", help="print table DDL")
    parser.add_argument("--selftest", action="store_true", help="run constraint self-test")
    args = parser.parse_args()

    db_path = os.path.abspath(args.db)
    schema_path = os.path.abspath(args.schema)

    db_existed = os.path.isfile(db_path)
    sql = read_sql(schema_path)

    conn = connect(db_path)
    try:
        apply_schema(conn, sql)
        added = migrate(conn)
        info = inspect(conn)

        print("[OK] database : %s" % db_path)
        print("[OK] schema   : %s" % schema_path)
        print("[OK] db file  : %s" % ("reused existing" if db_existed else "newly created"))
        print("[OK] migrate  : %s" % ("added " + ", ".join(added) if added else "nothing to add"))
        print("[OK] table    : %s exists=%s" % (TABLE, info["exists"]))
        print("     columns  : %s" % ", ".join(info["columns"]))
        print("     indexes  : %s" % ", ".join(info["indexes"]))
        print("     triggers : %s" % ", ".join(info["triggers"]))
        print("     rows     : %s" % info["count"])

        if args.show:
            show_ddl(conn)

        failed = 0
        if args.selftest:
            failed = selftest(conn)

        if not info["exists"]:
            print("[FAIL] table %s was not created" % TABLE)
            return 1
        if failed:
            print("[FAIL] selftest failures: %d" % failed)
            return 1
    finally:
        conn.close()

    print("DONE")
    return 0


if __name__ == "__main__":
    sys.exit(main())

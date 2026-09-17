-- ============================================================
-- 意见反馈功能 · 数据表结构（SQLite）
-- 项目：蓝喜阳个人主页（第三版 · 黄白杂志风 + 意见反馈）
-- 说明：本文件只定义结构，不含数据；可重复执行，不会破坏已有数据。
-- 执行方式：python db/init_db.py
--
-- 访客要填的 5 项（第 5 项由数据库自动生成，不用访客填）：
--   1. 名字或昵称          -> name
--   2. 与主页主人的关系     -> relation
--   3. 本条反馈针对的设备   -> device
--   4. 反馈内容            -> message
--   5. 提交时间            -> created_at（默认当前时间）
-- 另有可选的 contact（联系方式）/ category（类型）/ rating（满意度），
-- 以及后端自动记录的 page_url（来源页）/ user_agent（浏览器信息）。
--
-- 注：本文件用 CREATE TABLE IF NOT EXISTS，老数据库不会自动长出后加的列；
--     后加的 relation / device 两列由 db/init_db.py 与 server.py 的
--     migrate 逻辑用 ALTER TABLE ADD COLUMN 补齐（不动已有数据）。
-- ============================================================

PRAGMA foreign_keys = ON;

-- ------------------------------------------------------------
-- feedback：访客意见反馈表
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS feedback (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,          -- 主键，自增
    name        TEXT,                                       -- ① 名字或昵称（可选）
    relation    TEXT,                                       -- ② 与主页主人的关系（可选，见下方约束）
    device      TEXT,                                       -- ③ 本条反馈针对的设备（可选，见下方约束）
    contact     TEXT,                                       -- 联系方式，邮箱/微信（可选）
    category    TEXT    NOT NULL DEFAULT 'other',            -- 反馈类型
    rating      INTEGER,                                    -- 满意度 1-5（可选）
    message     TEXT    NOT NULL,                           -- ④ 反馈正文（必填）
    page_url    TEXT,                                       -- 提交来源页面
    user_agent  TEXT,                                       -- 浏览器/设备信息
    status      TEXT    NOT NULL DEFAULT 'new',              -- 处理状态
    created_at  TEXT    NOT NULL DEFAULT (datetime('now', 'localtime')),  -- ⑤ 提交时间（自动）
    updated_at  TEXT    NOT NULL DEFAULT (datetime('now', 'localtime')),  -- 最近变更时间

    -- 取值约束：类型只能是这四种
    CONSTRAINT ck_feedback_category
        CHECK (category IN ('bug', 'suggestion', 'content', 'other')),
    -- 取值约束：状态只能是这三种
    CONSTRAINT ck_feedback_status
        CHECK (status IN ('new', 'read', 'resolved')),
    -- 取值约束：评分要么不填，要么 1-5
    CONSTRAINT ck_feedback_rating
        CHECK (rating IS NULL OR (rating BETWEEN 1 AND 5)),
    -- 取值约束：正文不能是空白
    CONSTRAINT ck_feedback_message
        CHECK (length(trim(message)) > 0),
    -- 取值约束：与主页主人的关系只能是这几种
    CONSTRAINT ck_feedback_relation
        CHECK (relation IS NULL OR relation IN
               ('classmate', 'friend', 'family', 'teacher', 'lover', 'other')),
    -- 取值约束：设备只能是这几种
    CONSTRAINT ck_feedback_device
        CHECK (device IS NULL OR device IN
               ('phone', 'tablet', 'computer', 'other'))
);

-- 常用查询索引：按时间倒序列表、按状态筛选
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_status     ON feedback (status);

-- 自动维护 updated_at：更新记录时若未显式改动该字段，则自动刷新为当前时间
CREATE TRIGGER IF NOT EXISTS trg_feedback_updated_at
AFTER UPDATE ON feedback
FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at
BEGIN
    UPDATE feedback
       SET updated_at = datetime('now', 'localtime')
     WHERE id = NEW.id;
END;

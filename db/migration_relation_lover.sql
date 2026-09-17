-- ============================================================
-- 迁移脚本：关系选项 online（网友）→ lover（恋人）
-- 适用：线上 Supabase 项目（表 public.feedback）
-- 执行：Supabase 控制台 → 左侧 SQL Editor → 粘贴本文件全部内容 → Run
--
-- 背景：create table 里写的 check 约束不能就地修改，必须先 drop 再 add；
--       drop ... if exists + add 组合可重复执行，不会报错。
--       第 1 条 update 是为老数据兜底：若历史上存过 relation='online' 的行，
--       直接 add 新约束会失败，所以先把它们归到 other。
-- ============================================================

-- 1) 老数据兜底：把历史 online 归到 other（目前线上没有这类正式数据，可安全执行）
update public.feedback set relation = 'other' where relation = 'online';

-- 2) 换掉取值约束：删掉旧的，加回包含 lover、不含 online 的新版
alter table public.feedback drop constraint if exists ck_feedback_relation;

alter table public.feedback add constraint ck_feedback_relation
    check (relation is null or relation in
           ('classmate', 'friend', 'family', 'teacher', 'lover', 'other'));

-- 3) 同步字段注释（后台/数据字典里显示的文案）
comment on column public.feedback.relation is '② 与主页主人的关系：classmate=同学 / friend=朋友 / family=家人 / teacher=老师 / lover=恋人 / other=其他';

-- 4) 自检：应返回 1 行，且 def 里出现 lover、没有 online
select conname, pg_get_constraintdef(oid) as def
from pg_constraint
where conrelid = 'public.feedback'::regclass
  and conname = 'ck_feedback_relation';

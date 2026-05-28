-- ============================================================
-- 微塑膠教學課程 — Supabase Schema
-- ------------------------------------------------------------
-- 在 Supabase Dashboard 中的「SQL Editor」貼上本檔內容並執行。
-- 執行後會建立：
--   1. attempts 表        — 學生每次作答紀錄
--   2. RLS 政策           — 學生可寫、教師可讀
--   3. item_stats 統計 view — 每題正確率
--   4. class_summary view — 每位學生在每個班的作答總覽
-- ============================================================

-- 1. 作答紀錄主表
create table if not exists public.attempts (
  id            bigserial primary key,
  student_id    text not null,
  class_id      text,
  session_id    uuid not null default gen_random_uuid(),
  question_key  text not null,
  question_type text,                      -- 'mcq' | 'tf' | 'free' | 'select'
  answer        text,
  is_correct    boolean,
  retry_count   int default 0,
  answered_at   timestamptz default now(),
  user_agent    text
);

create index if not exists idx_attempts_student on public.attempts(student_id, answered_at desc);
create index if not exists idx_attempts_class_q on public.attempts(class_id, question_key);
create index if not exists idx_attempts_session  on public.attempts(session_id);

-- 2. Row Level Security
alter table public.attempts enable row level security;

-- 任何人 (含 anon 學生) 可以 INSERT
drop policy if exists "anyone can insert attempts" on public.attempts;
create policy "anyone can insert attempts"
  on public.attempts for insert
  to anon, authenticated
  with check (true);

-- 只有已登入用戶 (教師) 可以 SELECT
drop policy if exists "authenticated can read attempts" on public.attempts;
create policy "authenticated can read attempts"
  on public.attempts for select
  to authenticated
  using (true);

-- 3. 每題正確率統計 view
create or replace view public.item_stats as
select
  class_id,
  question_key,
  question_type,
  count(*)                                                 as total_attempts,
  count(distinct student_id)                               as unique_students,
  sum(case when is_correct then 1 else 0 end)              as correct_count,
  sum(case when is_correct is not null then 1 else 0 end)  as gradable_count,
  round(
    sum(case when is_correct then 1 else 0 end)::numeric
    / nullif(sum(case when is_correct is not null then 1 else 0 end), 0)
    * 100, 1
  ) as correct_rate_pct
from public.attempts
group by class_id, question_key, question_type
order by class_id, question_key;

grant select on public.item_stats to authenticated;

-- 4. 每位學生在每班的作答總覽
create or replace view public.class_summary as
select
  class_id,
  student_id,
  count(*)                                       as total_attempts,
  count(distinct question_key)                   as unique_questions_answered,
  sum(case when is_correct then 1 else 0 end)    as correct_count,
  round(
    sum(case when is_correct then 1 else 0 end)::numeric
    / nullif(sum(case when is_correct is not null then 1 else 0 end), 0)
    * 100, 1
  )                                              as accuracy_pct,
  min(answered_at)                               as first_answer_at,
  max(answered_at)                               as last_answer_at
from public.attempts
group by class_id, student_id
order by class_id, student_id;

grant select on public.class_summary to authenticated;

-- ============================================================
-- 教師建立帳號方式：
-- 在 Supabase Dashboard → Authentication → Users → Add user
-- 用 email + password 註冊；之後就能登入 teacher.html 看統計
-- ============================================================

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

-- 顯式 GRANT (符合 2026-05-30 後 Supabase 的新預設行為)
-- 舊專案於 2026-10-30 前都能自動授權，加上這些 GRANT 後可保證未來重跑也適用
grant usage on schema public to anon, authenticated;
grant insert on public.attempts to anon, authenticated;
grant select on public.attempts to authenticated;
grant usage, select on sequence public.attempts_id_seq to anon, authenticated;

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
-- 5. ML 工作坊掃描資料表 (microplastic-ml-workshop.html 使用)
-- ============================================================
create table if not exists public.ml_workshop_scans (
  id           bigserial primary key,
  student_id   text not null,
  group_id     text,
  plastic_type text not null,                  -- 'PE' | 'PP' | 'PET' | 'PS' | 'PVC' | 'PA' | 'ABS' | 'unknown'
  technique    text not null,                  -- 'NIR' | 'Raman'
  instrument   text,                           -- 'InnoSpectra' | 'NeoSpectra' | 'MicroNIR' | 'QEPro_532' | 'QEPro_785'
  wavelengths  jsonb not null,                 -- array of numbers (nm 或 cm⁻¹)
  intensities  jsonb not null,                 -- array of numbers
  npoints      int,
  notes        text,
  scanned_at   timestamptz default now(),
  user_agent   text
);

create index if not exists idx_scans_group_plastic on public.ml_workshop_scans(group_id, plastic_type);
create index if not exists idx_scans_technique     on public.ml_workshop_scans(technique, instrument);
create index if not exists idx_scans_student       on public.ml_workshop_scans(student_id, scanned_at desc);

alter table public.ml_workshop_scans enable row level security;

drop policy if exists "anyone can insert scans" on public.ml_workshop_scans;
create policy "anyone can insert scans"
  on public.ml_workshop_scans for insert
  to anon, authenticated
  with check (true);

drop policy if exists "authenticated can read scans" on public.ml_workshop_scans;
create policy "authenticated can read scans"
  on public.ml_workshop_scans for select
  to authenticated
  using (true);

grant insert on public.ml_workshop_scans to anon, authenticated;
grant select on public.ml_workshop_scans to authenticated;
grant usage, select on sequence public.ml_workshop_scans_id_seq to anon, authenticated;

-- 6. ML 工作坊進度檢視 view
create or replace view public.ml_workshop_progress as
select
  group_id,
  technique,
  count(*)                                    as total_scans,
  count(distinct plastic_type)                as unique_plastics,
  count(distinct student_id)                  as students_contributed,
  min(scanned_at)                             as first_scan_at,
  max(scanned_at)                             as last_scan_at
from public.ml_workshop_scans
group by group_id, technique
order by group_id, technique;

grant select on public.ml_workshop_progress to authenticated;

-- ============================================================
-- 教師建立帳號方式：
-- 在 Supabase Dashboard → Authentication → Users → Add user
-- 用 email + password 註冊；之後就能登入 teacher.html 看統計
-- ============================================================

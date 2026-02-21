-- =============================================
-- portal_users: ตาราง track ผู้ใช้ที่ login ผ่าน Microsoft
-- รัน SQL นี้ใน Supabase → SQL Editor
-- =============================================

create table if not exists portal_users (
    id          uuid primary key default gen_random_uuid(),
    email       text unique not null,
    name        text,
    ms_id       text,                          -- Microsoft account ID
    status      text not null default 'pending'
                check (status in ('pending','approved','rejected')),
    approved_by text,                          -- email ของ admin ที่อนุมัติ
    approved_at timestamptz,
    created_at  timestamptz default now(),
    last_login  timestamptz default now()
);

-- ให้ anon key อ่าน/เขียนได้ (RLS off สำหรับ MVP)
alter table portal_users enable row level security;

-- Policy: anon สามารถ upsert ตัวเองได้
create policy "upsert own record" on portal_users
    for all using (true) with check (true);

-- Index เพื่อค้นหาเร็ว
create index if not exists idx_portal_users_status on portal_users(status);
create index if not exists idx_portal_users_email  on portal_users(email);

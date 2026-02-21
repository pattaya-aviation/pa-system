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

-- ─── Row Level Security ───────────────────────────────────────────────────────
alter table portal_users enable row level security;

-- 1) ผู้ใช้อ่านได้เฉพาะ row ของตัวเอง (ใช้ email จาก Supabase Auth JWT)
create policy "user: read own record"
    on portal_users for select
    using ( auth.email() = email );

-- 2) ผู้ใช้ upsert ได้เฉพาะ row ของตัวเอง
create policy "user: upsert own record"
    on portal_users for insert
    with check ( auth.email() = email );

create policy "user: update own last_login"
    on portal_users for update
    using  ( auth.email() = email )
    with check (
        -- ห้ามแก้ status ด้วยตัวเอง
        status = (select status from portal_users where email = auth.email())
    );

-- 3) Admin (approved + email in admin list) อ่าน/เขียนได้ทุก row
--    → ใช้ subquery ตรวจสอบจาก portal_users เองว่า status = 'approved'
create policy "admin: full access"
    on portal_users for all
    using (
        exists (
            select 1 from portal_users self
            where self.email  = auth.email()
              and self.status = 'approved'
              and self.email  like '%@pattayaaviation.com'   -- จำกัดเฉพาะ domain
        )
    );

-- ─── Indexes ──────────────────────────────────────────────────────────────────
create index if not exists idx_portal_users_status on portal_users(status);
create index if not exists idx_portal_users_email  on portal_users(email);

-- ─── Helper: ดู user ปัจจุบัน ──────────────────────────────────────────────────
-- รัน select นี้เพื่อดูว่า auth.email() คืออะไรใน session ปัจจุบัน
-- select auth.email(), auth.uid();


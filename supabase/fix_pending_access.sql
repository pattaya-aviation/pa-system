-- ============================================================
-- fix_pending_access.sql
-- รัน SQL นี้ใน Supabase → SQL Editor
-- แก้ปัญหา: pending user อ่าน status ตัวเองไม่ได้ /
--            admin ไม่เห็น pending users
-- ============================================================

-- 1) ลบ policies เดิมที่อาจซ้ำซ้อน
drop policy if exists "user: read own record"          on portal_users;
drop policy if exists "user: upsert own record"        on portal_users;
drop policy if exists "user: update own last_login"    on portal_users;
drop policy if exists "admin: full access"             on portal_users;
drop policy if exists "authenticated: read all"        on portal_users;
drop policy if exists "admin: update status"           on portal_users;

-- 2) ทุก authenticated user อ่านทุก row ได้
--    (pending user เห็น row ตัวเอง, admin เห็นทุกคน)
create policy "authenticated: read all"
    on portal_users for select
    to authenticated
    using (true);

-- 3) user insert record ของตัวเองได้ (ครั้งแรก login)
create policy "user: insert own record"
    on portal_users for insert
    to authenticated
    with check ( auth.email() = email );

-- 4) user update last_login ของตัวเองได้ แต่ห้ามแก้ status
create policy "user: update own last_login"
    on portal_users for update
    to authenticated
    using  ( auth.email() = email )
    with check (
        -- ให้ update ได้เฉพาะเมื่อ status ไม่เปลี่ยน
        status = (select status from portal_users where email = auth.email())
    );

-- 5) admin (approved) update status / permissions ของ user อื่นได้
create policy "admin: update any record"
    on portal_users for update
    to authenticated
    using (
        exists (
            select 1 from portal_users self
            where self.email  = auth.email()
              and self.status = 'approved'
        )
    );

-- 6) (Optional) ถ้าต้องการให้ anon upsert ได้ด้วย (กรณี Supabase session
--    ยังไม่ fully initialized ตอน callback) — comment out ถ้าไม่ต้องการ
-- create policy "anon: insert pending"
--     on portal_users for insert
--     to anon
--     with check ( status = 'pending' );

-- ============================================================
-- ตรวจสอบ: ดู policies ทั้งหมดที่มีอยู่
-- ============================================================
-- select policyname, cmd, roles, qual, with_check
-- from pg_policies
-- where tablename = 'portal_users';

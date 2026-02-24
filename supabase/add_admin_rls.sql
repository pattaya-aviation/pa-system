-- ============================================================
-- รัน SQL นี้ใน Supabase → SQL Editor
-- เพิ่ม policy ให้ admin อ่าน portal_users ทุก row ได้
-- ============================================================

-- ล้าง policy เก่าก่อน (ถ้ามี)
drop policy if exists "admin: full access"     on portal_users;
drop policy if exists "authenticated: read all" on portal_users;

-- Policy: authenticated user อ่าน portal_users ได้ทุก row
-- (ครอบคลุม test/1234 admin ที่ sign in ด้วย Supabase Auth)
create policy "authenticated: read all"
    on portal_users for select
    to authenticated
    using (true);

-- Policy: admin (approved) update status ของ user อื่นได้
create policy "admin: update status"
    on portal_users for update
    to authenticated
    using (
        -- ผู้ที่ทำการ update ต้องเป็น approved user
        exists (
            select 1 from portal_users self
            where self.email  = auth.email()
              and self.status = 'approved'
        )
    );

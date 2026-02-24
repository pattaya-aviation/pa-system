-- ============================================================
-- auto_create_portal_user.sql
-- Database Trigger: เมื่อมี user ใหม่ sign in ผ่าน Supabase Auth
-- จะ auto-insert record เข้า portal_users โดยอัตโนมัติ
-- ไม่พึ่ง RLS หรือ frontend insert
-- รัน SQL นี้ใน Supabase → SQL Editor
-- ============================================================

-- STEP 1: Function ที่รันเมื่อมี auth user ใหม่
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer                   -- รันด้วย superuser privilege ข้าม RLS ได้
set search_path = public
as $$
begin
    -- เฉพาะ @pattayaaviation.com เท่านั้น
    if new.email like '%@pattayaaviation.com' then
        insert into public.portal_users (
            email,
            name,
            ms_id,
            status,
            created_at,
            last_login
        )
        values (
            new.email,
            coalesce(new.raw_user_meta_data->>'full_name', new.email),
            coalesce(new.raw_user_meta_data->>'provider_id', ''),
            'pending',
            now(),
            now()
        )
        on conflict (email) do update
            set last_login = now();   -- login ซ้ำ → แค่ update last_login
    end if;

    return new;
end;
$$;

-- STEP 2: Trigger ที่ยิงทุกครั้งที่มี user ใหม่เข้า auth.users
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
    after insert on auth.users
    for each row
    execute function public.handle_new_auth_user();


-- ============================================================
-- BONUS: อัปเดต last_login ทุกครั้งที่ user login ซ้ำ
-- (auth.users.last_sign_in_at จะ update เมื่อ login แต่ trigger
--  INSERT จะไม่ยิงซ้ำ — ใช้ UPDATE trigger แทน)
-- ============================================================
create or replace function public.handle_auth_user_login()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    -- อัปเดต last_login เมื่อมีการ sign in
    if new.last_sign_in_at is distinct from old.last_sign_in_at then
        update public.portal_users
        set last_login = new.last_sign_in_at
        where email = new.email;
    end if;
    return new;
end;
$$;

drop trigger if exists on_auth_user_login on auth.users;

create trigger on_auth_user_login
    after update on auth.users
    for each row
    execute function public.handle_auth_user_login();


-- ============================================================
-- ตรวจสอบ: ดู users ทั้งหมดที่ login แล้วใน auth.users
-- ============================================================
select
    au.email,
    au.raw_user_meta_data->>'full_name' as name,
    au.created_at as first_login,
    au.last_sign_in_at,
    pu.status
from auth.users au
left join portal_users pu on pu.email = au.email
order by au.last_sign_in_at desc;

-- ============================================================
-- create_rpc_register_user.sql
-- สร้าง RPC function ที่ bypass RLS สำหรับ pending registration
-- รัน SQL นี้ใน Supabase → SQL Editor
-- ============================================================

create or replace function public.register_pending_user(
    p_email  text,
    p_name   text default null
)
returns json
language plpgsql
security definer          -- รันด้วยสิทธิ์ owner ข้าม RLS ทั้งหมด
set search_path = public
as $$
declare
    v_record portal_users;
begin
    -- upsert record (insert ถ้าใหม่, update last_login ถ้ามีแล้ว)
    insert into public.portal_users (
        email,
        name,
        status,
        created_at,
        last_login
    )
    values (
        p_email,
        coalesce(p_name, p_email),
        'pending',
        now(),
        now()
    )
    on conflict (email) do update
        set last_login = now()
        -- ไม่ override status ที่ admin ตั้งไว้
    returning * into v_record;

    return json_build_object(
        'email',  v_record.email,
        'status', v_record.status
    );
end;
$$;

-- อนุญาตให้ทุกคน (anon + authenticated) เรียกได้
grant execute on function public.register_pending_user to anon, authenticated;

-- ============================================================
-- ทดสอบ: เรียก function โดยตรง
-- ============================================================
-- select public.register_pending_user(
--     'hr.strategic@pattayaaviation.com',
--     'All HD-S'
-- );

-- ตรวจสอบว่า record ขึ้นหรือยัง
select email, name, status, created_at, last_login
from portal_users
order by created_at desc;

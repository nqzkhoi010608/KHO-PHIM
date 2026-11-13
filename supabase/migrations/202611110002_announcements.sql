-- ═══════════════════════════════════════════════════
-- ANNOUNCEMENTS — site-wide notification/popup system
-- Admin controls display; anon users can read active ones
-- ═══════════════════════════════════════════════════

create type public.announcement_type   as enum ('banner', 'popup', 'toast');
create type public.announcement_status as enum ('draft', 'active', 'paused', 'expired');

create table public.announcements (
  id            uuid              primary key default gen_random_uuid(),
  title         text              not null,
  body          text              not null,
  kind          public.announcement_type   not null default 'banner',
  status        public.announcement_status not null default 'draft',
  -- Display options
  cta_label     text,
  cta_url       text,
  color         text              not null default 'red',   -- red | gold | blue | green | neutral
  is_dismissible boolean          not null default true,
  -- Scheduling
  starts_at     timestamptz,
  ends_at       timestamptz,
  -- Tracking
  created_by    uuid              references auth.users(id),
  updated_by    uuid              references auth.users(id),
  created_at    timestamptz       not null default now(),
  updated_at    timestamptz       not null default now()
);

create index announcements_active_idx
  on public.announcements (status, starts_at, ends_at)
  where status = 'active';

-- RLS
alter table public.announcements enable row level security;

-- Anon + authenticated users can read active announcements
create policy "announcements_public_read"
  on public.announcements for select
  using (
    status = 'active'
    and (starts_at is null or starts_at <= now())
    and (ends_at   is null or ends_at   >= now())
  );

-- Admin function to check admin role (reused pattern from existing code)
create or replace function public.is_admin()
  returns boolean
  language sql
  security definer
  stable
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
      and is_active = true
      and role in ('super_admin', 'admin', 'editor')
  );
$$;

-- Admins can do everything
create policy "announcements_admin_all"
  on public.announcements for all
  using (public.is_admin())
  with check (public.is_admin());

-- Auto-update updated_at
create or replace function public.set_updated_at()
  returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger announcements_updated_at
  before update on public.announcements
  for each row execute procedure public.set_updated_at();

-- Seed a welcome announcement
insert into public.announcements
  (title, body, kind, status, color, cta_label, cta_url, is_dismissible)
values
  (
    'Chào mừng đến với Kho Phim 🎬',
    'Nền tảng xem phim chất lượng cao, cập nhật liên tục. Đăng nhập để lưu tiến độ và danh sách yêu thích của bạn.',
    'banner',
    'active',
    'red',
    'Đăng nhập ngay',
    '/dang-nhap',
    true
  );

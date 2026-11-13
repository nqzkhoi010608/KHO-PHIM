create extension if not exists pgcrypto;

create type public.admin_role as enum ('super_admin', 'admin', 'editor', 'viewer');
create type public.sync_status as enum ('queued', 'running', 'success', 'partial', 'failed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role public.admin_role not null default 'viewer',
  is_active boolean not null default true,
  must_change_password boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.admin_invitations (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  role public.admin_role not null default 'viewer',
  token_hash text not null unique,
  expires_at timestamptz not null,
  accepted_at timestamptz,
  revoked_at timestamptz,
  invited_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);
create index admin_invitations_email_idx on public.admin_invitations (lower(email));

create table public.movies (
  id uuid primary key default gen_random_uuid(),
  external_id text,
  slug text not null unique,
  title text not null,
  original_title text,
  overview text,
  poster_url text,
  backdrop_url text,
  year integer,
  duration_minutes integer,
  quality text,
  language text,
  country text,
  director text,
  cast_names text[] not null default '{}',
  rating numeric(3,1),
  kind text not null,
  status text not null default 'Đang cập nhật',
  is_visible boolean not null default true,
  deleted_at timestamptz,
  last_synced_at timestamptz,
  sync_status public.sync_status,
  sync_error text,
  content_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (external_id)
);
create index movies_visible_updated_idx on public.movies (is_visible, updated_at desc) where deleted_at is null;
create index movies_kind_year_idx on public.movies (kind, year desc) where deleted_at is null;

create table public.movie_sources (
  id uuid primary key default gen_random_uuid(),
  movie_id uuid not null references public.movies(id) on delete cascade,
  provider text not null,
  external_ref text,
  source_type text not null check (source_type in ('hls', 'mp4', 'gateway')),
  domain text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index movie_sources_movie_active_idx on public.movie_sources (movie_id, is_active);

create table public.seasons (
  id uuid primary key default gen_random_uuid(),
  movie_id uuid not null references public.movies(id) on delete cascade,
  season_number integer not null,
  title text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (movie_id, season_number)
);

create table public.episodes (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references public.seasons(id) on delete cascade,
  external_id text,
  episode_number integer not null,
  title text,
  duration_seconds integer,
  is_available boolean not null default false,
  is_new boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (season_id, episode_number),
  unique (external_id)
);

create table public.genres (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null unique,
  created_at timestamptz not null default now()
);
create table public.countries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null unique,
  created_at timestamptz not null default now()
);
create table public.movie_genres (
  movie_id uuid not null references public.movies(id) on delete cascade,
  genre_id uuid not null references public.genres(id) on delete cascade,
  primary key (movie_id, genre_id)
);
create table public.movie_countries (
  movie_id uuid not null references public.movies(id) on delete cascade,
  country_id uuid not null references public.countries(id) on delete cascade,
  primary key (movie_id, country_id)
);

create table public.watch_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  movie_id uuid not null references public.movies(id) on delete cascade,
  season_number integer not null default 1,
  episode_number integer not null,
  seconds_watched integer not null default 0 check (seconds_watched >= 0),
  duration_seconds integer,
  updated_at timestamptz not null default now(),
  primary key (user_id, movie_id, season_number, episode_number)
);
create index watch_progress_user_updated_idx on public.watch_progress (user_id, updated_at desc);

create table public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  movie_id uuid not null references public.movies(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, movie_id)
);

create table public.sync_runs (
  id uuid primary key default gen_random_uuid(),
  trigger_type text not null,
  status public.sync_status not null default 'queued',
  movies_created integer not null default 0,
  movies_updated integer not null default 0,
  errors_count integer not null default 0,
  error_summary text,
  started_at timestamptz,
  finished_at timestamptz,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references auth.users(id),
  action text not null,
  entity_type text,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  ip_hash text,
  device_hash text,
  created_at timestamptz not null default now()
);
create index audit_logs_created_idx on public.audit_logs (created_at desc);
create index audit_logs_actor_idx on public.audit_logs (actor_user_id, created_at desc);

create table public.system_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  description text,
  updated_by uuid references auth.users(id),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.admin_users enable row level security;
alter table public.admin_invitations enable row level security;
alter table public.movie_sources enable row level security;
alter table public.seasons enable row level security;
alter table public.episodes enable row level security;
alter table public.genres enable row level security;
alter table public.countries enable row level security;
alter table public.movie_genres enable row level security;
alter table public.movie_countries enable row level security;
alter table public.watch_progress enable row level security;
alter table public.favorites enable row level security;
alter table public.sync_runs enable row level security;
alter table public.audit_logs enable row level security;
alter table public.system_settings enable row level security;
alter table public.movies enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "admin_users_select_own" on public.admin_users for select using (auth.uid() = user_id);
create policy "progress_select_own" on public.watch_progress for select using (auth.uid() = user_id);
create policy "progress_insert_own" on public.watch_progress for insert with check (auth.uid() = user_id);
create policy "progress_update_own" on public.watch_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "progress_delete_own" on public.watch_progress for delete using (auth.uid() = user_id);
create policy "favorites_select_own" on public.favorites for select using (auth.uid() = user_id);
create policy "favorites_insert_own" on public.favorites for insert with check (auth.uid() = user_id);
create policy "favorites_delete_own" on public.favorites for delete using (auth.uid() = user_id);
create policy "movies_public_visible" on public.movies for select using (is_visible = true and deleted_at is null);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name, avatar_url) values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email), new.raw_user_meta_data->>'avatar_url') on conflict (id) do nothing;
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

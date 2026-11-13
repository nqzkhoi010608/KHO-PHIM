create table public.user_favorite_movies (
  user_id uuid not null references auth.users(id) on delete cascade,
  movie_slug text not null,
  movie_title text not null default '',
  poster_url text,
  banner_url text,
  created_at timestamptz not null default now(),
  primary key (user_id, movie_slug)
);

create index user_favorite_movies_user_created_idx
  on public.user_favorite_movies (user_id, created_at desc);

create table public.user_watch_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  movie_slug text not null,
  episode_slug text not null,
  episode_name text not null default '',
  seconds_watched integer not null default 0 check (seconds_watched >= 0),
  duration_seconds integer check (duration_seconds is null or duration_seconds >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, movie_slug, episode_slug)
);

create index user_watch_progress_user_updated_idx
  on public.user_watch_progress (user_id, updated_at desc);

alter table public.user_favorite_movies enable row level security;
alter table public.user_watch_progress enable row level security;

create policy "user_favorite_movies_select_own"
  on public.user_favorite_movies for select using (auth.uid() = user_id);
create policy "user_favorite_movies_insert_own"
  on public.user_favorite_movies for insert with check (auth.uid() = user_id);
create policy "user_favorite_movies_update_own"
  on public.user_favorite_movies for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "user_favorite_movies_delete_own"
  on public.user_favorite_movies for delete using (auth.uid() = user_id);

create policy "user_watch_progress_select_own"
  on public.user_watch_progress for select using (auth.uid() = user_id);
create policy "user_watch_progress_insert_own"
  on public.user_watch_progress for insert with check (auth.uid() = user_id);
create policy "user_watch_progress_update_own"
  on public.user_watch_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "user_watch_progress_delete_own"
  on public.user_watch_progress for delete using (auth.uid() = user_id);

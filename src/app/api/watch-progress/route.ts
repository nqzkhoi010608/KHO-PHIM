import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const progressSchema = z.object({
  movieSlug: z.string().min(1).max(200),
  episodeSlug: z.string().min(1).max(200),
  episodeName: z.string().max(100).optional().default(''),
  secondsWatched: z.number().int().min(0),
  durationSeconds: z.number().int().min(0).optional(),
});

function getUserClient() {
  return createSupabaseServerClient();
}

export async function POST(request: Request) {
  const supabase = await getUserClient();
  if (!supabase) return NextResponse.json({ ok: false, code: 'SUPABASE_NOT_CONFIGURED' }, { status: 503 });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false, code: 'AUTH_REQUIRED' }, { status: 401 });
  const parsed = progressSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ ok: false, code: 'INVALID_PROGRESS' }, { status: 400 });
  const { error } = await supabase.from('user_watch_progress').upsert({
    user_id: user.id,
    movie_slug: parsed.data.movieSlug,
    episode_slug: parsed.data.episodeSlug,
    episode_name: parsed.data.episodeName,
    seconds_watched: parsed.data.secondsWatched,
    duration_seconds: parsed.data.durationSeconds ?? null,
    updated_at: new Date().toISOString(),
  });
  if (error) return NextResponse.json({ ok: false, code: 'PROGRESS_WRITE_FAILED' }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function GET(request: Request) {
  const supabase = await getUserClient();
  if (!supabase) return NextResponse.json({ ok: false, code: 'SUPABASE_NOT_CONFIGURED' }, { status: 503 });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false, code: 'AUTH_REQUIRED' }, { status: 401 });
  const params = new URL(request.url).searchParams;
  const movieSlug = params.get('movieSlug')?.trim();
  const episodeSlug = params.get('episodeSlug')?.trim();
  if (!movieSlug || !episodeSlug) {
    const { data, error } = await supabase
      .from('user_watch_progress')
      .select('movie_slug, episode_slug, episode_name, seconds_watched, duration_seconds, updated_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .limit(50);
    if (error) return NextResponse.json({ ok: false, code: 'PROGRESS_READ_FAILED' }, { status: 500 });
    return NextResponse.json({ ok: true, items: data ?? [] });
  }
  const { data, error } = await supabase
    .from('user_watch_progress')
    .select('episode_name, seconds_watched, duration_seconds, updated_at')
    .eq('user_id', user.id)
    .eq('movie_slug', movieSlug)
    .eq('episode_slug', episodeSlug)
    .maybeSingle();
  if (error) return NextResponse.json({ ok: false, code: 'PROGRESS_READ_FAILED' }, { status: 500 });
  return NextResponse.json({ ok: true, progress: data ?? null });
}

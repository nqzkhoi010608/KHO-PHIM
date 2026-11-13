import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const favoriteSchema = z.object({
  movieSlug: z.string().min(1).max(200),
  movieTitle: z.string().max(300).optional().default(''),
  posterUrl: z.string().url().optional().nullable(),
  bannerUrl: z.string().url().optional().nullable(),
});

async function getUserClient() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { supabase: null, user: null };
  const { data: { user } } = await supabase.auth.getUser();
  return { supabase, user };
}

export async function POST(request: Request) {
  const { supabase, user } = await getUserClient();
  if (!supabase) return NextResponse.json({ ok: false, code: 'SUPABASE_NOT_CONFIGURED' }, { status: 503 });
  if (!user) return NextResponse.json({ ok: false, code: 'AUTH_REQUIRED' }, { status: 401 });
  const parsed = favoriteSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ ok: false, code: 'INVALID_FAVORITE' }, { status: 400 });
  const { error } = await supabase.from('user_favorite_movies').upsert({
    user_id: user.id,
    movie_slug: parsed.data.movieSlug,
    movie_title: parsed.data.movieTitle,
    poster_url: parsed.data.posterUrl ?? null,
    banner_url: parsed.data.bannerUrl ?? null,
  });
  if (error) return NextResponse.json({ ok: false, code: 'FAVORITE_WRITE_FAILED' }, { status: 500 });
  return NextResponse.json({ ok: true, saved: true });
}

export async function DELETE(request: Request) {
  const { supabase, user } = await getUserClient();
  if (!supabase) return NextResponse.json({ ok: false, code: 'SUPABASE_NOT_CONFIGURED' }, { status: 503 });
  if (!user) return NextResponse.json({ ok: false, code: 'AUTH_REQUIRED' }, { status: 401 });
  const parsed = favoriteSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ ok: false, code: 'INVALID_FAVORITE' }, { status: 400 });
  const { error } = await supabase.from('user_favorite_movies').delete().eq('user_id', user.id).eq('movie_slug', parsed.data.movieSlug);
  if (error) return NextResponse.json({ ok: false, code: 'FAVORITE_DELETE_FAILED' }, { status: 500 });
  return NextResponse.json({ ok: true, saved: false });
}

export async function GET(request: Request) {
  const { supabase, user } = await getUserClient();
  if (!supabase) return NextResponse.json({ ok: false, code: 'SUPABASE_NOT_CONFIGURED' }, { status: 503 });
  if (!user) return NextResponse.json({ ok: false, code: 'AUTH_REQUIRED' }, { status: 401 });
  const movieSlug = new URL(request.url).searchParams.get('movieSlug')?.trim();
  if (!movieSlug) {
    const { data, error } = await supabase
      .from('user_favorite_movies')
      .select('movie_slug, movie_title, poster_url, banner_url, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (error) return NextResponse.json({ ok: false, code: 'FAVORITE_READ_FAILED' }, { status: 500 });
    return NextResponse.json({ ok: true, items: data ?? [] });
  }
  const { data, error } = await supabase
    .from('user_favorite_movies')
    .select('movie_slug')
    .eq('user_id', user.id)
    .eq('movie_slug', movieSlug)
    .maybeSingle();
  if (error) return NextResponse.json({ ok: false, code: 'FAVORITE_READ_FAILED' }, { status: 500 });
  return NextResponse.json({ ok: true, saved: Boolean(data) });
}

import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const revalidate = 60; // ISR — revalidate every 60s

export async function GET() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    // Supabase not configured — return empty list gracefully
    return NextResponse.json({ data: [] });
  }

  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('announcements')
    .select('id, title, body, kind, color, cta_label, cta_url, is_dismissible')
    .eq('status', 'active')
    .or(`starts_at.is.null,starts_at.lte.${now}`)
    .or(`ends_at.is.null,ends_at.gte.${now}`)
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('[announcements] fetch error:', error.message);
    return NextResponse.json({ data: [] });
  }

  return NextResponse.json({ data: data ?? [] });
}

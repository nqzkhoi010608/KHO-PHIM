import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname === '/admin/login') return NextResponse.next();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) { const login = new URL('/admin/login', request.url); login.searchParams.set('next', request.nextUrl.pathname); login.searchParams.set('reason', 'missing-config'); return NextResponse.redirect(login); }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, { cookies: { getAll: () => request.cookies.getAll(), setAll(values: Array<{ name: string; value: string; options: CookieOptions }>) { values.forEach(({ name, value, options }) => { request.cookies.set(name, value); response.cookies.set(name, value, options); }); } } });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { const login = new URL('/admin/login', request.url); login.searchParams.set('next', request.nextUrl.pathname); return NextResponse.redirect(login); }

  // Role phải được kiểm tra ở server từ admin_users/RPC, không nhận từ client.
  const { data: admin } = await supabase.from('admin_users').select('role,is_active').eq('user_id', user.id).maybeSingle();
  if (!admin?.is_active || !admin.role) { const login = new URL('/admin/login', request.url); login.searchParams.set('next', request.nextUrl.pathname); login.searchParams.set('reason', 'not-invited'); return NextResponse.redirect(login); }
  return response;
}

export const config = { matcher: ['/admin/:path*'] };

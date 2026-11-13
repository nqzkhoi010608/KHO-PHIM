'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Film, LockKeyhole, Mail, ShieldCheck, UserRound, X } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

export default function SignInPage() {
  const [mode,     setMode]     = useState<'login' | 'register'>('login');
  const [notice,   setNotice]   = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [name,     setName]     = useState('');

  async function handleSubmit() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) { setNotice('Đăng nhập Google sẽ được bật khi bạn thêm cấu hình Supabase.'); return; }
    const requestedNext = new URLSearchParams(window.location.search).get('next') ?? '/';
    const next = requestedNext.startsWith('/') && !requestedNext.startsWith('//') ? requestedNext : '/';
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(next)}` } });
    if (error) setNotice('Không thể bắt đầu đăng nhập. Vui lòng thử lại sau.');
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20" style={{ background: 'var(--black)' }}>
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 55% at 50% 0%, rgba(201,168,76,0.06), transparent 65%)' }} />

      {/* Close */}
      <Link href="/" className="fixed right-5 top-5 z-20 grid h-10 w-10 place-items-center transition-all duration-250" style={{ borderRadius: 'var(--r-lg)', background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.12)', color: 'var(--muted-up)', backdropFilter: 'blur(14px)' }} aria-label="Đóng">
        <X size={16} />
      </Link>

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-[420px] overflow-hidden"
        style={{ borderRadius: 'var(--r-2xl)', background: 'rgba(10,10,20,0.75)', backdropFilter: 'blur(44px) saturate(150%)', WebkitBackdropFilter: 'blur(44px) saturate(150%)', border: '1px solid rgba(201,168,76,0.12)', boxShadow: '0 2px 0 rgba(201,168,76,0.07) inset, var(--shadow-lg)' }}
      >
        {/* Gold top line */}
        <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent 5%, var(--gold-deep) 35%, var(--gold-pale) 50%, var(--gold-deep) 65%, transparent 95%)' }} />

        {/* Header */}
        <div className="flex flex-col items-center gap-4 px-8 pb-6 pt-8" style={{ borderBottom: '1px solid rgba(201,168,76,0.09)' }}>
          <div className="logo-mark relative grid h-12 w-12 place-items-center overflow-hidden" style={{ borderRadius: '14px' }}>
            <Film size={21} strokeWidth={2.5} style={{ position: 'relative', zIndex: 1 }} />
          </div>
          <div className="text-center">
            <p className="text-[18px] font-black tracking-[-0.025em] text-white">Kho Phim</p>
            <p className="text-[8.5px] font-black uppercase tracking-[0.24em]" style={{ color: 'var(--gold)', marginTop: '2px' }}>Cinema</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="px-7 pt-6">
          <div className="flex gap-1 p-1" style={{ borderRadius: 'var(--r-sm)', background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.09)' }}>
            {(['login', 'register'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="flex-1 py-2.5 text-sm font-bold transition-all duration-250"
                style={{
                  borderRadius: 'calc(var(--r-sm) - 3px)',
                  background: mode === m ? 'linear-gradient(135deg, var(--gold-deep), var(--gold), var(--gold-pale))' : 'transparent',
                  color: mode === m ? '#180d00' : 'var(--muted-up)',
                  boxShadow: mode === m ? '0 2px 10px rgba(201,168,76,0.3)' : 'none',
                }}
              >
                {m === 'login' ? 'Đăng nhập' : 'Đăng ký'}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="px-7 py-6">
          <h1 className="t-h4 mb-1">{mode === 'login' ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}</h1>
          <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--muted-up)' }}>
            {mode === 'login' ? 'Đăng nhập để lưu tiến độ và danh sách yêu thích.' : 'Tham gia Kho Phim để trải nghiệm đầy đủ tính năng.'}
          </p>

          <div className="mt-5 space-y-3">
            {mode === 'register' && (
              <div className="relative">
                <UserRound size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
                <input value={name} onChange={(e) => setName(e.target.value)} className="field-input pl-10" placeholder="Họ và tên" aria-label="Họ và tên" />
              </div>
            )}
            <div className="relative">
              <Mail size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="field-input pl-10" placeholder="Email" aria-label="Email" autoComplete="email" />
            </div>
            <div className="relative">
              <LockKeyhole size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="field-input pl-10" placeholder="Mật khẩu" aria-label="Mật khẩu" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
            </div>
          </div>

          {mode === 'login' && (
            <div className="mt-3 text-right">
              <button type="button" className="text-xs font-medium transition-colors hover:text-gold" style={{ color: 'var(--muted)' }}>Quên mật khẩu?</button>
            </div>
          )}

          {notice && (
            <div className="mt-4 p-3.5 text-xs leading-relaxed" style={{ borderRadius: 'var(--r-sm)', background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.18)', color: 'var(--white-dim)' }}>
              {notice}
            </div>
          )}

          <button type="button" onClick={handleSubmit} className="btn btn-primary mt-5 w-full justify-center text-[14px]">
            {mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
          </button>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: 'rgba(201,168,76,0.1)' }} />
            <span className="text-xs" style={{ color: 'var(--muted)' }}>hoặc</span>
            <div className="h-px flex-1" style={{ background: 'rgba(201,168,76,0.1)' }} />
          </div>

          {/* Google */}
          <button
            type="button" onClick={handleSubmit}
            className="flex w-full items-center justify-center gap-3 py-3 text-sm font-semibold transition-all duration-250"
            style={{ borderRadius: 'var(--r-sm)', background: 'rgba(245,240,232,0.04)', border: '1px solid rgba(245,240,232,0.08)', color: 'var(--white-dim)' }}
          >
            <svg width="16" height="16" viewBox="0 0 48 48" fill="none"><path d="M44.5 20H24v8.5h11.8C34.7 33.9 29.9 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" fill="#FFC107"/><path d="M6.3 14.7l7 5.1C15.1 15.1 19.2 12 24 12c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.6 7.4 6.3 14.7z" fill="#FF3D00"/><path d="M24 46c5.8 0 10.8-1.9 14.8-5.2l-6.8-5.6C29.9 36.6 27.1 37.5 24 37.5c-5.8 0-10.6-3.9-12.3-9.3l-7.1 5.5C8.3 41.5 15.6 46 24 46z" fill="#4CAF50"/><path d="M44.5 20H24v8.5h11.8c-.8 2.2-2.3 4.2-4.1 5.6l6.8 5.6c3.9-3.6 6.5-9 6.5-15.7 0-1.3-.2-2.7-.5-4z" fill="#1976D2"/></svg>
            Đăng nhập với Google
          </button>

          <div className="mt-6 flex items-start gap-2.5 border-t pt-5 text-xs font-light leading-[1.75]" style={{ borderColor: 'rgba(201,168,76,0.09)', color: 'var(--muted-up)' }}>
            <ShieldCheck size={13} className="mt-px shrink-0" style={{ color: 'var(--gold)' }} />
            Tài khoản chỉ dùng để đồng bộ trải nghiệm xem phim của bạn trên mọi thiết bị.
          </div>
        </div>
      </div>
    </div>
  );
}

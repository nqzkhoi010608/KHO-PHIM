'use client';

import Link from 'next/link';
import { Clock3, LogIn, Play } from 'lucide-react';
import { useEffect, useState } from 'react';

type HistoryItem = { movie_slug: string; episode_slug: string; episode_name: string; seconds_watched: number; duration_seconds: number | null };

export function WatchHistoryList() {
  const [items, setItems] = useState<HistoryItem[] | null>(null);
  const [requiresLogin, setRequiresLogin] = useState(false);

  useEffect(() => {
    void fetch('/api/watch-progress')
      .then(async (response) => {
        if (response.status === 401) { setRequiresLogin(true); return; }
        if (!response.ok) { setItems([]); return; }
        const data = await response.json() as { items?: HistoryItem[] };
        setItems(data.items ?? []);
      })
      .catch(() => setItems([]));
  }, []);

  if (requiresLogin) return <div className="surface mx-auto max-w-lg p-8 text-center"><LogIn className="mx-auto" size={28} style={{ color: 'var(--gold)' }} /><h2 className="mt-4 text-lg font-bold text-white">Đăng nhập để xem lịch sử</h2><p className="mt-2 text-sm" style={{ color: 'var(--muted-up)' }}>Tiến trình xem được đồng bộ theo tài khoản.</p><Link href="/dang-nhap?next=%2Flich-su-xem" className="btn btn-primary mt-6">Đăng nhập</Link></div>;
  if (items === null) return <div className="surface mx-auto h-40 max-w-3xl animate-pulse" />;
  if (items.length === 0) return <div className="surface mx-auto max-w-lg p-8 text-center"><Clock3 className="mx-auto" size={28} style={{ color: 'var(--teal)' }} /><h2 className="mt-4 text-lg font-bold text-white">Bạn chưa có lịch sử xem</h2><p className="mt-2 text-sm" style={{ color: 'var(--muted-up)' }}>Đăng nhập và bắt đầu xem để lưu tiến trình.</p><Link href="/" className="btn btn-primary mt-6"><Play size={15} fill="currentColor" /> Bắt đầu xem</Link></div>;

  return <div className="surface divide-y overflow-hidden" style={{ borderColor: 'var(--line)' }}>{items.map((item) => { const percent = item.duration_seconds ? Math.min(100, Math.round((item.seconds_watched / item.duration_seconds) * 100)) : 0; return <Link key={`${item.movie_slug}-${item.episode_slug}`} href={`/xem-phim/${item.movie_slug}/${item.episode_slug}`} className="flex items-center gap-4 p-5 transition-colors hover:bg-white/[0.03]"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ background: 'rgba(0,201,177,0.08)', color: 'var(--teal)' }}><Play size={16} fill="currentColor" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-white">{item.movie_slug}</p><p className="mt-1 text-xs" style={{ color: 'var(--muted-up)' }}>Tập {item.episode_name || item.episode_slug}</p><div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full" style={{ width: `${percent}%`, background: 'var(--teal)' }} /></div></div><span className="shrink-0 text-xs font-semibold" style={{ color: 'var(--teal)' }}>{percent > 0 ? `${percent}%` : 'Đang xem'}</span></Link>; })}</div>;
}

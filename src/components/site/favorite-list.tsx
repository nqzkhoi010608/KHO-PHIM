'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, LogIn, Play } from 'lucide-react';
import { useEffect, useState } from 'react';

type FavoriteItem = { movie_slug: string; movie_title: string; poster_url: string | null; created_at: string };

export function FavoriteList() {
  const [items, setItems] = useState<FavoriteItem[] | null>(null);
  const [requiresLogin, setRequiresLogin] = useState(false);

  useEffect(() => {
    void fetch('/api/favorites')
      .then(async (response) => {
        if (response.status === 401) { setRequiresLogin(true); return; }
        if (!response.ok) { setItems([]); return; }
        const data = await response.json() as { items?: FavoriteItem[] };
        setItems(data.items ?? []);
      })
      .catch(() => setItems([]));
  }, []);

  if (requiresLogin) return <div className="surface mx-auto max-w-lg p-8 text-center"><LogIn className="mx-auto" size={28} style={{ color: 'var(--gold)' }} /><h2 className="mt-4 text-lg font-bold text-white">Đăng nhập để xem danh sách</h2><p className="mt-2 text-sm" style={{ color: 'var(--muted-up)' }}>Danh sách yêu thích được đồng bộ theo tài khoản của bạn.</p><Link href="/dang-nhap?next=%2Fphim-yeu-thich" className="btn btn-primary mt-6">Đăng nhập</Link></div>;
  if (items === null) return <div className="surface mx-auto h-40 max-w-3xl animate-pulse" />;
  if (items.length === 0) return <div className="surface mx-auto max-w-lg p-8 text-center"><Heart className="mx-auto" size={28} style={{ color: 'var(--gold)' }} /><h2 className="mt-4 text-lg font-bold text-white">Danh sách còn trống</h2><p className="mt-2 text-sm" style={{ color: 'var(--muted-up)' }}>Lưu phim bạn muốn xem lại để tìm thấy nhanh hơn.</p><Link href="/" className="btn btn-primary mt-6"><Play size={15} fill="currentColor" /> Khám phá phim</Link></div>;

  return <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">{items.map((item) => <Link key={item.movie_slug} href={`/phim/${item.movie_slug}`} className="group"><div className="relative aspect-[2/3] overflow-hidden rounded-xl border" style={{ borderColor: 'var(--line)' }}>{item.poster_url && <Image src={item.poster_url} alt={item.movie_title} fill sizes="(max-width: 640px) 45vw, 180px" className="object-cover transition-transform duration-500 group-hover:scale-105" />}<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/40 to-transparent p-3 pt-12"><p className="line-clamp-2 text-sm font-bold text-white">{item.movie_title || item.movie_slug}</p></div></div></Link>)}</div>;
}

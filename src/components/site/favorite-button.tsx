'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function FavoriteButton({
  movieSlug,
  movieTitle,
  posterUrl,
  bannerUrl,
  compact = false,
}: {
  movieSlug: string;
  movieTitle: string;
  posterUrl?: string;
  bannerUrl?: string;
  compact?: boolean;
}) {
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loginHref, setLoginHref] = useState('/dang-nhap');
  const [loginNotice, setLoginNotice] = useState(false);

  useEffect(() => {
    let active = true;
    void fetch(`/api/favorites?movieSlug=${encodeURIComponent(movieSlug)}`)
      .then(async (response) => {
        if (!active || !response.ok) return;
        const data = await response.json() as { saved?: boolean };
        if (active) setSaved(Boolean(data.saved));
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, [movieSlug]);

  async function toggle() {
    if (busy) return;
    setBusy(true);
    try {
      const response = await fetch('/api/favorites', {
        method: saved ? 'DELETE' : 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ movieSlug, movieTitle, posterUrl, bannerUrl }),
      });
      if (response.status === 401) {
        const next = `${window.location.pathname}${window.location.search}`;
        setLoginHref(`/dang-nhap?next=${encodeURIComponent(next)}`);
        setLoginNotice(true);
        return;
      }
      if (response.ok) setSaved((value) => !value);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={toggle}
        disabled={busy}
        className={compact ? 'btn btn-icon' : `btn ${saved ? 'border-signal bg-signal text-ink' : 'btn-quiet'}`}
        aria-label={compact ? (saved ? 'Bỏ khỏi yêu thích' : 'Lưu yêu thích') : undefined}
        aria-pressed={saved}
      >
        <Heart size={compact ? 16 : 17} fill={saved ? 'currentColor' : 'none'} />
        {!compact && (busy ? 'Đang lưu...' : saved ? 'Đã lưu' : 'Lưu yêu thích')}
      </button>
      {loginNotice && (
        <div
          className="absolute right-0 top-[calc(100%+10px)] z-30 w-64 rounded-xl border p-3 text-left shadow-2xl"
          role="alert"
          style={{ background: 'rgba(16,13,9,0.98)', borderColor: 'rgba(201,168,76,0.28)' }}
        >
          <p className="text-xs font-semibold text-white">Vui lòng đăng nhập để lưu phim.</p>
          <Link href={loginHref} className="mt-2 inline-flex text-xs font-bold" style={{ color: 'var(--gold)' }}>
            Đăng nhập ngay →
          </Link>
        </div>
      )}
    </div>
  );
}

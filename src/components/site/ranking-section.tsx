import Image from 'next/image';
import Link from 'next/link';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { Movie } from '@/types/catalog';

const GENRE_COLORS: Record<string, string> = {
  'Chính Kịch':   '#f97316',
  'Hài Hước':     '#22c55e',
  'Hành Động':    '#ef4444',
  'Tình Cảm':     '#ec4899',
  'Phiêu Lưu':    '#3b82f6',
  'Kinh Dị':      '#8b5cf6',
  'Viễn Tưởng':   '#06b6d4',
  'Tâm Lý':       '#f59e0b',
  'Hình Sự':      '#64748b',
  'Cổ Trang':     '#a16207',
};

function TrendIcon({ i }: { i: number }) {
  if (i === 0) return <TrendingUp size={12} style={{ color: '#22c55e' }} />;
  if (i < 3)   return <TrendingUp size={12} style={{ color: '#22c55e' }} />;
  return <Minus size={12} style={{ color: 'rgba(245,240,232,0.3)' }} />;
}

function RankItem({ movie, rank }: { movie: Movie; rank: number }) {
  return (
    <Link
      href={`/phim/${movie.slug}`}
      className="group flex items-center gap-3 py-2.5 transition-colors duration-200"
      style={{ borderBottom: '1px solid rgba(201,168,76,0.07)' }}
    >
      {/* Rank number */}
      <span
        className="w-5 shrink-0 text-center text-[13px] font-black tabular-nums"
        style={{ color: rank <= 3 ? 'var(--gold)' : 'rgba(245,240,232,0.25)' }}
      >
        {rank}.
      </span>

      {/* Trend icon */}
      <TrendIcon i={rank - 1} />

      {/* Thumbnail */}
      <div
        className="relative h-9 w-7 shrink-0 overflow-hidden"
        style={{ borderRadius: '5px' }}
      >
        <Image src={movie.posterUrl} alt={movie.title} fill sizes="28px" className="object-cover" />
      </div>

      {/* Title */}
      <span
        className="line-clamp-1 min-w-0 flex-1 text-[13px] font-semibold transition-colors duration-200 group-hover:text-gold"
        style={{ color: 'rgba(245,240,232,0.82)' }}
      >
        {movie.title}
      </span>
    </Link>
  );
}

export function RankingSection({ movies }: { movies: Movie[] }) {
  const trending  = movies.slice(0, 5);
  const favorites = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const genres    = [
    'Chính Kịch', 'Hài Hước', 'Hành Động', 'Tình Cảm', 'Phiêu Lưu',
  ];

  const colHead = (emoji: string, label: string) => (
    <div className="mb-4 flex items-center gap-2">
      <span className="text-base">{emoji}</span>
      <h3
        className="text-[13px] font-black uppercase tracking-[0.14em]"
        style={{ color: 'var(--gold)' }}
      >
        {label}
      </h3>
    </div>
  );

  return (
    <section className="py-6 sm:py-8">
      <div className="container-shell">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">

          {/* Col 1 — Sôi nổi nhất */}
          <div
            className="p-5"
            style={{
              borderRadius: '14px',
              background: 'rgba(8,8,16,0.6)',
              border: '1px solid rgba(201,168,76,0.09)',
            }}
          >
            {colHead('🔥', 'Sôi nổi nhất')}
            {trending.map((m, i) => <RankItem key={m.id} movie={m} rank={i + 1} />)}
            <Link
              href="/tim-kiem"
              className="mt-3 block text-center text-[12px] font-semibold transition-colors hover:text-gold"
              style={{ color: 'rgba(245,240,232,0.3)' }}
            >
              Xem thêm
            </Link>
          </div>

          {/* Col 2 — Yêu thích nhất */}
          <div
            className="p-5"
            style={{
              borderRadius: '14px',
              background: 'rgba(8,8,16,0.6)',
              border: '1px solid rgba(201,168,76,0.09)',
            }}
          >
            {colHead('💛', 'Yêu thích nhất')}
            {favorites.map((m, i) => <RankItem key={m.id} movie={m} rank={i + 1} />)}
            <Link
              href="/phim-yeu-thich"
              className="mt-3 block text-center text-[12px] font-semibold transition-colors hover:text-gold"
              style={{ color: 'rgba(245,240,232,0.3)' }}
            >
              Xem thêm
            </Link>
          </div>

          {/* Col 3 — Thể loại hot */}
          <div
            className="p-5"
            style={{
              borderRadius: '14px',
              background: 'rgba(8,8,16,0.6)',
              border: '1px solid rgba(201,168,76,0.09)',
            }}
          >
            {colHead('📁', 'Thể loại hot')}
            <div className="space-y-2.5">
              {genres.map((g, i) => (
                <Link
                  key={g}
                  href={`/the-loai/${g.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group flex items-center gap-3 py-0.5"
                >
                  <span
                    className="w-5 shrink-0 text-center text-[13px] font-black"
                    style={{ color: 'rgba(245,240,232,0.25)' }}
                  >
                    {i + 1}.
                  </span>
                  <TrendIcon i={i} />
                  <span
                    className="rounded-full px-3 py-1 text-[12px] font-bold transition-opacity duration-200 group-hover:opacity-80"
                    style={{
                      background: GENRE_COLORS[g] ?? 'var(--gold)',
                      color: '#fff',
                    }}
                  >
                    {g}
                  </span>
                </Link>
              ))}
            </div>
            <Link
              href="/the-loai"
              className="mt-3 block text-center text-[12px] font-semibold transition-colors hover:text-gold"
              style={{ color: 'rgba(245,240,232,0.3)' }}
            >
              Xem thêm
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

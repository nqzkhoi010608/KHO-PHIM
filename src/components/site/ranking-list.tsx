import Image from 'next/image';
import Link from 'next/link';
import { Star, TrendingUp } from 'lucide-react';
import type { Movie } from '@/types/catalog';
import { EmptyState } from '@/components/shared/section-state';

const TOP3 = [
  { color: 'var(--gold)',      shadow: '0 0 20px rgba(201,168,76,0.5)' },
  { color: 'var(--white-dim)', shadow: '0 0 16px rgba(197,197,197,0.3)' },
  { color: '#c9834c',          shadow: '0 0 16px rgba(201,131,76,0.4)' },
];

function RankRow({ movie, rank }: { movie: Movie; rank: number }) {
  const isTop3    = rank <= 3;
  const rankStyle = isTop3 ? TOP3[rank - 1] : { color: 'rgba(245,240,232,0.18)', shadow: undefined };
  const isLast    = rank % 5 === 0; // last in each column

  return (
    <Link
      href={`/phim/${movie.slug}`}
      className="ranking-row group"
      aria-label={`${movie.title} — Xếp hạng ${rank}`}
      style={{ borderBottom: isLast ? 'none' : undefined }}
    >
      {/* Top-3 left accent bar */}
      {isTop3 && (
        <div
          className="absolute inset-y-0 left-0 w-[3px]"
          style={{
            background: `linear-gradient(180deg, ${rankStyle.color}, transparent)`,
            boxShadow: rankStyle.shadow,
          }}
        />
      )}

      {/* Ghost rank number bg */}
      {isTop3 && (
        <div
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 select-none font-black italic leading-none"
          style={{
            fontSize: 'clamp(50px, 7vw, 80px)',
            color: 'transparent',
            WebkitTextStroke: `1px ${rankStyle.color}`,
            opacity: 0.1,
            letterSpacing: '-4px',
          }}
        >
          {rank}
        </div>
      )}

      {/* Rank number */}
      <div
        className="relative z-10 flex w-10 shrink-0 items-center justify-center font-black italic tabular-nums"
        style={{
          fontSize: '18px',
          color: rankStyle.color,
          textShadow: rankStyle.shadow,
          letterSpacing: '-0.02em',
        }}
      >
        {String(rank).padStart(2, '0')}
      </div>

      {/* Thumbnail */}
      <div
        className="relative aspect-[2/3] w-10 shrink-0 overflow-hidden sm:w-11"
        style={{
          borderRadius: '6px',
          border: '1px solid rgba(201,168,76,0.1)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
        }}
      >
        <Image
          src={movie.posterUrl}
          alt={`Poster ${movie.title}`}
          fill sizes="48px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Info */}
      <div className="relative z-10 min-w-0 flex-1">
        <h3 className="card-title line-clamp-1 text-[13px]">{movie.title}</h3>
        <p className="mt-0.5 line-clamp-1 text-[10px]" style={{ color: 'rgba(245,240,232,0.35)' }}>
          {movie.genres.slice(0, 2).join(' · ')} · {movie.country}
        </p>
        <p className="card-update mt-0.5 text-[10px]">{movie.updatedLabel}</p>
      </div>

      {/* Rating */}
      <div className="relative z-10 hidden shrink-0 items-center gap-1 sm:flex">
        <Star size={11} fill="currentColor" style={{ color: 'var(--gold)' }} />
        <span className="text-[12px] font-black" style={{ color: 'rgba(245,240,232,0.75)' }}>
          {movie.rating.toFixed(1)}
        </span>
      </div>
    </Link>
  );
}

export function RankingList({
  title, eyebrow, movies,
}: {
  title: string; eyebrow?: string; movies: Movie[];
}) {
  if (!movies.length)
    return <EmptyState title="Chưa có dữ liệu xếp hạng" description="Bảng xếp hạng sẽ xuất hiện khi có đủ lượt xem." />;

  const top5 = movies.slice(0, 5);
  const bot5 = movies.slice(5, 10);

  return (
    <section className="section-space">
      {/* Header */}
      <div className="sec-head">
        <div className="sec-head-left">
          {eyebrow && <p className="t-eyebrow-diamond">{eyebrow}</p>}
          <h2 className="t-section">{title}</h2>
        </div>
        <div
          className="flex h-10 w-10 items-center justify-center"
          style={{
            borderRadius: 'var(--r-sm)',
            background: 'rgba(201,168,76,0.07)',
            border: '1px solid rgba(201,168,76,0.14)',
          }}
        >
          <TrendingUp size={18} style={{ color: 'var(--gold)' }} />
        </div>
      </div>

      {/* 2-column glass card */}
      <div
        style={{
          borderRadius: 'var(--r-xl)',
          background: 'rgba(8,8,16,0.6)',
          backdropFilter: 'blur(32px) saturate(140%)',
          WebkitBackdropFilter: 'blur(32px) saturate(140%)',
          border: '1px solid var(--line)',
          boxShadow: '0 1px 0 rgba(201,168,76,0.07) inset, var(--shadow-lg)',
          overflow: 'hidden',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Col A — rank 1–5 */}
          <div
            className="overflow-hidden"
            style={{ borderRight: '1px solid rgba(201,168,76,0.07)' }}
          >
            {top5.map((movie, i) => (
              <RankRow key={movie.id} movie={movie} rank={i + 1} />
            ))}
          </div>

          {/* Col B — rank 6–10 */}
          <div
            className="overflow-hidden border-t md:border-t-0"
            style={{ borderColor: 'rgba(201,168,76,0.07)' }}
          >
            {bot5.map((movie, i) => (
              <RankRow key={movie.id} movie={movie} rank={i + 6} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

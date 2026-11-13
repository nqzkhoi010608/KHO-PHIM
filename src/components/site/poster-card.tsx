import Image from 'next/image';
import Link from 'next/link';
import { Play, Star } from 'lucide-react';
import type { Movie } from '@/types/catalog';

export function PosterCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/phim/${movie.slug}`}
      className="movie-card group block w-full"
      aria-label={`Xem thông tin phim ${movie.title}`}
    >
      {/*
        Bỏ hoàn toàn card-border (shrink effect) vì nó tạo viền dày xấu khi hover.
        Thay bằng container đơn giản + hover glow trên shadow.
      */}
      <div
        className="relative overflow-hidden transition-shadow duration-400"
        style={{
          borderRadius: '10px',
          aspectRatio: '2/3',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
        {/* Poster image — scale nhẹ, KHÔNG shrink container */}
        <Image
          src={movie.posterUrl}
          alt={`Poster ${movie.title}`}
          fill
          sizes="(max-width: 480px) 48vw, (max-width: 768px) 32vw, (max-width: 1280px) 20vw, 190px"
          className="object-cover transition-transform duration-600 ease-[var(--ease)] group-hover:scale-[1.05]"
        />

        {/* Bottom gradient */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%]"
          style={{ background: 'linear-gradient(to top, rgba(5,5,10,0.95) 0%, rgba(5,5,10,0.4) 55%, transparent 100%)' }}
        />
        {/* Top gradient */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1/4"
          style={{ background: 'linear-gradient(to bottom, rgba(5,5,10,0.3) 0%, transparent 100%)' }}
        />

        {/* Gold border glow — chỉ hiện khi hover, không tạo viền dày */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[10px] opacity-0 transition-opacity duration-400 group-hover:opacity-100"
          style={{
            boxShadow: '0 0 0 1.5px rgba(201,168,76,0.45) inset, 0 8px 32px rgba(201,168,76,0.12)',
          }}
        />

        {/* Quality badge — top left */}
        {movie.quality && (
          <div className="absolute left-2 top-2 z-10">
            <span className="badge badge-gold">{movie.quality}</span>
          </div>
        )}

        {/* Episode badge — top right */}
        {movie.badge && (
          <div className="absolute right-2 top-2 z-10">
            <span
              className="badge"
              style={{
                background: 'rgba(201,168,76,0.12)',
                border: '1px solid rgba(201,168,76,0.28)',
                color: 'var(--gold)',
                fontSize: '8.5px',
              }}
            >
              {movie.badge}
            </span>
          </div>
        )}

        {/* Rating — fade out on hover */}
        <div
          className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1 transition-all duration-300 group-hover:-translate-y-2 group-hover:opacity-0"
        >
          <Star size={10} fill="currentColor" style={{ color: 'var(--gold)' }} />
          <span className="text-[11px] font-black text-white" style={{ letterSpacing: '-0.01em' }}>
            {movie.rating.toFixed(1)}
          </span>
        </div>

        {/* Hover overlay — genres + meta */}
        <div
          className="absolute inset-0 z-10 flex flex-col justify-end p-3 opacity-0 transition-opacity duration-350 ease-[var(--ease)] group-hover:opacity-100"
          style={{ background: 'linear-gradient(to top, rgba(5,5,10,0.97) 0%, rgba(5,5,10,0.55) 55%, transparent 100%)' }}
        >
          <div className="mb-1 flex flex-wrap gap-1">
            {movie.genres.slice(0, 2).map((g) => (
              <span
                key={g}
                className="text-[9px] font-bold uppercase tracking-wide"
                style={{
                  padding: '1.5px 6px', borderRadius: '3px',
                  background: 'rgba(201,168,76,0.1)',
                  border: '1px solid rgba(201,168,76,0.18)',
                  color: 'rgba(201,168,76,0.8)',
                }}
              >
                {g}
              </span>
            ))}
          </div>
          <p className="text-[10px] font-medium" style={{ color: 'rgba(245,240,232,0.38)' }}>
            {movie.country} · {movie.year}
          </p>
        </div>

        {/* Play button — slides up on hover */}
        <div className="absolute bottom-2.5 right-2.5 z-20">
          <div className="card-play">
            <Play size={13} fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Info block */}
      <div className="movie-card-info">
        <h3 className="card-title line-clamp-1">{movie.title}</h3>
        <p className="card-orig line-clamp-1">{movie.originalTitle}</p>
        <div className="mt-1.5 flex items-center justify-between">
          <p className="card-update">{movie.updatedLabel}</p>
          <p className="card-year">{movie.year}</p>
        </div>
      </div>
    </Link>
  );
}

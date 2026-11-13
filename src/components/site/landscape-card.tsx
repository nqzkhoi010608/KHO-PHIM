import Image from 'next/image';
import Link from 'next/link';
import type { Movie } from '@/types/catalog';

/**
 * LandscapeCard — card dạng 16/9 theo style ChợPhim:
 * backdrop ảnh + badge Song Ngữ góc trên phải + badge PD/TM góc dưới trái
 */
export function LandscapeCard({ movie }: { movie: Movie }) {
  const totalEp = movie.seasons[0]?.episodes.length ?? 0;

  return (
    <Link
      href={`/phim/${movie.slug}`}
      className="group block w-full"
      aria-label={`Xem thông tin ${movie.title}`}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ borderRadius: '10px', aspectRatio: '16/9' }}
      >
        <Image
          src={movie.backdropUrl}
          alt={movie.title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 44vw, 28vw"
          className="object-cover transition-transform duration-500 ease-[var(--ease)] group-hover:scale-105"
        />

        {/* Bottom gradient */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(5,5,10,0.92) 0%, rgba(5,5,10,0.3) 60%, transparent 100%)' }}
        />

        {/* Top gradient — fades logo/badge area */}
        <div
          className="absolute inset-x-0 top-0 h-1/4 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(5,5,10,0.3), transparent)' }}
        />

        {/* Song Ngữ / language badge — top right */}
        <div className="absolute right-2 top-2 z-10">
          <span
            className="inline-flex items-center gap-1 px-2 py-[3px] text-[10px] font-bold leading-none text-white"
            style={{
              borderRadius: '5px',
              background: 'rgba(109, 40, 217, 0.82)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(167,139,250,0.35)',
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3c-1.2 5.4-5 9-9 9 4 0 7.8 3.6 9 9 1.2-5.4 5-9 9-9-4 0-7.8-3.6-9-9z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
            Song Ngữ
          </span>
        </div>

        {/* Episode / quality badges — bottom left */}
        <div className="absolute bottom-2 left-2 z-10 flex flex-wrap items-center gap-1">
          {totalEp > 0 && (
            <span
              className="px-1.5 py-[2.5px] text-[9.5px] font-bold text-white"
              style={{ borderRadius: '4px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
            >
              PD. {totalEp}
            </span>
          )}
          {movie.quality && (
            <span
              className="px-1.5 py-[2.5px] text-[9.5px] font-bold"
              style={{ borderRadius: '4px', background: 'rgba(201,168,76,0.75)', color: '#1a0e00' }}
            >
              {movie.quality}
            </span>
          )}
        </div>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
          style={{ background: 'rgba(201,168,76,0.05)' }}
        />
      </div>

      {/* Info below card */}
      <div className="mt-2.5 px-0.5">
        <h3
          className="line-clamp-1 text-[14px] font-bold leading-snug tracking-tight transition-colors duration-200 group-hover:text-gold"
          style={{ color: 'rgba(245,240,232,0.92)' }}
        >
          {movie.title}
        </h3>
        <p
          className="mt-0.5 line-clamp-1 text-[11px] italic"
          style={{ color: 'rgba(245,240,232,0.32)' }}
        >
          {movie.originalTitle}
        </p>
        {/* Hover underline */}
        <div
          className="mt-2 h-[2px] w-0 rounded-full transition-all duration-350 group-hover:w-12"
          style={{ background: 'linear-gradient(90deg, var(--gold-deep), var(--gold))' }}
        />
      </div>
    </Link>
  );
}

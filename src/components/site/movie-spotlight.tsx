import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, Play, Star } from 'lucide-react';
import type { Movie } from '@/types/catalog';
import { getMovieWatchHref } from '@/lib/catalog/navigation';

export function MovieSpotlight({ movie, eyebrow, title }: { movie: Movie; eyebrow?: string; title?: string }) {
  return (
    <section className="section-space">
      <div className="sec-head">
        <div className="sec-head-left">
          {eyebrow && <p className="t-eyebrow-diamond">{eyebrow}</p>}
          <h2 className="t-section">{title ?? 'Điểm nhấn'}</h2>
        </div>
      </div>

      <div className="spotlight-card group">
        {/* Backdrop */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={movie.backdropUrl}
            alt={`Backdrop ${movie.title}`}
            fill
            sizes="(max-width: 1500px) 100vw, 1500px"
            className="spotlight-backdrop object-cover object-[center_20%]"
          />
        </div>

        {/* Gradient layers */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,10,0.99) 0%, rgba(5,5,10,0.65) 40%, rgba(5,5,10,0.1) 70%, transparent 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(5,5,10,0.88) 0%, rgba(5,5,10,0.4) 50%, transparent 72%)' }} />
        <div className="pointer-events-none absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse 70% 60% at 10% 90%, rgba(201,168,76,0.15) 0%, transparent 65%)' }} />

        <div className="relative min-h-[440px] sm:min-h-[520px] lg:min-h-[560px]">
          <div className="absolute inset-0 flex flex-col justify-end px-7 pb-10 pt-10 sm:px-12 sm:pb-14 lg:px-16">
            <div className="max-w-2xl">

              {/* Badges */}
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="badge badge-gold">{movie.quality}</span>
                {movie.badge && <span className="badge badge-glass">{movie.badge}</span>}
                <span className="rating-pill">
                  <Star size={10} fill="currentColor" />
                  <span className="font-black">{movie.rating.toFixed(1)}</span>
                </span>
                <span className="badge badge-glass">{movie.year}</span>
                <span className="badge badge-glass">{movie.country}</span>
              </div>

              {/* Title */}
              <h3
                className="t-h2 text-bal"
                style={{ textShadow: '0 2px 30px rgba(0,0,0,0.6)' }}
              >
                {movie.title}
              </h3>

              {/* Original */}
              <div className="mt-3 flex items-center gap-3">
                <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
                <p className="text-sm font-light italic" style={{ color: 'rgba(201,168,76,0.65)' }}>{movie.originalTitle}</p>
              </div>

              {/* Overview */}
              <p className="mt-4 line-clamp-2 text-[14px] font-light leading-[1.85]" style={{ color: 'rgba(245,240,232,0.6)' }}>
                {movie.overview}
              </p>

              {/* Genre tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {movie.genres.slice(0, 3).map((g) => (
                  <span key={g} className="text-[11px] font-semibold" style={{ padding: '3px 10px', borderRadius: '5px', background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.14)', color: 'rgba(201,168,76,0.65)' }}>{g}</span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link href={getMovieWatchHref(movie)} className="btn btn-primary px-7 text-[13.5px]">
                  <Play size={15} fill="currentColor" /> Xem ngay
                </Link>
                <Link href={`/phim/${movie.slug}`} className="btn btn-quiet px-5 text-[13px]">Chi tiết</Link>
                <button className="btn btn-icon" aria-label="Lưu yêu thích"><Bookmark size={16} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

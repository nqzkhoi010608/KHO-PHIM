import Image from 'next/image';
import Link from 'next/link';
import { Info, Play, Plus, Star } from 'lucide-react';
import type { Movie } from '@/types/catalog';
import { getMovieWatchHref } from '@/lib/catalog/navigation';

export function HeroFeature({ movie }: { movie: Movie }) {
  return (
    <section className="container-shell pt-24 sm:pt-28" aria-labelledby="hero-heading">
      <div className="hero-frame group relative isolate min-h-[580px] overflow-hidden sm:min-h-[640px]">
        {/* Backdrop with slow zoom */}
        <Image
          src={movie.backdropUrl}
          alt=""
          fill
          priority
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="hero-backdrop hero-art -z-20 object-cover object-center"
        />

        {/* Multi-layer gradient overlays */}
        <div className="absolute inset-0 -z-10 bg-black/55" />
        <div className="absolute inset-y-0 left-0 -z-10 w-2/3 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-black to-transparent" />

        {/* Content */}
        <div className="relative flex min-h-[580px] items-end px-5 pb-14 pt-28 sm:min-h-[640px] sm:px-10 sm:pb-16 lg:px-14">
          <div className="hero-copy max-w-2xl">
            {/* Badges & meta */}
            <div className="mb-6 flex flex-wrap items-center gap-2 motion-enter" style={{ animationDuration: '400ms' }}>
              <span className="badge badge-signal">{movie.badge ?? 'Phim nổi bật'}</span>
              <span className="badge badge-glass">{movie.year}</span>
              <span className="badge badge-glass">{movie.quality}</span>
              <span className="text-xs text-muted">{movie.duration}</span>
            </div>

            {/* Title */}
            <h1
              id="hero-heading"
              className="max-w-xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-paper sm:text-5xl lg:text-7xl motion-enter animation-delay-100"
              style={{ animationDuration: '500ms' }}
            >
              {movie.title}
            </h1>

            {/* Original title */}
            <p className="mt-3 text-base text-muted sm:text-lg motion-enter animation-delay-200" style={{ animationDuration: '500ms' }}>
              {movie.originalTitle}
            </p>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-2 text-sm text-paper motion-enter animation-delay-300" style={{ animationDuration: '500ms' }}>
              <Star size={16} fill="currentColor" className="text-[#D4A85F]" />
              <span className="font-semibold">{movie.rating.toFixed(1)}</span>
              <span className="text-muted">/ 10</span>
            </div>

            {/* Overview */}
            <p className="mt-5 max-w-xl text-sm leading-7 text-paper-dim sm:text-base motion-enter animation-delay-300" style={{ animationDuration: '500ms' }}>
              {movie.overview}
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-3 motion-enter animation-delay-400" style={{ animationDuration: '500ms' }}>
              <Link href={getMovieWatchHref(movie)} className="btn btn-primary"><Play size={17} fill="currentColor" /> Xem ngay</Link>
              <Link href={`/phim/${movie.slug}`} className="btn btn-quiet"><Info size={17} /> Chi tiết</Link>
              <button className="btn btn-icon" aria-label={`Thêm ${movie.title} vào yêu thích`}><Plus size={19} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

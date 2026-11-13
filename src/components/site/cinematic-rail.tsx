'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Movie } from '@/types/catalog';

type CinematicRailProps = {
  title: string;
  href?: string;
  movies: Movie[];
  icon?: string;
  ranked?: boolean;
  variant?: 'standard' | 'depth';
  autoAdvance?: boolean;
};

function SectionHeading({ title, href, icon, autoAdvance, autoEnabled, onToggleAuto }: { title: string; href?: string; icon?: string; autoAdvance: boolean; autoEnabled: boolean; onToggleAuto: () => void }) {
  return (
    <div className="chophim-section-heading">
      <div className="chophim-section-title">
        <span className="chophim-section-marker" aria-hidden="true" />
        {icon && <span className="chophim-section-icon" aria-hidden="true">{icon}</span>}
        <h2>{title}</h2>
      </div>
      <div className="rail-heading-actions">
        {autoAdvance && (
          <button type="button" className="rail-auto-toggle" onClick={onToggleAuto} aria-pressed={autoEnabled}>
            <span className={`rail-auto-dot ${autoEnabled ? 'is-on' : ''}`} aria-hidden="true" />
            {autoEnabled ? 'Tự động' : 'Đã dừng'}
          </button>
        )}
        {href && <Link href={href}>Xem tất cả <ChevronRight size={15} /></Link>}
      </div>
    </div>
  );
}

function PosterMovieCard({ movie, rank }: { movie: Movie; rank?: number }) {
  return (
    <Link href={`/phim/${movie.slug}`} className="chophim-poster-card" aria-label={`Xem thông tin phim ${movie.title}`}>
      <div className="chophim-poster-art">
        <Image src={movie.posterUrl} alt={`Poster ${movie.title}`} fill sizes="(max-width: 640px) 43vw, (max-width: 1024px) 22vw, 180px" />
        <div className="poster-art-shade" aria-hidden="true" />
        <span className="poster-flag">{movie.quality || 'HD'}</span>
        <span className="poster-rating">★ {movie.rating.toFixed(1)}</span>
        <span className="poster-play" aria-hidden="true"><Play size={17} fill="currentColor" /></span>
      </div>
      {rank && <span className="poster-rank">{rank}</span>}
      <strong>{movie.title}</strong>
      <small>{movie.originalTitle || movie.country}</small>
    </Link>
  );
}

export function CinematicRail({ title, href, movies, icon, ranked = false, variant = 'standard', autoAdvance = false }: CinematicRailProps) {
  const visibleMovies = movies.slice(0, ranked ? 10 : 8);
  const railRef = useRef<HTMLDivElement>(null);
  const [autoEnabled, setAutoEnabled] = useState(autoAdvance);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotionPreference = () => setReducedMotion(mediaQuery.matches);
    syncMotionPreference();
    mediaQuery.addEventListener('change', syncMotionPreference);
    return () => mediaQuery.removeEventListener('change', syncMotionPreference);
  }, []);

  useEffect(() => {
    if (!autoAdvance || !autoEnabled || reducedMotion || visibleMovies.length < 3) return;

    const timer = window.setInterval(() => {
      const rail = railRef.current;
      if (!rail || document.hidden) return;
      const step = Math.max(220, rail.clientWidth * .68);
      const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 10;
      rail.scrollTo({ left: atEnd ? 0 : rail.scrollLeft + step, behavior: 'smooth' });
    }, 5200);

    return () => window.clearInterval(timer);
  }, [autoAdvance, autoEnabled, reducedMotion, visibleMovies.length]);

  if (!visibleMovies.length) return null;

  const scrollRail = (direction: 1 | -1) => {
    railRef.current?.scrollBy({ left: direction * Math.max(260, (railRef.current?.clientWidth ?? 360) * .72), behavior: 'smooth' });
  };

  return (
    <section className={`chophim-rail-section ${ranked ? 'is-ranked' : ''}`} data-variant={variant} aria-label={title}>
      <SectionHeading title={title} href={href} icon={icon} autoAdvance={autoAdvance} autoEnabled={autoEnabled} onToggleAuto={() => setAutoEnabled((value) => !value)} />
      <div className="chophim-rail-wrap">
        <button type="button" className="rail-arrow rail-arrow-left" onClick={() => scrollRail(-1)} aria-label={`Cuộn ${title} sang trái`}><ChevronLeft size={22} /></button>
        <div
          ref={railRef}
          className="chophim-poster-rail"
          onPointerDown={() => autoAdvance && setAutoEnabled(false)}
          onFocus={() => autoAdvance && setAutoEnabled(false)}
        >
          {visibleMovies.map((movie, index) => <PosterMovieCard key={`${movie.id}-${index}`} movie={movie} rank={ranked ? index + 1 : undefined} />)}
        </div>
        <button type="button" className="rail-arrow rail-arrow-right" onClick={() => scrollRail(1)} aria-label={`Cuộn ${title} sang phải`}><ChevronRight size={22} /></button>
      </div>
      <div className="rail-scroll-hint" aria-hidden="true"><span /> Vuốt để khám phá thêm <ArrowRight size={13} /></div>
    </section>
  );
}

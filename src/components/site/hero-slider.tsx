'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Thumbs } from 'swiper/modules';
import { Play, Star } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';
import type { Movie } from '@/types/catalog';
import { getMovieWatchHref } from '@/lib/catalog/navigation';
import { FavoriteButton } from './favorite-button';

/* ── Diamond dots decoration ── */
function DiamondDots({ count = 8 }: { count?: number }) {
  return (
    <div className="flex items-center gap-2 opacity-20" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width: '5px', height: '5px', borderRadius: '1px',
            background: i % 3 === 0 ? 'var(--gold)' : i % 3 === 1 ? 'var(--gold-pale)' : 'rgba(201,168,76,0.3)',
            transform: 'rotate(45deg)', flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

/* ── Filmstrip SVG ── */
function Filmstrip() {
  return (
    <svg width="20" height="96" viewBox="0 0 20 96" fill="none" aria-hidden="true">
      <rect x="0" y="0" width="20" height="96" rx="3" fill="none" stroke="rgba(201,168,76,0.12)" strokeWidth="1" />
      {[8, 22, 36, 50, 64, 78].map((y) => (
        <rect key={y} x="3" y={y} width="14" height="8" rx="1.5" fill="rgba(201,168,76,0.08)" />
      ))}
    </svg>
  );
}

export function HeroSlider({ movies }: { movies: Movie[] }) {
  const [thumbsSwiper, setThumbsSwiper]   = useState<SwiperType | null>(null);
  const [activeIndex,  setActiveIndex]    = useState(0);
  const mainRef = useRef<SwiperType | null>(null);

  const goTo = useCallback((i: number) => {
    mainRef.current?.slideTo(i);
  }, []);

  if (!movies.length) return null;

  return (
    <section className="relative w-full overflow-hidden" aria-label="Phim nổi bật">
      <Swiper
        onSwiper={(s) => { mainRef.current = s; }}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        modules={[Autoplay, EffectFade, Thumbs]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        autoplay={{ delay: 7500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="h-[560px] w-full sm:h-[660px] lg:h-[760px] xl:h-[800px]"
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id} className="relative h-full w-full overflow-hidden">

            {/* Backdrop */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src={movie.backdropUrl} alt={movie.title} fill
                priority={index === 0} sizes="100vw" quality={100} unoptimized
                className="object-cover object-center animate-slow-zoom"
                style={{ filter: 'saturate(1.14) contrast(1.1) brightness(1.05)' }}
              />
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, rgba(5,5,10,0.9) 0%, rgba(5,5,10,0.45) 28%, rgba(5,5,10,0.06) 60%, transparent 100%)' }} />
            <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to right, rgba(5,5,10,0.66) 0%, rgba(5,5,10,0.18) 40%, transparent 68%)' }} />
            <div className="pointer-events-none absolute inset-0 z-10" style={{ background: 'radial-gradient(ellipse 80% 60% at 10% 95%, rgba(201,168,76,0.1) 0%, transparent 60%)' }} />
            <div className="absolute inset-x-0 top-0 z-10 h-28" style={{ background: 'linear-gradient(to bottom, rgba(5,5,10,0.3) 0%, transparent 100%)' }} />

            {/* Filmstrip decoration */}
            <div className="absolute right-10 top-1/2 z-20 hidden -translate-y-1/2 opacity-40 xl:block">
              <Filmstrip />
            </div>

            {/* Content */}
            <div className="container-shell relative z-20 flex h-full flex-col justify-end pb-16 sm:pb-24 lg:pb-28">
              <div className="max-w-[680px]">
                <div className="anim-rise delay-50">

                  <div className="mb-5"><DiamondDots /></div>
                  <p className="t-eyebrow-diamond mb-4">Đang chiếu · Nổi bật</p>

                  <h1 className="t-display text-bal" style={{ textShadow: '0 2px 50px rgba(0,0,0,0.65)' }}>
                    {movie.title}
                  </h1>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-px w-10 shrink-0" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
                    <p className="text-sm font-light italic" style={{ color: 'rgba(201,168,76,0.75)' }}>
                      {movie.originalTitle}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="rating-pill">
                      <Star size={10} fill="currentColor" />
                      <span className="font-black">{movie.rating.toFixed(1)}</span>
                      <span style={{ color: 'rgba(201,168,76,0.5)', fontSize: '10px' }}>/10</span>
                    </span>
                    {movie.badge && <span className="badge badge-gold">{movie.badge}</span>}
                    <span className="badge badge-glass">{movie.year}</span>
                    <span className="badge badge-glass">{movie.quality}</span>
                    <span className="badge badge-glass">{movie.country}</span>
                  </div>

                  <p className="mt-5 line-clamp-2 max-w-xl text-[14px] font-light leading-[1.85]" style={{ color: 'rgba(245,240,232,0.6)' }}>
                    {movie.overview}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {movie.genres.slice(0, 3).map((g) => (
                      <span key={g} className="text-[11px] font-semibold" style={{ padding: '3px 10px', borderRadius: '5px', background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.14)', color: 'rgba(201,168,76,0.65)' }}>
                        {g}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link href={getMovieWatchHref(movie)} className="btn btn-primary px-7 text-[13.5px]">
                      <Play size={15} fill="currentColor" /> Xem ngay
                    </Link>
                    <Link href={`/phim/${movie.slug}`} className="btn btn-quiet px-5 text-[13px]">
                      Chi tiết
                    </Link>
                    <FavoriteButton compact movieSlug={movie.slug} movieTitle={movie.title} posterUrl={movie.posterUrl} bannerUrl={movie.backdropUrl} />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── Custom slide indicators (bar style) ── */}
      <div
        className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 lg:hidden"
        aria-label="Chuyển slide"
      >
        {movies.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              height: '3px',
              width: activeIndex === i ? '28px' : '14px',
              borderRadius: '999px',
              background: activeIndex === i
                ? 'linear-gradient(90deg, var(--gold-deep), var(--gold-pale))'
                : 'rgba(201,168,76,0.22)',
              boxShadow: activeIndex === i ? '0 0 8px rgba(201,168,76,0.5)' : 'none',
              transition: 'all 0.4s var(--ease)',
              border: 'none',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

      {/* ── Thumbnail strip — desktop ── */}
      <div className="absolute bottom-8 right-10 z-40 hidden w-fit max-w-[380px] lg:block xl:right-16">
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[Thumbs]}
          watchSlidesProgress
          slidesPerView={Math.min(movies.length, 4)}
          spaceBetween={8}
          className="thumbs-slider !overflow-visible"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id} className="cursor-pointer">
              <div
                className="group relative overflow-hidden border-2 border-transparent"
                style={{ borderRadius: '10px', aspectRatio: '16/9' }}
              >
                <Image src={movie.backdropUrl} alt={movie.title} fill sizes="96px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'rgba(5,5,10,0.5)' }} />
                <div
                  className="absolute inset-x-0 bottom-0 p-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(to top, rgba(5,5,10,0.9), transparent)' }}
                >
                  <p className="line-clamp-1 text-[8.5px] font-bold" style={{ color: 'var(--white-dim)' }}>{movie.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Bottom gold accent line */}
      <div
        className="absolute inset-x-0 bottom-0 z-30 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent 5%, var(--gold-deep) 25%, var(--gold-pale) 50%, var(--gold-deep) 75%, transparent 95%)' }}
      />
    </section>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Play, Star } from 'lucide-react';
import type { Movie } from '@/types/catalog';

export function CoverflowCarousel({ title, movies }: { title: string; movies: Movie[] }) {
  if (!movies.length) return null;

  return (
    <section className="py-8 sm:hidden">
      <div className="container-shell mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="grid h-7 w-7 place-items-center text-sm font-black"
            style={{
              borderRadius: '7px',
              background: 'linear-gradient(135deg, var(--gold-deep), var(--gold), var(--gold-pale))',
              color: '#180d00',
              boxShadow: '0 0 14px rgba(201,168,76,0.4)',
            }}
          >
            🔥
          </span>
          <h2 className="text-base font-black tracking-tight text-white">{title}</h2>
        </div>
        <span className="t-over">HOT</span>
      </div>

      <Swiper
        modules={[EffectCoverflow, Autoplay, Pagination]}
        effect="coverflow"
        grabCursor centeredSlides
        slidesPerView={1.75}
        loop={movies.length > 3}
        coverflowEffect={{ rotate: 20, stretch: 12, depth: 160, modifier: 1, slideShadows: true }}
        autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true, bulletClass: 'swiper-pagination-bullet', bulletActiveClass: 'swiper-pagination-bullet-active' }}
        className="!pb-10"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="!w-[180px]">
            <Link href={`/phim/${movie.slug}`} className="group block">
              <div className="card-border">
                <div className="card-inner relative aspect-[2/3]">
                  <Image src={movie.posterUrl} alt={`Poster ${movie.title}`} fill sizes="180px" className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 h-[55%]" style={{ background: 'linear-gradient(to top, rgba(5,5,10,0.95), transparent)' }} />
                  <div className="absolute left-2 top-2 z-10">{movie.quality && <span className="badge badge-gold">{movie.quality}</span>}</div>
                  <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1 text-[11px] font-black text-white">
                    <Star size={10} fill="currentColor" style={{ color: 'var(--gold)' }} />
                    {movie.rating.toFixed(1)}
                  </div>
                  <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'rgba(5,5,10,0.4)' }}>
                    <div className="btn-play flex h-12 w-12 items-center justify-center" style={{ borderRadius: '50%' }}>
                      <Play size={20} fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="card-title mt-3 line-clamp-1 px-0.5">{movie.title}</h3>
              <p className="card-orig line-clamp-1 px-0.5">{movie.originalTitle} · {movie.year}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

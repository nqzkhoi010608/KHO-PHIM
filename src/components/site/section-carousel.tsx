'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LandscapeCard } from './landscape-card';
import type { Movie } from '@/types/catalog';

/**
 * SectionCarousel — dùng bên trong HomeSection (phần content bên phải).
 * Hiển thị landscape cards, 3 trên desktop, scroll ngang trên mobile.
 */
export function SectionCarousel({ movies }: { movies: Movie[] }) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  if (!movies.length) return null;

  return (
    <div className="group/sec relative">
      {/* Prev */}
      <button
        ref={prevRef}
        className="absolute -left-4 top-[36%] z-20 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full opacity-0 backdrop-blur-sm transition-all duration-250 group-hover/sec:opacity-100 md:grid"
        style={{
          background: 'rgba(5,5,10,0.88)',
          border: '1px solid rgba(201,168,76,0.2)',
          color: 'var(--white)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        }}
        aria-label="Trước"
      >
        <ChevronLeft size={16} strokeWidth={2.5} />
      </button>

      {/* Next */}
      <button
        ref={nextRef}
        className="absolute -right-4 top-[36%] z-20 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full opacity-0 backdrop-blur-sm transition-all duration-250 group-hover/sec:opacity-100 md:grid"
        style={{
          background: 'rgba(5,5,10,0.88)',
          border: '1px solid rgba(201,168,76,0.2)',
          color: 'var(--white)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        }}
        aria-label="Tiếp theo"
      >
        <ChevronRight size={16} strokeWidth={2.5} />
      </button>

      <Swiper
        modules={[Navigation]}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(s: SwiperType) => {
          const nav = s.params.navigation;
          if (nav && typeof nav !== 'boolean') {
            nav.prevEl = prevRef.current;
            nav.nextEl = nextRef.current;
          }
        }}
        spaceBetween={12}
        slidesPerView={1.6}
        breakpoints={{
          480:  { slidesPerView: 2.1,  spaceBetween: 12 },
          640:  { slidesPerView: 2.3,  spaceBetween: 14 },
          900:  { slidesPerView: 2.6,  spaceBetween: 14 },
          1024: { slidesPerView: 3,    spaceBetween: 16 },
          1280: { slidesPerView: 3,    spaceBetween: 18 },
        }}
        className="!overflow-visible"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <LandscapeCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

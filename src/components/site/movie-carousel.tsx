'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MoveRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { Movie } from '@/types/catalog';
import { PosterCard } from './poster-card';
import { EmptyState } from '@/components/shared/section-state';

export function MovieCarousel({
  title,
  eyebrow,
  movies,
  href,
}: {
  title: string;
  eyebrow?: string;
  movies: Movie[];
  href?: string;
}) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  if (!movies.length)
    return <EmptyState title="Chưa có phim trong mục này" description="Kho Phim sẽ cập nhật danh sách ngay khi nguồn dữ liệu sẵn sàng." />;

  return (
    <section className="py-8 sm:py-10">
      <div className="container-shell">
        {/* Header */}
        <div className="sec-head">
          <div className="sec-head-left">
            {eyebrow && <p className="t-eyebrow-diamond">{eyebrow}</p>}
            <h2 className="t-section">{title}</h2>
          </div>
          {href && (
            <Link href={href} className="sec-viewall">
              Xem tất cả <MoveRight size={14} />
            </Link>
          )}
        </div>

        {/* Carousel */}
        <div className="group/swiper relative edge-fade">
          <button
            ref={prevRef}
            className="absolute -left-4 top-[38%] z-20 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full opacity-0 backdrop-blur-sm transition-all duration-250 group-hover/swiper:opacity-100 md:grid"
            style={{
              background: 'rgba(5,5,10,0.9)',
              border: '1px solid rgba(201,168,76,0.2)',
              color: 'var(--white)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
            }}
            aria-label="Trước"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
          </button>

          <button
            ref={nextRef}
            className="absolute -right-4 top-[38%] z-20 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full opacity-0 backdrop-blur-sm transition-all duration-250 group-hover/swiper:opacity-100 md:grid"
            style={{
              background: 'rgba(5,5,10,0.9)',
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
            spaceBetween={12}
            slidesPerView={2.2}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(swiper: SwiperType) => {
              const nav = swiper.params.navigation;
              if (nav && typeof nav !== 'boolean') {
                nav.prevEl = prevRef.current;
                nav.nextEl = nextRef.current;
              }
            }}
            breakpoints={{
              480:  { slidesPerView: 2.5,  spaceBetween: 14 },
              640:  { slidesPerView: 3.2,  spaceBetween: 16 },
              900:  { slidesPerView: 4.2,  spaceBetween: 18 },
              1280: { slidesPerView: 5.2,  spaceBetween: 20 },
              1500: { slidesPerView: 6.1,  spaceBetween: 22 },
            }}
            className="!overflow-hidden !pb-2"
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id} className="h-auto">
                <PosterCard movie={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

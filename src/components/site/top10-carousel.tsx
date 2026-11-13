'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight, MoveRight, Star } from 'lucide-react';
import type { Movie } from '@/types/catalog';

/*
  Thiết kế mới:
  - Poster chiếm toàn bộ chiều rộng card (không margin trái)
  - Số thứ tự nằm DƯỚI poster, góc trái, font rất lớn hollow italic
  - Top 1/2/3 có màu riêng (vàng/bạc/đồng) + text glow
  - Số 10 chữ số (2 chữ số) không bị vỡ layout
*/

const RANK_COLORS: Record<number, { text: string; glow: string }> = {
  1: { text: '#c9a84c', glow: 'rgba(201,168,76,0.5)' },
  2: { text: '#b8bec8', glow: 'rgba(184,190,200,0.3)' },
  3: { text: '#b06838', glow: 'rgba(176,104,56,0.4)' },
};

function getRankStyle(rank: number) {
  return RANK_COLORS[rank] ?? { text: 'rgba(245,240,232,0.15)', glow: 'none' };
}

function Top10Card({ movie, rank }: { movie: Movie; rank: number }) {
  const ep = movie.seasons[0]?.episodes.length ?? 0;
  const { text: rankColor, glow: rankGlow } = getRankStyle(rank);
  const isTop3 = rank <= 3;

  return (
    <Link
      href={`/phim/${movie.slug}`}
      className="group block"
      aria-label={`Top ${rank} · ${movie.title}`}
    >
      {/* ── Poster ── */}
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: '12px',
          aspectRatio: '2/3',
          boxShadow: isTop3
            ? `0 10px 36px rgba(0,0,0,0.65), 0 0 0 1.5px ${rankColor}55`
            : '0 8px 28px rgba(0,0,0,0.6)',
          transition: 'box-shadow 0.35s var(--ease)',
        }}
      >
        <Image
          src={movie.posterUrl}
          alt={`Poster ${movie.title}`}
          fill
          sizes="(max-width: 640px) 36vw, (max-width: 1024px) 22vw, 160px"
          className="object-cover transition-transform duration-600 ease-[var(--ease)] group-hover:scale-[1.05]"
        />

        {/* Bottom gradient */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
          style={{ background: 'linear-gradient(to top, rgba(5,5,10,0.92), transparent)' }}
        />

        {/* Top vignette */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1/4"
          style={{ background: 'linear-gradient(to bottom, rgba(5,5,10,0.3), transparent)' }}
        />

        {/* Quality badge */}
        {movie.quality && (
          <div className="absolute right-2 top-2 z-10">
            <span
              className="text-[9px] font-black uppercase"
              style={{ padding: '2.5px 6px', borderRadius: '4px', background: 'rgba(201,168,76,0.75)', color: '#1a0e00' }}
            >
              {movie.quality}
            </span>
          </div>
        )}

        {/* Episode badge */}
        {ep > 0 && (
          <div className="absolute bottom-2 left-2 z-10">
            <span
              className="text-[9px] font-bold text-white"
              style={{ padding: '2px 5px', borderRadius: '3px', background: 'rgba(0,0,0,0.65)' }}
            >
              {ep} tập
            </span>
          </div>
        )}

        {/* Hover shine */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
          style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.07) 0%, transparent 60%)' }}
        />
      </div>

      {/* ── Rank number + Info ── */}
      <div className="mt-1 flex items-end gap-2">
        {/*
          Số thứ tự:
          - Font rất lớn italic hollow
          - Nằm bên trái, baseline canh đáy với title
          - Width cố định để layout không bị nhảy giữa 1 và 10
        */}
        <div
          aria-hidden="true"
          className="shrink-0 select-none font-black italic leading-none"
          style={{
            /* Width cố định — đủ cho 2 chữ số */
            width: '44px',
            fontSize: '52px',
            lineHeight: 1,
            color: 'transparent',
            WebkitTextStroke: `2px ${rankColor}`,
            /* Dùng filter blur thay vì textShadow để không ảnh hưởng layout */
            filter: isTop3 ? `drop-shadow(0 0 8px ${rankGlow})` : 'none',
            letterSpacing: '-3px',
            textAlign: 'right',
            /* Align baseline với dòng title */
            alignSelf: 'center',
            marginBottom: '2px',
            flexShrink: 0,
          }}
        >
          {rank}
        </div>

        {/* Title + meta */}
        <div className="min-w-0 flex-1 pb-0.5">
          <h3
            className="line-clamp-2 text-[12.5px] font-bold leading-snug tracking-tight transition-colors duration-200 group-hover:text-gold"
            style={{ color: 'rgba(245,240,232,0.88)' }}
          >
            {movie.title}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <span className="flex items-center gap-0.5">
              <Star size={9} fill="currentColor" style={{ color: 'var(--gold)' }} />
              <span
                className="text-[10px] font-black"
                style={{ color: 'rgba(245,240,232,0.6)', letterSpacing: '-0.01em' }}
              >
                {movie.rating.toFixed(1)}
              </span>
            </span>
            <span
              className="text-[9px] font-semibold uppercase"
              style={{ color: 'rgba(245,240,232,0.2)' }}
            >
              FHD
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Top10Carousel({
  title = 'Top 10 phim bộ hôm nay',
  eyebrow = 'Top 10',
  movies,
  href,
}: {
  title?: string;
  eyebrow?: string;
  movies: Movie[];
  href?: string;
}) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  if (!movies.length) return null;

  const top10 = movies.slice(0, 10);

  return (
    <section className="py-8 sm:py-10">
      <div className="container-shell">

        {/* Section header */}
        <div className="sec-head">
          <div className="sec-head-left">
            <p className="t-eyebrow-diamond">{eyebrow}</p>
            <h2 className="t-section">{title}</h2>
          </div>
          {href && (
            <Link href={href} className="sec-viewall">
              Xem tất cả <MoveRight size={14} />
            </Link>
          )}
        </div>

        {/* Carousel wrapper — overflow-hidden ở ngoài để tránh clip rank number */}
        <div className="group/top10 relative">

          {/* Prev button */}
          <button
            ref={prevRef}
            className="absolute -left-5 top-[38%] z-20 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full opacity-0 transition-all duration-250 group-hover/top10:opacity-100 md:grid"
            style={{
              background: 'rgba(5,5,10,0.92)',
              border: '1px solid rgba(201,168,76,0.22)',
              color: 'var(--white)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.65)',
              backdropFilter: 'blur(12px)',
            }}
            aria-label="Trước"
          >
            <ChevronLeft size={17} strokeWidth={2.5} />
          </button>

          {/* Next button */}
          <button
            ref={nextRef}
            className="absolute -right-5 top-[38%] z-20 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full opacity-0 transition-all duration-250 group-hover/top10:opacity-100 md:grid"
            style={{
              background: 'rgba(5,5,10,0.92)',
              border: '1px solid rgba(201,168,76,0.22)',
              color: 'var(--white)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.65)',
              backdropFilter: 'blur(12px)',
            }}
            aria-label="Tiếp theo"
          >
            <ChevronRight size={17} strokeWidth={2.5} />
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
            slidesPerView={2.5}
            breakpoints={{
              480:  { slidesPerView: 3,    spaceBetween: 14 },
              640:  { slidesPerView: 3.5,  spaceBetween: 14 },
              900:  { slidesPerView: 4.5,  spaceBetween: 16 },
              1200: { slidesPerView: 5.5,  spaceBetween: 18 },
              1500: { slidesPerView: 6.5,  spaceBetween: 18 },
            }}
            className="!overflow-hidden !pb-2"
          >
            {top10.map((movie, i) => (
              <SwiperSlide key={movie.id} className="h-auto">
                <Top10Card movie={movie} rank={i + 1} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

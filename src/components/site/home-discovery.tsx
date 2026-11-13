'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Info, Play } from 'lucide-react';
import type { Movie } from '@/types/catalog';
import { getMovieWatchHref } from '@/lib/catalog/navigation';
import { CinematicRail } from './cinematic-rail';

type HomeCatalog = {
  featured: Movie;
  updated: Movie[];
  singles: Movie[];
  series: Movie[];
  animation: Movie[];
  trending: Movie[];
  comingSoon: Movie[];
};

const topics = [
  { label: 'Marvel', tone: 'violet' },
  { label: 'Sitcom', tone: 'pink' },
  { label: 'Lồng Tiếng Cực Mạnh', tone: 'blue' },
  { label: 'Xuyên Không', tone: 'green' },
  { label: 'Cổ Trang', tone: 'orange' },
  { label: 'Phim Nhức Đầu', tone: 'indigo' },
  { label: '+15 chủ đề', tone: 'slate' },
];

function SectionHeading({ title, href, icon }: { title: string; href?: string; icon?: string }) {
  return (
    <div className="chophim-section-heading">
      <div className="chophim-section-title">
        <span className="chophim-section-marker" aria-hidden="true" />
        {icon && <span className="chophim-section-icon" aria-hidden="true">{icon}</span>}
        <h2>{title}</h2>
      </div>
      {href && <Link href={href}>Xem tất cả <ChevronRight size={15} /></Link>}
    </div>
  );
}

export function HomeDiscovery({ catalog }: { catalog: HomeCatalog }) {
  const slides = useMemo(() => {
    const source = [catalog.featured, ...catalog.updated, ...catalog.trending];
    return source.filter((movie, index, all) => all.findIndex((candidate) => candidate.id === movie.id) === index).slice(0, 6);
  }, [catalog]);
  const [activeSlide, setActiveSlide] = useState(0);
  const movie = slides[activeSlide] ?? catalog.featured;
  const topicMovies = [catalog.updated[0], catalog.series[0], catalog.singles[0], catalog.animation[0], catalog.trending[0], catalog.comingSoon[0], movie].map((item) => item ?? movie);
  const animation = catalog.animation.length ? catalog.animation : catalog.updated;
  const western = catalog.singles.length ? catalog.singles : catalog.updated;

  const goToSlide = (direction: 1 | -1) => {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <div className="chophim-home">
      <section className="chophim-hero-shell" aria-label="Phim nổi bật">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={movie.id} className="hero-slide" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .45 }}>
            <Image src={movie.backdropUrl} alt="" fill sizes="100vw" className="hero-backdrop-image" priority />
          </motion.div>
        </AnimatePresence>
        <span className="hero-backdrop-wash" aria-hidden="true" />
        <div className="hero-content container-shell">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={movie.id} className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .42, ease: [0.2, 0.8, 0.2, 1] }}>
              <p className="hero-eyebrow">ĐỀ XUẤT CHO BẠN</p>
              <h1>{movie.title}</h1>
              <p className="hero-original">{movie.originalTitle}</p>
              <div className="hero-meta-row">
                <span className="hero-rating">★ {movie.rating.toFixed(1)}</span>
                <span>{movie.year}</span>
                <span>{movie.quality}</span>
                <span>{movie.language}</span>
                <span>{movie.seasons[0]?.episodes.length ?? 1} tập</span>
              </div>
              <p className="hero-overview">{movie.overview}</p>
              <div className="hero-cta-row">
                <Link href={getMovieWatchHref(movie)} className="watch-button"><Play size={17} fill="currentColor" /> Xem phim</Link>
                <Link href={`/phim/${movie.slug}`} className="info-button"><Info size={16} /> Chi tiết</Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hero-thumbs" aria-label="Chọn phim nổi bật">
          {slides.map((slide, index) => (
            <button key={slide.id} className={index === activeSlide ? 'is-active' : ''} onClick={() => setActiveSlide(index)} aria-label={`Chọn ${slide.title}`}>
              <Image src={slide.backdropUrl} alt="" fill sizes="120px" />
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="hero-mobile-controls">
          <button onClick={() => goToSlide(-1)} aria-label="Phim trước"><ChevronLeft size={18} /></button>
          <div className="hero-dots">{slides.map((slide, index) => <button key={slide.id} className={index === activeSlide ? 'is-active' : ''} onClick={() => setActiveSlide(index)} aria-label={`Chọn ${slide.title}`} />)}</div>
          <button onClick={() => goToSlide(1)} aria-label="Phim tiếp theo"><ChevronRight size={18} /></button>
        </div>
      </section>

      <main className="chophim-feed">
        <section className="topic-section">
          <SectionHeading title="Bạn đang quan tâm gì?" />
          <div className="topic-grid">
            {topics.map((topic, index) => (
              <Link key={topic.label} href={`/tim-kiem?q=${encodeURIComponent(topic.label)}`} className={`topic-chip ${topic.tone}`}>
                <Image src={topicMovies[index].backdropUrl} alt="" fill sizes="240px" className="topic-chip-image" />
                <span className="topic-chip-overlay" aria-hidden="true" />
                <span className="topic-chip-copy"><strong>{topic.label}</strong><small>Xem chủ đề <ArrowRight size={11} /></small></span>
              </Link>
            ))}
          </div>
        </section>

        <CinematicRail title="Phim Hàn Quốc mới" icon="🇰🇷" href="/quoc-gia/han-quoc" movies={catalog.updated} variant="depth" autoAdvance />
        <CinematicRail title="Phim Trung Quốc mới" icon="🇨🇳" href="/quoc-gia/trung-quoc" movies={catalog.series} />
        <CinematicRail title="Phim US-UK mới" icon="🇺🇸" href="/quoc-gia/au-my" movies={western} />
        <CinematicRail title="Đây Rồi Top Phim Xem Nhiều Nhất" href="/phim-bo" movies={catalog.trending.length ? catalog.trending : catalog.updated} ranked variant="depth" />
        <CinematicRail title="Phim Điện Ảnh Mới Coóng" icon="🚀" href="/phim-le" movies={catalog.singles} />
        <CinematicRail title="Top 10 phim bộ hôm nay" href="/phim-bo" movies={catalog.series} ranked />
        <CinematicRail title="Mãn Nhãn Với Phim Chiếu Rạp" icon="🍿" href="/phim-chieu-rap" movies={catalog.comingSoon.length ? catalog.comingSoon : catalog.singles} />

        <section className="chophim-ad-section" aria-label="Khu vực quảng bá">
          <div className="ad-strip">{['ONE88', 'SỐNG BẠC', 'THƯỞNG LỚN', 'TẢI APP', '18+', 'MAY MẮN'].map((text, index) => <span key={text} className={`ad-tile ad-${index}`}>{text}</span>)}</div>
        </section>

        <CinematicRail title="Top 10 phim lẻ hôm nay" href="/phim-le" movies={western} ranked />
        <CinematicRail title="Phim Nhật Mới Oanh Tạc Chốn Này" icon="🍣" href="/quoc-gia/nhat-ban" movies={catalog.updated} />
        <CinematicRail title="Phim Thái Now: Không drama đời không nể" icon="🐘" href="/quoc-gia/thai-lan" movies={catalog.series} />
        <CinematicRail title="Kho Tàng Anime Mới Nhất" icon="⚡" href="/hoat-hinh" movies={animation} />
        <CinematicRail title="Điện Ảnh Hồng Kông Ở Chỗ Này Này" icon="🐲" href="/quoc-gia/hong-kong" movies={western} />
        <CinematicRail title="Phim Cổ Trang Hay" icon="⚔️" href="/the-loai/co-trang" movies={catalog.series} />

        <section className="anime-feature">
          <SectionHeading title="Một góc anime để thở" href="/hoat-hinh" />
          <Link href={`/phim/${animation[0]?.slug ?? movie.slug}`} className="anime-feature-card">
            <Image src={(animation[0] ?? movie).backdropUrl} alt="" fill sizes="100vw" />
            <div><span>Khoảnh khắc chọn lọc</span><strong>{animation[0]?.title ?? 'Những thế giới khác'}</strong><small>{animation[0]?.overview ?? 'Mỗi khung hình là một chuyến phiêu lưu mới.'}</small></div>
          </Link>
        </section>

        <section className="home-bottom-prompt"><span>Đăng nhập để lưu lịch sử và nhận thông báo tập mới.</span><Link href="/dang-nhap">Đăng nhập <ArrowRight size={14} /></Link></section>
      </main>
    </div>
  );
}

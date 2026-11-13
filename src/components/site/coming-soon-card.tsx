import Image from 'next/image';
import Link from 'next/link';
import { Bell, CalendarDays, Clock3 } from 'lucide-react';
import type { Movie } from '@/types/catalog';
import { EmptyState } from '@/components/shared/section-state';

export function ComingSoonSection({ title, eyebrow, movies }: { title: string; eyebrow?: string; movies: Movie[] }) {
  if (!movies.length) return <EmptyState title="Chưa có phim sắp chiếu" description="Thông tin về các phim sắp ra mắt sẽ được cập nhật sớm." />;

  return (
    <section className="section-space">
      <div className="sec-head">
        <div className="sec-head-left">
          {eyebrow && <p className="t-eyebrow-diamond">{eyebrow}</p>}
          <h2 className="t-section">{title}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie, i) => (
          <Link
            key={movie.id}
            href={`/phim/${movie.slug}`}
            className="coming-card group block"
            aria-label={`Xem thông tin phim ${movie.title}`}
          >
            {/* Landscape image */}
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={movie.backdropUrl}
                alt={`Backdrop ${movie.title}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease)] group-hover:scale-[1.05]"
                priority={i === 0}
              />
              {/* Gradient */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,10,0.95) 0%, rgba(5,5,10,0.3) 55%, transparent 100%)' }} />
              {/* Hover gold glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(ellipse at 25% 70%, rgba(201,168,76,0.08), transparent 70%)' }} />

              {/* Date pill — top right */}
              <div
                className="absolute right-3 top-3 flex items-center gap-1.5 px-3 py-1.5 text-[10.5px] font-bold"
                style={{
                  borderRadius: 'var(--r-pill)',
                  background: 'rgba(5,5,10,0.78)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1px solid rgba(201,168,76,0.25)',
                  color: 'var(--gold)',
                }}
              >
                <CalendarDays size={11} />
                {movie.updatedLabel}
              </div>

              {/* Genre pills — bottom left */}
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                {movie.genres.slice(0, 2).map((g) => (
                  <span key={g} className="text-[9.5px] font-semibold" style={{ padding: '2px 7px', borderRadius: '4px', background: 'rgba(201,168,76,0.09)', border: '1px solid rgba(201,168,76,0.18)', color: 'rgba(201,168,76,0.75)' }}>
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="p-5" style={{ background: 'linear-gradient(180deg, rgba(12,12,22,0.4), var(--panel))', borderTop: '1px solid rgba(201,168,76,0.07)' }}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="card-title line-clamp-1 text-[15px]">{movie.title}</h3>
                  <p className="mt-0.5 line-clamp-1 text-xs font-light italic" style={{ color: 'rgba(245,240,232,0.38)' }}>{movie.originalTitle}</p>
                </div>
                <span
                  className="flex shrink-0 items-center gap-1.5 text-[11px] font-semibold"
                  style={{ color: 'rgba(245,240,232,0.35)' }}
                  aria-label="Nhắc lịch chiếu"
                >
                  <Bell size={12} style={{ color: 'var(--gold)' }} />
                  Nhắc tôi
                </span>
              </div>

              <div className="mt-3.5 flex items-center gap-3 border-t pt-3.5" style={{ borderColor: 'rgba(201,168,76,0.07)' }}>
                <span className="flex items-center gap-1.5 text-[11px] font-light" style={{ color: 'rgba(245,240,232,0.32)' }}>
                  <Clock3 size={11} />{movie.duration}
                </span>
                <span className="badge badge-gold text-[8.5px]">{movie.quality}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

import { Search, SlidersHorizontal } from 'lucide-react';
import { PosterCard } from '@/components/site/poster-card';
import { StaggerGroup, StaggerItem, Reveal } from '@/components/site/motion';
import { EmptyState } from '@/components/shared/section-state';
import { listMovies } from '@/lib/catalog/repository';

export const metadata = { title: 'Tìm kiếm · Kho Phim' };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; genre?: string; country?: string; year?: string }>;
}) {
  const filters = await searchParams;
  const q           = filters.q?.trim() ?? '';
  const hasQuery    = q.length > 0 || !!filters.genre || !!filters.country || !!filters.year;
  const movies      = hasQuery ? await listMovies({ q, genre: filters.genre, country: filters.country, year: filters.year }) : [];
  const filterLabel = [filters.genre, filters.country, filters.year].filter(Boolean).join(' · ');

  return (
    <div className="min-h-screen" style={{ background: 'var(--black)' }}>

      {/* ── Hero search area ── */}
      <div
        className="relative overflow-hidden"
        style={{
          paddingTop: 'clamp(6rem, 12vw, 9rem)',
          paddingBottom: 'clamp(2.5rem, 5vw, 4rem)',
          background: 'linear-gradient(180deg, rgba(201,168,76,0.045) 0%, transparent 100%)',
        }}
      >
        {/* Ambient */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
          style={{ width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />

        <div className="container-shell relative z-10">
          <Reveal>
            <p className="t-eyebrow-diamond mb-4">Tìm đúng bộ phim</p>
            <h1 className="t-h1 mb-8">Tìm kiếm</h1>
          </Reveal>

          {/* ── Search box — press Enter to search ── */}
          <Reveal delay={0.07}>
            <form action="/tim-kiem" method="GET">
              {/* Preserve existing filters */}
              {filters.genre   && <input type="hidden" name="genre"   value={filters.genre} />}
              {filters.country && <input type="hidden" name="country" value={filters.country} />}
              {filters.year    && <input type="hidden" name="year"    value={filters.year} />}

              <div
                className="flex items-center gap-3 px-5 py-4 transition-all duration-300"
                style={{
                  borderRadius: 'var(--r-xl)',
                  background: 'rgba(245,240,232,0.04)',
                  border: '1px solid rgba(201,168,76,0.14)',
                  boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
                }}
              >
                <Search size={20} style={{ color: 'rgba(201,168,76,0.6)', flexShrink: 0 }} />
                <input
                  name="q"
                  defaultValue={q}
                  className="min-w-0 flex-1 bg-transparent text-[16px] outline-none"
                  style={{ color: 'var(--white)', letterSpacing: '-0.01em' }}
                  placeholder="Nhập tên phim rồi nhấn Enter để tìm..."
                  aria-label="Tìm kiếm phim"
                  autoComplete="off"
                  autoFocus
                />
                {/* Keyboard hint */}
                <kbd
                  className="hidden shrink-0 items-center gap-1 rounded px-2 py-1 text-[10px] font-bold sm:flex"
                  style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.18)', color: 'var(--gold)', letterSpacing: '0.05em' }}
                >
                  Enter
                </kbd>
              </div>
            </form>
          </Reveal>

          {/* ── Filter row ── */}
          <Reveal delay={0.11}>
            <form action="/tim-kiem" method="GET" className="mt-4 flex flex-wrap items-center gap-2">
              {q && <input type="hidden" name="q" value={q} />}

              <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
                <SlidersHorizontal size={11} style={{ color: 'var(--gold)' }} />
                Lọc
              </span>

              {/* Genre */}
              <div className="relative">
                <select name="genre" defaultValue={filters.genre ?? ''} className="filter-select cursor-pointer text-[11px]" style={{ borderRadius: 'var(--r-pill)', paddingLeft: '12px', paddingRight: '28px', minHeight: '32px' }}>
                  <option value="">Thể loại</option>
                  {['Hành động','Tâm lý','Hài hước','Kinh dị','Lãng mạn','Khoa học viễn tưởng','Hoạt hình'].map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
                <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }}>
                  <svg width="9" height="5" viewBox="0 0 9 5" fill="none"><path d="M1 1l3.5 3L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>

              {/* Country */}
              <div className="relative">
                <select name="country" defaultValue={filters.country ?? ''} className="filter-select cursor-pointer text-[11px]" style={{ borderRadius: 'var(--r-pill)', paddingLeft: '12px', paddingRight: '28px', minHeight: '32px' }}>
                  <option value="">Quốc gia</option>
                  {['Hàn Quốc','Trung Quốc','Nhật Bản','Mỹ','Việt Nam','Thái Lan'].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }}>
                  <svg width="9" height="5" viewBox="0 0 9 5" fill="none"><path d="M1 1l3.5 3L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>

              <button type="submit" className="btn btn-quiet min-h-[32px] px-4 text-[11px]" style={{ borderRadius: 'var(--r-pill)' }}>
                Áp dụng
              </button>
            </form>
          </Reveal>
        </div>

        {/* Bottom separator */}
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2) 30%, rgba(201,168,76,0.3) 50%, rgba(201,168,76,0.2) 70%, transparent)' }} />
      </div>

      {/* ── Results ── */}
      <div className="container-shell pb-20 pt-8">
        {!hasQuery ? (
          /* Empty state — before any search */
          <Reveal>
            <div className="mt-4 grid place-items-center py-20 text-center">
              <div>
                <div className="mx-auto mb-5 grid h-16 w-16 place-items-center" style={{ borderRadius: 'var(--r-xl)', background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.14)' }}>
                  <Search size={26} style={{ color: 'rgba(201,168,76,0.5)' }} />
                </div>
                <p className="text-lg font-bold text-white">Nhập từ khóa để bắt đầu</p>
                <p className="mt-2 text-sm font-light" style={{ color: 'var(--muted-up)' }}>
                  Gõ tên phim, diễn viên hoặc thể loại rồi nhấn <kbd className="inline-block rounded px-1.5 py-0.5 text-[10px] font-black" style={{ background: 'rgba(201,168,76,0.09)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--gold)' }}>Enter</kbd> để tìm.
                </p>
              </div>
            </div>
          </Reveal>
        ) : (
          <>
            {/* Result count */}
            <Reveal>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <div
                  className="flex h-7 items-center px-3 text-[11px] font-black"
                  style={{ borderRadius: 'var(--r-pill)', background: 'rgba(201,168,76,0.09)', border: '1px solid rgba(201,168,76,0.18)', color: 'var(--gold)' }}
                >
                  {movies.length} kết quả
                </div>
                {q && <p className="text-sm font-light" style={{ color: 'var(--muted-up)' }}>cho <span className="font-semibold text-white">&ldquo;{q}&rdquo;</span></p>}
                {filterLabel && <span className="text-xs font-semibold" style={{ color: 'var(--gold)', opacity: 0.7 }}>· {filterLabel}</span>}
              </div>
            </Reveal>

            {movies.length > 0 ? (
              <StaggerGroup className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-7 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6" stagger={0.04}>
                {movies.map((movie) => (
                  <StaggerItem key={movie.id}><PosterCard movie={movie} /></StaggerItem>
                ))}
              </StaggerGroup>
            ) : (
              <EmptyState title="Không tìm thấy phim phù hợp" description="Thử từ khóa khác hoặc bỏ bộ lọc để xem nhiều kết quả hơn." />
            )}
          </>
        )}
      </div>
    </div>
  );
}

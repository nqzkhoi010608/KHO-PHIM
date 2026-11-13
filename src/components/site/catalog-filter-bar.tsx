import { SlidersHorizontal } from 'lucide-react';
import type { ReactNode } from 'react';

export function CatalogFilterBar({
  genres,
  countries,
  years,
}: {
  genres: string[];
  countries: string[];
  years: string[];
}): ReactNode {
  return (
    <form
      action="/tim-kiem"
      aria-label="Bộ lọc catalogue"
      className="flex flex-wrap items-center gap-2.5 py-1"
    >
      {/* Label */}
      <span
        className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] mr-1"
        style={{ color: 'var(--muted-deep)' }}
      >
        <SlidersHorizontal size={13} style={{ color: 'var(--signal)' }} />
        Bộ lọc
      </span>

      {/* Genre */}
      <div className="relative">
        <select
          name="genre"
          defaultValue=""
          className="filter-select appearance-none cursor-pointer pr-7 text-[12px]"
          style={{ borderRadius: 'var(--r-pill)', paddingLeft: '14px', minHeight: '34px' }}
        >
          <option value="">Thể loại</option>
          {genres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <div
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
          style={{ color: 'var(--muted-deep)' }}
        >
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Country */}
      <div className="relative">
        <select
          name="country"
          defaultValue=""
          className="filter-select appearance-none cursor-pointer pr-7 text-[12px]"
          style={{ borderRadius: 'var(--r-pill)', paddingLeft: '14px', minHeight: '34px' }}
        >
          <option value="">Quốc gia</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <div
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
          style={{ color: 'var(--muted-deep)' }}
        >
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Year */}
      <div className="relative">
        <select
          name="year"
          defaultValue=""
          className="filter-select appearance-none cursor-pointer pr-7 text-[12px]"
          style={{ borderRadius: 'var(--r-pill)', paddingLeft: '14px', minHeight: '34px' }}
        >
          <option value="">Năm</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <div
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
          style={{ color: 'var(--muted-deep)' }}
        >
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="btn btn-primary min-h-[34px] px-5 text-[12px]"
        style={{ borderRadius: 'var(--r-pill)' }}
      >
        Áp dụng
      </button>
    </form>
  );
}

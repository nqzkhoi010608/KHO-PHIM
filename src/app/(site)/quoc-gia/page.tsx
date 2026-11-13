import Link from 'next/link';
import { ArrowUpRight, Globe2 } from 'lucide-react';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/site/motion';
import { countryNavigation } from '@/lib/catalog/navigation';

export const metadata = { title: 'Quốc gia' };

export default function CountriesPage() {
  return (
    <div className="container-shell catalog-directory pt-32 pb-16">
      <Reveal>
        <p className="eyebrow">Điện ảnh bốn phương</p>
        <div className="mt-3 flex items-end gap-4">
          <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-paper sm:text-6xl">Chọn nơi câu chuyện bắt đầu.</h1>
          <Globe2 className="mb-2 hidden text-signal sm:block" size={36} aria-hidden="true" />
        </div>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted">Đi qua những nền điện ảnh khác nhau và tìm một màu sắc hợp với tối nay.</p>
      </Reveal>
      <StaggerGroup className="catalog-directory-grid mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
        {countryNavigation.map((country, index) => (
          <StaggerItem key={country.slug}>
            <Link href={`/quoc-gia/${country.slug}`} className="catalog-directory-card group relative flex min-h-32 items-end justify-between overflow-hidden border border-line bg-panel p-5 transition duration-300 ease-cinema hover:border-signal/40 hover:bg-[#172026]" style={{ borderRadius: 'var(--radius-md)' }}>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-signal/0 to-signal/0 transition duration-500 ease-cinema group-hover:from-signal/5 group-hover:to-transparent" />
              <span className="relative">
                <span className="block text-xs text-muted">{String(index + 1).padStart(2, '0')}</span>
                <span className="mt-4 block text-lg font-semibold text-paper transition group-hover:text-signal">{country.label}</span>
              </span>
              <ArrowUpRight size={18} className="relative text-muted transition duration-300 ease-cinema group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-signal" />
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}

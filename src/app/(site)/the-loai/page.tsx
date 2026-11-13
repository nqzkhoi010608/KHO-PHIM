import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { genreList } from '@/lib/demo-data/movies';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/site/motion';

export const metadata = { title: 'Thể loại' };

export default function GenresPage() {
  return (
    <div className="container-shell pt-32">
      <Reveal>
        <p className="eyebrow">Chọn theo tâm trạng</p>
        <h1 className="font-display mt-3 max-w-xl text-4xl font-bold tracking-[-0.04em] text-paper sm:text-6xl">Một thể loại cho mỗi tối.</h1>
        <p className="mt-4 max-w-lg text-base leading-7 text-muted">Dù bạn muốn hồi hộp, bật cười hay rơi nước mắt — luôn có một thể loại chờ bạn khám phá.</p>
      </Reveal>
      <StaggerGroup className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.04}>
        {genreList.map((genre, index) => (
          <StaggerItem key={genre.slug}>
            <Link href={`/the-loai/${genre.slug}`} className="group relative flex min-h-28 items-end justify-between overflow-hidden border border-line bg-panel p-5 transition duration-300 ease-cinema hover:border-signal/30 hover:bg-panel-raised" style={{ borderRadius: 'var(--radius-md)' }}>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-signal/0 to-signal/0 transition duration-500 ease-cinema group-hover:from-signal/5 group-hover:to-transparent" />
              <span className="relative"><span className="block text-xs text-muted">{String(index + 1).padStart(2, '0')}</span><span className="mt-3 block text-lg font-semibold text-paper transition group-hover:text-signal">{genre.name}</span></span>
              <ArrowUpRight size={18} className="relative text-muted transition duration-300 ease-cinema group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-signal" />
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}

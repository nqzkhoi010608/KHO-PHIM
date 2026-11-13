import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Movie } from '@/types/catalog';
import { PosterCard } from './poster-card';
import { EmptyState } from '@/components/shared/section-state';
import { Reveal } from './motion';

export function MovieRail({ title, eyebrow, movies, href }: { title: string; eyebrow?: string; movies: Movie[]; href?: string }) {
  return (
    <Reveal as="section" className="section-space" direction="up">
      <div className="shelf-surface p-4 sm:p-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-paper sm:text-3xl">{title}</h2>
          </div>
          {href && (
            <Link href={href} className="inline-flex items-center gap-2 text-sm text-muted transition duration-300 ease-cinema hover:gap-3 hover:text-paper">
              Xem tất cả <ArrowRight size={16} />
            </Link>
          )}
        </div>
        {movies.length ? (
          <div className="poster-rail grid grid-flow-col auto-cols-[148px] gap-4 overflow-x-auto pb-2 sm:auto-cols-[176px] lg:grid-flow-row lg:grid-cols-5 lg:overflow-visible xl:grid-cols-6">
            {movies.map((movie) => <PosterCard key={movie.id} movie={movie} />)}
          </div>
        ) : (
          <EmptyState title="Chưa có phim trong mục này" description="Kho Phim sẽ cập nhật danh sách ngay khi nguồn dữ liệu sẵn sàng." />
        )}
      </div>
    </Reveal>
  );
}

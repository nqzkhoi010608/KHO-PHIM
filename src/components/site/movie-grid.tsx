import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import type { Movie } from '@/types/catalog';
import { PosterCard } from './poster-card';
import { EmptyState } from '@/components/shared/section-state';
import { StaggerGroup, StaggerItem } from './motion';

export function MovieGrid({
  title, eyebrow, movies, href, emptyDescription,
}: {
  title: string; eyebrow?: string; movies: Movie[]; href?: string; emptyDescription?: string;
}) {
  return (
    <section className="section-space">
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

      {movies.length ? (
        <StaggerGroup
          className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-7 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
          stagger={0.055}
        >
          {movies.map((movie) => (
            <StaggerItem key={movie.id}>
              <PosterCard movie={movie} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      ) : (
        <EmptyState title="Chưa có phim trong mục này" description={emptyDescription ?? 'Kho Phim sẽ cập nhật danh sách ngay khi nguồn dữ liệu sẵn sàng.'} />
      )}
    </section>
  );
}

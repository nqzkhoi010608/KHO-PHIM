import { notFound } from 'next/navigation';
import { CatalogHeader } from '@/components/site/catalog-header';
import { PosterCard } from '@/components/site/poster-card';
import { StaggerGroup, StaggerItem } from '@/components/site/motion';
import { EmptyState } from '@/components/shared/section-state';
import { listMovies, getGenreBySlug } from '@/lib/catalog/repository';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const genre = getGenreBySlug(slug);
  return { title: genre?.name ?? 'Thể loại' };
}

export default async function GenrePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const genre = getGenreBySlug(slug);
  if (!genre) notFound();
  const movies = await listMovies({ genre: genre.name });
  return (
    <>
      <CatalogHeader eyebrow="Thể loại" title={genre.name} description="Khám phá những bộ phim thuộc thể loại này.">
        <p className="text-sm text-muted">{movies.length} phim</p>
      </CatalogHeader>
      <div className="container-shell pb-14">
        {movies.length ? (
          <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
            {movies.map((movie) => (<StaggerItem key={movie.id}><PosterCard movie={movie} /></StaggerItem>))}
          </StaggerGroup>
        ) : (
          <EmptyState title="Chưa có phim trong thể loại này" description="Kho Phim sẽ cập nhật ngay khi có nội dung phù hợp." />
        )}
      </div>
    </>
  );
}

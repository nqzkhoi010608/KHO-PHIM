import { notFound } from 'next/navigation';
import { CatalogHeader } from '@/components/site/catalog-header';
import { PosterCard } from '@/components/site/poster-card';
import { StaggerGroup, StaggerItem } from '@/components/site/motion';
import { EmptyState } from '@/components/shared/section-state';
import { listMovies, getCountryBySlug } from '@/lib/catalog/repository';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  return { title: country?.name ?? 'Quốc gia' };
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) notFound();
  const movies = await listMovies({ country: country.name });
  return (
    <>
      <CatalogHeader eyebrow="Quốc gia" title={country.name} description="Phim từ quốc gia này, mang đậm dấu ấn văn hóa riêng.">
        <p className="text-sm text-muted">{movies.length} phim</p>
      </CatalogHeader>
      <div className="container-shell pb-14">
        {movies.length ? (
          <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
            {movies.map((movie) => (<StaggerItem key={movie.id}><PosterCard movie={movie} /></StaggerItem>))}
          </StaggerGroup>
        ) : (
          <EmptyState title="Chưa có phim từ quốc gia này" description="Kho Phim sẽ cập nhật ngay khi có nội dung phù hợp." />
        )}
      </div>
    </>
  );
}

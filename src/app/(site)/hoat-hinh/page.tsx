import { CatalogHeader } from '@/components/site/catalog-header';
import { MovieGrid } from '@/components/site/movie-grid';
import { listMovies } from '@/lib/catalog/repository';

export const metadata = { title: 'Hoạt Hình · Kho Phim' };

export default async function AnimationPage() {
  const movies = await listMovies({ kind: 'Hoạt hình' });

  return (
    <>
      <CatalogHeader
        eyebrow="Những thế giới khác"
        title="Hoạt Hình"
        description="Từ vẽ tay đến 3D — hoạt hình không bao giờ chỉ dành cho trẻ em."
      >
        <span
          className="inline-flex items-center text-[11px] font-black"
          style={{
            padding: '4px 12px',
            borderRadius: 'var(--r-pill)',
            background: 'rgba(245,184,0,0.08)',
            border: '1px solid rgba(245,184,0,0.18)',
            color: 'var(--gold)',
          }}
        >
          {movies.length} phim
        </span>
      </CatalogHeader>

      <div className="container-shell pb-16 pt-8">
        <MovieGrid title="Tất cả hoạt hình" movies={movies} />
      </div>
    </>
  );
}

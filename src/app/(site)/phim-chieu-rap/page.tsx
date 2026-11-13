import { CatalogHeader } from '@/components/site/catalog-header';
import { MovieGrid } from '@/components/site/movie-grid';
import { listMovies } from '@/lib/catalog/repository';

export const metadata = { title: 'Phim Chiếu Rạp · Kho Phim' };

export default async function TheaterPage() {
  const movies = await listMovies({ kind: 'Chiếu rạp' });

  return (
    <>
      <CatalogHeader
        eyebrow="Màn ảnh lớn, ngay tại nhà"
        title="Phim Chiếu Rạp"
        description="Chất lượng ảnh và âm thanh đúng chuẩn phòng chiếu — không cần xếp vé."
      >
        <span
          className="inline-flex items-center text-[11px] font-black"
          style={{
            padding: '4px 12px',
            borderRadius: 'var(--r-pill)',
            background: 'rgba(232,56,44,0.09)',
            border: '1px solid rgba(232,56,44,0.18)',
            color: 'var(--signal)',
          }}
        >
          {movies.length} phim
        </span>
      </CatalogHeader>

      <div className="container-shell pb-16 pt-8">
        <MovieGrid title="Tất cả phim chiếu rạp" movies={movies} />
      </div>
    </>
  );
}

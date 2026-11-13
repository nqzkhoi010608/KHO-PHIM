import { MovieGrid }     from '@/components/site/movie-grid';
import { listMovies }    from '@/lib/catalog/repository';

export const metadata = { title: 'Phim Bộ · Kho Phim' };

export default async function SeriesPage() {
  const movies = await listMovies({ kind: 'Phim bộ' });

  return (
    <div className="container-shell pb-16 pt-24 sm:pt-28">
        <MovieGrid title="Tất cả phim bộ" movies={movies} />
    </div>
  );
}

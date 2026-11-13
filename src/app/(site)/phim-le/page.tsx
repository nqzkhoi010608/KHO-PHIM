import { MovieGrid }     from '@/components/site/movie-grid';
import { listMovies }    from '@/lib/catalog/repository';

export const metadata = { title: 'Phim Lẻ · Kho Phim' };

export default async function MoviesPage() {
  const movies = await listMovies({ kind: 'Phim lẻ' });

  return (
    <div className="container-shell pb-16 pt-24 sm:pt-28">
        <MovieGrid title="Tất cả phim lẻ" movies={movies} />
    </div>
  );
}

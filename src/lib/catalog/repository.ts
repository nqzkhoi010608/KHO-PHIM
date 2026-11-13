/**
 * catalog/repository.ts
 *
 * Lớp data duy nhất mà các pages/components gọi vào.
 * Catalogue công khai chỉ dùng dữ liệu động từ VSMOV API.
 * Không có fallback metadata phim hard-code để tránh hiển thị dữ liệu cũ.
 */

import { genreList, countryList, genres, countries, years, getGenreBySlug, getCountryBySlug } from '@/lib/demo-data/movies';
import type { CatalogFilter, Movie } from '@/types/catalog';
import { getConfiguredVsmovMovies, getVsmovMovie } from '@/lib/vsmov/repository';
import type { NormalizedMovie } from '@/lib/vsmov/normalizer';

export { genreList, countryList, getGenreBySlug, getCountryBySlug };

function toCatalogMovie(movie: NormalizedMovie): Movie {
  const kind: Movie['kind'] = movie.isSeries
    ? 'Phim bộ'
    : movie.isTheater
      ? 'Chiếu rạp'
      : 'Phim lẻ';
  const status: Movie['status'] = movie.status === 'completed'
    ? 'Hoàn tất'
    : movie.status === 'trailer'
      ? 'Sắp chiếu'
      : 'Đang cập nhật';
  const firstEpisode = movie.allEpisodes[0];
  const seasons = firstEpisode
    ? [{
        number: 1,
        title: 'Phim',
        episodes: movie.allEpisodes.map((episode, index) => ({
          id: episode.slug,
          number: index + 1,
          title: episode.name,
          duration: 0,
          available: Boolean(episode.embedUrl),
        })),
      }]
    : [];

  return {
    id: String(movie.id),
    slug: movie.slug,
    title: movie.name,
    originalTitle: movie.originName,
    kind,
    year: movie.year,
    duration: movie.duration,
    quality: movie.quality,
    language: movie.language,
    country: movie.countries[0] ?? 'Không rõ',
    genres: movie.categories,
    director: movie.directors.join(', '),
    cast: movie.actors,
    overview: movie.description,
    posterUrl: movie.posterUrl,
    backdropUrl: movie.bannerUrl,
    rating: movie.rating,
    badge: movie.language || movie.episodeCurrent || movie.quality,
    status,
    updatedLabel: movie.episodeCurrent || movie.quality,
    seasons,
    firstEpisodeSlug: firstEpisode?.slug,
    isFeatured: movie.rating >= 7,
  };
}

async function getCatalogMovies(): Promise<Movie[]> {
  return (await getConfiguredVsmovMovies()).map(toCatalogMovie);
}

/* ════════════════════════════════════════
   TRANG CHỦ
   ════════════════════════════════════════ */
export async function getHomeCatalog() {
  const movies = await getCatalogMovies();
  const trending = [...movies].sort((a, b) => b.rating - a.rating);
  const featured = movies.filter((movie) => movie.isFeatured && movie.backdropUrl);
  const heroSlides = (featured.length >= 3 ? featured : trending).slice(0, 5);
  const updated = [...movies].sort((a, b) => b.year - a.year || b.rating - a.rating);
  const singles = movies.filter((movie) => movie.kind === 'Phim lẻ');
  const series = movies.filter((movie) => movie.kind === 'Phim bộ');
  const comingSoon = movies.filter((movie) => movie.status === 'Sắp chiếu');

  return {
    featured:    heroSlides[0] ?? movies[0],
    heroSlides,
    updated,
    singles,
    series,
    animation:   movies.filter((movie) => movie.kind === 'Hoạt hình'),
    trending,
    comingSoon,
  };
}

/* ════════════════════════════════════════
   DANH SÁCH
   ════════════════════════════════════════ */
export async function listMovies(filter: CatalogFilter = {}): Promise<Movie[]> {
  const query = filter.q?.trim().toLowerCase();
  const movies = await getCatalogMovies();

  return movies.filter((movie) => {
    /* Full-text search: title, originalTitle, genres */
    const matchesQuery = !query
      || [movie.title, movie.originalTitle, ...movie.genres]
         .join(' ').toLowerCase().includes(query);

    const matchesKind    = !filter.kind    || movie.kind    === filter.kind;
    const matchesGenre   = !filter.genre   || movie.genres.some((g) => g.toLowerCase() === filter.genre!.toLowerCase());
    const matchesCountry = !filter.country || movie.country.toLowerCase() === filter.country!.toLowerCase();
    const matchesYear    = !filter.year    || String(movie.year) === filter.year;

    return matchesQuery && matchesKind && matchesGenre && matchesCountry && matchesYear;
  });
}

/* ════════════════════════════════════════
   CHI TIẾT PHIM
   Trang chi tiết dùng VSMOV API trực tiếp.
   Nếu nguồn không trả dữ liệu, trả null để UI hiển thị not-found thay vì dữ liệu cũ.
   ════════════════════════════════════════ */
export async function getMovieBySlug(slug: string): Promise<Movie | null> {
  const remoteMovie = await getVsmovMovie(slug);
  if (remoteMovie) return toCatalogMovie(remoteMovie);
  return null;
}

/* ════════════════════════════════════════
   PHIM LIÊN QUAN
   ════════════════════════════════════════ */
export async function getRelatedMovies(movie: Movie): Promise<Movie[]> {
  const movies = await getCatalogMovies();
  return movies
    .filter(
      (m) =>
        m.id !== movie.id &&
        m.genres.some((g) => movie.genres.includes(g)),
    )
    .slice(0, 8);
}

/* ════════════════════════════════════════
   BỘ LỌC (dùng cho catalog pages)
   ════════════════════════════════════════ */
export async function getCatalogFilters() {
  return { genres, countries, years };
}

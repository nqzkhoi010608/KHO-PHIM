import { describe, expect, it } from 'vitest';
import { getMovieBySlug, listMovies } from '../src/lib/catalog/repository';
import { getConfiguredVsmovSlugs } from '../src/lib/demo-data/vsmov-sources';

describe('catalog repository', () => {
  it('filters only movies returned by configured VSMOV sources', async () => {
    const movies = await listMovies({ kind: 'Phim bộ' });
    expect(movies.every((movie) => movie.kind === 'Phim bộ')).toBe(true);
    expect(movies.every((movie) => getConfiguredVsmovSlugs().includes(movie.slug))).toBe(true);
  });

  it('does not fall back to stale local movie metadata', async () => {
    const movie = await getMovieBySlug('flow');
    expect(movie).toBeNull();
  });

  it('does not match unrelated search terms', async () => {
    expect(await listMovies({ q: 'không tồn tại' })).toHaveLength(0);
  });
});

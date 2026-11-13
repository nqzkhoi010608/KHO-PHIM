/**
 * Repository VSMOV — lớp duy nhất Pages/Components gọi vào.
 * Kết hợp client + normalizer, trả về dữ liệu đã chuẩn hóa.
 *
 * Cấu trúc response thực tế (đã kiểm thử 12/11/2026):
 *   /phim/{slug}           → { status, movie, episodes }
 *   /danh-sach/*           → { status, items[], pagination? } — items ở ROOT
 *   /tim-kiem              → { status, items[], pagination? } — items ở ROOT
 */

import {
  fetchMovieDetail,
  fetchNewMovies,
  fetchSearchMovies,
  VsmovNotFoundError,
} from './client';
import { VSMOV_SOURCE_URLS, getVsmovSlug } from '@/lib/demo-data/vsmov-sources';
import { normalizeMovie, normalizeListItem } from './normalizer';
import type { NormalizedMovie, NormalizedListItem } from './normalizer';

export type { NormalizedMovie, NormalizedListItem };
export { VsmovNotFoundError };

/** Fetch every configured URL. A failed source never breaks the whole catalogue. */
export async function getConfiguredVsmovMovies(): Promise<NormalizedMovie[]> {
  const slugs = Array.from(new Set(
    VSMOV_SOURCE_URLS
      .map(getVsmovSlug)
      .filter((slug): slug is string => Boolean(slug)),
  ));

  const results = await Promise.allSettled(slugs.map((slug) => getVsmovMovie(slug)));
  return results
    .filter((result): result is PromiseFulfilledResult<NormalizedMovie | null> => result.status === 'fulfilled')
    .map((result) => result.value)
    .filter((movie): movie is NormalizedMovie => Boolean(movie));
}

/* ── Chi tiết phim ── */
export async function getVsmovMovie(
  slug: string,
): Promise<NormalizedMovie | null> {
  try {
    const res = await fetchMovieDetail(slug);
    if (!res?.movie) return null;
    return normalizeMovie(res.movie, res.episodes ?? []);
  } catch (err) {
    if (err instanceof VsmovNotFoundError) return null;
    console.error('[VSMOV] getVsmovMovie error:', (err as Error).message);
    return null;
  }
}

/* ── Danh sách phim mới ── */
export async function getVsmovNewMovies(page = 1): Promise<{
  items: NormalizedListItem[];
  totalPages: number;
}> {
  try {
    const res = await fetchNewMovies(page);
    /* items nằm ở root, không phải data.items */
    const items      = (res?.items ?? []).map(normalizeListItem);
    const totalPages = res?.pagination?.totalPages ?? 1;
    return { items, totalPages };
  } catch (err) {
    console.error('[VSMOV] getVsmovNewMovies error:', (err as Error).message);
    return { items: [], totalPages: 0 };
  }
}

/* ── Tìm kiếm phim ── */
export async function searchVsmovMovies(
  keyword: string,
  limit = 24,
): Promise<{ items: NormalizedListItem[]; totalPages: number }> {
  if (!keyword.trim()) return { items: [], totalPages: 0 };
  try {
    const res = await fetchSearchMovies(keyword, limit);
    /* items nằm ở root */
    const items      = (res?.items ?? []).map(normalizeListItem);
    const totalPages = res?.pagination?.totalPages ?? 1;
    return { items, totalPages };
  } catch (err) {
    console.error('[VSMOV] searchVsmovMovies error:', (err as Error).message);
    return { items: [], totalPages: 0 };
  }
}

import type {
  VsmovDetailResponse,
  VsmovListResponse,
  VsmovSearchResponse,
} from './types';
import { toVsmovApiPath } from '@/lib/demo-data/vsmov-sources';

const BASE_URL =
  process.env.VSMOV_API_BASE ?? process.env.VSMOV_BASE_URL ?? 'https://vsmov.com/api';

const DEFAULT_TIMEOUT_MS = 10_000;
const MAX_RETRIES        = 2;
const RETRY_DELAY_MS     = 600;

/* ── sleep helper ── */
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/* ── Custom error types ── */
export class VsmovNotFoundError extends Error {
  constructor(slug: string) {
    super(`Không tìm thấy phim: ${slug}`);
    this.name = 'VsmovNotFoundError';
  }
}

export class VsmovApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'VsmovApiError';
  }
}

/* ── Core fetch with timeout + retry ── */
async function vsmovFetch<T>(
  path: string,
  attempt = 0,
): Promise<T> {
  const url = `${BASE_URL}${path}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(url, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' },
      /* Next.js revalidate — cache 5 phút cho detail, 2 phút cho listing */
      next: { revalidate: path.startsWith('/phim/') ? 300 : 120 },
    });
  } catch (err: unknown) {
    clearTimeout(timer);
    const isAbort = err instanceof Error && err.name === 'AbortError';

    /* Retry nếu chưa quá giới hạn và không phải 404 */
    if (attempt < MAX_RETRIES && !isAbort) {
      await sleep(RETRY_DELAY_MS * (attempt + 1));
      return vsmovFetch<T>(path, attempt + 1);
    }

    throw new VsmovApiError(
      0,
      isAbort ? 'Request timeout — VSMOV API không phản hồi.' : 'Network error.',
    );
  } finally {
    clearTimeout(timer);
  }

  if (res.status === 404) throw new VsmovNotFoundError(path);

  if (!res.ok) {
    if (attempt < MAX_RETRIES && res.status >= 500) {
      await sleep(RETRY_DELAY_MS * (attempt + 1));
      return vsmovFetch<T>(path, attempt + 1);
    }
    throw new VsmovApiError(res.status, `VSMOV API trả lỗi HTTP ${res.status}.`);
  }

  let json: unknown;
  try {
    json = await res.json();
  } catch {
    throw new VsmovApiError(0, 'JSON response không hợp lệ từ VSMOV API.');
  }

  /* Kiểm tra status field trong response body */
  if (
    json !== null &&
    typeof json === 'object' &&
    'status' in json &&
    (json as { status: boolean }).status === false
  ) {
    throw new VsmovNotFoundError(path);
  }

  return json as T;
}

/* ══════════════════════════════════════
   PUBLIC API METHODS
   ══════════════════════════════════════ */

/**
 * Lấy chi tiết phim theo slug.
 * Throw VsmovNotFoundError nếu không tìm thấy.
 */
export async function fetchMovieDetail(
  slugOrUrl: string,
): Promise<VsmovDetailResponse> {
  return vsmovFetch<VsmovDetailResponse>(toVsmovApiPath(slugOrUrl));
}

/**
 * Lấy danh sách phim mới cập nhật.
 */
export async function fetchNewMovies(
  page = 1,
): Promise<VsmovListResponse> {
  return vsmovFetch<VsmovListResponse>(
    `/danh-sach/phim-moi-cap-nhat?page=${page}`,
  );
}

/**
 * Tìm kiếm phim theo keyword.
 */
export async function fetchSearchMovies(
  keyword: string,
  limit = 24,
): Promise<VsmovSearchResponse> {
  const kw = encodeURIComponent(keyword.trim());
  return vsmovFetch<VsmovSearchResponse>(
    `/tim-kiem?keyword=${kw}&limit=${limit}`,
  );
}

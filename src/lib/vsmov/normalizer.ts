/**
 * Normalizer: chuyển VsmovMovie + VsmovServer[] → VsmovNormalizedMovie
 * Dựa trên dữ liệu thực tế, không giả định trường nào.
 */

import type {
  VsmovMovie,
  VsmovServer,
  VsmovListItem,
} from './types';

/* ── Normalized models ── */

export interface NormalizedEpisode {
  name: string;         // "1", "2", "Full"
  slug: string;         // "tap-1", "tap-full"
  filename: string;
  embedUrl: string;     // validated HTTPS URL
  m3u8Url: string | null;
  serverName: string;   // trimmed server name
  serverIndex: number;
  episodeIndex: number;
}

export interface NormalizedServer {
  name: string;         // trimmed server name
  index: number;
  episodes: NormalizedEpisode[];
}

export interface NormalizedMovie {
  /* Identity */
  id: number;
  name: string;
  slug: string;
  originName: string;

  /* Content */
  description: string;
  /** API poster_url is the wide banner/backdrop. */
  bannerUrl: string;
  /** API thumb_url is the vertical poster/card image. */
  posterUrl: string;
  trailerUrl: string | null;

  /* Meta */
  year: number;
  type: 'single' | 'series' | string;
  status: 'completed' | 'ongoing' | string;
  quality: string;
  language: string;
  duration: string;             // normalized: "75 phút" hoặc "109 phút"
  episodeCurrent: string;       // "Hoàn Tất (12/12)", "Full", "Tập 16"
  episodeTotal: number;         // parsed number

  /* Rating từ tmdb */
  rating: number;               // float, 0 nếu không có
  ratingCount: number;

  /* Taxonomy */
  categories: string[];         // name only
  categoryObjects: { id: number; name: string; slug: string }[];
  countries: string[];          // name only
  countryObjects: { id: number; name: string; slug: string }[];

  /* People */
  actors: string[];
  directors: string[];

  /* Episodes */
  servers: NormalizedServer[];
  allEpisodes: NormalizedEpisode[];

  /* Flags */
  isMovie: boolean;
  isSeries: boolean;
  isExclusive: boolean;
  isTheater: boolean;
}

/* ── Helpers ── */

/** Trim server name — API trả về "\r\n                        #1" */
function trimServerName(raw: string): string {
  return raw.replace(/[\r\n\t]/g, ' ').replace(/\s{2,}/g, ' ').trim();
}

export function isValidEmbedUrl(url: string): boolean {
  try {
    const u = new URL(url);
    /* Chỉ chấp nhận HTTPS */
    if (u.protocol !== 'https:') return false;
    return u.hostname === 'streamvsmov.com' || u.hostname.endsWith('.streamvsmov.com');
  } catch {
    return false;
  }
}

/** Normalize duration string */
function normalizeDuration(raw: string | null): string {
  if (!raw) return 'Không rõ';
  const trimmed = raw.trim();
  /* Nếu chỉ là số (vd "109") thêm " phút" */
  if (/^\d+$/.test(trimmed)) return `${trimmed} phút`;
  return trimmed;
}

/** Parse episode_total → number. Trả 0 nếu null hoặc không parse được */
function parseEpisodeTotal(raw: string | null | undefined): number {
  if (!raw) return 0;
  const n = parseInt(raw.trim(), 10);
  return isNaN(n) ? 0 : n;
}

/** Parse vote_average → number */
function parseRating(raw: string | null): number {
  if (!raw) return 0;
  const n = parseFloat(raw);
  return isNaN(n) ? 0 : Math.round(n * 10) / 10;
}

/* ── Main normalizer ── */

export function normalizeMovie(
  movie: VsmovMovie,
  servers: VsmovServer[],
): NormalizedMovie {
  /* Normalize servers + episodes */
  const normalizedServers: NormalizedServer[] = servers
    .map((srv, srvIdx) => {
      const name = trimServerName(srv.server_name);
      const episodes: NormalizedEpisode[] = (srv.server_data ?? [])
        .map((ep, epIdx) => ({
          name:          ep.name,
          slug:          ep.slug,
          filename:      ep.filename,
          embedUrl:      isValidEmbedUrl(ep.link_embed) ? ep.link_embed : '',
          m3u8Url:       ep.link_m3u8 && ep.link_m3u8.startsWith('https://') ? ep.link_m3u8 : null,
          serverName:    name,
          serverIndex:   srvIdx,
          episodeIndex:  epIdx,
        }));
      return { name, index: srvIdx, episodes };
    });

  const allEpisodes = normalizedServers.flatMap((s) => s.episodes);

  return {
    id:             movie._id,
    name:           movie.name,
    slug:           movie.slug,
    originName:     movie.origin_name ?? '',

    description:    movie.content ?? '',
    bannerUrl:      movie.poster_url ?? '',
    posterUrl:      movie.thumb_url ?? '',
    trailerUrl:     movie.trailer_url ?? null,

    year:           movie.year,
    type:           movie.type,
    status:         movie.status,
    quality:        movie.quality ?? 'HD',
    language:       movie.lang ?? '',
    duration:       normalizeDuration(movie.time),
    episodeCurrent: movie.episode_current ?? '',
    episodeTotal:   parseEpisodeTotal(movie.episode_total),

    rating:         parseRating(movie.tmdb?.vote_average ?? null),
    ratingCount:    movie.tmdb?.vote_count ?? 0,

    categories:     (movie.category ?? []).map((c) => c.name),
    categoryObjects: movie.category ?? [],
    countries:      (movie.country ?? []).map((c) => c.name),
    countryObjects: movie.country ?? [],

    actors:         movie.actor ?? [],
    directors:      movie.director ?? [],

    servers:        normalizedServers,
    allEpisodes,

    isMovie:        movie.type === 'single',
    isSeries:       movie.type === 'series',
    isExclusive:    movie.sub_docquyen ?? false,
    isTheater:      movie.chieurap ?? false,
  };
}

/* ── List item normalizer (trang chủ / tìm kiếm) ── */

export interface NormalizedListItem {
  id: string;
  name: string;
  slug: string;
  originName: string;
  bannerUrl: string;
  posterUrl: string;
  type: string;
  quality: string;
  language: string;
  year: number;
  episodeCurrent: string;
  categories: string[];
  countries: string[];
  modifiedTime: string;
}

export function normalizeListItem(item: VsmovListItem): NormalizedListItem {
  return {
    id:             item._id,
    name:           item.name,
    slug:           item.slug,
    originName:     item.origin_name ?? '',
    bannerUrl:      item.poster_url ?? '',
    posterUrl:      item.thumb_url ?? '',
    type:           item.type,
    quality:        item.quality ?? 'HD',
    language:       item.lang ?? '',
    year:           item.year,
    episodeCurrent: item.episode_current ?? '',
    categories:     (item.category ?? []).map((c) => c.name),
    countries:      (item.country ?? []).map((c) => c.name),
    modifiedTime:   item.modified?.time ?? '',
  };
}

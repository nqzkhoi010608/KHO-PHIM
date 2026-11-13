/**
 * Raw JSON shapes từ VSMOV API — dựa trên phân tích thực tế 3 response:
 * tien-si-yeu-duong, annabelle-tao-vat-quy-du, chien-binh-anh-sang-tiga
 */

export interface VsmovTmdb {
  type: 'movie' | 'tv' | null;
  id: string | null;
  season: number | null;
  vote_average: string | null; // string "8.2", không phải number
  vote_count: number | null;
}

export interface VsmovImdb {
  id: string | null; // "tt5140878"
}

export interface VsmovCategory {
  id: number;
  name: string;
  slug: string;
}

export interface VsmovCountry {
  id: number;
  name: string;
  slug: string;
}

export interface VsmovEpisodeItem {
  name: string;         // "1", "2", "Full"
  slug: string;         // "tap-1", "tap-full"
  filename: string;     // "1", "Full"
  link_embed: string;   // "https://v8.streamvsmov.com/video/..."
  link_m3u8?: string;   // không xuất hiện trong 3 response — optional
}

export interface VsmovServer {
  server_name: string;  // "Vietsub\r\n                        #1" — cần trim
  server_data: VsmovEpisodeItem[];
}

export interface VsmovMovie {
  _id: number;
  name: string;
  origin_name: string;
  slug: string;
  content: string;
  type: 'single' | 'series' | string;
  status: 'completed' | 'ongoing' | 'trailer' | string;  poster_url: string;
  thumb_url: string;
  trailer_url: string | null;
  time: string | null;          // "75 phút", "109", "25 phút"
  episode_current: string | null; // "Hoàn Tất (12/12)", "Full", "Tập 16"
  episode_total: string | null;   // "12", "1", "52"
  quality: string | null;         // "HD"
  lang: string | null;            // "Vietsub", "Lồng tiếng"
  notify: string | null;
  showtimes: string | null;
  year: number;
  keywords: string[];
  view: number;
  chieurap: boolean;
  sub_docquyen: boolean;
  actor: string[];              // array string — không phải objects
  director: string[];           // array string, có thể []
  category: VsmovCategory[];
  country: VsmovCountry[];
  tmdb: VsmovTmdb;
  imdb: VsmovImdb;
  created: { time: string };
  modified: { time: string };
}

export interface VsmovDetailResponse {
  status: boolean;
  msg: string;
  movie: VsmovMovie;
  episodes: VsmovServer[];
}

export interface VsmovListItem {
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  type: string;
  thumb_url: string;
  poster_url: string;
  sub_docquyen: boolean;
  chieurap: boolean;
  time: string | null;
  episode_current: string | null;
  quality: string | null;
  lang: string | null;
  year: number;
  category: VsmovCategory[];
  country: VsmovCountry[];
  modified: { time: string };
}

export interface VsmovListResponse {
  status: boolean;
  msg: string;
  /* /danh-sach/* trả items ở root, không có data wrapper */
  items: VsmovListItem[];
  pagination?: {
    totalItems: number;
    totalItemsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
}

export interface VsmovSearchResponse {
  status: boolean;
  msg: string;
  /* /tim-kiem trả items ở root, pagination ở root */
  items: VsmovListItem[];
  pagination?: {
    totalItems: number;
    totalItemsPerPage: string | number; /* search trả string "5" */
    currentPage: number;
    totalPages: number;
  };
}

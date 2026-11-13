export type MovieKind = 'Phim lẻ' | 'Phim bộ' | 'Hoạt hình' | 'Chiếu rạp';

export type Episode = {
  id: string;
  number: number;
  title: string;
  duration: number;
  isNew?: boolean;
  available?: boolean;
};

export type Season = {
  number: number;
  title: string;
  episodes: Episode[];
};

export type Movie = {
  id: string;
  slug: string;
  title: string;
  originalTitle: string;
  kind: MovieKind;
  year: number;
  duration: string;
  quality: string;
  language: string;
  country: string;
  genres: string[];
  director: string;
  cast: string[];
  overview: string;
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  badge?: string;
  status: 'Đang cập nhật' | 'Hoàn tất' | 'Sắp chiếu';
  updatedLabel: string;
  seasons: Season[];
  /** API episode slug used by the real VSMOV watch route. */
  firstEpisodeSlug?: string;
  isFeatured?: boolean;
};

export type CatalogFilter = {
  genre?: string;
  country?: string;
  year?: string;
  kind?: MovieKind;
  q?: string;
};

export type PlaybackDescriptor = {
  episodeId: string;
  type: 'hls' | 'mp4' | 'demo';
  url?: string;
  expiresAt?: string;
  sourceLabel: string;
};

import { describe, expect, it } from 'vitest';
import { isValidEmbedUrl, normalizeMovie } from '../src/lib/vsmov/normalizer';
import type { VsmovMovie } from '../src/lib/vsmov/types';

const movie = {
  _id: 2695,
  name: 'Người Sắt 3',
  origin_name: 'Iron Man 3',
  slug: 'nguoi-sat-3',
  content: 'Nội dung phim',
  type: 'single',
  status: 'completed',
  poster_url: 'https://vsmov.com/banner.jpg',
  thumb_url: 'https://vsmov.com/poster.jpg',
  trailer_url: null,
  time: '130',
  episode_current: 'Full',
  episode_total: '1',
  quality: 'HD',
  lang: 'Vietsub',
  notify: null,
  showtimes: null,
  year: 2013,
  keywords: [],
  view: 0,
  chieurap: false,
  sub_docquyen: false,
  actor: [],
  director: [],
  category: [],
  country: [],
  tmdb: { type: 'movie', id: null, season: null, vote_average: '6.9', vote_count: 10 },
  imdb: { id: null },
  created: { time: '' },
  modified: { time: '' },
} satisfies VsmovMovie;

describe('VSMOV normalizer', () => {
  it('maps poster_url to banner and thumb_url to poster', () => {
    const normalized = normalizeMovie(movie, [{
      server_name: 'Vietsub #1',
      server_data: [{
        name: 'Full',
        slug: 'tap-full',
        filename: 'Full',
        link_embed: 'https://v8.streamvsmov.com/video/iron-man-3',
      }],
    }]);

    expect(normalized.bannerUrl).toBe('https://vsmov.com/banner.jpg');
    expect(normalized.posterUrl).toBe('https://vsmov.com/poster.jpg');
    expect(normalized.allEpisodes[0]?.embedUrl).toBe('https://v8.streamvsmov.com/video/iron-man-3');
  });

  it('rejects deceptive embed hosts', () => {
    expect(isValidEmbedUrl('https://v6.streamvsmov.com/video/abc')).toBe(true);
    expect(isValidEmbedUrl('https://evilstreamvsmov.com/video')).toBe(false);
    expect(isValidEmbedUrl('https://streamvsmov.com/video')).toBe(true);
  });
});

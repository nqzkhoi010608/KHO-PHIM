import { describe, expect, it } from 'vitest';
import {
  getConfiguredVsmovSlugs,
  getVsmovSlug,
  toVsmovApiPath,
} from '../src/lib/demo-data/vsmov-sources';

describe('VSMOV source URLs', () => {
  it('accepts page URLs and API URLs as the same movie source', () => {
    expect(getVsmovSlug('https://vsmov.com/phim/nguoi-sat-3')).toBe('nguoi-sat-3');
    expect(getVsmovSlug('https://vsmov.com/api/phim/nguoi-sat-3')).toBe('nguoi-sat-3');
    expect(toVsmovApiPath('https://vsmov.com/phim/nguoi-sat-3')).toBe('/phim/nguoi-sat-3');
  });

  it('rejects non-VSMOV URLs instead of constructing an external API request', () => {
    expect(getVsmovSlug('https://example.com/phim/nguoi-sat-3')).toBeNull();
    expect(() => toVsmovApiPath('https://example.com/phim/nguoi-sat-3')).toThrow();
  });

  it('keeps the configured source list usable as route slugs', () => {
    const slugs = getConfiguredVsmovSlugs();
    expect(slugs).toContain('nguoi-sat-3');
    expect(slugs).toContain('lan-song-moi');
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('keeps the single data file limited to movie page URLs', async () => {
    const { VSMOV_SOURCE_URLS } = await import('../src/lib/demo-data/vsmov-sources');
    expect(VSMOV_SOURCE_URLS.every((url) => /^https:\/\/vsmov\.com\/phim\/[^/]+$/.test(url))).toBe(true);
    expect(VSMOV_SOURCE_URLS.some((url) => url.includes('/api/'))).toBe(false);
  });
});

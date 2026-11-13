import type { MetadataRoute } from 'next';
import { getConfiguredVsmovSlugs } from '@/lib/demo-data/vsmov-sources';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const movieSlugs = new Set(getConfiguredVsmovSlugs());

  return [
    { url: base, lastModified: new Date() },
    ...['phim-le', 'phim-bo', 'hoat-hinh', 'phim-chieu-rap', 'the-loai', 'tim-kiem', 'dang-nhap']
      .map((path) => ({ url: `${base}/${path}`, lastModified: new Date() })),
    ...Array.from(movieSlugs)
      .map((slug) => ({ url: `${base}/phim/${slug}`, lastModified: new Date() })),
  ];
}

import type { Metadata } from 'next';
import { SiteShell } from '@/components/site/site-shell';
import { genreList, countryList } from '@/lib/demo-data/movies';

export const metadata: Metadata = {
  title: { default: 'Kho Phim — Xem phim theo cách của bạn', template: '%s | Kho Phim' },
  description: 'Không gian xem phim tiếng Việt gọn gàng, nhanh và dễ dùng.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  openGraph: { type: 'website', title: 'Kho Phim', description: 'Không gian xem phim tiếng Việt gọn gàng, nhanh và dễ dùng.' },
};

export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell genreList={genreList} countryList={countryList}>{children}</SiteShell>;
}

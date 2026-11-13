import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';
import 'swiper/css/thumbs';
import './globals.css';

/**
 * Be Vietnam Pro — hỗ trợ tiếng Việt hoàn hảo, nhiều weight 100–900,
 * sắc nét trên mọi màn hình, cả normal lẫn italic.
 */
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: { default: 'Kho Phim', template: '%s · Kho Phim' },
  description: 'Không gian xem phim tiếng Việt chất lượng cao.',
  keywords: ['phim', 'xem phim online', 'phim bộ', 'phim lẻ', 'phim vietsub'],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body>{children}</body>
    </html>
  );
}

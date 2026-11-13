export type NavigationItem = {
  label: string;
  slug: string;
};

export const primaryNavigation: NavigationItem[] = [
  { label: 'Trang chủ', slug: '/' },
  { label: 'Phim lẻ', slug: '/phim-le' },
  { label: 'Phim bộ', slug: '/phim-bo' },
  { label: 'Hoạt hình', slug: '/hoat-hinh' },
];

export function getMovieWatchHref(movie: Movie): string {
  const episodeSlug = movie.firstEpisodeSlug ?? String(movie.seasons[0]?.episodes[0]?.number ?? 1);
  return `/xem-phim/${movie.slug}/${episodeSlug}`;
}

export const genreNavigation: NavigationItem[] = [
  { label: 'Hành Động', slug: 'hanh-dong' },
  { label: 'Cổ Trang', slug: 'co-trang' },
  { label: 'Chiến Tranh', slug: 'chien-tranh' },
  { label: 'Viễn Tưởng', slug: 'vien-tuong' },
  { label: 'Bí Ẩn', slug: 'bi-an' },
  { label: 'Âm Nhạc', slug: 'am-nhac' },
  { label: 'Tình Cảm', slug: 'tinh-cam' },
  { label: 'Tâm Lý', slug: 'tam-ly' },
  { label: 'Thể Thao', slug: 'the-thao' },
  { label: 'Phiêu Lưu', slug: 'phieu-luu' },
  { label: 'Kinh Dị', slug: 'kinh-di' },
  { label: 'Hoạt Hình', slug: 'hoat-hinh' },
  { label: 'Học Đường', slug: 'hoc-duong' },
  { label: 'Hài Hước', slug: 'hai-huoc' },
  { label: 'Hình Sự', slug: 'hinh-su' },
  { label: 'Võ Thuật', slug: 'vo-thuat' },
  { label: 'Khoa Học', slug: 'khoa-hoc' },
  { label: 'Chính Kịch', slug: 'chinh-kich' },
  { label: 'Gia Đình', slug: 'gia-dinh' },
  { label: 'Lãng Mạn', slug: 'lang-man' },
];

export const countryNavigation: NavigationItem[] = [
  { label: 'Trung Quốc', slug: 'trung-quoc' },
  { label: 'Thái Lan', slug: 'thai-lan' },
  { label: 'Hồng Kông', slug: 'hong-kong' },
  { label: 'Pháp', slug: 'phap' },
  { label: 'Nga', slug: 'nga' },
  { label: 'Đức', slug: 'duc' },
  { label: 'Thổ Nhĩ Kỳ', slug: 'tho-nhi-ky' },
  { label: 'Brazil', slug: 'brazil' },
  { label: 'Hàn Quốc', slug: 'han-quoc' },
  { label: 'Âu Mỹ', slug: 'au-my' },
  { label: 'Ấn Độ', slug: 'an-do' },
  { label: 'Canada', slug: 'canada' },
  { label: 'Philippines', slug: 'philippines' },
  { label: 'Tây Ban Nha', slug: 'tay-ban-nha' },
  { label: 'Indonesia', slug: 'indonesia' },
  { label: 'Hà Lan', slug: 'ha-lan' },
  { label: 'Nhật Bản', slug: 'nhat-ban' },
  { label: 'Đài Loan', slug: 'dai-loan' },
  { label: 'Anh', slug: 'anh' },
  { label: 'Việt Nam', slug: 'viet-nam' },
  { label: 'Úc', slug: 'uc' },
  { label: 'Ý', slug: 'y' },
  { label: 'Malaysia', slug: 'malaysia' },
];

export const navigationGroups = [
  { label: 'Thể loại', href: '/the-loai', items: genreNavigation },
  { label: 'Quốc gia', href: '/quoc-gia', items: countryNavigation },
] as const;
import type { Movie } from '@/types/catalog';


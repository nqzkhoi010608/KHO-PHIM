/**
 * Taxonomy dùng cho menu và bộ lọc.
 * Metadata phim không được lưu ở đây; phim production lấy từ VSMOV.
 */
export const genreList = [
  { name: 'Hành Động', slug: 'hanh-dong' },
  { name: 'Cổ Trang', slug: 'co-trang' },
  { name: 'Chiến Tranh', slug: 'chien-tranh' },
  { name: 'Viễn Tưởng', slug: 'vien-tuong' },
  { name: 'Bí Ẩn', slug: 'bi-an' },
  { name: 'Âm Nhạc', slug: 'am-nhac' },
  { name: 'Tình Cảm', slug: 'tinh-cam' },
  { name: 'Tâm Lý', slug: 'tam-ly' },
  { name: 'Thể Thao', slug: 'the-thao' },
  { name: 'Phiêu Lưu', slug: 'phieu-luu' },
  { name: 'Kinh Dị', slug: 'kinh-di' },
  { name: 'Hoạt Hình', slug: 'hoat-hinh' },
  { name: 'Học Đường', slug: 'hoc-duong' },
  { name: 'Hài Hước', slug: 'hai-huoc' },
  { name: 'Hình Sự', slug: 'hinh-su' },
  { name: 'Võ Thuật', slug: 'vo-thuat' },
  { name: 'Khoa Học', slug: 'khoa-hoc' },
  { name: 'Chính Kịch', slug: 'chinh-kich' },
  { name: 'Gia Đình', slug: 'gia-dinh' },
  { name: 'Lãng Mạn', slug: 'lang-man' },
];

export const countryList = [
  { name: 'Trung Quốc', slug: 'trung-quoc' },
  { name: 'Thái Lan', slug: 'thai-lan' },
  { name: 'Hồng Kông', slug: 'hong-kong' },
  { name: 'Pháp', slug: 'phap' },
  { name: 'Nga', slug: 'nga' },
  { name: 'Đức', slug: 'duc' },
  { name: 'Thổ Nhĩ Kỳ', slug: 'tho-nhi-ky' },
  { name: 'Brazil', slug: 'brazil' },
  { name: 'Hàn Quốc', slug: 'han-quoc' },
  { name: 'Âu Mỹ', slug: 'au-my' },
  { name: 'Ấn Độ', slug: 'an-do' },
  { name: 'Canada', slug: 'canada' },
  { name: 'Philippines', slug: 'philippines' },
  { name: 'Tây Ban Nha', slug: 'tay-ban-nha' },
  { name: 'Indonesia', slug: 'indonesia' },
  { name: 'Hà Lan', slug: 'ha-lan' },
  { name: 'Nhật Bản', slug: 'nhat-ban' },
  { name: 'Đài Loan', slug: 'dai-loan' },
  { name: 'Anh', slug: 'anh' },
  { name: 'Việt Nam', slug: 'viet-nam' },
  { name: 'Úc', slug: 'uc' },
  { name: 'Ý', slug: 'y' },
  { name: 'Malaysia', slug: 'malaysia' },
];

export const genres = genreList.map((g) => g.name);
export const countries = countryList.map((c) => c.name);
export const years = ['2025', '2024', '2023', '2022'];

export function getGenreBySlug(slug: string) {
  return genreList.find((g) => g.slug === decodeURIComponent(slug));
}

export function getCountryBySlug(slug: string) {
  return countryList.find((c) => c.slug === decodeURIComponent(slug));
}

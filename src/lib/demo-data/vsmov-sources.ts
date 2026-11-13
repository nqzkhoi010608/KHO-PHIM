/**
 * Danh sách nguồn phim duy nhất cần chỉnh khi thêm phim.
 *
 * Đây là file dữ liệu nguồn duy nhất: chỉ cần thêm URL trang phim /phim/....
 * Adapter VSMOV tự rút slug và gọi API tương ứng ở server.
 */
export const VSMOV_SOURCE_URLS = [
  'https://vsmov.com/phim/ikakasa',
  'https://vsmov.com/phim/tran-chien-bien-gioi',
  'https://vsmov.com/phim/su-den-cua-tuong-lai',
  'https://vsmov.com/phim/cha-me-chi-va-em',
  'https://vsmov.com/phim/%E3%82%A2%E3%83%95%E3%82%BF%E3%83%BC%E3%83%BB%E3%82%B6%E3%83%BB%E3%82%AF%E3%82%A8%E3%82%A4%E3%82%AF',
  'https://vsmov.com/phim/khach-san-ma-am',
  'https://vsmov.com/phim/chan-dung-nguoi-nghe-si',
  'https://vsmov.com/phim/lanh-tu-nhan-dan',
  'https://vsmov.com/phim/tron-tro-choi-ao-giac',
  'https://vsmov.com/phim/quy-ong-tinh-anh',
  'https://vsmov.com/phim/tro-choi-ao-giac-ke-thua',
  'https://vsmov.com/phim/120-dung-si',
  'https://vsmov.com/phim/stray-kids-trai-nghiem-thong-linh',
  'https://vsmov.com/phim/papeles',
  'https://vsmov.com/phim/ke-dam-len',
  'https://vsmov.com/phim/doc-to',
  'https://vsmov.com/phim/lao-luyen',
  'https://vsmov.com/phim/lan-song-moi',
  'https://vsmov.com/phim/ai-con-lang-nghe',
  'https://vsmov.com/phim/the-demoness',
  'https://vsmov.com/phim/lam-anh-dien',
  'https://vsmov.com/phim/the-cleaners',
  'https://vsmov.com/phim/diep-vien-xxx',
  'https://vsmov.com/phim/nguoi-sat-3',
  'https://vsmov.com/phim/nguoi-hung-bao-thu',
  'https://vsmov.com/phim/baahubali-su-thi',
  'https://vsmov.com/phim/lang-lang-doi-nguoi',
  'https://vsmov.com/phim/quai-thu-vo-hinh',
  'https://vsmov.com/phim/the-gioi-ngam',
  'https://vsmov.com/phim/thi-tham-voi-em',
  'https://vsmov.com/phim/co-be-amelie-va-tinh-cach-cua-mua',
  'https://vsmov.com/phim/suong-mu-chien-tranh',
  'https://vsmov.com/phim/dau-truong-sinh-tu-6',
  'https://vsmov.com/phim/nhin-vao-mat-troi',
  'https://vsmov.com/phim/chuyen-tau-chim-ung',
  'https://vsmov.com/phim/muoi-mot-ten-trom-the-ky',
  'https://vsmov.com/phim/hanya-namamu-dalam-doaku',
  'https://vsmov.com/phim/melania',
  'https://vsmov.com/phim/dac-vu-sieu-hai',
  'https://vsmov.com/phim/bao-thu',
  'https://vsmov.com/phim/vo-boc-ma',
  'https://vsmov.com/phim/quai-thu-vo-hinh-2',
  'https://vsmov.com/phim/qua-nhanh-qua-nguy-hiem',
  'https://vsmov.com/phim/chien-dich-phuong-hoang',
  'https://vsmov.com/phim/tro-ve-tuong-lai-2',
  'https://vsmov.com/phim/haqi',
  'https://vsmov.com/phim/nguoi-thoi-thuy-tinh',
  'https://vsmov.com/phim/nguoi-phu-nu-ciociaria',
  'https://vsmov.com/phim/hanh-trinh-tinh-ban',
  'https://vsmov.com/phim/dao-kinh-hoang',
  'https://vsmov.com/phim/bi-mat-sau-bua-tiec',
  'https://vsmov.com/phim/ke-lua-dao-paris-doi-tra-va-am-thuc',
  'https://vsmov.com/phim/minions',
  'https://vsmov.com/phim/vuong-quoc-thien-duong',
  'https://vsmov.com/phim/giant',
  'https://vsmov.com/phim/thay-phu-thuy',
  'https://vsmov.com/phim/indiana-jones-va-cuoc-thap-tu-chinh-cuoi-cung',
  'https://vsmov.com/phim/el-talento',
  'https://vsmov.com/phim/hay-dung-ben-toi',
  'https://vsmov.com/phim/cat-ngon-thu-hai',
  'https://vsmov.com/phim/vui-buon-tieng-cuoi',
  'https://vsmov.com/phim/tam-trang-khi-yeu',
  'https://vsmov.com/phim/tam-than-hoang-loan',
  'https://vsmov.com/phim/phim-kinh-di-hai-my',
  'https://vsmov.com/phim/diep-huyet-nhai-dau',
  'https://vsmov.com/phim/cuoc-doi-cua-amelie-poulain',
  'https://vsmov.com/phim/tro-ve-tuong-lai-3',
  'https://vsmov.com/phim/cong-ty-quai-vat',
  'https://vsmov.com/phim/10-buoc-nhay-tinh-yeu',
  'https://vsmov.com/phim/duong-dau-thu-thach-2-kho-chet-hon',
  'https://vsmov.com/phim/taylor-swift-hanh-trinh-cac-ky-nguyen-buoi-dien-be-mac',
  'https://vsmov.com/phim/transformers-bai-binh-phuc-han',
  'https://vsmov.com/phim/ke-mong-du',
  'https://vsmov.com/phim/nhung-chang-trai-doc-ac',
  'https://vsmov.com/phim/sat-thu-chuyen-nghiep',
  'https://vsmov.com/phim/phim-kinh-di-hai-my-2',
  'https://vsmov.com/phim/cau-be-nguoi-ngoai-hanh-tinh',
  'https://vsmov.com/phim/diep-vien-khong-khong-thay',
  'https://vsmov.com/phim/ho-du',
  'https://vsmov.com/phim/49-ngay-dinh-menh',
  'https://vsmov.com/phim/thanh-guom-diet-quy-chuyen-tau-vo-tan',
  'https://vsmov.com/phim/kampung-jabang-mayit-ritual-maut',
  'https://vsmov.com/phim/lich-su-am-thanh',
  'https://vsmov.com/phim/phim-kinh-di-hai-my-6',
  'https://vsmov.com/phim/sieu-diep-vien-2-quyen-luc-cua-bourne',
  'https://vsmov.com/phim/500-ngay-yeu',
  'https://vsmov.com/phim/them-vai-do-le',
  'https://vsmov.com/phim/co-dau-cong-chua',
  'https://vsmov.com/phim/mot-phat-sung-trong-bong-toi',
  'https://vsmov.com/phim/cheburashka-2',
  'https://vsmov.com/phim/khong-bong-tuyet-nao-trong-sach',
  'https://vsmov.com/phim/memories',
  'https://vsmov.com/phim/em-yeu',
  'https://vsmov.com/phim/joe-be',
  'https://vsmov.com/phim/biet-doi-san-ma',
  'https://vsmov.com/phim/cuoc-hen-mua-he',
  'https://vsmov.com/phim/dinh-menh',
  'https://vsmov.com/phim/nu-anh-hung',
  'https://vsmov.com/phim/twenty-one-pilots-vuot-xa-tuong-tuong',
  'https://vsmov.com/phim/anh-duong-vinh-cuu-cua-tam-hon-thanh-khiet',
  'https://vsmov.com/phim/5-centimet-moi-giay',
  'https://vsmov.com/phim/xu-so-cac-nguyen-to',
  'https://vsmov.com/phim/indiana-jones-va-ngoi-den-tan-khoc',
  'https://vsmov.com/phim/loi-song-truy-lac',
  'https://vsmov.com/phim/o-nha-mot-minh-2-lac-o-new-york',
  'https://vsmov.com/phim/tu-hoang-hon-toi-binh-minh',
  'https://vsmov.com/phim/nhung-ga-trai-hu-choi-hay-bi-xoi',
  'https://vsmov.com/phim/vui-du-chua',
  'https://vsmov.com/phim/charlie-chu-cho-than-ky',
  'https://vsmov.com/phim/paris-o-texas',
  'https://vsmov.com/phim/chu-he-trong-canh-dong-ngo',
  'https://vsmov.com/phim/thi-tran-phu-tuyet-normal',
  'https://vsmov.com/phim/sau-cuoc-san-lung',
  'https://vsmov.com/phim/anh-hung-cui-bap',
  'https://vsmov.com/phim/marco',
  'https://vsmov.com/phim/x-men-2-lien-minh-di-nhan',
  'https://vsmov.com/phim/diep-vu-kep',
  'https://vsmov.com/phim/sat-thu-truy-duoi',
  'https://vsmov.com/phim/look-back-lieu-ta-co-dam-nhin-lai',
  'https://vsmov.com/phim/am-anh-kinh-hoang',
  'https://vsmov.com/phim/huong-ve-nha',
  'https://vsmov.com/phim/cuop-bien-vung-caribbean-salazar-bao-thu',
  'https://vsmov.com/phim/cuoc-di-chuyen-vi-dai',
  'https://vsmov.com/phim/no-le-cua-ma-do-tinh-binh-phan-2',
  'https://vsmov.com/phim/no-le-cua-ma-do-tinh-binh-phan-1',
  'https://vsmov.com/phim/phan-1',
  'https://vsmov.com/phim/loi-cua-anh-loi-cua-co-phan-1',
  'https://vsmov.com/phim/cau-be-mat-tich-phan-5',
  'https://vsmov.com/phim/cau-be-mat-tich-phan-4',
  'https://vsmov.com/phim/cau-be-mat-tich-phan-3',
  'https://vsmov.com/phim/cau-be-mat-tich-phan-2',
  'https://vsmov.com/phim/chu-thuat-hoi-chien',
  'https://vsmov.com/phim/nhung-ke-lang-thang-rung-sau-2',
  'https://vsmov.com/phim/cuoc-chien-duoi-thap-co',
  'https://vsmov.com/phim/chuot-tui',
  'https://vsmov.com/phim/nhung-con-nguoi-nghiem-tuc',
  'https://vsmov.com/phim/nguoi-dan-ong-ireland',
  'https://vsmov.com/phim/cuoc-chien-song-con',
  'https://vsmov.com/phim/loi-cua-chung-ta',
  'https://vsmov.com/phim/cong-chua-da-do',
  'https://vsmov.com/phim/cong-vien-ky-jura-2-the-gioi-bi-mat',
  'https://vsmov.com/phim/nhung-dieu-toi-nghiep',
  'https://vsmov.com/phim/kim-cuong-trong-da',
  'https://vsmov.com/phim/ke-thao-tung-mang-xa-hoi-2',
  'https://vsmov.com/phim/toi-robot',
  'https://vsmov.com/phim/vo-dai-dam-mau',
  'https://vsmov.com/phim/soc-sieu-quay-soc-chuot-du-hi',
  'https://vsmov.com/phim/heer-express',
  'https://vsmov.com/phim/gan-thang-chin',
  'https://vsmov.com/phim/pamali-le-vat-kinh-hoang',
  'https://vsmov.com/phim/anh-khong-dau',
  'https://vsmov.com/phim/hoi-khac-mong-tao-chay',
  'https://vsmov.com/phim/thay-thuoc-ii',
  'https://vsmov.com/phim/quai-vat-godzilla',
  'https://vsmov.com/phim/8-phu-nu-va-mot-nua',
  'https://vsmov.com/phim/con-ac-mong-tu-nguoi-huong-dan-dien-xuat',
  'https://vsmov.com/phim/dong-co-la-pampa',
  'https://vsmov.com/phim/cau-chuyen-bat-tan',
  'https://vsmov.com/phim/sat-nhan-tuc-thi',
  'https://vsmov.com/phim/bon-nguoi-long-lay',
  'https://vsmov.com/phim/tam-biet-jean-pat',
  'https://vsmov.com/phim/dua-con-cua-thoi-tiet',
  'https://vsmov.com/phim/ma-cay',
  'https://vsmov.com/phim/gak-nyangka',
  'https://vsmov.com/phim/cong-chua-toc-may',
  'https://vsmov.com/phim/morgan-bup-be-sat-nhan',
  'https://vsmov.com/phim/thoi-dai-cuong-da',
  'https://vsmov.com/phim/quy-tha-ma-bat',
  'https://vsmov.com/phim/dao-hai-tac-phan-1',
  'https://vsmov.com/phim/ga-he-ma-quai-chao-mung-den-derry-phan-1',
  'https://vsmov.com/phim/kiem-com-bang-tro-choi-sinh-tu-phan-1',
  'https://vsmov.com/phim/ke-lac-loai-pluribus-phan-1',
] as const;

const VSMOV_HOST = 'vsmov.com';
const VSMOV_MOVIE_PATH = /^\/(?:api\/)?phim\/([^/]+)\/?$/;

/** Rút slug từ URL trang phim, URL API hoặc slug thuần. */
export function getVsmovSlug(input: string): string | null {
  const value = input.trim();
  if (!value) return null;

  let pathname = value;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.hostname !== VSMOV_HOST) return null;
    pathname = url.pathname;
  } catch {
    pathname = value.startsWith('/') ? value : `/phim/${value}`;
  }

  const match = pathname.match(VSMOV_MOVIE_PATH);
  return match ? decodeURIComponent(match[1]) : null;
}

/** Chuyển mọi dạng input về path API nội bộ, không lộ URL nguồn ra client. */
export function toVsmovApiPath(input: string): string {
  const slug = getVsmovSlug(input);
  if (!slug) throw new Error(`URL VSMOV không hợp lệ: ${input}`);
  return `/phim/${encodeURIComponent(slug)}`;
}

export function getConfiguredVsmovSlugs(): string[] {
  return VSMOV_SOURCE_URLS
    .map(getVsmovSlug)
    .filter((slug): slug is string => Boolean(slug));
}

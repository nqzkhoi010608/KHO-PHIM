# VSMOV URL-driven catalogue

## Mục tiêu

Cho phép quản trị viên chỉ cần thêm URL phim VSMOV vào một file dữ liệu, ví dụ:

```text
https://vsmov.com/phim/nguoi-sat-3
```

Website tự rút slug, gọi API tương ứng:

```text
https://vsmov.com/api/phim/nguoi-sat-3
```

Sau đó tự hiển thị catalogue, trang chi tiết, danh sách tập và player từ dữ liệu API. Không nhập thủ công từng trường metadata vào code.

## Phạm vi

- Nguồn phim duy nhất: `src/lib/demo-data/vsmov-sources.ts`.
- Chấp nhận cả URL trang `/phim/{slug}` và URL `/api/phim/{slug}`; hai dạng cho cùng một slug.
- Dữ liệu catalogue được lấy server-side từ VSMOV và cache bằng cơ chế `fetch`/ISR của Next.
- Trang chi tiết dùng dữ liệu normalized từ API.
- Trang xem phim dùng `episodes[].server_data[].link_embed` sau khi validate HTTPS và host phát hợp lệ.
- Ảnh dùng đúng ngữ nghĩa API: `poster_url` là banner/backdrop, `thumb_url` là poster/card.
- Không đưa URL API nguồn vào client bundle hoặc các payload UI không cần thiết.

Không nằm trong phạm vi:

- Bypass DRM, paywall, CAPTCHA hoặc cơ chế bảo vệ của bên thứ ba.
- Proxy/giấu tuyệt đối URL phát video. Trình duyệt vẫn phải nhận URL `link_embed` để iframe phát được.
- Nhập dữ liệu qua admin database hoặc tạo cron sync bắt buộc.

## Kiến trúc và data flow

```text
VSMOV_SOURCE_URLS
        |
        v
parse URL -> slug -> /api/phim/{slug}
        |
        v
server fetch + timeout/retry + Next cache
        |
        v
normalize movie, images, taxonomy, episodes
        |
        +--> catalogue cards / homepage
        +--> /phim/[slug]
        +--> /xem-phim/[slug]/[episode]
                         |
                         v
                    link_embed iframe
```

### Source parser

Tạo helper chuẩn hóa URL với các trách nhiệm:

1. Chỉ chấp nhận `https://vsmov.com/phim/{slug}` hoặc `https://vsmov.com/api/phim/{slug}`.
2. Rút slug an toàn, decode một lần và encode lại khi tạo API path.
3. Từ mọi dạng input tạo ra path nội bộ `/phim/{slug}` để ghép với server-only API base.
4. Loại bỏ URL sai host/path trước khi gọi mạng.

### Server catalogue repository

Repository mới sẽ đọc danh sách source, fetch các detail API song song bằng `Promise.allSettled`, sau đó:

- giữ các phim fetch thành công;
- bỏ qua từng source lỗi thay vì làm hỏng toàn bộ trang;
- ghi log server ngắn gọn không chứa URL phát, token hoặc dữ liệu nhạy cảm;
- dùng cache/revalidate theo từng request API, không cache toàn bộ catalogue bằng một request không kiểm soát.

Trang detail vẫn có thể fetch trực tiếp theo slug để URL phim mới hoạt động ngay cả khi chưa xuất hiện trong homepage cache.

### Normalized model

Tên field nội bộ phải phản ánh đúng ý nghĩa:

- `bannerUrl`: `movie.poster_url` hoặc `item.poster_url`.
- `posterUrl`: `movie.thumb_url` hoặc `item.thumb_url`.
- `embedUrl`: `episode.link_embed` sau khi validate.
- các field còn lại lấy từ response API và dùng giá trị rỗng/an toàn khi optional.

Các component không đọc raw API shape; chỉ nhận normalized model.

## Route và giao diện

- `/phim/[slug]`: hero dùng `bannerUrl`, poster dùng `posterUrl`, metadata và episode selector lấy từ cùng một normalized movie.
- `/xem-phim/[slug]/[episode]`: tìm đúng episode slug, truyền `embedUrl` cho player, hiển thị prev/next và danh sách server.
- Dynamic `params` và `searchParams` dùng kiểu Promise tương thích Next 16.
- Slug phim không tồn tại dùng `notFound()`; lỗi mạng/API hiển thị error state và không giả dạng 404.
- URL source mới trong file được đưa vào sitemap.

## Xử lý lỗi và cache

- 404 từ VSMOV: source đó không có trong catalogue; detail route trả not-found.
- Timeout/network/HTTP 5xx: retry giới hạn; catalogue bỏ qua source lỗi, detail route dùng error boundary phù hợp.
- JSON/shape không hợp lệ: không render card thiếu dữ liệu quan trọng; log mã lỗi tối giản ở server.
- Không có episode hợp lệ: detail vẫn hiển thị metadata, CTA báo chưa có nguồn phát.
- `link_embed` không phải HTTPS hoặc không thuộc host cho phép: không render iframe.
- Thời gian cache đề xuất: detail 5 phút, listing/catalogue source 5 phút.

## Bảo mật và giới hạn mã hóa

- Base API và source URL chỉ được dùng trong server repository.
- Không đưa danh sách API source vào client component, sitemap chỉ phát hành URL nội bộ của website.
- Không ghi `link_embed`, signed URL, cookie hoặc secret vào log.
- Không tuyên bố mã hóa URL phát tuyệt đối: iframe/client network phải biết URL phát. Có thể tiếp tục giảm lộ nguồn bằng server-side fetch/tokenization trong phạm vi nguồn cho phép, nhưng đó là phần mở rộng riêng.

## Kiểm thử và tiêu chí nghiệm thu

Unit tests:

- page URL và API URL cùng rút ra một slug;
- URL sai host/path bị từ chối;
- mapping `poster_url` → banner và `thumb_url` → poster;
- `link_embed` hợp lệ được giữ, URL không hợp lệ bị loại;
- catalogue partial failure vẫn trả các phim thành công.

Route/build checks:

- `/phim/nguoi-sat-3` render metadata từ API mà không cần khai báo từng field;
- CTA dẫn tới `/xem-phim/nguoi-sat-3/{episode}`;
- player dùng đúng `link_embed`;
- URL thêm mới trong source file xuất hiện trong sitemap và có detail route;
- `typecheck`, tests và production build đều thành công.


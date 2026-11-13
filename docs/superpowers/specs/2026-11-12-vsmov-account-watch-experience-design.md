# VSMOV account and watch experience

## Mục tiêu

Hoàn thiện trải nghiệm xem phim VSMOV theo hướng premium: người dùng đăng nhập để lưu phim yêu thích và tiến trình xem theo tài khoản; trang chi tiết và trang xem phim có hierarchy rõ ràng; ảnh dùng đúng semantic mapping từ API.

## Data contract

- File nguồn phim: `src/lib/demo-data/vsmov-sources.ts`.
- `poster_url` của API được normalize thành `bannerUrl` và dùng cho hero/header.
- `thumb_url` được normalize thành `posterUrl` và dùng cho card/poster.
- `episodes[].server_data[].link_embed` được normalize thành `embedUrl` và truyền vào iframe player sau khi kiểm tra HTTPS và hostname `streamvsmov.com`.
- Không nhập thủ công metadata, ảnh, tập hoặc link phát.

## Account and persistence

Catalogue VSMOV hiện lấy trực tiếp từ API và không đảm bảo mỗi phim đã có UUID trong bảng `movies`. Vì vậy thêm hai bảng Supabase theo định danh ổn định từ VSMOV:

### `user_favorite_movies`

- `user_id` tham chiếu `auth.users`.
- `movie_slug` text.
- snapshot tối thiểu `movie_title`, `poster_url`, `banner_url` để render danh sách khi API tạm lỗi.
- `created_at`, khóa chính `(user_id, movie_slug)`.
- RLS: user chỉ select/insert/delete row của chính mình.

### `user_watch_progress`

- `user_id` tham chiếu `auth.users`.
- `movie_slug`, `episode_slug` text.
- `episode_name`, `seconds_watched`, `duration_seconds`, `updated_at`.
- khóa chính `(user_id, movie_slug, episode_slug)`.
- RLS: user chỉ select/insert/update/delete row của chính mình.

API routes dùng cookie Supabase server session, validate payload bằng Zod, trả `401 AUTH_REQUIRED` khi chưa đăng nhập. Favorite API hỗ trợ GET trạng thái, POST lưu và DELETE bỏ lưu. Progress API hỗ trợ GET theo movie/episode và POST upsert.

## Auth behavior

- Nút lưu phim gọi API; nếu trả `401`, điều hướng đến `/dang-nhap?next=<current-path>`.
- OAuth callback giữ `next` an toàn trong cùng origin và quay lại trang trước đó.
- Không coi trạng thái client là quyền truy cập; mọi ghi dữ liệu đều kiểm tra session ở server.
- Khi Supabase chưa cấu hình, giao diện hiển thị thông báo cấu hình thay vì giả vờ đã lưu.

## Progress behavior and iframe boundary

`link_embed` là iframe khác origin. Parent page không thể đọc `currentTime` trực tiếp. Player sẽ:

1. GET progress sau khi mount.
2. Khi iframe load, gửi message resume có origin đích là hostname embed.
3. Lắng nghe message progress từ iframe với schema cho phép (`type`, `currentTime`, `duration`).
4. Chỉ nhận message từ đúng `streamvsmov.com` hoặc subdomain HTTPS.
5. Upsert progress tối đa mỗi 15 giây, khi pause/visibility hidden và khi kết thúc.
6. Nếu embed không hỗ trợ postMessage, lưu trạng thái đã bắt đầu tập nhưng không tuyên bố resume chính xác theo giây.

Không dùng cross-origin DOM access, không bypass DRM và không ghi URL embed vào log.

## UI direction

### Detail page

- Hero banner rõ hơn, overlay tối vừa đủ để giữ chi tiết ảnh.
- Cột poster cố định tỷ lệ, cạnh phải là title, original title, rating, badges và CTA.
- Phần dưới chia thành panel nội dung/metadata và panel trạng thái/tập.
- CTA dùng episode slug thật, không hard-code `/1`.
- Favorite button có trạng thái loading/saved/auth-required rõ ràng.

### Watch page

- Player là vùng chính, tỷ lệ 16:9, header nhỏ chứa tên phim/tập và nút quay lại.
- Sidebar tập/server có trạng thái active, cuộn độc lập.
- Hiển thị banner nhỏ và thông tin tập bên dưới player, cùng hint “đang đồng bộ tiến trình” khi user đã đăng nhập.
- Responsive: sidebar chuyển xuống dưới player trên mobile.
- Focus state, contrast và reduced motion được giữ theo design system hiện tại.

## Verification

- Unit test mapping poster/banner/embed và payload slug.
- API route test cho unauthenticated 401 và validation.
- Test helper auth redirect giữ `next` cùng-origin.
- Typecheck, test suite và production build.
- Lint các file mới/chạm vào; ghi nhận riêng lint lỗi cũ ngoài phạm vi nếu còn.


# Kho Phim — Kiến trúc sản phẩm và thiết kế kỹ thuật

Ngày: 2026-11-10  
Trạng thái: Đã duyệt trong cuộc trao đổi thiết kế  
Phạm vi: vertical slice có thể chạy ngay bằng dữ liệu demo, sẵn sàng bật Supabase và VSMOV bằng biến môi trường.

## 1. Mục tiêu và nguyên tắc

Kho Phim là nền tảng xem phim tiếng Việt, ưu tiên trải nghiệm desktop, tablet, mobile và Smart TV. Sản phẩm cần có giao diện dark mode cao cấp, điều hướng rõ, tải nhanh, phản hồi tốt khi dữ liệu ngoài lỗi và một khu vực quản trị tách biệt về layout lẫn quyền truy cập.

Các nguyên tắc bắt buộc:

- Không sao chép mã nguồn, logo, nội dung, hình ảnh hoặc nhận diện của website tham khảo.
- Không gọi VSMOV trực tiếp từ component giao diện; mọi truy cập đi qua server adapter.
- Không coi việc che URL video trong trình duyệt là bảo vệ tuyệt đối; chỉ giảm lộ nguồn trong giới hạn hợp pháp.
- Không lưu mật khẩu plaintext, secret, service key hoặc OTP plaintext.
- Không cho phép client tự ghi role, quyền admin, audit log hoặc trường nhạy cảm.
- Có fallback demo để app vẫn hiển thị được khi Supabase/VSMOV chưa cấu hình hoặc đang lỗi.
- Ưu tiên server rendering cho catalogue và chi tiết phim; các phần tương tác nặng được tải động.

## 2. Phạm vi giai đoạn đầu

Giai đoạn đầu cung cấp:

- App Router Next.js + TypeScript + Tailwind CSS.
- Route người dùng cho trang chủ, catalogue, thể loại, quốc gia, tìm kiếm, chi tiết, xem phim, tài khoản, lịch sử, yêu thích và đăng nhập.
- Route admin riêng với dashboard, phim, tập, danh mục, người dùng, đồng bộ, audit log, settings và invitations.
- Dữ liệu demo chuẩn hóa trong một catalog domain model.
- Adapter VSMOV server-only với timeout, cache, retry exponential backoff, schema validation và upsert contract.
- Supabase client/server boundary, migration và RLS cho các bảng cốt lõi.
- Auth Google OAuth theo Supabase; invitation và role guard cho admin.
- Watch progress, favorites và history với server mutations.
- Player HLS/HTML5 tải manifest qua route server; không đưa URL nguồn phát gốc vào UI không cần thiết.
- Metadata SEO, sitemap, robots, error boundary, loading state và checklist triển khai.
- Test contract, test quyền, test RLS, test rate limit và smoke test route/responsive.

Chưa coi là hoàn tất trong giai đoạn đầu nếu thiếu provider thật:

- Gửi email OTP thực tế.
- Signed URL hoặc proxy HLS production.
- Watermark phiên hoặc DRM.
- Đồng bộ cron production.

Các phần này có interface và cấu hình rõ để bật sau, nhưng không giả lập như tính năng bảo mật thật nếu thiếu secret/provider.

## 3. Lựa chọn kỹ thuật

### 3.1 Ứng dụng

- Next.js App Router và TypeScript.
- Server Components mặc định cho trang đọc dữ liệu.
- Client Components chỉ cho search interaction, filters, favorite button, player, progress tracking và admin controls.
- Tailwind CSS với design tokens trong CSS variables.
- Lucide React cho icon, không dùng icon Unicode để biểu đạt hành động.
- React Hook Form + Zod cho form và validation.
- Video.js hoặc HTML5 HLS phù hợp môi trường; player được dynamic import để không tăng bundle ban đầu.

### 3.2 Tổ chức mã nguồn

```text
src/
  app/
    (site)/...
    (admin)/admin/...
    api/...
  components/
    site/
    admin/
    shared/
  lib/
    auth/
    catalog/
    demo-data/
    security/
    supabase/
    vsmov/
  hooks/
  types/
supabase/
  migrations/
  seed.sql
tests/
docs/
```

`catalog` là domain boundary: UI chỉ nhận kiểu dữ liệu chuẩn hóa, không phụ thuộc tên field hoặc cấu trúc JSON riêng của VSMOV.

### 3.3 Layout và ngôn ngữ hình ảnh

Hệ màu chính:

- `#080A0C`: nền toàn app.
- `#11161A`: mặt phẳng panel và card.
- `#E7EDF2`: chữ chính.
- `#9AA6B2`: chữ phụ.
- `#F04438`: accent điện ảnh và trạng thái hành động.
- `#263038`: đường viền và divider.

Hero dùng artwork ngang, lớp phủ màu đặc và khung cắt rõ; không dùng mesh gradient, blob gradient hoặc gradient loang. Card phim dùng tỷ lệ poster cố định, `object-fit: cover`, nhãn chất lượng nhỏ và hover/focus nhẹ. Border radius dùng tiết chế cho control và panel; không bo mọi khối như card.

Typography ưu tiên một sans-serif hỗ trợ tiếng Việt đầy đủ, với cấp độ rõ ràng cho heading, body và metadata. Các nhãn dùng sentence case. Focus ring luôn nhìn thấy trên nền tối.

Responsive rules:

- Desktop: header đầy đủ, grid nhiều cột và rails ngang.
- Tablet: giảm số cột, giữ header rút gọn và filter dễ chạm.
- Mobile: search toàn màn hình, bottom navigation, card rail cuộn ngang, hit-area tối thiểu 44px.
- Smart TV: focus order tuyến tính, control lớn, không phụ thuộc hover, hỗ trợ keyboard/remote.

## 4. Routing và server boundaries

### 4.1 Khu vực người dùng

```text
/
/phim-le
/phim-bo
/hoat-hinh
/phim-chieu-rap
/the-loai/[slug]
/quoc-gia/[slug]
/tim-kiem
/phim/[slug]
/xem-phim/[slug]/[episode]
/tai-khoan
/lich-su-xem
/phim-yeu-thich
/dang-nhap
```

Catalogue và detail được server-rendered. Player, favorite, progress và filters là các client island độc lập. `notFound()` dùng cho slug không tồn tại; error boundary hiển thị thông báo hành động được.

### 4.2 Khu vực admin

```text
/admin/login
/admin
/admin/movies
/admin/movies/[id]
/admin/episodes
/admin/categories
/admin/users
/admin/sync
/admin/audit-logs
/admin/settings
/admin/invitations
```

Admin layout không dùng chung navigation của khu vực xem phim. Middleware chặn request không có session hợp lệ; server guard kiểm tra invitation/role lần nữa trước mọi read/write nhạy cảm. UI guard chỉ là lớp trải nghiệm, không phải lớp bảo mật.

### 4.3 API/server actions

- `GET /api/watch/[movieSlug]/[episode]`: kiểm tra quyền và trả playback descriptor đã rút gọn.
- `POST /api/watch-progress`: server validate user/session, chỉ ghi user hiện tại.
- `POST /api/favorites`: server validate user/session.
- `POST /api/admin/sync`: admin role guard, idempotency và audit log.
- `POST /api/admin/otp/request` và `POST /api/admin/otp/verify`: rate limit, hash OTP, expiry, one-time use.

Mọi mutation server phải xác thực session, validate input bằng Zod, ghi audit log phù hợp và không serialize secret về client.

## 5. Domain model và dữ liệu

Các bảng Supabase:

- `profiles`: hồ sơ user, display name, avatar, timestamps.
- `admin_users`: liên kết auth user với role `super_admin | admin | editor | viewer`, trạng thái active, must-change-password.
- `admin_invitations`: email, role, token hash, expiry, accepted/revoked timestamps.
- `movies`: external id/slug, title fields, artwork, overview, release year, duration, quality, language, visibility, sync metadata, soft delete.
- `movie_sources`: nguồn playback đã chuẩn hóa, host allowlist classification, active flag; không expose service credentials.
- `seasons`: movie relation, season number, name.
- `episodes`: season relation, episode number, name, duration, availability, source reference.
- `genres`, `countries`: danh mục chuẩn hóa.
- `movie_genres`, `movie_countries`: join tables với unique composite keys.
- `watch_progress`: user, movie, season, episode, seconds, duration, updated timestamp; unique theo user/movie/season/episode.
- `favorites`: user/movie unique pair.
- `sync_runs`: trigger, status, counters, error summary, started/finished timestamps.
- `audit_logs`: actor, action, entity, metadata JSONB đã lọc secret, IP/device fingerprint hash nếu có.
- `system_settings`: key/value có type, scope và updated metadata; chỉ server/admin được sửa.

Indexes chính: slug, external id, visibility + release/update time, foreign keys, user id + updated time, favorite composite, progress composite, sync status + started time. RLS:

- profiles: user đọc/sửa profile của mình.
- watch_progress/favorites: user chỉ select/insert/update/delete bản ghi của mình.
- admin_users, invitations, audit_logs, settings và catalog writes: không cho client trực tiếp; server dùng trusted path có role check.
- Public catalogue read chỉ expose các row `is_visible = true` qua server query hoặc policy phù hợp.

Không cho phép client gửi `role`, `is_admin`, `audit actor`, `sync status` hoặc service/source secret như input đáng tin.

## 6. Auth, admin và bảo mật

### 6.1 Người xem

- Supabase Auth Google OAuth.
- Lần đăng nhập đầu tạo `profiles` qua server-side flow/idempotent trigger.
- User chưa đăng nhập được xem phim trong session hiện tại, nhưng không ghi `watch_progress` lâu dài.
- Cookie session dùng cơ chế Supabase SSR, HttpOnly/Secure/SameSite theo môi trường.

### 6.2 Admin

- Bootstrap email mặc định: `nqzkhoi010608@gmail.com`.
- Mật khẩu lấy từ `BOOTSTRAP_ADMIN_PASSWORD`, chỉ dùng cho flow bootstrap/seed an toàn, không hard-code.
- Admin chỉ vào được khi email đã được mời và `admin_users.role` hợp lệ, active.
- Middleware bảo vệ toàn bộ `/admin`; server role guard bảo vệ từng mutation.
- Thao tác nhạy cảm yêu cầu OTP 6 số gửi email. OTP chỉ lưu hash, expiry ngắn, one-time use, có attempt counter và cooldown gửi lại tối thiểu 60 giây.
- Rate limit theo email, IP và session/device identifier; khóa tạm thời sau chuỗi thất bại.
- Audit cho login/logout, đổi password, role change, delete, sync, OTP failures và settings changes.
- Khuyến khích TOTP/WebAuthn cho `super_admin`; thiết kế interface để bổ sung mà không đổi route admin.

### 6.3 Video source

- Adapter chỉ chọn source từ domain allowlist và kiểm tra expiry/availability.
- Route playback không trả URL nguồn gốc nếu player có thể nhận tokenized descriptor hoặc backend gateway.
- Signed URL/token chỉ có TTL ngắn khi nguồn hỗ trợ.
- Không vượt DRM, paywall, CAPTCHA hay cơ chế bảo vệ bên thứ ba.
- Proxy/gateway HLS và watermark chỉ bật khi hợp pháp, có quyền phân phối và được cấu hình rõ.

## 7. VSMOV adapter và đồng bộ

Base URL mặc định: `https://vsmov.com/api`.

Adapter cung cấp các operation:

- `getHome()`
- `listMovies(params)`
- `searchMovies(keyword, page)`
- `listGenres()` / `listCountries()` / `listYears()`
- `listByGenre(slug, params)` / `listByCountry(slug, params)` / `listByYear(year, params)`
- `getMovie(slug)`

Mỗi response đi qua:

1. Timeout và AbortController.
2. Kiểm tra status/content-type.
3. Parse JSON.
4. Validate shape bằng Zod với các field tối thiểu (`name`, `slug`, artwork, episodes nếu detail có).
5. Normalize về catalog model.
6. Tính `content_hash` ổn định.
7. Upsert theo `external_id` nếu có, fallback slug với unique constraint.

Sync job có exponential backoff giới hạn, cache cho read-through, idempotent run, `last_synced_at`, `sync_status`, `sync_error` và counters. Lỗi VSMOV không làm hỏng trang: catalogue dùng cache gần nhất hoặc demo fallback và hiển thị trạng thái thân thiện. Admin có nút “Đồng bộ ngay”, trạng thái lần chạy gần nhất và audit log. Vercel Cron/Supabase Cron chỉ là trigger; logic sync nằm trong server service dùng chung.

## 8. Hiệu năng và SEO

- Server Components cho dữ liệu đọc; `Promise.all` cho fetch độc lập.
- Dynamic import player và module nặng.
- Responsive image với kích thước/sizes phù hợp; lazy load ngoài viewport.
- Pagination hoặc rail giới hạn số lượng; không tải toàn kho trong một request.
- Cache có TTL và key theo route/query; không cache dữ liệu private.
- Debounce watch progress; flush khi pause, visibility change, rời trang và theo khoảng thời gian hợp lý.
- Metadata động theo movie, canonical URL, sitemap, robots và Open Graph.
- `loading.tsx`, `error.tsx`, `not-found.tsx` ở các boundary chính.
- Logging server không chứa password, token, OTP, cookie, signed URL hoặc service key.

## 9. Kiểm thử và tiêu chí chấp nhận

### Kiểm thử tự động

- Schema/adapter: response hợp lệ, thiếu field, content-type sai, retry/timeout và hash ổn định.
- Auth: Google callback tạo profile idempotent.
- RLS: user A không đọc/sửa progress/favorite của user B.
- Admin: invitation, role matrix, inactive admin, middleware/server guard.
- OTP: hash-only, expiry, one-time use, cooldown 60 giây, max attempts và lockout.
- Sync: insert/update, không duplicate, external API lỗi, retry và audit.
- Detail/progress: render movie detail, progress debounce/flush và next/previous episode.
- Smoke responsive: desktop/tablet/mobile; keyboard focus và reduced motion.

### Acceptance checklist

- Tất cả route yêu cầu tồn tại và có loading/error/empty state phù hợp.
- User chưa đăng nhập không truy cập được admin.
- User chỉ thấy dữ liệu của mình trong history/favorites/progress.
- Secret không xuất hiện trong client bundle hoặc log.
- API ngoài lỗi vẫn cho giao diện đọc được từ cache/demo và thông báo rõ ràng.
- Mobile, desktop, dark theme và Smart TV focus flow không vỡ layout.
- Lint, typecheck, unit test và production build chạy thành công.

## 10. Biến môi trường và triển khai

`.env.example` sẽ phân tách public và server-only:

- Public: `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Server-only: `SUPABASE_SERVICE_ROLE_KEY`, `VSMOV_BASE_URL`, `BOOTSTRAP_ADMIN_PASSWORD`, email provider credentials, playback signing/proxy secret.

README phải hướng dẫn:

1. Cài dependency.
2. Copy `.env.example` thành `.env.local`.
3. Chạy migration/seed demo.
4. Cấu hình Supabase Auth Google redirect URL.
5. Cấu hình email/OTP provider trước khi bật admin sensitive actions.
6. Chạy test, lint, typecheck và build.
7. Khai báo Vercel env theo đúng server/public scope.
8. Bật cron sau khi sync endpoint có auth/secret bảo vệ.

## 11. Quyết định và giới hạn

- Khi thiếu Supabase/VSMOV, app vẫn chạy demo; đây là fallback trải nghiệm, không phải dữ liệu production.
- Không giả lập OTP/email thành “bảo mật thật” khi chưa có provider.
- Không khẳng định chống sao chép URL video tuyệt đối.
- Không lưu hoặc phân phối nội dung vượt quyền; hệ thống chỉ hỗ trợ nguồn hợp pháp và allowlist.
- Nếu thêm thanh toán, billing hoặc DRM thật, cần một spec riêng vì sẽ thay đổi threat model và data model.


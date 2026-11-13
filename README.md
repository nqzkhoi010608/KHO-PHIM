# Kho Phim

Nền tảng xem phim tiếng Việt với trải nghiệm dark mode, catalogue server-rendered, khu vực quản trị tách biệt và các boundary sẵn sàng cho Supabase/VSMOV.

## Chạy local

```bash
npm install
copy .env.example .env.local
npm run dev
```

Nếu Supabase chưa cấu hình, các chức năng tài khoản sẽ yêu cầu đăng nhập/cấu hình. Catalogue công khai luôn lấy dữ liệu động từ VSMOV; nếu nguồn VSMOV tạm thời không phản hồi, website hiển thị trạng thái chưa sẵn sàng thay vì dùng metadata phim cũ.

## Kiểm tra chất lượng

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Supabase

1. Tạo project Supabase.
2. Chạy `supabase/migrations/202611100001_kho_phim.sql`.
3. Chạy `supabase/seed.sql`.
4. Bật Google provider trong Auth và khai báo callback URL.
5. Đặt `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
6. Chỉ đặt `SUPABASE_SERVICE_ROLE_KEY` ở server/Vercel; không đưa vào client.

Migration đã bao gồm bảng profile/admin/invitation/catalogue/playback/progress/favorites/sync/audit/settings, index, unique constraint, trigger tạo profile và RLS cho dữ liệu user.

## Admin

Bootstrap email mặc định theo yêu cầu là `nqzkhoi010608@gmail.com`. Mật khẩu khởi tạo phải lấy từ `BOOTSTRAP_ADMIN_PASSWORD`; không hard-code, không commit, không log. Admin production phải đi qua invitation, role guard server và OTP email cho thao tác nhạy cảm. Trang demo sẽ hiện rõ khi Supabase/email provider chưa cấu hình thay vì giả lập bảo mật thật.

## VSMOV

Có thể đặt `VSMOV_API_BASE=https://vsmov.com/api` để đổi API base; tên cũ `VSMOV_BASE_URL` vẫn được hỗ trợ.

Thêm URL trang phim vào `src/lib/demo-data/vsmov-sources.ts`, ví dụ:

```ts
'https://vsmov.com/phim/nguoi-sat-3',
```

Website tự rút slug, gọi `https://vsmov.com/api/phim/nguoi-sat-3`, rồi tự lấy tên phim, ảnh, metadata, danh sách tập và `link_embed`. Không cần nhập thủ công từng giá trị API. File này chỉ cần chứa URL trang `/phim/...`; việc đổi sang API được xử lý tự động ở server.

Mapping ảnh: `poster_url` được dùng làm banner/backdrop, `thumb_url` được dùng làm poster/card. `episodes[].server_data[].link_embed` được dùng cho player sau khi kiểm tra HTTPS và host phát hợp lệ.

Adapter server-only kiểm tra content type, validate schema, timeout 10 giây, retry tối đa 2 lần và cache detail 5 phút. Nếu một nguồn lỗi, các nguồn còn lại vẫn hiển thị; nếu tất cả nguồn lỗi, catalogue để rỗng và không dùng dữ liệu phim cũ. URL API không được đưa vào client; URL `link_embed` vẫn phải được iframe nhận để phát video.

Không hiển thị URL API nguồn gốc trong giao diện. URL `link_embed` phải được trình duyệt nhận để iframe phát video, nên không thể mã hóa tuyệt đối trước người dùng có F12; hệ thống chỉ có thể giữ API ở server, không log/hiển thị link gốc và chỉ dùng playback gateway/signed URL khi nguồn hợp pháp, được phép phân phối và có token TTL ngắn. Không vượt DRM, paywall, CAPTCHA hoặc cơ chế bảo vệ bên thứ ba.

## Cấu trúc chính

- `src/app/(site)`: trải nghiệm người xem.
- `src/app/admin`: layout và route quản trị riêng.
- `src/lib/catalog`: domain repository/normalization boundary.
- `src/lib/vsmov`: adapter server-only.
- `src/lib/supabase`: client boundary.
- `supabase/migrations`: schema/RLS.
- `tests`: test contract cho catalogue, role và OTP.

## Checklist Vercel

- [ ] Khai báo public env và server-only env đúng scope.
- [ ] Không đặt service role key trong `NEXT_PUBLIC_*`.
- [ ] Cấu hình Google OAuth redirect URL production.
- [ ] Cấu hình email provider trước khi bật OTP.
- [ ] Cấu hình domain/allowlist playback hợp pháp.
- [ ] Chạy migration và seed theo môi trường.
- [ ] Kiểm tra cron có secret bảo vệ và audit log.
- [ ] Chạy lint, typecheck, test, build trước deploy.
- [ ] Kiểm tra mobile, desktop, keyboard focus và reduced motion.

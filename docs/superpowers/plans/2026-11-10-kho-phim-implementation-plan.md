# Kho Phim — Kế hoạch triển khai

Spec nền tảng: `docs/superpowers/specs/2026-11-10-kho-phim-design.md`

## Mục tiêu bàn giao

Tạo một vertical slice Next.js có thể chạy ngay trong repo trống, có đầy đủ route người dùng/admin, giao diện dark mode hoàn chỉnh bằng dữ liệu demo, domain model và adapter VSMOV server-only, Supabase migration/RLS, auth/admin guard khung, player/progress contract, test scaffolding và tài liệu triển khai.

## Giai đoạn 1 — Khởi tạo app và design system

Tạo package metadata, TypeScript, Next App Router, Tailwind, ESLint, Vitest và cấu hình build. Tạo CSS variables, typography, responsive container, focus ring, buttons, badges, poster ratio, skeleton và reduced-motion.

Files chính: `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `src/app/globals.css`, `src/components/shared/*`.

Kiểm tra: lint, typecheck, build tối thiểu.

## Giai đoạn 2 — Domain model và dữ liệu demo

Tạo kiểu `Movie`, `Episode`, `Season`, taxonomy, filter và playback descriptor. Tạo catalog repository async trả demo data và API contract độc lập với UI. Thêm helper slug/metadata.

Files chính: `src/types/*`, `src/lib/catalog/*`, `src/lib/demo-data/*`.

Kiểm tra: unit test normalize/slug/filter.

## Giai đoạn 3 — Site shell và các trang catalogue

Tạo layout site, header, desktop nav, mobile bottom nav, hero, rail, poster card, filter strip, loading/error/empty states. Kết nối các route trang chủ, phim lẻ, phim bộ, hoạt hình, chiếu rạp, thể loại, quốc gia và tìm kiếm.

Kiểm tra: route smoke và responsive checklist.

## Giai đoạn 4 — Detail, player, account và progress

Tạo detail page với metadata, seasons/episodes, related movies và metadata SEO. Tạo watch page với player HTML5/HLS fallback, episode navigation, source error state và auto-next. Tạo favorite/progress client contracts; user chưa đăng nhập chỉ lưu session storage.

Kiểm tra: detail render, player state, progress debounce/flush, keyboard focus.

## Giai đoạn 5 — VSMOV adapter

Tạo fetch client server-only, timeout, cache, exponential backoff, Zod validation, normalization và content hash. Tạo sync service với counters/status/error và API route bảo vệ. Khi chưa cấu hình VSMOV, giữ demo fallback.

Kiểm tra: mock fetch cho success/invalid/timeout/retry/upsert contract.

## Giai đoạn 6 — Supabase schema, RLS và auth boundary

Tạo `.env.example`, Supabase clients, migration cho toàn bộ bảng, index/unique/FK/soft delete/RLS, seed demo. Tạo Google auth callback, profile upsert và server guard. Không expose service role.

Kiểm tra: SQL lint/manual review, RLS test notes, auth flow contract.

## Giai đoạn 7 — Admin shell và security services

Tạo admin layout/login/dashboard, route guards, role matrix, invitation flow contract, OTP hash/expiry/rate-limit service, audit logger và các trang quản trị với dữ liệu demo rõ trạng thái cấu hình.

Kiểm tra: role matrix, OTP cooldown/attempt/one-time tests, secret scan.

## Giai đoạn 8 — SEO, observability và tài liệu bàn giao

Thêm sitemap, robots, Open Graph, safe logger, error boundary, README, deployment checklist, test commands và các ghi chú về quyền phân phối/playback.

Kiểm tra cuối: lint, typecheck, unit test, production build và kiểm tra route.

## Thứ tự thực hiện

1. Giai đoạn 1–3 để có trải nghiệm thấy được.
2. Giai đoạn 4 để hoàn chỉnh flow xem phim.
3. Giai đoạn 5–7 để gắn backend/adapters/security.
4. Giai đoạn 8 để chốt chất lượng và bàn giao.

## Tiêu chí dừng

- Mọi route trong spec render được hoặc có trạng thái cấu hình/không khả dụng thân thiện.
- Không có secret trong client bundle, demo data hoặc log.
- API ngoài lỗi không làm app crash.
- RLS và role boundary được thể hiện bằng migration/test contract.
- Build production thành công khi không có credential thật.


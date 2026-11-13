# Kho Phim Red Velvet Cinema — Implementation Plan

## Guardrails

- Không chỉnh sửa `rophim`.
- Không đổi API, route, repository, Supabase, auth hoặc middleware.
- Không thêm dependency hình ảnh/carousel mới.
- Giữ menu canonical tại `src/lib/catalog/navigation.ts`.
- Tái sử dụng `CinematicRail`, `PosterCard`, `SiteShell` và token chung.

## Phase 1 — Foundation cleanup

Files:

- `src/app/globals.css`
- `tailwind.config.ts`

Work:

1. Khóa token Obsidian/Coal/Velvet/Raised/Ruby/Deep Ruby/Frost/Smoke.
2. Gom lại các selector legacy về component primitives: surface, poster,
   button, badge, section heading, filter và footer.
3. Tạo hierarchy rõ giữa hero, section, card và metadata.
4. Giảm border/glow lặp lại; chỉ giữ ánh sáng cho CTA, active và spotlight.
5. Bổ sung reduced motion cho mọi animation tự động.

## Phase 2 — Shell và navigation

Files:

- `src/components/site/site-header.tsx`
- `src/components/site/site-shell.tsx`
- `src/app/globals.css`

Work:

1. Giữ compact header, làm rõ scroll state và active navigation.
2. Tinh gọn desktop mega-menu và mobile drawer theo spec.
3. Footer chuyển thành navigation footer có hierarchy và khoảng thở.
4. Kiểm tra keyboard focus, Escape, overlay và mobile overflow.

## Phase 3 — Homepage cinematic stage

Files:

- `src/components/site/home-discovery.tsx`
- `src/components/site/cinematic-rail.tsx`
- `src/app/globals.css`

Work:

1. Hero thành spotlight stage: backdrop, wash, content block, CTA và thumbnail
   cùng nhịp cinematic.
2. Topic discovery nhẹ hơn, không cạnh tranh hero.
3. Rails dùng title/context/view-all thống nhất.
4. Chỉ rail nổi bật dùng depth/autoplay; các rail còn lại ưu tiên swipe.
5. Ranking và editorial feature có hierarchy khác rail thường.

## Phase 4 — Catalogue system

Files:

- `src/components/site/catalog-header.tsx`
- `src/components/site/catalog-filter-bar.tsx`
- `src/components/site/movie-grid.tsx`
- `src/components/site/poster-card.tsx`
- `src/app/(site)/tim-kiem/page.tsx`
- `src/app/(site)/the-loai/page.tsx`
- `src/app/(site)/the-loai/[slug]/page.tsx`
- `src/app/(site)/quoc-gia/page.tsx`
- `src/app/(site)/quoc-gia/[slug]/page.tsx`

Work:

1. Catalog header compact, filter surface rõ và không đẩy nội dung quá thấp.
2. Poster grid đồng đều trên mobile/desktop.
3. Directory cards dùng cùng treatment với menu canonical.
4. Empty state hướng dẫn người dùng khám phá tiếp.

## Phase 5 — Detail và watch

Files:

- `src/app/(site)/phim/[slug]/page.tsx`
- `src/app/(site)/xem-phim/[slug]/[episode]/page.tsx`
- `src/components/site/movie-player.tsx`
- `src/components/site/movie-rail.tsx`

Work:

1. Detail hero, poster, metadata và CTA cùng hierarchy.
2. Detail body dùng panel riêng cho information, overview và episodes.
3. Watch player tối, tập hiện tại đỏ, list chuyển phù hợp mobile.
4. Related content dùng cinematic rail nhưng không lấn át nội dung chính.

## Phase 6 — Auth/account/admin

Files:

- `src/app/(site)/dang-nhap/page.tsx`
- `src/app/(site)/tai-khoan/page.tsx`
- `src/app/(site)/phim-yeu-thich/page.tsx`
- `src/app/(site)/lich-su-xem/page.tsx`
- `src/app/admin/layout.tsx`
- `src/app/admin/login/page.tsx`
- `src/app/admin/page.tsx`
- `src/components/admin/*`

Work:

1. Auth/account dùng premium panel, field state và copy rõ.
2. Admin giữ Control Room nhưng giảm density và làm rõ hành động chính.
3. Tables/status/filter/badge dùng chung token.
4. Login độc lập, sidebar không xuất hiện.

## Phase 7 — Verification

Automated:

- `npm run typecheck`
- `npm run lint`
- `npm test`

Manual:

- Mobile 360/390/430px.
- Desktop 1280/1440px.
- Header/menu, homepage, rails, catalogue, detail, watch, account và admin.
- Keyboard focus, reduced motion, scroll-snap và overflow.
- Xác nhận `rophim` không thay đổi.


# Kho Phim — Red Cinema & Control Room Implementation Plan

## Guardrails

- Không chỉnh sửa `rophim`.
- Giữ nguyên tên Kho Phim, route, API phim, repository contract, Supabase boundary và admin role guard.
- Thay đổi ưu tiên presentation/component composition; không thay schema hoặc secret flow.
- Sau mỗi phase chạy typecheck/lint/test; sau public/admin phase kiểm tra preview desktop và responsive.

## Phase 1 — Design foundations

Files:

- `src/app/globals.css`
- `tailwind.config.ts`
- `src/app/layout.tsx`

Work:

1. Thay token vàng cũ bằng red cinema tokens.
2. Chuẩn hóa surface, border, button, badge, focus ring, state colors.
3. Chọn typography hierarchy và spacing scale.
4. Dọn các selector hero cũ để tránh specificity chồng chéo.

Validation: `npm run typecheck`, `npm run lint`, `npm test`.

## Phase 2 — Public shell and navigation

Files:

- `src/components/site/site-shell.tsx`
- `src/components/site/site-header.tsx`
- `src/components/site/home-discovery.tsx`
- `src/app/globals.css`

Work:

1. Header overlay desktop và mobile top bar.
2. Mobile drawer với search, account, type, genre and country groups.
3. Không render bottom navigation mobile.
4. Home hero full-width, topic grid, movie rails, ranking and editorial sections.
5. Add functional rail controls with smooth scrolling.

Validation: preview home at desktop/mobile, verify no horizontal overflow outside intentional rails.

## Phase 3 — Catalogue and search

Files:

- `src/components/site/catalog-header.tsx`
- `src/components/site/catalog-filter-bar.tsx`
- `src/components/site/movie-grid.tsx`
- `src/components/site/poster-card.tsx`
- `src/app/(site)/tim-kiem/page.tsx`
- `src/app/(site)/the-loai/**`
- `src/app/(site)/quoc-gia/**`
- `src/app/(site)/phim-bo/page.tsx`
- `src/app/(site)/phim-le/page.tsx`
- `src/app/(site)/hoat-hinh/page.tsx`

Work:

1. Đồng bộ poster grid và card interaction với home rails.
2. Đổi filter/search controls sang red signal states.
3. Tạo empty/loading/error states có hướng dẫn rõ.
4. Chuẩn hóa heading, count, pagination và responsive gutters.

## Phase 4 — Detail and watch experience

Files:

- `src/app/(site)/phim/[slug]/page.tsx`
- `src/app/(site)/xem-phim/[slug]/[episode]/page.tsx`
- `src/components/site/movie-player.tsx`
- `src/components/site/favorite-button.tsx`
- `src/components/site/movie-rail.tsx`
- `src/components/site/ranking-list.tsx`

Work:

1. Detail hero, poster, metadata and action group.
2. Episode grid with active, available, new and resume states.
3. Watch layout with player focus, episode sidebar and mobile order.
4. Suggestions, comments and favorite/share states.

## Phase 5 — Account flows

Files:

- `src/app/(site)/dang-nhap/page.tsx`
- `src/app/(site)/tai-khoan/page.tsx`
- `src/app/(site)/lich-su-xem/page.tsx`
- `src/app/(site)/phim-yeu-thich/page.tsx`

Work:

1. Modal-like auth entry with clear states.
2. Account dashboard with history/favorite cards.
3. Empty states and continuation actions.

## Phase 6 — Admin Control Room

Files:

- `src/app/admin/layout.tsx`
- `src/components/admin/admin-page-heading.tsx`
- `src/components/admin/admin-table.tsx`
- `src/app/admin/page.tsx`
- `src/app/admin/movies/**`
- `src/app/admin/episodes/page.tsx`
- `src/app/admin/categories/page.tsx`
- `src/app/admin/users/page.tsx`
- `src/app/admin/invitations/page.tsx`
- `src/app/admin/sync/page.tsx`
- `src/app/admin/audit-logs/page.tsx`
- `src/app/admin/settings/page.tsx`

Work:

1. Red/black admin shell with responsive drawer.
2. Dashboard metrics, status strip and activity timeline.
3. Dense but readable tables with badges, filters and row actions.
4. Form sections, confirmation states and sync/audit feedback.
5. Preserve server-side proxy, permissions and data boundaries.

## Phase 7 — QA and hardening

1. Run typecheck, lint, tests and production build.
2. Test routes for home, catalogue, detail, watch and every admin section.
3. Check keyboard focus, reduced motion, overflow, broken images and empty data.
4. Confirm no file under `rophim` changed.
5. Fix visual regressions discovered in screenshots before handoff.

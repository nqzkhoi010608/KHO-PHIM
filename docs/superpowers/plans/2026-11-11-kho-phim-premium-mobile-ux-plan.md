# Kho Phim Premium Mobile UX/UI Implementation Plan

## Guardrails

- Không chỉnh sửa bất kỳ file nào trong `rophim`.
- Không đổi API phim, route, repository, Supabase schema, auth boundary hoặc
  middleware.
- Không thêm thư viện carousel mới; dùng CSS scroll-snap, native scrolling,
  `motion` hiện có và React hooks cần thiết.
- Giữ các thay đổi theo lớp để có thể kiểm tra sau mỗi phase.

## Phase 1 — Visual foundation

### Files

- `src/app/globals.css`
- `tailwind.config.ts`
- `src/app/layout.tsx` nếu cần chuẩn hóa metadata/theme behavior

### Work

1. Chuẩn hóa token Void/Night/Panel/Raised/Signal Red/Ruby/Rose/Paper/Mist.
2. Thay các selector legacy còn dùng vàng/tím bằng token đỏ hoặc màu trung tính
   phù hợp ngữ cảnh.
3. Tạo utility cho focus ring, glass surface, red glow tiết chế và reduced
   motion.
4. Chuẩn hóa heading, section spacing, poster ratio, button height và mobile
   gutters.
5. Bổ sung `@media (prefers-reduced-motion: reduce)` cho animation tự động,
   transform backdrop và rail transitions.

### Checkpoint

- Không còn màu thương hiệu cũ trong header, CTA, active state và card flag.
- TypeScript không bị ảnh hưởng; CSS không tạo selector ghi đè ngoài ý muốn.

## Phase 2 — Shared navigation system

### Files

- `src/lib/catalog/navigation.ts` (new)
- `src/components/site/site-header.tsx`
- `src/components/site/site-shell.tsx`
- `src/app/(site)/layout.tsx` nếu cần truyền dữ liệu tối thiểu

### Work

1. Khai báo `primaryNavigation`, `genreNavigation` và `countryNavigation` với
   label/slug/thứ tự chuẩn trong một module tĩnh.
2. Dùng helper slug duy nhất cho link menu; không lặp logic normalize trong JSX.
3. Xây lại desktop header: active route, search, login, mega-menu Thể loại và
   Quốc gia, focus/escape behavior và vùng scroll nội bộ.
4. Xây lại mobile drawer: header riêng, overlay, direct links cho Phim lẻ/Phim
   bộ, accordion Thể loại/Quốc gia, đóng drawer sau khi điều hướng.
5. Đảm bảo menu dùng đúng các route hiện tại và không tạo route giả.
6. Giữ footer và thông tin account/admin liên kết với hành vi hiện có.

### Checkpoint

- Kiểm tra tất cả slug menu bằng route thật.
- Keyboard có thể mở, đi qua, đóng mega-menu/drawer.
- Mobile không xuất hiện bottom navigation.

## Phase 3 — Cinematic rails và mobile depth

### Files

- `src/components/site/cinematic-rail.tsx` (new hoặc tách từ
  `home-discovery.tsx`)
- `src/components/site/home-discovery.tsx`
- `src/components/site/poster-card.tsx`
- `src/components/site/ranking-list.tsx` nếu cần đồng bộ rank treatment
- `src/app/globals.css`

### Work

1. Tách rail thành component có API rõ: `title`, `href`, `movies`, `ranked`,
   `variant` và `autoAdvance`.
2. Dùng horizontal native scroll + `scroll-snap-type`; card/link vẫn là vùng
   tương tác trực tiếp.
3. Desktop thêm nút trái/phải và chỉ hiển thị khi thiết bị có hover.
4. Mobile hiển thị 2.1 card, gutter đúng với trang và fade edge nhẹ để báo còn
   nội dung.
5. Thêm variant `depth` cho một hoặc hai rail: perspective nhẹ, scale/opacity
   theo trạng thái, không làm méo poster.
6. Thêm autoplay có kiểm soát cho rail nổi bật: delay dài, dừng khi pointer/touch
   bắt đầu, dừng khi focus, tab hidden hoặc reduced motion.
7. Không auto-advance tất cả rail; các rail còn lại ưu tiên vuốt tay.
8. Bổ sung aria-label cho rail arrows, tên section và trạng thái active.

### Checkpoint

- Vuốt tay hoạt động trên viewport 360/390/430px.
- Chuyển tab, focus và reduced motion không gây rail tự trượt.
- Không phát sinh layout shift lớn khi rail khởi tạo.

## Phase 4 — Home, catalogue và detail polish

### Files

- `src/components/site/home-discovery.tsx`
- `src/components/site/catalog-header.tsx`
- `src/components/site/catalog-filter-bar.tsx`
- `src/components/site/movie-grid.tsx`
- `src/app/(site)/phim/[slug]/page.tsx`
- `src/app/(site)/xem-phim/[slug]/[episode]/page.tsx`
- `src/app/(site)/tim-kiem/page.tsx`
- `src/app/(site)/the-loai/page.tsx`
- `src/app/(site)/the-loai/[slug]/page.tsx`
- `src/app/(site)/quoc-gia/[slug]/page.tsx`
- `src/app/(site)/phim-le/page.tsx`
- `src/app/(site)/phim-bo/page.tsx`

### Work

1. Homepage: hero, topics, rails, ranked rows, ad strip and anime feature dùng
   cùng spacing/contrast.
2. Catalogue: page heading, filter surface, grid density, pagination/empty state
   và mobile wrapping.
3. Detail: hero backdrop, poster anchor, metadata hierarchy, CTA/favorite,
   description, genres/countries/cast and episodes.
4. Watch: player shell, episode drawer/rail, current episode, navigation và
   media error copy.
5. Search/category/country: title, result count, query/filter state và empty
   state có hướng dẫn hành động tiếp theo.

### Checkpoint

- Public pages không còn component dùng màu/token cũ.
- Các CTA cùng tên và cùng trạng thái ở mọi trang.
- Ảnh, poster, badge và tiêu đề không bị tràn tại mobile.

## Phase 5 — Account và admin consistency

### Files

- `src/app/(site)/dang-nhap/page.tsx`
- `src/app/(site)/tai-khoan/page.tsx`
- `src/app/(site)/phim-yeu-thich/page.tsx`
- `src/app/(site)/lich-su-xem/page.tsx`
- `src/app/admin/layout.tsx`
- `src/app/admin/login/page.tsx`
- `src/components/admin/*` khi cần
- `src/app/globals.css`

### Work

1. Đồng bộ auth/account surfaces với token mới, field focus và error state.
2. Giữ admin sidebar/drawer đã có, nhưng điều chỉnh hierarchy, active state,
   table density và contrast để cùng hệ thiết kế.
3. Xác nhận admin login độc lập và không hiển thị sidebar.
4. Không thay đổi quyền, dữ liệu, thao tác CRUD hoặc route guard.

## Phase 6 — Verification

### Automated

- `npm run typecheck`
- `npm run lint`
- `npm test`

### Manual visual/interaction

- Trang chủ: 360, 390, 430, 1280, 1440px.
- Header: menu desktop, mega-menu, search, keyboard, escape, route active.
- Mobile drawer: accordion, scroll, overlay, đóng sau khi chọn link.
- Rails: vuốt, snap, arrow desktop, autoplay pause, reduced motion.
- Trang danh mục, chi tiết phim, xem phim, tài khoản, admin login và dashboard.
- Xác nhận `rophim` không thay đổi bằng kiểm tra danh sách file/hash trước và
  sau đợt chỉnh sửa.

## Thứ tự thực thi

1. Phase 1 để khóa token và reduced-motion.
2. Phase 2 để khóa menu/route và header.
3. Phase 3 để khóa rail interaction.
4. Phase 4 để áp dụng lên public pages.
5. Phase 5 để đồng bộ account/admin.
6. Phase 6 kiểm tra tự động và trực quan, sau đó sửa các lỗi giao diện còn lại.


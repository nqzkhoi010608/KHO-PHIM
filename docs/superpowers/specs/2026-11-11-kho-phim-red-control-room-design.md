# Kho Phim — Red Cinema & Control Room Design

## 1. Mục tiêu

Tái thiết kế toàn bộ hệ thống giao diện Kho Phim theo hướng streaming điện ảnh hiện đại, dùng hệ màu đỏ–đen làm ngôn ngữ thương hiệu mới. Thiết kế phải nhất quán giữa khu vực người xem, trang chi tiết phim, trang xem phim và hệ thống quản trị.

Tên Kho Phim, dữ liệu catalogue, API phim, route hiện tại và logic bảo mật được giữ nguyên. Thư mục `rophim` chỉ là nguồn tham chiếu UX/UI và không được chỉnh sửa.

## 2. Phạm vi

### Khu vực người xem

- Trang chủ và hero discovery.
- Header desktop, menu mobile và tìm kiếm.
- Topic grid, movie rail, ranking rail và poster card.
- Trang danh mục, bộ lọc, grid kết quả và pagination.
- Trang chi tiết phim, action bar, episode grid, comments và phim liên quan.
- Trang xem phim, player shell, danh sách tập, thông tin phim và đề xuất.
- Trang đăng nhập, tài khoản, lịch sử và yêu thích.
- Footer, loading state, empty state và error state.

### Khu vực quản trị

- Admin shell, sidebar desktop và drawer mobile.
- Dashboard, KPI, trạng thái hệ thống và activity timeline.
- Quản lý phim, tập phim, danh mục, người dùng, lời mời.
- Đồng bộ catalogue, audit log và cấu hình.
- Form, table, filter, badge trạng thái, modal xác nhận và feedback state.

## 3. Design language

### Bảng màu

| Vai trò | Màu |
|---|---|
| Nền sâu | `#080A0F` |
| Surface | `#131720` |
| Surface nâng | `#1C222D` |
| Border | `rgba(255,255,255,.09)` |
| Đỏ thương hiệu | `#E51D45` |
| Đỏ hover | `#FF4D6D` |
| Text chính | `#F6F7FB` |
| Text phụ | `#9299A8` |
| Trạng thái thành công | `#67D391` |
| Trạng thái cảnh báo | `#F5B85B` |
| Trạng thái lỗi | `#FF667C` |

Đỏ là màu tín hiệu cho CTA, active state, ranking, progress, focus và trạng thái quan trọng. Surface và typography phải giữ trung tính để giao diện không bị phủ đỏ.

### Typography

- Sans hiện đại, dễ đọc cho phần lớn nội dung.
- Display weight mạnh cho hero title và dashboard metric.
- Sentence case cho nội dung giao diện; tránh lạm dụng uppercase.
- Metadata nhỏ nhưng phải đạt tương phản và khoảng cách đủ rộng.

### Hình khối

- Hero và player dùng khung lớn, ít bo góc hơn.
- Poster card dùng radius nhỏ để giữ cảm giác catalogue điện ảnh.
- Control, badge và pill dùng radius tròn khi biểu thị trạng thái hoặc thao tác nhanh.
- Không dùng một radius cho toàn bộ component.

## 4. Cấu trúc layout

### Trang chủ

```text
Header overlay
Hero full-width
  ├─ backdrop + wash
  ├─ title / metadata / CTA
  └─ thumbnail navigator
Topic grid
Movie rails dọc theo nhóm
Trending / ranking rails
Ads / editorial feature
Anime feature
Footer
```

Desktop dùng hero toàn chiều rộng và rail có nút điều hướng khi hover. Mobile dùng hero dọc, gesture cuộn ngang cho rail và không có bottom navigation.

### Trang danh mục

```text
Header
Catalog heading
Filter bar
Result count / sort
Poster grid
Pagination
Footer
```

Grid phải giữ cùng ratio poster và khoảng cách với poster rail ở trang chủ.

### Trang chi tiết phim

```text
Backdrop detail hero
  ├─ poster
  ├─ title / status / metadata
  ├─ overview
  └─ play / favorite / share actions
Episode area
Comments area
Related movies
```

Desktop ưu tiên bố cục hai cột; mobile xếp poster, thông tin, action và tập phim theo thứ tự đọc tự nhiên.

### Trang xem phim

Desktop dùng player chính và episode sidebar. Mobile đưa episode list xuống dưới player, có sticky context bar tối giản để không che nội dung.

### Admin

```text
Sidebar / mobile drawer
Top command bar
Page heading + primary action
Metric or status strip
Main workspace
Activity / secondary rail
```

Admin dùng mật độ thông tin cao hơn public site nhưng vẫn giữ surface, typography và trạng thái đỏ–đen nhất quán.

## 5. Component boundaries

- `SiteShell`: public chrome, footer và page background.
- `SiteHeader`: desktop navigation, mobile drawer, search affordance.
- `HeroSlider`: backdrop, content transition và thumbnail navigation.
- `TopicGrid`: topic discovery cards.
- `MovieRail`: horizontal catalogue rail, keyboard/button navigation.
- `PosterCard`: poster, badge, rating, hover action và loading state.
- `MovieDetailHero`: metadata và action group cho detail route.
- `EpisodeGrid`: season switcher, episode states và resume progress.
- `WatchShell`: player context, episode navigation và recommendations.
- `AdminShell`: sidebar, command bar, responsive drawer.
- `AdminTable`, `AdminFormSection`, `StatusBadge`, `MetricCard`: admin primitives.

Các component phải nhận dữ liệu hiện tại thông qua props và không tự thay đổi API hoặc schema.

## 6. Motion và interaction

- Hero: fade chuyển backdrop và content, tối đa khoảng 450ms.
- Mobile drawer: slide từ trên hoặc cạnh phải, có backdrop và khóa scroll.
- Poster: scale nhẹ và play affordance khi hover; không dùng hiệu ứng quá mạnh.
- Rail: cuộn mượt, nút trái/phải chỉ hiện trên desktop.
- Form/table: feedback rõ cho pending, success, warning và error.
- Tôn trọng `prefers-reduced-motion`.

## 7. Accessibility và responsive

- Mọi icon button có accessible label.
- Focus ring dùng đỏ thương hiệu, không chỉ dựa vào hover.
- Text phụ không thấp hơn mức đọc được trên nền tương ứng.
- Mobile breakpoint được thiết kế riêng, không chỉ thu nhỏ desktop.
- Không để nội dung bị che bởi header, player controls hoặc drawer.
- Horizontal rails có thể thao tác bằng touch, chuột và bàn phím.

## 8. Data, security và compatibility

- Không sửa `rophim`.
- Không đổi API phim, repository contract, route public hoặc Supabase boundary.
- Không đưa secret vào client.
- Admin role guard, invitation flow, audit log và proxy bảo vệ route được giữ nguyên.
- Các thay đổi chỉ tập trung vào presentation, interaction và component composition trừ khi cần adapter hiển thị.

## 9. Kế hoạch triển khai

1. Thay design tokens, typography, button/badge/surface primitives sang red cinema.
2. Chuẩn hóa public shell, header, menu và responsive rules.
3. Làm lại trang chủ theo hero/topic/rail/trending structure.
4. Đồng bộ catalog, search, account, history và favorite pages.
5. Chăm chút detail và watch experience.
6. Làm lại admin shell và các workspace theo cùng hệ thống component.
7. Kiểm thử visual tại desktop/mobile, keyboard focus, overflow, typecheck, lint, tests và production build.

## 10. Tiêu chí hoàn thành

- Không còn màu vàng làm accent chính ở public hoặc admin.
- Không còn lỗi chia cột, overflow ngang ngoài chủ ý hoặc nội dung bị che.
- Public pages có cùng visual language nhưng hierarchy khác nhau theo mục đích.
- Admin có cảm giác là một control room hoàn chỉnh, không phải các trang form rời rạc.
- Mobile không có bottom navigation cố định.
- API/data/security behavior không bị thay đổi.
- `rophim` không có file bị chỉnh sửa.

# Kho Phim Red Velvet Cinema — Full Interface Redesign

## 1. Mục tiêu

Tái thiết toàn bộ giao diện Kho Phim theo hướng một nền tảng điện ảnh premium:
đậm chất cinematic, sang, có điểm nhấn thị giác rõ ràng và trải nghiệm liền
mạch trên mobile lẫn desktop.

Đây là một đợt thay đổi visual system và bố cục trải nghiệm, không thay đổi
nguồn dữ liệu phim, API, route, logic xác thực, ranh giới Supabase hoặc bảo mật.
Thư mục `rophim` chỉ được dùng để đối chiếu cấu trúc UX/UI và tuyệt đối không
được chỉnh sửa.

## 2. Vấn đề cần giải quyết

- Giao diện hiện tại còn nhiều vùng card giống nhau, thiếu nhịp điệu và điểm
  nhấn thị giác.
- Menu/header có nhiều lớp chiếm diện tích và chưa tạo cảm giác cao cấp.
- Các trang public chưa có cùng một hierarchy rõ ràng từ hero đến nội dung.
- Card phim, section, badge và spacing chưa tạo thành một hệ thống nhất quán.
- Hiệu ứng đang có nhưng chưa được tổ chức thành một ngôn ngữ chuyển động có
  chủ đích.
- Mobile cần cảm giác lướt nội dung như một ứng dụng xem phim hiện đại nhưng
  vẫn dễ hiểu và không gây mỏi mắt.

## 3. Hướng thẩm mỹ Red Velvet Cinema

### 3.1 Bảng màu

- `Obsidian` — `#07090E`: nền sâu của toàn hệ thống.
- `Coal` — `#0D1119`: vùng chuyển tiếp và header.
- `Velvet` — `#151A24`: surface chính.
- `Raised` — `#202938`: surface nổi, hover và selected state.
- `Ruby Red` — `#F02B4F`: CTA, active state và điểm dẫn hướng.
- `Deep Ruby` — `#A90E32`: gradient sâu, pressed state và shadow.
- `Rose Light` — `#FF7187`: highlight, link và focus accent.
- `Frost` — `#F5F7FB`: tiêu đề và nội dung chính.
- `Smoke` — `#A5ADBC`: metadata, mô tả và secondary content.
- `Silver Line` — `rgba(255,255,255,.10)`: đường phân cách có tiết chế.

Đỏ chỉ được dùng cho điểm hành động và trạng thái. Không phủ đỏ lên mọi
component. Hình ảnh poster/backdrop là nguồn màu thứ hai; overlay phải giữ
độ tương phản để nội dung vẫn đọc được.

### 3.2 Typography

- Font giao diện chính: Be Vietnam Pro hiện có, ưu tiên khả năng đọc tiếng Việt.
- Display title: weight 800–900, tracking âm nhẹ, line-height chặt.
- Body: weight 400–500, line-height thoáng, giới hạn độ dài dòng.
- Metadata: nhỏ, chữ thường, không lạm dụng uppercase hoặc letter spacing.
- Heading không dùng kiểu nhấn một từ bằng màu khác nếu không có ý nghĩa UX.

### 3.3 Hình học và nhịp điệu

- Hero và panel lớn có góc bo lớn.
- Poster card có góc bo vừa và khung rõ, để hình ảnh là nhân vật chính.
- Button CTA là pill hoặc rounded rectangle tùy ngữ cảnh; không biến mọi thứ
  thành pill.
- Section dùng marker, đường chân trời hoặc khoảng thở thay cho nhiều viền.
- Desktop dùng max-width rộng, mobile dùng gutter 16px và scroll-snap.

## 4. Kiến trúc layout chung

```text
Header mỏng + compact menu
        ↓
Hero / Spotlight stage
        ↓
Topic discovery hoặc filter context
        ↓
Movie shelves / ranking / editorial feature
        ↓
Footer navigation
```

Mỗi trang chỉ có một điểm nhấn lớn. Các vùng còn lại phải hỗ trợ hierarchy,
không cạnh tranh thị giác với hero hoặc CTA chính.

## 5. Header và navigation

### Desktop

- Header dạng compact glass, cao khoảng 60–68px.
- Logo ở trái, primary navigation ở giữa, search/account ở phải.
- Mega-menu không mở full màn hình; dùng panel nhỏ có chiều cao giới hạn và
  scroll nội bộ.
- Menu Thể loại và Quốc gia dùng grid gọn, active state đỏ ruby.
- Header chuyển từ trong suốt sang Coal glass khi cuộn.

### Mobile

- Không dùng bottom navigation.
- Drawer/bottom-sheet compact, giới hạn chiều cao theo viewport.
- Quick links: Phim lẻ, Phim bộ, Hoạt hình, Tài khoản.
- Chỉ mở một nhóm con: Thể loại hoặc Quốc gia.
- Search luôn dễ tìm nhưng không chiếm phần lớn drawer.
- Đóng bằng nút, overlay hoặc phím Escape.

## 6. Homepage

### Hero stage

- Backdrop phủ rộng với gradient tối sâu từ phía nội dung.
- Nội dung bên trái trên desktop, neo ở đáy trên mobile.
- Title lớn, tên gốc nhỏ hơn, metadata tối giản.
- CTA `Xem phim` màu Ruby Red; CTA phụ `Chi tiết` trung tính.
- Thumbnail desktop có active frame đỏ; mobile có dots và nút trước/sau.
- Hero có thể tự chuyển khi tab đang hiển thị nhưng phải dừng khi người dùng
  tương tác hoặc bật reduced motion.

### Discovery

- Topic grid là vùng định hướng nhanh, không cạnh tranh với hero.
- Movie shelf là component dùng chung: title, context, xem tất cả, rail và
  trạng thái rỗng.
- Chỉ một hoặc hai shelf được dùng depth/perspective và autoplay; các shelf
  khác ưu tiên swipe tự nhiên.
- Ranking shelf có số thứ hạng đỏ nhạt, không dùng typography quá nặng.
- Editorial feature dùng một ảnh lớn và copy ngắn thay vì thêm nhiều card nhỏ.

## 7. Trang danh mục, tìm kiếm, thể loại và quốc gia

- Catalog header ngắn hơn, có eyebrow, title, mô tả và số kết quả.
- Filter là panel nổi gọn, sticky vừa đủ trên desktop và wrap sạch trên mobile.
- Poster grid desktop tối đa 5–6 cột tùy viewport; mobile 2 cột với khoảng cách
  đều.
- Card có hover preview nhẹ trên desktop; mobile không phụ thuộc hover.
- Empty state có hướng dẫn tiếp theo và liên kết khám phá.
- Trang Thể loại/Quốc gia dùng directory cards có index, icon nhỏ và hover
  underline/arrow; danh sách phải đúng canonical navigation.

## 8. Trang chi tiết phim

- Backdrop hero có overlay nhiều lớp, poster neo ở vùng nội dung.
- Title và CTA là điểm nhấn chính; metadata xếp theo thứ tự đọc tự nhiên.
- Detail panel chia thành thông tin, nội dung phim, cast và episodes.
- Danh sách tập dùng grid compact; tập hiện tại có thanh đỏ bên trái và nền
  Ruby nhạt.
- Related shelf dùng cinematic rail nhưng không làm loãng phần thông tin chính.

## 9. Trang xem phim

- Player nằm trong vùng tối nhất, có shell rõ và trạng thái media error dễ hiểu.
- Episode list là panel phụ trên desktop, chuyển thành vùng nằm dưới player trên
  mobile.
- Previous/next episode dùng CTA phụ; current episode luôn nhận diện được.
- Footer không chen vào vùng player và không làm mất focus khi điều khiển.

## 10. Account, auth và admin

### Account/auth

- Auth card là panel premium nhỏ, contrast cao, field focus đỏ và lỗi hiển thị
  rõ nhưng không gây hoảng.
- Account dashboard dùng summary tiles và activity blocks với density vừa phải.

### Admin

- Giữ mô hình Control Room đã có nhưng chuyển sang hierarchy tinh gọn hơn:
  sidebar mảnh, topbar rõ, content surface rộng.
- Dashboard ưu tiên chỉ số, trạng thái hệ thống, activity và hành động chính.
- Table, filter, modal, forms và status badge dùng chung token.
- Admin login độc lập, không hiển thị sidebar.

## 11. Motion system

- Một page-load reveal có kiểm soát cho hero và section đầu tiên.
- Hover chỉ nâng card nhẹ, không zoom quá mạnh.
- Rail depth dùng perspective nhẹ, không nghiêng poster quá mức.
- Autoplay dừng khi pointer/touch/focus, tab hidden hoặc reduced motion.
- Không dùng hiệu ứng chớp, layout shift hoặc transition kéo dài không cần thiết.
- `prefers-reduced-motion` tắt autoplay, zoom backdrop và transform động.

## 12. Component boundaries

- `src/lib/catalog/navigation.ts`: canonical menu data và slug.
- `src/components/site/site-header.tsx`: header, desktop mega-menu, mobile
  drawer và search toggle.
- `src/components/site/cinematic-rail.tsx`: rail phim, depth, autoplay,
  controls và accessibility.
- `src/components/site/poster-card.tsx`: card phim dùng cho grid.
- `src/components/site/catalog-header.tsx` và
  `src/components/site/catalog-filter-bar.tsx`: catalog context.
- `src/components/site/site-shell.tsx`: shared shell và footer.
- `src/app/globals.css`: token, layout primitives, responsive behavior và
  motion utilities; tránh thêm selector legacy ghi đè không cần thiết.

Component mới phải nhận props dữ liệu đã có, không tự gọi API hoặc tự quyết
định quyền truy cập.

## 13. Ranh giới dữ liệu và bảo mật

- Không thay đổi API, repository, route handler, Supabase migration, auth flow
  hoặc middleware.
- Không đưa thông tin nhạy cảm vào UI debug hoặc client bundle.
- Không dùng menu data để suy đoán quyền người dùng.
- Không chỉnh sửa hoặc ghi file trong `rophim`.

## 14. Kiểm thử và tiêu chí nghiệm thu

### Tự động

- `npm run typecheck`
- `npm run lint`
- `npm test`

### Visual/interaction

- Mobile: 360px, 390px, 430px.
- Desktop: 1280px, 1440px.
- Header: compact, scroll state, mega-menu, drawer, Escape, keyboard focus.
- Homepage: hero, rail swipe, rail depth, autoplay pause, reduced motion.
- Catalogue/search/detail/watch/account/admin login/dashboard.
- Route menu Thể loại và Quốc gia phải dẫn đúng slug và hiển thị label có dấu.
- Không có nội dung bị che dưới menu hoặc footer.
- `rophim` không thay đổi.


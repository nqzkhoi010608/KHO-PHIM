# Kho Phim Premium Mobile UX/UI Design

## 1. Mục tiêu

Nâng cấp trải nghiệm Kho Phim theo cấu trúc khám phá nội dung của `rophim`,
nhưng tạo nhận diện riêng bằng hệ màu đỏ điện ảnh, ánh sáng có chủ đích,
header chuyên nghiệp và các dải phim có chiều sâu trên mobile.

Phạm vi của đợt này là lớp trải nghiệm và trình bày. API phim, route hiện có,
ranh giới Supabase, dữ liệu demo, xác thực và bảo mật được giữ nguyên. Thư mục
`rophim` chỉ được dùng làm tài liệu đối chiếu và không được chỉnh sửa.

## 2. Tiêu chí thành công

- Người dùng nhận ra ngay hierarchy: thương hiệu → điều hướng → tìm kiếm →
  nội dung nổi bật → các dải phim → chi tiết.
- Header desktop và mobile có cùng ngôn ngữ thị giác, không bị rời rạc giữa
  các kích thước màn hình.
- Menu cha–con hiển thị đủ, đúng thứ tự và dẫn tới route hiện có.
- Rail phim trên mobile có thể vuốt tự nhiên, có snap theo thẻ, chỉ báo được
  nội dung còn phía sau và không làm mất khả năng truy cập từng phim.
- Chuyển động tạo cảm giác cao cấp nhưng không làm người dùng mất quyền kiểm
  soát; hỗ trợ `prefers-reduced-motion`.
- Các trang public, detail, watch, account và admin dùng chung token, khoảng
  cách, trạng thái focus, badge và quy tắc tương phản.
- Không có thay đổi trong `rophim`.

## 3. Định hướng thị giác

### 3.1 Bảng màu

- `Void` — `#070A10`: nền chính, tạo độ sâu.
- `Night` — `#0D111A`: nền phụ và vùng chuyển tiếp.
- `Panel` — `#151B26`: surface của card, menu và panel.
- `Raised` — `#202938`: surface nổi, hover và active surface.
- `Signal Red` — `#F02B4F`: CTA, active, focus ring và điểm dẫn hướng.
- `Ruby` — `#B80F34`: gradient đổ sâu, shadow và pressed state.
- `Rose Light` — `#FF7187`: text nhấn trên nền tối và highlight.
- `Paper` — `#F5F7FB`: tiêu đề và nội dung chính.
- `Mist` — `#A5ADBC`: nội dung phụ, metadata và hint.

Ánh sáng dùng theo lớp: một vùng đỏ chủ đạo quanh hành động chính, một vùng
đỏ tối để tạo chiều sâu và nền xanh-đen yên để poster vẫn là tâm điểm. Không
dùng glow đỏ trên mọi thành phần; glow chỉ dành cho active state, hero và CTA.

### 3.2 Typography

Giữ font hệ thống/hiện có để tránh tải font dư thừa, nhưng chuẩn hóa scale:

- Hero title: đậm, sát dòng, tối đa hai dòng trên mobile.
- Page title: đậm vừa, không viết hoa toàn bộ.
- Section title: rõ ràng, có marker đỏ mảnh.
- Metadata: nhỏ, tương phản vừa, không dùng màu đỏ cho toàn bộ chuỗi.
- Button: câu lệnh ngắn, sentence case, không thêm ký hiệu trang trí không cần
  thiết.

### 3.3 Nguyên tắc bố cục

- Hero là vùng có tính điện ảnh duy nhất được phép chiếm nhiều không gian.
- Dưới hero là feed một cột rõ ràng, các nhóm phim được chia thành rail có
  tiêu đề, mô tả ngắn hoặc nhãn ngữ cảnh và liên kết xem tất cả.
- Poster giữ tỷ lệ ổn định, tiêu đề không bị đẩy xuống bởi metadata không đều.
- Card có bán kính lớn hơn ở panel/hero; card phim dùng bán kính vừa để tránh
  cảm giác tất cả thành phần đều là một chiếc pill.
- Desktop dùng khoảng thở lớn hơn; mobile ưu tiên một thẻ rưỡi đến hai thẻ
  nhìn thấy để tạo tín hiệu “còn nội dung phía sau”.

## 4. Kiến trúc điều hướng

Tạo một nguồn dữ liệu menu dùng chung, dự kiến tại
`src/lib/catalog/navigation.ts`. Module này chỉ chứa label, slug, nhóm và
thứ tự hiển thị; không gọi API và không thay đổi dữ liệu phim.

### 4.1 Menu cấp cao

- Trang chủ → `/`
- Phim lẻ → `/phim-le`
- Phim bộ → `/phim-bo`
- Thể loại → `/the-loai`
- Quốc gia → `/quoc-gia`
- Hoạt hình → `/hoat-hinh`

### 4.2 Thể loại

Thứ tự chuẩn:

1. Hành Động
2. Cổ Trang
3. Chiến Tranh
4. Viễn Tưởng
5. Bí Ẩn
6. Âm Nhạc
7. Tình Cảm
8. Tâm Lý
9. Thể Thao
10. Phiêu Lưu
11. Kinh Dị
12. Hoạt Hình
13. Học Đường
14. Hài Hước
15. Hình Sự
16. Võ Thuật
17. Khoa Học
18. Chính Kịch
19. Gia Đình
20. Lãng Mạn

### 4.3 Quốc gia

Thứ tự chuẩn:

1. Trung Quốc
2. Thái Lan
3. Hồng Kông
4. Pháp
5. Nga
6. Đức
7. Thổ Nhĩ Kỳ
8. Brazil
9. Hàn Quốc
10. Âu Mỹ
11. Ấn Độ
12. Canada
13. Philippines
14. Tây Ban Nha
15. Indonesia
16. Hà Lan
17. Nhật Bản
18. Đài Loan
19. Anh
20. Việt Nam
21. Úc
22. Ý
23. Malaysia

### 4.4 Hành vi menu

Desktop:

- Header cố định, trong suốt khi ở đầu trang và chuyển thành glass panel khi
  cuộn.
- Thể loại và Quốc gia mở mega-menu theo hover hoặc focus, nhưng không phụ
  thuộc hover để người dùng bàn phím vẫn thao tác được.
- Mega-menu chia cột, có tiêu đề nhóm, trạng thái active và vùng scroll nội
  bộ nếu danh sách dài.
- Search là hành động nổi bật thứ hai sau logo, có trạng thái focus rõ.

Mobile:

- Không dùng bottom navigation.
- Mở drawer toàn màn hình với vùng header riêng, nút đóng cố định và nền mờ.
- Phim lẻ và Phim bộ là link trực tiếp.
- Thể loại và Quốc gia là accordion độc lập, chỉ một nhóm mở tại một thời
  điểm để tránh drawer quá dài.
- Có nút tìm kiếm riêng và đóng drawer sau khi chọn route.

## 5. Hero và hệ thống rail 3D

### 5.1 Hero

- Hero dùng backdrop phủ toàn chiều ngang, có lớp wash từ nền về ảnh.
- Nội dung căn trái trên desktop, căn trái có giới hạn chiều rộng trên mobile.
- CTA chính màu Signal Red; CTA phụ là surface sáng trung tính.
- Thumbnail desktop nằm trong vùng cuối hero; mobile dùng nút trước/sau và
  chỉ báo tiến trình.
- Tự chuyển hero chỉ khi tab đang hiển thị; chạm hoặc điều khiển thủ công sẽ
  tạm dừng một khoảng ngắn.

### 5.2 Rail thông thường

Component dự kiến: `MovieRail` hoặc tách thành `CinematicRail` dùng chung.

- Container ngang với `overflow-x: auto`, `scroll-snap-type: x mandatory` và
  `scroll-padding-inline` theo gutter.
- Mỗi poster có kích thước responsive; mobile hiển thị khoảng 2.1 poster,
  desktop chuyển sang grid ngang có nút trái/phải.
- Vuốt tay là cơ chế chính trên mobile; nút điều hướng chỉ hiển thị trên
  desktop hoặc khi thiết bị có hover.
- Chạm vào card không bị chặn bởi lớp transform; link bao toàn thẻ vẫn là
  vùng tương tác duy nhất.

### 5.3 Rail có chiều sâu

Chỉ dùng cho một hoặc hai rail nổi bật để tránh lạm dụng hiệu ứng:

- Wrapper có `perspective` nhẹ.
- Card ở tâm/đang gần vùng nhìn thấy có `translateZ` và scale lớn hơn.
- Card hai bên giảm opacity và scale nhẹ, không nghiêng quá mạnh gây méo
  poster.
- Khi vuốt, hiệu ứng chuyển theo vị trí cuộn; khi dừng, thẻ gần tâm snap vào
  vị trí dễ đọc.
- Tự lướt chỉ dùng ở rail nổi bật, delay dài và dừng ngay khi có `pointerdown`,
  `touchstart`, focus hoặc người dùng cuộn trang.
- Rail tự động có nút tạm dừng hoặc trạng thái điều khiển tương đương; mọi
  nội dung vẫn phải truy cập được từ trang danh mục.

### 5.4 Motion và accessibility

- Tôn trọng `prefers-reduced-motion: reduce`: tắt autoplay, translateZ động,
  zoom backdrop và transition dài.
- Không dùng hiệu ứng chớp nhanh hoặc thay đổi layout khi slide chuyển.
- Focus ring Signal Red có độ tương phản rõ trên nền Night.
- Nút điều hướng có `aria-label`; rail có tên section; ảnh poster có alt có
  nghĩa; các nút chỉ có icon phải có tên truy cập.

## 6. Chi tiết theo trang

### Trang chủ

Hero điện ảnh → nhóm chủ đề dạng grid → rail mới cập nhật → rail theo quốc gia
hoặc thể loại → rail top 10 → khu quảng bá → rail anime → lời mời đăng nhập.

### Trang danh mục, thể loại, quốc gia và tìm kiếm

- Header trang có tiêu đề, mô tả ngắn và tổng số kết quả nếu có.
- Bộ lọc là surface riêng, ưu tiên các thao tác thường dùng và giữ vị trí dễ
  tìm trên mobile.
- Grid poster desktop có mật độ đều; mobile dùng hai cột, không ép tiêu đề
  thành nhiều dòng quá dài.
- Empty state có hướng dẫn tiếp theo, không chỉ hiện một câu báo trống.

### Trang chi tiết phim

- Backdrop hero làm nền, poster neo ở desktop và chuyển lên đầu trên mobile.
- Tiêu đề, tên gốc, rating, năm, chất lượng và trạng thái tập dùng cùng một
  hàng metadata có thứ bậc.
- CTA xem phim là điểm đỏ chính; yêu thích là hành động phụ.
- Nội dung mô tả, thể loại, quốc gia, diễn viên và danh sách tập chia thành
  panel rõ ràng.

### Trang xem phim

- Player là vùng tối nhất và có viền focus rõ.
- Danh sách tập dùng rail/drawer phù hợp viewport; tập hiện tại có Signal Red.
- Các thao tác tiếp theo, tập trước/tập sau và trạng thái không phát được media
  phải có wording rõ ràng.

### Account và admin

- Giữ hệ token đỏ–đen, nhưng giảm glow để ưu tiên dữ liệu và thao tác.
- Admin dùng sidebar desktop, drawer mobile, topbar có trạng thái phiên và
  page heading nhất quán.
- Login admin là màn hình độc lập, không hiển thị sidebar quản trị.

## 7. Ranh giới dữ liệu và bảo mật

- Không thay đổi API phim, repository, route handler, schema Supabase hoặc
  middleware bảo vệ route.
- Không đưa logic slug hóa vào nhiều component; dùng một helper từ module menu.
- Không dùng dữ liệu menu để suy đoán quyền truy cập hoặc trạng thái tài khoản.
- Không chỉnh sửa, di chuyển hoặc sao chép mã trong `rophim` vào đó.

## 8. Kế hoạch kiểm thử

- TypeScript, ESLint và test hiện có.
- Kiểm tra route cho từng mục menu thể loại/quốc gia.
- Kiểm tra keyboard focus cho header, mega-menu, drawer và rail controls.
- Kiểm tra mobile viewport: 360px, 390px và 430px; desktop: 1280px và
  1440px.
- Kiểm tra touch/scroll snap, hover desktop và `prefers-reduced-motion`.
- Chụp kiểm tra trang chủ, danh mục, chi tiết phim, xem phim, đăng nhập admin
  và dashboard admin.


## Phần A: Đọc hiểu
### Câu A1: Viewport & Mobile-First
1: Thẻ <meta viewport> chuẩn và giải thích
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
Giải thích: 
 - name="viewport": Khai báo thiết lập vùng hiển thị (viewport) cho thiết bị di động.
 - width=device-width: Chiều rộng của trang web bằng đúng chiều rộng màn hình thiết bị.
 - initial-scale=1.0: Mức zoom ban đầu là 100% (1 lần). Trang web không bị tự động phóng to hoặc thu nhỏ khi tải lần đầu.
2: Nếu thiếu thẻ viewport thì iPhone hiển thị như thế nào?
Nếu không có: <meta name="viewport" ...> iPhone sẽ giả định trang web có chiều rộng khoảng 980px rồi tự động thu nhỏ toàn bộ trang để vừa màn hình. Kết quả chữ rất nhỏ, người dùng zoom để đọc, layout responsive không hoạt động đúng, các phần tử desktop bị thu nhỏ lại
3. Mobile-First và Desktop-First khác nhau thế nào?
   - Mobile-First: CSS mặc định cho mobile, Dùng min-width, Mở rộng dần khi màn hình lớn hơn, Ưu tiên thiết bị di động
   - Desktop-First: CSS mặc định cho desktop, Dùng max-width, Thu gọn dần khi màn hình nhỏ hơn, Ưu tiên máy tính
Ví dụ: 
      Mobile-First (breakpoint 768px)
```css
/* Mobile mặc định */
.product-grid {
    grid-template-columns: 1fr;
}

/* Tablet trở lên */
@media (min-width: 768px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
```
     Desktop-First (breakpoint 768px)
```css
/* Desktop mặc định */
.product-grid {
    grid-template-columns: repeat(4, 1fr);
}

/* Tablet và Mobile */
@media (max-width: 768px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
```
**Tại sao Mobile-First được khuyên dùng?
  - Mobile-First viết CSS mặc định cho điện thoại và dùng @media (min-width: ...) để mở rộng lên tablet, desktop nên được sử dụng phổ biến hơn trong các dự án hiện nay.

### Câu A2: Breakpoints
Các breakpoints chuẩn thường dùng theo Bootstrap:

Breakpoint       |Kích thước màn hình| Thiết bị đại diện	| Ví dụ lưới sản phẩm
Extra Small      |< 576px	    | Điện thoại nhỏ (iPhone SE)| 1 cột
Small (SM)	     | ≥ 576px	| Điện thoại lớn	        | 2 cột
Medium (MD)      |	≥ 768px	| Tablet (iPad)	            | 2 cột
Large (LG)	     | ≥ 992px	| Laptop	                | 3 cột
Extra Large      | ≥ 1200px	| Desktop	                | 4 cột
Extra Extra Large |  ≥ 1400px  | Màn hình lớn           | 5–6 cột

Ví dụ CSS: 
```css
/* Mobile */
.product-grid {
    display: grid;
    grid-template-columns: 1fr;
}

/* ≥ 576px */
@media (min-width: 576px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* ≥ 992px */
@media (min-width: 992px) {
    .product-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* ≥ 1200px */
@media (min-width: 1200px) {
    .product-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
```
### Câu A3: Media Queries
| Chiều rộng màn hình | `.container` width |
|---------------------|--------------------|
| 375px (iPhone SE) | 100% |
| 600px | 540px |
| 800px | 720px |
| 1000px | 960px |
| 1400px | 1140px |
### Câu A4: SCSS Basics
1. Variables (`$primary-color`)
Variables giúp lưu trữ các giá trị dùng nhiều lần như màu sắc, font chữ, khoảng cách,...
```css
$primary-color: #3498db;
$text-color: #333;

.button {
    background-color: $primary-color;
    color: $text-color;
}
```
2. Nesting (viết CSS lồng nhau)
SCSS cho phép viết các selector theo cấu trúc lồng nhau giống HTML.
```css
.card {
    background: white;
}

.card .card-title {
    font-size: 20px;
    color: blue;
}

.card:hover {
    box-shadow: 0 0 10px gray;
}
```
3. Mixins (`@mixin`, `@include`)
Mixins giống như "hàm" trong SCSS, giúp tái sử dụng nhiều đoạn CSSKhai báo mixin:
```css
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
```
Sử dụng:
```css
.container {
    @include flex-center;
}

Compile thành:

.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
```
Lợi ích:Tránh lặp code. Có thể dùng cho responsive, flexbox, shadow,...
4. `@extend` / Inheritance
```css
.button {
    padding: 10px;
    border-radius: 5px;
}

.primary-button {
    @extend .button;
    background: blue;
    color: white;
}

Compile thành:
.button,
.primary-button {
    padding: 10px;
    border-radius: 5px;
}

.primary-button {
    background: blue;
    color: white;
}
```
Tại sao trình duyệt KHÔNG đọc được file .scss?
  - Vì: SCSS là ngôn ngữ tiền xử lý (preprocessor), không phải CSS chuẩn.
Cần bước gì để chuyển SCSS → CSS?
  - Phải biên dịch (compile) file .scss thành file .css trước khi trình duyệt sử dụng.
## Phần B
### Câu B3:
Lệnh biên dịch SCSS:  npx sass scss/style.scss css/style.css --watch

## Phần C
### Câu C1:
1: Mobile (375px)
   - Navigation thay đổi thế nào? (hamburger? dropdown?)
       Thanh tìm kiếm vẫn được giữ ở phía trên vì đây là chức năng chính. Các mục như Kênh Người Bán, Tải ứng dụng, Hỗ trợ, Đăng nhập/Đăng ký thường bị ẩn hoặc thu gọn. Giao diện không hiện nhiều menu như desktop.
   - Lưới content thay đổi mấy cột?
       Sản phẩm thường hiển thị khoảng 2 cột trên một hàng.
   - Elements nào bị ẩn trên mobile?
       Các menu phụ ở header, banner lớn, một số danh mục phụ và phần thông tin chi tiết bị ẩn để tiết kiệm diện tích.
   - Font size có thay đổi không?
       Font chữ nhỏ hơn desktop, khoảng cách giữa các phần tử cũng hẹp hơn.
2: Tablet (768px)
   - Navigation thay đổi thế nào? (hamburger? dropdown?)
       Thanh tìm kiếm dài hơn. Một số icon hoặc menu có thể xuất hiện rõ hơn, nhưng vẫn chưa đầy đủ như desktop.
   - Lưới content thay đổi mấy cột?
       Sản phẩm thường hiển thị khoảng 3–4 cột trên một hàng.
   - Elements nào bị ẩn trên mobile?
       Một số menu phụ vẫn bị ẩn hoặc rút gọn, nhưng banner và danh mục hiển thị rõ hơn mobile.
   - Font size có thay đổi không?
       Font chữ lớn hơn mobile một chút, dễ đọc hơn

3: Desktop (1440px)
   - Navigation thay đổi thế nào? (hamburger? dropdown?)
       Header hiển thị nhiều mục như Kênh Người Bán, Tải ứng dụng, Kết nối, Thông báo, Hỗ trợ, Đăng ký, Đăng nhập. Thanh tìm kiếm rộng và dễ thao tác.
   - Lưới content thay đổi mấy cột?
       Sản phẩm thường hiển thị khoảng 5–6 cột trên một hàng.
   - Elements nào bị ẩn trên mobile?
       Hầu như không bị ẩn nhiều. Các banner, danh mục, menu phụ và thông tin sản phẩm được hiển thị đầy đủ hơn.
   - Font size có thay đổi không?
       Font chữ lớn hơn mobile, khoảng cách giữa các thành phần rộng và thoáng hơn.

### Câu C2:
1. Wireframe Mobile — 375px
Ở mobile, giao diện nên xếp 1 cột để dễ đọc và dễ thao tác.
┌────────────────────────┐
│ Logo        ☎ Đặt bàn  │
├────────────────────────┤
│      HERO IMAGE        │
│  Ảnh món ăn / nhà hàng │
├────────────────────────┤
│      FORM ĐẶT BÀN      │
│  Ngày                  │
│  Giờ                   │
│  Số người              │
│  Ghi chú               │
│  [Đặt bàn]             │
├────────────────────────┤
│      GRID ẢNH MÓN ĂN   │
│   Ảnh 1                │
│   Ảnh 2                │
│   Ảnh 3                │
│   Ảnh 4                │
│   Ảnh 5                │
│   Ảnh 6                │
├────────────────────────┤
│      GOOGLE MAPS       │
├────────────────────────┤
│        FOOTER          │
└────────────────────────┘
Mobile: 
   Form đặt bàn nằm ngay sau hero để người dùng đặt bàn nhanh.
   Grid ảnh món ăn hiển thị 1 cột.
   Các menu phụ hoặc thông tin dài có thể bị ẩn.
   Không dùng sidebar vì màn hình nhỏ.
2. Wireframe Tablet — 768px
Ở tablet, giao diện rộng hơn nên có thể chia ảnh thành nhiều cột.
┌────────────────────────────────┐
│ Logo              ☎ Đặt bàn    │
├────────────────────────────────┤
│          HERO IMAGE            │
├────────────────────────────────┤
│          FORM ĐẶT BÀN          │
├───────────────┬────────────────┤
│    Ảnh 1      │     Ảnh 2      │
├───────────────┼────────────────┤
│    Ảnh 3      │     Ảnh 4      │
├───────────────┼────────────────┤
│    Ảnh 5      │     Ảnh 6      │
├────────────────────────────────┤
│          GOOGLE MAPS           │
├────────────────────────────────┤
│             FOOTER             │
└────────────────────────────────┘
Tablet:
  Grid ảnh món ăn hiển thị 2 cột.
  Form vẫn nằm phía trên phần ảnh để người dùng dễ thấy.
  Bản đồ nằm dưới grid ảnh, chiếm full width.
  Không cần sidebar riêng.
3. Wireframe Desktop — 1440px
   Ở desktop, có thể chia layout thành 2 cột chính.
   ┌──────────────────────────────────────────────┐
│ Logo                         ☎ 0123 456 789 │
├──────────────────────────────────────────────┤
│                 HERO IMAGE                   │
├──────────────────────────────┬───────────────┤
│        GRID ẢNH MÓN ĂN        │ FORM ĐẶT BÀN │
│ ┌──────┬──────┬──────┐       │ Ngày          │
│ │Ảnh 1 │Ảnh 2 │Ảnh 3 │       │ Giờ           │
│ ├──────┼──────┼──────┤       │ Số người      │
│ │Ảnh 4 │Ảnh 5 │Ảnh 6 │       │ Ghi chú       │
│ └──────┴──────┴──────┘       │ [Đặt bàn]     │
├──────────────────────────────┴───────────────┤
│                  GOOGLE MAPS                 │
├──────────────────────────────────────────────┤
│                    FOOTER                    │
└──────────────────────────────────────────────┘

Desktop:
  Layout dùng 2 cột: bên trái là grid ảnh, bên phải là form đặt bàn.
  Grid ảnh món ăn hiển thị 3 cột.
  Form đóng vai trò như sidebar bên phải.
  Google Maps nằm dưới phần nội dung chính, chiếm toàn bộ chiều ngang.

CSS Skeleton Mobile-First
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
}

/* Mobile first */
.page {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
}

.hero {
    min-height: 300px;
    background: #ddd;
}

.booking-form {
    padding: 20px;
    background: #f8f8f8;
}

.food-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 20px;
}

.food-item {
    min-height: 160px;
    background: #ddd;
}

.map {
    min-height: 300px;
    background: #ccc;
}

.footer {
    padding: 20px;
    text-align: center;
    background: #222;
    color: white;
}

/* Tablet >= 768px */
@media (min-width: 768px) {
    .food-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .hero {
        min-height: 400px;
    }
}

/* Desktop >= 1024px */
@media (min-width: 1024px) {
    .main-layout {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 30px;
        padding: 30px;
    }

    .food-grid {
        grid-template-columns: repeat(3, 1fr);
        padding: 0;
    }

    .booking-form {
        align-self: start;
    }

    .map {
        margin: 0 30px;
    }
}

/* Desktop lớn >= 1440px */
@media (min-width: 1440px) {
    .page {
        max-width: 1200px;
        margin: 0 auto;
    }

    .hero {
        min-height: 500px;
    }
}
```
HTML tương ứng
```html
<div class="page">
    <header class="header">Logo + Điện thoại</header>
    <section class="hero">Hero Image</section>

    <main class="main-layout">
        <section class="food-grid">
            <div class="food-item">Ảnh 1</div>
            <div class="food-item">Ảnh 2</div>
            <div class="food-item">Ảnh 3</div>
            <div class="food-item">Ảnh 4</div>
            <div class="food-item">Ảnh 5</div>
            <div class="food-item">Ảnh 6</div>
        </section>

        <form class="booking-form">
            Form đặt bàn
        </form>
    </main>

    <section class="map">Google Maps</section>
    <footer class="footer">Footer</footer>
</div>
```
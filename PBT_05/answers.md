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

PHẦN A — KIỂM TRA ĐỌC HIỂU
Câu A1 — 3 Cách nhúng CSS
 Cách 1: Inline CSS
  <h1 style="color: pink; font-size: 32px;">
    À nhon ha sê ô
  </h1>
  Ưu điểm: 
    - Viết nhanh, áp dụng trực tiếp lên element
    - Override style rất mạnh
    - Phù hợp test nhanh
  Nhược điểm:
    - Không tái sử dụng được
    - Code HTML bị rối
    - Khó maintain khi project lớn
    - Không tận dụng được cache của browser
  Nên dùng khi cần test nhanh, inline CSS chỉ nên dùng trong trường hợp đặc biệt hoặc override tạm thời
  Cách 2: Internal CSS
  <!DOCTYPE html>
<html>
<head>
    <style>
        h1 {
            color: blue;
            font-size: 32px;
        }
    </style>
</head>
<body>
    <h1>Xin chào</h1>
</body>
</html>
  Ưu điểm:
    - Quản lý CSS tập trung hơn inline
    - Không cần tạo file riêng
    - Dễ thử nghiệm giao diện
  Nhược điểm:
    - Chỉ dùng cho 1 trang HTML
    - Không tái sử dụng giữa nhiều trang
    - File HTML sẽ dài hơn
  Nên dùng khi tạo 1 web đơn giản, demo nhanh
  internal CSS phù hợp cho prototype hoặc single-page.
  Cách 3: External CSS
  index.html
  <head>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <h1>Xin chào</h1>
</body>
styles.css
h1 {
    color: blue;
    font-size: 32px;
}
  Ưu điểm: 
    - Tái sử dụng cho nhiều trang
    - Dễ maintain
    - Browser cache được file CSS
    - HTML và CSS tách riêng rõ ràng
    - Chuẩn dùng trong production
  Nhược điểm:
    - Phải tạo thêm file CSS
    - Nếu link sai thì CSS không hoạt động
  Nên dùng trên web thật, dự án lớn, team nhiều người
  external CSS là cách chuẩn cho production vì caching, maintainability và reusability
Nếu cùng 1 element có cả 3 cách CSS thì cách nào “thắng”?
<head>
    <style>
        h1 {
            color: green;
        }
    </style>

    <link rel="stylesheet" href="style.css">
</head>

<body>
    <h1 style="color: red;">
        Hello
    </h1>
</body>
/* style.css */
h1 {
    color: blue;
}
   Kết quả cuối cùng: Màu đỏ
    Vì:
     External đặt màu xanh
     Internal ghi đè thành xanh lá
     Inline có độ ưu tiên cao nhất nên thành đỏ
   Đây là do cơ chế CSS Cascade và Specificity: rule nào có độ ưu tiên cao hơn sẽ được áp dụng. Inline CSS có specificity mạnh hơn internal và external nên thắng
Câu A2: CSS Selectors — Dự đoán kết quả
    - h1 Chọn: "ShopTLU"
    - .price Chọn: "25.990.000đ"  "45.990.000đ"
    - #app header chọn toàn bộ element <header> bên trong id="app" gồm nội dung:
         "ShopTLU"
         "Home"
         "Products"
         "About"
    - nav a:first-child chọn: "Home" 
    - .product.featured h2 chọn: "MacBook Pro"
    - article > p chọn tất cả thẻ <p> là con trực tiếp của <article>:
          Trong article 1: "25.990.000đ" "Mô tả sản phẩm..."
          Trong article 2: "45.990.000đ" "Mô tả sản phẩm..."
    - a[href="/"] chọn: "Home"
    - .top-bar.dark h1 chọn: "ShopTLU"
Câu A3: 
/* Trường hợp 1: content-box (mặc định) */
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị =  400 + 40 + 10 = 450px
→ Không gian chiếm trên trang = 450 + margin trái/phải (10 × 2)
                              = 470px
content-box làm padding và border “phình ra ngoài”.
/* Trường hợp 2: border-box */
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị =  400px
→ Kích thước content thực tế = 400 - 40 - 10
                             = 350px
→ Không gian chiếm trên trang = 400 + margin trái/phải (20px)
                              = 420px
/* Trường hợp 3: Margin collapse */
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
→ Khoảng cách giữa box-a và box-b = 40px
→ KHÔNG PHẢI 65px vì Do hiện tượng margin collapse:
    - Hai margin dọc gặp nhau
    - Browser KHÔNG cộng
    - Chỉ lấy margin lớn hơn
Margin dọc giữa 2 block elements gộp lại = lấy cái lớn hơn.
Nâng cao: Nếu .box-a có margin-bottom: -10px và .box-b có margin-top: 40px, khoảng cách =  40 + (-10) = 30px
Khi có margin âm:
Browser cộng hai giá trị lại
Margin âm kéo element lại gần nhau hơn
   -> 40px bị giảm 10px → còn 30px

Câu A4: 
p { color: black; }                    /* Rule A */
.price { color: blue; }               /* Rule B */
#main-price { color: red; }           /* Rule C */
p.price { color: green; }             /* Rule D */

Tính specificity score
Rule A
p { color: black; }
ID = 0
Class = 0
Tag = 1
Specificity: (0, 0, 1)
Rule B
.price { color: blue; }
ID = 0
Class = 1
Tag = 0
Specificity: (0, 1, 0)
Rule C
#main-price { color: red; }
ID = 1
Class = 0
Tag = 0
Specificity: (1, 0, 0)
Rule D
p.price { color: green; }
ID = 0
Class = 1
Tag = 1
Specificity: (0, 1, 1)
Element có: Màu đỏ
Vì selector #main-price có specificity cao nhất. ID > Class/Pseudo > Tag
Nếu thêm inline style
<p class="price"
   id="main-price"
   style="color: orange;">
   → Element có:  Màu cam
   vì !important > inline > #id > .class > tag > *
Tài liệu tham chiếu:tuan_2_css_core/09_css_selectors.md
Nếu Rule A thêm !important
p { color: black !important; }
nên dù Rule A chỉ là tag selector, !important vẫn ghi đè các rule thường.
→ Element sẽ có: Màu đen
!important declarations
↓
Inline styles
↓
ID selectors
↓
Class selectors
↓
Tag selectors
Tài liệu tham chiếu:tuan_2_css_core/10_inheritance_cascading.md
PHẦN B — THỰC HÀNH CODE
Bài B1 — Style trang Profile
# Các loại selector đã sử dụng
1. Element selector
- body
- header
- table
- th
2. Class selector
- .active
3. ID selector
- #about
- #skill
- #contact
4. Descendant selector
- nav a
- #about p
- #contact a
5. Pseudo-class selector
- nav a:hover
- tbody tr:nth-child(even)
- tbody tr:hover
PHẦN C — DEBUG & SUY LUẬN
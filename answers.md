PHẦN A — KIỂM TRA ĐỌC HIỂU
Câu A1:
1: Các bước khi gõ https://shopee.vn vào trình duyệt và nhấn Enter
   B1: Gửi request từ trình duyệt laptop 
   B2: DNS Lookup chuyển tên miền thành địa chỉ IP 
   B3: Requuest đi qua Internet đến với Server 
   B4: Sever nhận thông tin và xử lý 
   B5: Server trả thông tin về HTTP Response, đi ngược Internet về laptop 
   B6: Browser Rendering nhận file từ HTMl từ sever và hoàn thiện rồi hiển thị trên laptop
Tài liệu tham chiếu: tuan_1_html5/01_introduction_html_universe.md
2:
   Tab Network cho thấy thông tin:
    - Danh sách các request
    - Thông tin chi tiết từng request
    - Thời gian tải
    - Kích thước 
    - Trạng thái
    - Loại tài nguyên
   Screenshot tab Network Shoppe
    ![Uploading z7753400368734_a570ac78c1a24324d836c45fb39d4630.png…]()

Câu A2:
 Trang web dưới đây bị Google đánh giá SEO thấp vì 
 - Dùng <div class="header"> thay vì thẻ <header>
 - Dùng  <div class="menu"> thay vì thẻ <nav> để điều hướng menu
 - Dùng <div class="main"> thay vì thẻ <main> 
 - Dùng <div class="footer">
Sửa code:
<header>
    <div class="logo">ShopTLU</div>
    <nav>
        <div><a href="/">Trang chủ</a></div>
        <div><a href="/products">Sản phẩm</a></div>
    </nav>
</header>header>
<main>
    <div class="product">
        <div class="title">iPhone 16 Pro</div>
        <div class="price">25.990.000đ</div>
        <img src="iphone.jpg" alt="iPhone 16 Pro">
    </div>
</main>
<footer>© 2026 ShopTLU</footer>
Tài liệu tham chiếu: tuan_1_html5/04_visible_part_html.md
Câu A3:
Hộp 1
Text A Text B
Hộp 2
Text C Text D
Hộp 3
Câu A4:  
 Giải thích sự khác nhau giữa <thead>, <tbody>, <tfoot>.
  <thead>: phần đầu của bảng
  <tbody>: phần thân bảng
  <tfoot>: phần cuối bảng
 KHÔNG NÊN dùng table để tạo layout trang web vì: 
   - Không đúng ngữ nghĩa <table> sinh ra để hiển thị dữ liệu dạng bảng
   - Khó thiết kế, phức tạp, sửa layout khó
   - Không responsive (không phù hợp mobile)
Tài liệu tham chiếu: tuan_1_html5/05_tables_hyperlinks.md
Phần B - Thực hành
Bài 3: Debug
    - Lỗi 1: Dòng 1 - sai chuẩn - <!DOCTYPE html>
    - Lỗi 2: Dòng 4 - thiếu đóng thẻ </title> - thêm </title>
    - Lỗi 3: Dòng 5 - sai charset="utf8" - sửa charset="utf-8"
    - Lỗi 4: Dòng 8 - đóng thẻ sai - <h1>Welcome to ShopTLU<\h1>
    - Lỗi 5: Dòng 12 - đóng thẻ sai -  <a href="home">Trang chủ<\a>
    - Lỗi 6: Dòng 10 - src thiếu "" - <img src="iphone.jpg">
    - Lỗi 7: Dòng 20 - thiếu thuộc tính alt ảnh - <img src="iphone.jpg" alt="iPhone 16 Pro">
    - Lỗi 8: Dòng 22 - lồng thẻ <b><\b> sai thứ tự - <p>Giá: <b>25.990.000đ</b></p>
    - Lỗi 9: Dòng 40 - dùng 2 thẻ main - dùng <aside>
    - Lỗi 10: Dòng 45 - đóng thẻ thiếu -  <p>Copyright 2026<\p>


PHẦN C — SUY LUẬN
Câu C1:
Câu C2:


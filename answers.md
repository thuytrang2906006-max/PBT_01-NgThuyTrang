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
Bài 4:
   4.1: tag Elements
     - 3 thẻ semantic mà trang shoope sử dụng:
       + <header>: nằm ở phần đầu trang, chứa thanh điều hướng
       + <footer>: nằm ở cuối trang, chứa thông tin liên hệ
       + <section>: dùng để chia nội dung thành từng phần
     -  2 thẻ không dùng đúng semantic:
       + <div id="main">  Dùng <div> cho toàn bộ nội dung chính của trang
       +<div class="ppnvLR"> Bao quanh 1 khu nội dung -> nên dung main hoặc section
    4.2: table
    - Trang không sử dụng thẻ <table> để hiển thị dữ liệu. Thay vào đó, trang sử dụng các thẻ <div> kết hợp với CSS để tạo bố cục dạng bảng. Vì vậy, không có <table> nên cũng không sử dụng các thẻ <thead> và <tbody>.
    4.3: form
    - Form tìm kiếm trên trang có:
        action: không có (mặc định gửi về trang hiện tại)
        method: GET (mặc định)
        Các input types sử dụng: button (nút tìm kiếm)
PHẦN C — SUY LUẬN
Câu C1:
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Chi tiết sản phẩm</title>
</head>
<body>

    <!-- HEADER: chứa logo + navigation chính -->
    <header>
        <nav> <!-- nav vì đây là khu vực điều hướng -->
            <ul> <!-- ul vì menu không có thứ tự -->
                <li><a href="#">Trang chủ</a></li>
                <li><a href="#">Danh mục</a></li>
                <li><a href="#">Liên hệ</a></li>
            </ul>
        </nav>
    </header>

    <!-- BREADCRUMB -->
    <nav aria-label="breadcrumb"> <!-- nav vì đây là điều hướng -->
        <ol> <!-- ol vì breadcrumb có thứ tự -->
            <li><a href="#">Trang chủ</a></li>
            <li><a href="#">Điện thoại</a></li>
            <li>iPhone 16</li>
        </ol>
    </nav>

    <!-- MAIN CONTENT -->
    <main> <!-- main vì đây là nội dung chính của trang -->
        <!-- KHU VỰC SẢN PHẨM -->
        <section> <!-- section vì đây là một khu nội dung riêng -->           
            <!-- ẢNH SẢN PHẨM -->
            <div> <!-- div dùng làm container layout -->
                <figure> <!-- figure vì chứa hình ảnh có ý nghĩa -->
                    <img src="#" alt="Ảnh sản phẩm chính">
                    <figcaption>Ảnh chính</figcaption> <!-- mô tả ảnh -->
                </figure>

                <!-- danh sách ảnh phụ -->
                <div> <!-- div để nhóm các ảnh -->
                    <img src="#" alt="Ảnh 1">
                    <img src="#" alt="Ảnh 2">
                    <img src="#" alt="Ảnh 3">
                    <img src="#" alt="Ảnh 4">
                    <img src="#" alt="Ảnh 5">
                </div>
            </div>

            <!-- THÔNG TIN SẢN PHẨM -->
            <article> <!-- article vì đây là nội dung độc lập (1 sản phẩm) -->
                <h1>Tên sản phẩm</h1> <!-- h1 vì là tiêu đề chính -->

                <p>Giá sản phẩm</p> <!-- p vì là đoạn văn -->

                <p>★★★★★</p> <!-- đánh giá sao -->

                <p>Mô tả sản phẩm</p> <!-- mô tả -->
            </article>

        </section>

        <!-- BẢNG THÔNG SỐ -->
        <section> <!-- section vì là khu nội dung riêng -->
            <h2>Thông số kỹ thuật</h2>

            <table> <!-- table vì dữ liệu dạng bảng -->
                <thead> <!-- thead cho tiêu đề bảng -->
                    <tr>
                        <th>Thuộc tính</th>
                        <th>Giá trị</th>
                    </tr>
                </thead>
                <tbody> <!-- tbody cho dữ liệu -->
                    <tr>
                        <td>Kích thước</td>
                        <td>...</td>
                    </tr>
                    <tr>
                        <td>Pin</td>
                        <td>...</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <!-- ĐÁNH GIÁ / BÌNH LUẬN -->
        <section> <!-- section vì nhóm nội dung review -->
            <h2>Đánh giá</h2>

            <article> <!-- mỗi bình luận là 1 nội dung độc lập -->
                <p>Người dùng A</p>
                <p>Nội dung bình luận...</p>
            </article>

            <article>
                <p>Người dùng B</p>
                <p>Nội dung bình luận...</p>
            </article>
        </section>

    </main>

    <!-- SIDEBAR -->
    <aside> <!-- aside vì nội dung phụ (sản phẩm tương tự) -->
        <h2>Sản phẩm tương tự</h2>

        <article> <!-- mỗi sản phẩm là 1 khối độc lập -->
            <p>Tên sản phẩm</p>
        </article>

        <article>
            <p>Tên sản phẩm</p>
        </article>
    </aside>

    <!-- FOOTER -->
    <footer> <!-- footer cho thông tin cuối trang -->
        <p>© 2026 Cửa hàng</p>
    </footer>

</body>
</html>
Câu 2: 
1. Tại sao không nên lạm dụng <div>?
Nếu dùng quá nhiều <div> thì trang web sẽ thiếu ý nghĩa. Điều này làm cho:

Người dùng dùng screen reader khó phân biệt đâu là menu, nội dung chính hay footer
Công cụ tìm kiếm cũng khó hiểu cấu trúc trang

Dùng các thẻ semantic như <nav>, <main>, <footer> sẽ giúp rõ ràng hơn.

2. Lợi ích của HTML ngữ nghĩa

Tốt cho SEO: Google dễ hiểu nội dung → xếp hạng tốt hơn
Tăng accessibility: Screen reader điều hướng dễ hơn
Dễ bảo trì: Nhìn code là hiểu chức năng luôn
Trải nghiệm tốt hơn: Trang có cấu trúc rõ ràng, chuyên nghiệp hơn

3. Ví dụ đơn giản

<!-- Không nên -->
<div class="btn">Click me</div>

<!-- Nên dùng -->
<button>Click me</button>

Dùng <button> thì trình duyệt tự hỗ trợ nhiều thứ (focus, bàn phím...) nên đỡ phải code thêm.

4. Khi nào vẫn dùng <div>?

Làm layout (container)
Dùng cho CSS (flex, grid, positioning)
Khi không cần ý nghĩa cụ thể


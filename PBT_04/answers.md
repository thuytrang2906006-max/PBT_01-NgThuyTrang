## Phần A - Đọc hiểu
### Câu A1:
 | Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | có | không dùng tọa độ (top, left không tác dụng) | có |  Trạng thái mặc định của mọi phần tử|
| `relative` | Có | So với vị trí gốc của chính nó | Có | Dịch chuyển nhẹ phần tử, làm điểm tọa độ (anchor) cho absolute |
| `absolute` | không | Cha có position ≠ static gần nhất | có | Badge, dropdown, tooltip, overlay |
| `fixed` | không | Viewport (cửa sổ trình duyệt) | không | Chat button, cookie banner, header cố định |
| `sticky` | có | Viewport khi đạt ngưỡng top | Không khi đã dính | Sticky header, sticky sidebar, sticky table header |
Khi nào absolute tham chiếu body?
   position: absolute sẽ tham chiếu tới body (hoặc phần tử gốc của trang) khi không tìm thấy phần tử cha nào có position khác static. Khi đó trình duyệt sẽ tiếp tục tìm lên trên cho tới <html> và lấy đó làm mốc tọa độ.
Khi nào absolute tham chiếu parent?
  Khi phần tử cha gần nhất có:position: relative; 
  hoặc
   position: absolute;
   position: fixed;
   position: sticky;
### Câu A2: 
/* Trường hợp 1 */
.container { display: flex; }
.item { flex: 1; }
/* 4 items → Bố cục =  1 hàng, 4 cột bằng nhau*/
┌─────┬─────┬─────┬─────┐
│  1  │  2  │  3  │  4  │
└─────┴─────┴─────┴─────┘
/* Trường hợp 2 */
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
/* 6 items → Bố cục = 3 hàng 2 cột */
┌─────────┬─────────┐
│    1    │    2    │
├─────────┼─────────┤
│    3    │    4    │
├─────────┼─────────┤
│    5    │    6    │
└─────────┴─────────┘
/* Trường hợp 3 */
.container { display: flex; justify-content: space-between; align-items: center; }
/* 3 items → Bố cục = 1 hàng khoảng cách đều */
┌─────────────────────────────┐
│ [1]        [2]         [3]  │
└─────────────────────────────┘

/* Trường hợp 4 */
.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
/* 3 items → Bố cục = 1 hàng 1 cột */
┌───────┬───────────────────┬───────┐
│ Item1 │       Item2       │ Item3 │
│ 200px │        1fr        │ 200px │
└───────┴───────────────────┴───────┘
/* Trường hợp 5 */
.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
/* 7 items → Bố cục = tổng 3 hàng, item cuối nằm ở hàng thứ 3 cột 1  */
┌─────┬─────┬─────┐
│  1  │  2  │  3  │
├─────┼─────┼─────┤
│  4  │  5  │  6  │
├─────┼─────┼─────┤
│  7  │     │     │
└─────┴─────┴─────┘
## Phần C - Suy luận
### Câu C1: 
Cho 5 tình huống layout thực tế. Với mỗi tình huống, trả lời: 
1. Navigation bar ngang (logo + menu + buttons)
  - dùng flexbox vì navbar là layout 1 chiều. flexbox giúp căn trái, phải, căn giữa dễ dàng với justify-content và align-items.
2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)
  - dùng grid vì đây là layout 2 chiều gồm hàng và cột. Grid giúp chia đều 3 cột và tự động xuống hàng khi có thêm ảnh.
3. Layout blog: main content + sidebar
  - dùng grid vì có nhiều vùng bố cục rõ ràng gồm sidebar và content. Grid phù hợp hơn vì giúp kiểm soát cột dễ ràng.
4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)
  - Dùng Grid. Footer cần chia thành 4 cột đều nhau, grid làm việc này đơn giản bằng grid-template-columns: repeat(4, 1fr).
5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)
  - Dùng Flexox và bên trong card là bố cục 1 chiều theo chiều dọc. DÙng display, flex, flex-direction: colum; và margin-top: auto để nút luôn nằm dưới cùng.
### Câu C2:
**Lỗi 1:** Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống
Vì Các card có lượng nội dung khác nhau nên chiều cao sẽ khác nhau. Nút "Mua" nằm ngay sau nội dung -> card nào ít chữ thì nút ở cao hơn, card nào nhiều chữ thì nút ở thấp hơn.
Sửa code
```css
//biến card thành flex container theo chiều dọc.
.card-container {
    display: flex;
    flex-wrap: wrap;
}

.card {
    width: 30%;
    margin: 1.5%;

    display: flex;
    flex-direction: column;
}
//đẩy nút xuống cuối card nên tất cả nút sẽ thẳng hàng
.btn {
    margin-top: auto;
}
```

**Lỗi 2:** Muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên
Nguyên nhân: do .hero chỉ có display: flex; mặc định flexbox justify-content: flex-start; align-items: stretch;
nên phần tử vẫn nằm góc trên bên trái
Code sửa
```css
.hero {
    height: 100vh;

    display: flex;
  //căn giữa theo chiều ngang
    justify-content: center;
  // căn giữa theo chiều dọc
    align-items: center;
}

.hero-content {
    text-align: center;
}
```

**Lỗi 3:** Sidebar bị co lại khi content quá dài
Nguyên nhân: vì trong flexbox các item mặc định có flex-shrink: 1;
khi content quá lớn, flexbox sẽ thu nhỏ sidebar để đủ chỗ cho content
```css
.layout {
    display: flex;
}

.sidebar {
    width: 250px;
    flex-shrink: 0;
    //ngăn sidebar bị co lại, luôn giữ nguyên 250px.
}

.content {
    flex: 1;
}
```

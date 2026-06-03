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
## Phần C
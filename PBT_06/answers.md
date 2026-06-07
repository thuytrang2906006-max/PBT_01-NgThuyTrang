### PHẦN A — ĐỌC HIỂU (20 điểm)
#### Câu A1 (10đ) — Grid System
| Kích thước | < 768px | 768px - 991px | ≥ 992px |
|------------|---------|---------------|---------|
| Số cột | 1 cột | 2 cột | 4 cột |
| Box layout | Mỗi box chiếm 12/12, xếp dọc | Mỗi box chiếm 6/12, 2 box / hàng| Mỗi box chiếm 3/12, 4 box / hàng |

- Vẽ layout
< 768px:
[ Box 1 ]
[ Box 2 ]
[ Box 3 ]
[ Box 4 ]

768px - 991px:
[ Box 1 ][ Box 2 ]
[ Box 3 ][ Box 4 ]

≥ 992px:
[ Box 1 ][ Box 2 ][ Box 3 ][ Box 4 ]

**Câu hỏi thêm:**
 -  `col-md-6` nghĩa là từ kích thước md (768px) trở lên, mỗi cột sẽ chiếm 6/12 cột của hàng, tương đương 50% chiều rộng.
- Không cần viết `col-sm-12` vì đã có `col-12`. Class `col-12` áp dụng cho mọi kích thước nhỏ hơn md, nên trên mobile mỗi box tự động chiếm toàn bộ chiều ngang.

### Câu A2 - Utilities & Components

#### 1. Class `d-none d-md-block`

- `d-none`: ẩn phần tử (display: none).
- `d-md-block`: từ màn hình md (768px) trở lên sẽ hiển thị dạng block.

=> Kết quả:
- Dưới 768px: phần tử bị ẩn.
- Từ 768px trở lên: phần tử được hiển thị.

---

#### 2. Một số spacing utilities

- `mt-3`: margin-top = 1rem (16px).
- `mb-4`: margin-bottom = 1.5rem (24px).
- `ms-2`: margin-left = 0.5rem (8px).
- `px-4`: padding trái và phải = 1.5rem (24px).
- `mb-auto`: margin-bottom tự động (auto).

Ngoài ra còn có:
- `p-3`: padding tất cả các phía.
- `py-2`: padding trên và dưới.
- `mx-auto`: căn giữa phần tử theo chiều ngang.

---

#### 3. Phân biệt `.container`, `.container-fluid`, `.container-md`

- `.container`
  - Có max-width theo từng breakpoint.
  - Nội dung được căn giữa màn hình.
  - Thường dùng nhất.

- `.container-fluid`
  - Luôn chiếm 100% chiều rộng màn hình.
  - Thường dùng cho banner, hero section, footer.

- `.container-md`
  - Dưới 768px: full width.
  - Từ 768px trở lên: hoạt động giống `.container`, có max-width theo breakpoint.

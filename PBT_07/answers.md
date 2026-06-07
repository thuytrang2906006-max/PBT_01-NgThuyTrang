## PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)
## Câu A1. var / let / const

**Đoạn 1:**
Kết quả dự đoán là `undefined`.

**Đoạn 2:**
Kết quả dự đoán là `ReferenceError`.

**Đoạn 3:**
Kết quả dự đoán là `TypeError`.

**Đoạn 4:**
Kết quả dự đoán là:

```javascript
[1, 2, 3, 4]
```
**Đoạn 5:**
Kết quả dự đoán là:

```javascript
Trong block: 2
Ngoài block: 1
```
### Chạy file và so sánh kết quả

Sau khi tạo file `var_let_const.js` và chạy bằng lệnh:

```bash
node var_let_const.js
```
Kết quả thu được
Đoạn 1:
undefined

Đoạn 2:
ReferenceError

Đoạn 3:
TypeError

Đoạn 4:
[ 1, 2, 3, 4 ]

Đoạn 5:
Trong block: 2
Ngoài block: 1

| Đoạn | Dự đoán                         | Kết quả chạy                    | So sánh    |
| ---- | ------------------------------- | ------------------------------- | ---------- |
| 1    | undefined                       | undefined                       | Trùng khớp |
| 2    | ReferenceError                  | ReferenceError                  | Trùng khớp |
| 3    | TypeError                       | TypeError                       | Trùng khớp |
| 4    | [1,2,3,4]                       | [1,2,3,4]                       | Trùng khớp |
| 5    | Trong block: 2 / Ngoài block: 1 | Trong block: 2 / Ngoài block: 1 | Trùng khớp |

Giải thích các kết quả bất ngờ
Đoạn 1: Em nghĩ biến chưa khai báo sẽ lỗi, nhưng thực tế lạira undefined. Nguyên nhân là do var được hoisting nên biến đã tồn tại trước khi được gán giá trị.
Đoạn 2: Khác với var, biến khai báo bằng let không được sử dụng trước khi khai báo nên chương trình báo lỗi ReferenceError.
Đoạn 3: const không cho phép gán lại giá trị sau khi khai báo nên xuất hiện lỗi TypeError.
Đoạn 4: Mặc dù dùng const nhưng vẫn thêm được phần tử vào mảng. Điều này cho thấy const chỉ ngăn việc gán lại cả mảng chứ không ngăn thay đổi dữ liệu bên trong mảng.
Đoạn 5: Hai biến a có cùng tên nhưng thuộc hai phạm vi khác nhau. Biến bên trong block không ảnh hưởng đến biến bên ngoài nên kết quả lần lượt là 2 và 1.

### Câu A2 (5đ) — Data Types & Coercion

Không chạy code, dự đoán kết quả:

```javascript
console.log(typeof null);        // "object"
console.log(typeof undefined);   // "undefined"
console.log(typeof NaN);         // "number"
console.log("5" + 3);           // "53"
console.log("5" - 3);           // 2
console.log("5" * "3");         // 15
console.log(true + true);       // 2
console.log([] + []);           // ""
console.log([] + {});           // "[object Object]"
console.log({} + []);           // 0
```
Giải thích: 
  + "5" + 3 cho kết quả "53" vì toán tử + ưu tiên nối chuỗi khi có một toán hạng là chuỗi.
  + "5" - 3 cho kết quả 2 vì toán tử - chỉ dùng cho phép tính số học nên JavaScript tự chuyển "5" thành số 5.

## Câu A3. So sánh == và ===

### Dự đoán kết quả

```javascript
console.log(5 == "5");              // true
console.log(5 === "5");             // false
console.log(null == undefined);     // true
console.log(null === undefined);    // false
console.log(NaN == NaN);            // false
console.log(0 == false);            // true
console.log(0 === false);           // false
console.log("" == false);           // true
```
### Quy tắc

Từ giờ trở đi nên sử dụng `===` thay vì `==`.
    Vì `===` so sánh cả giá trị và kiểu dữ liệu nên cho kết quả chính xác hơn, tránh được những trường hợp JavaScript tự động chuyển đổi kiểu dữ liệu gây nhầm lẫn.

Ví dụ:
```javascript
5 == "5"      // true
5 === "5"     // false

0 == false    // true
0 === false   // false
```

### ## Câu A4. Truthy & Falsy
### Các giá trị Falsy trong JavaScript
  Các giá trị Falsy gồm:

```javascript
false
0
0n
""
null
undefined
NaN
```

  Ngoài các giá trị trên thì hầu hết đều là Truthy.

### Dự đoán kết quả
```javascript
if ("0") console.log("A");    → Có in
if ("") console.log("B");     → Không in
if ([]) console.log("C");     → Có in
if ({}) console.log("D");     → Có in
if (null) console.log("E");   → Không in
if (0) console.log("F");      → Không in
if (-1) console.log("G");     → Có in
if (" ") console.log("H");    → Có in
```

Kết quả in ra màn hình:
A
C
D
G
H
## Câu A5. Template Literals

### Cách 1
```javascript
// Cách 1:
var greeting = "Xin chào " + name + "! Bạn " + age + " tuổi.";
Viết lại bằng template literal:
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
var url = "https://api.example.com/users/" + userId + "/orders?page=" + page;

Viết lại bằng template literal:
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
var html = "<div class=\"card\">" +
    "<h2>" + title + "</h2>" +
    "<p>" + description + "</p>" +
    "<span>Giá: " + price + "đ</span>" +
    "</div>";

Viết lại bằng template literal:
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
```
### Phần C
## Câu C1. Debug JavaScript

### 1. Các lỗi trong code

**Lỗi 1: Thiếu dấu chấm phẩy `;`**

Trong code có nhiều dòng chưa có dấu `;`, ví dụ:

```javascript
return "Phần trăm giảm không hợp lệ"
```

Nên sửa thành:

```javascript
return "Phần trăm giảm không hợp lệ";
```

Lỗi này JavaScript vẫn có thể chạy, nhưng nên thêm dấu `;` để code rõ ràng hơn.

---

**Lỗi 2: Chưa kiểm tra `giaBan` có phải là số không**

Trong phần test có dòng:

```javascript
const gia = tinhGiaGiamGia("100000", 20)
```

`giaBan` đang là chuỗi `"100000"`, không phải số. JavaScript có thể tự chuyển kiểu khi tính toán, nhưng như vậy dễ gây lỗi.

Nên kiểm tra kiểu dữ liệu trước:

```javascript
if (typeof giaBan !== "number" || isNaN(giaBan)) {
    return "Giá bán không hợp lệ";
}
```

---

**Lỗi 3: Chưa kiểm tra `phanTramGiam` có phải là số không**

Code chỉ kiểm tra phần trăm giảm có nhỏ hơn 0 hoặc lớn hơn 100 không, nhưng chưa kiểm tra nó có phải số không.

Nên thêm:

```javascript
if (typeof phanTramGiam !== "number" || isNaN(phanTramGiam)) {
    return "Phần trăm giảm không hợp lệ";
}
```

---

**Lỗi 4: Dùng `var` không cần thiết**

Dòng:

```javascript
var giamGia = giaBan * phanTramGiam / 100
```

Nên đổi sang `let` hoặc `const`. Vì biến `giamGia` không gán lại nên dùng `const` là hợp lý hơn:

```javascript
const giamGia = giaBan * phanTramGiam / 100;
```

---

**Lỗi 5: Dùng sai toán tử trong câu lệnh `if`**

Code ban đầu:

```javascript
if (giaSauGiam = 0) {
    console.log("Sản phẩm miễn phí!")
}
```

Ở đây đang dùng dấu `=` là phép gán, không phải phép so sánh. Dòng này làm `giaSauGiam` bị gán thành `0`.

Cần sửa thành:

```javascript
if (giaSauGiam === 0) {
    console.log("Sản phẩm miễn phí!");
}
```

---

**Lỗi 6: Dùng `var` trong vòng lặp với `setTimeout`**

Code ban đầu:

```javascript
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i)
    }, 1000)
}
```

Do `var` có phạm vi theo function, nên sau khi vòng lặp chạy xong thì `i` có giá trị là `5`. Vì vậy sau 1 giây, các hàm trong `setTimeout` đều in ra:

```text
Item 5
Item 5
Item 5
Item 5
Item 5
```

Cách sửa là dùng `let`:

```javascript
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}
```

Khi dùng `let`, mỗi vòng lặp sẽ có một biến `i` riêng nên kết quả sẽ là:

```text
Item 0
Item 1
Item 2
Item 3
Item 4
```

---

### 2. Code sau khi sửa

```javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (typeof giaBan !== "number" || isNaN(giaBan)) {
        return "Giá bán không hợp lệ";
    }

    if (typeof phanTramGiam !== "number" || isNaN(phanTramGiam)) {
        return "Phần trăm giảm không hợp lệ";
    }

    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ";
    }

    const giamGia = giaBan * phanTramGiam / 100;
    const giaSauGiam = giaBan - giamGia;

    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!");
    }

    return giaSauGiam;
}

// Test
const gia = tinhGiaGiamGia(100000, 20);
console.log("Giá sau giảm: " + gia + "đ");

const gia2 = tinhGiaGiamGia(50000, 110);
console.log("Giá: " + gia2);

for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}
```

### 3. Kết quả sau khi sửa

```text
Giá sau giảm: 80000đ
Giá: Phần trăm giảm không hợp lệ
Item 0
Item 1
Item 2
Item 3
Item 4
```



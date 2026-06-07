## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
### Câu A1 (5đ) — Function Declaration vs Expression vs Arrow

### Function Declaration
```javascript
function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thuong: thue,
        thuc_nhan: luong - thue
    };
}
```

### Function Expression
```javascript
const tinhThueBaoHiem = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thuong: thue,
        thuc_nhan: luong - thue
    };
};
```

### Arrow Function
```javascript
const tinhThueBaoHiem = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thuong: thue,
        thuc_nhan: luong - thue
    };
};
```

### Hoisting
Ba cách khai báo hàm trên khác nhau về hoisting.
Với **Function Declaration**, JavaScript sẽ hoisting toàn bộ hàm nên có thể gọi trước khi khai báo:
```javascript
console.log(cong(2, 3));

function cong(a, b) {
    return a + b;
}
```

Kết quả:

```javascript
5
```

Với **Function Expression** và **Arrow Function** thì không thể gọi trước khi khai báo:

```javascript
console.log(cong(2, 3));

const cong = function(a, b) {
    return a + b;
};
```

hoặc

```javascript
console.log(cong(2, 3));

const cong = (a, b) => a + b;
```

Hai trường hợp trên đều báo lỗi:

```javascript
ReferenceError: Cannot access 'cong' before initialization
```
### Câu A2 - Scope & Closure
dự đoán output:

```javascript
// Đoạn 1:
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}
const c = counter();
console.log(c.increment());  // count tăng từ 0 lên 1
console.log(c.increment());  // count tăng từ 1 lên 2
console.log(c.increment());  // count tăng từ 2 lên 3
console.log(c.decrement());  // count giảm từ 3 xuống 2
console.log(c.getCount());   // lấy count hiện tại là 2

// Đoạn 2:
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}
// Output sau 200ms: 
// var: 3 var: 3 var: 3 let: 0 let: 1 let: 2
```
Giải thích:
  +  Với var, biến i không có block scope, nên cả 3 lần setTimeout đều dùng chung một biến i. Khi vòng lặp chạy xong thì i = 3, lúc đó callback mới chạy nên in ra var: 3 ba lần.
  + Còn với let, biến j có block scope. Mỗi vòng lặp sẽ tạo ra một biến j riêng, nên callback nhớ đúng giá trị của từng lần lặp là 0, 1, 2.
## Câu A3. Array Methods

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
nums.filter(n => n % 2 === 0);

// 2. Nhân mỗi số với 3
nums.map(n => n * 3);

// 3. Tính tổng tất cả
nums.reduce((sum, n) => sum + n, 0);

// 4. Tìm số đầu tiên > 7
nums.find(n => n > 7);

// 5. Kiểm tra có số > 10 không
nums.some(n => n > 10);

// 6. Kiểm tra tất cả đều > 0
nums.every(n => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);

// 8. Đảo ngược mảng (không làm thay đổi mảng gốc)
[...nums].reverse();
```
### Câu A4 (5đ) — Object Destructuring & Spread

Không chạy code, dự đoán output:

```javascript
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};

// Destructuring
const { name, price, specs: { ram, color } } = product;
console.log(name, price, ram, color);  // iPhone 16 25990000 8 Titan
console.log(specs);                     // ReferenceError: specs is not defined

// Spread
const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price);            // 23990000
console.log(updated.sale);             // true
console.log(product.price);            // 25990000 (object gốc không bị thay đổi)

// Spread gotcha
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram);        // 16 
```
---
### Phần C - Suy luận
## Câu C1. Refactor Code

```javascript
const processOrders = orders =>
    orders
        .filter(order => order.status === "completed" && order.total > 100000)
        .map(({ id, customer, total }) => {
            const discount = total * 0.1;
            return { id, customer, total, discount, finalTotal: total - discount };
        })
        .sort((a, b) => b.finalTotal - a.finalTotal);
```


### Câu C2 - Thiết kế API
```javascript
const miniArray = {
    map(arr, fn) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }

        return result;
    },

    filter(arr, fn) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }

        return result;
    },

    reduce(arr, fn, initialValue) {
        let result = initialValue;

        for (let i = 0; i < arr.length; i++) {
            result = fn(result, arr[i], i, arr);
        }

        return result;
    }
};

// Test
console.log(miniArray.map([1, 2, 3], x => x * 2));
console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0));
```
Kết quả:

[2, 4, 6]
[3, 4]
10
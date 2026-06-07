
## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)
## Câu A1. DOM Tree

### 1. Sơ đồ cây DOM
```text
div#app
├── header
│   ├── h1
│   │   └── Todo App
│   └── nav
│       ├── a.active (All)
│       ├── a (Active)
│       └── a (Completed)
│
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button (Add)
    │
    └── ul#todoList
        ├── li.todo-item (Learn HTML)
        └── li.todo-item.completed (Learn CSS)
```

### 2. Query Selector

- Chọn thẻ `<h1>`

```javascript
document.querySelector("h1");
```

- Chọn input trong form

```javascript
document.querySelector("#todoForm input");
```

- Chọn tất cả `.todo-item`

```javascript
document.querySelectorAll(".todo-item");
```

- Chọn link đang active

```javascript
document.querySelector(".active");
```

- Chọn `<li>` đầu tiên trong `#todoList`

```javascript
document.querySelector("#todoList li");
```

- Chọn tất cả thẻ `<a>` bên trong `<nav>`

```javascript
document.querySelectorAll("nav a");
```

## Câu A2. innerHTML và textContent

`innerHTML` và `textContent` đều được dùng để đọc hoặc thay đổi nội dung của một phần tử HTML, tuy nhiên chúng có sự khác nhau.

- `textContent` chỉ làm việc với văn bản thuần, không xử lý các thẻ HTML.
- `innerHTML` sẽ đọc hoặc chèn cả mã HTML vào bên trong phần tử.

Ví dụ:

```javascript
document.querySelector("#title").textContent = "<b>Hello</b>";
```
Kết quả hiển thị:
```text
<b>Hello</b>
```

Còn:
```javascript
document.querySelector("#title").innerHTML = "<b>Hello</b>";
```
Kết quả hiển thị:
**Hello**

### Lỗ hổng XSS
`innerHTML` có thể gây ra lỗ hổng XSS (Cross Site Scripting) vì nó cho phép trình duyệt thực thi mã HTML hoặc JavaScript được người dùng chèn vào.

Ví dụ:
```javascript
const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = userInput;
```

Nếu người dùng nhập:
```html
<img src="x" onerror="alert('Hacked!')">
```

thì khi ảnh tải lỗi, đoạn JavaScript trong `onerror` sẽ được thực thi và xuất hiện thông báo "Hacked!".

### Cách sửa

Sử dụng `textContent` thay vì `innerHTML`:

```javascript
const userInput = document.querySelector("#search").value;
document.querySelector("#result").textContent = userInput;
```

## Câu A3. Event Bubbling

Khi người dùng click vào button, sự kiện sẽ xảy ra ở phần tử được click trước, sau đó lan dần lên các phần tử cha. Hiện tượng này được gọi là Event Bubbling.

Với đoạn code trên, khi click vào button thì thứ tự console sẽ là:

```text
BUTTON
INNER
OUTER
```

Giải thích:

- Đầu tiên sự kiện xảy ra trên button nên in ra `BUTTON`.
- Sau đó sự kiện lan lên `#inner` nên in ra `INNER`.
- Cuối cùng lan lên `#outer` nên in ra `OUTER`.

Nếu bỏ comment dòng:
```javascript
e.stopPropagation();
```
thì sự kiện sẽ dừng lại tại button và không tiếp tục lan lên các phần tử cha.
Khi đó output sẽ là:
```text
BUTTON
```
  `stopPropagation()` được dùng để ngăn Event Bubbling, giúp sự kiện chỉ được xử lý ở phần tử hiện tại mà không truyền lên các phần tử bên ngoài.
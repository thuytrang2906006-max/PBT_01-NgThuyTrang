const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/200", rating: 4.5, inStock: true },
    { id: 2, name: "Samsung Galaxy S24", price: 21990000, category: "phone", image: "https://placehold.co/200", rating: 4.4, inStock: true },
    { id: 3, name: "OPPO Reno 12", price: 12990000, category: "phone", image: "https://placehold.co/200", rating: 4.2, inStock: false },

    { id: 4, name: "MacBook Air M2", price: 24990000, category: "laptop", image: "https://placehold.co/200", rating: 4.8, inStock: true },
    { id: 5, name: "Dell Inspiron 15", price: 15990000, category: "laptop", image: "https://placehold.co/200", rating: 4.1, inStock: true },
    { id: 6, name: "Asus Vivobook", price: 13990000, category: "laptop", image: "https://placehold.co/200", rating: 4.0, inStock: false },

    { id: 7, name: "AirPods Pro", price: 5990000, category: "accessory", image: "https://placehold.co/200", rating: 4.7, inStock: true },
    { id: 8, name: "Apple Watch", price: 8990000, category: "accessory", image: "https://placehold.co/200", rating: 4.6, inStock: true },
    { id: 9, name: "Chuột Logitech", price: 790000, category: "accessory", image: "https://placehold.co/200", rating: 4.3, inStock: true },

    { id: 10, name: "iPad Air", price: 16990000, category: "tablet", image: "https://placehold.co/200", rating: 4.5, inStock: true },
    { id: 11, name: "Samsung Tab S9", price: 18990000, category: "tablet", image: "https://placehold.co/200", rating: 4.4, inStock: false },
    { id: 12, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", image: "https://placehold.co/200", rating: 4.1, inStock: true }
];

let currentCategory = "all";
let currentSearch = "";
let currentSort = "";
let cartCount = 0;

const app = document.createElement("div");
app.className = "app";
document.body.appendChild(app);

const header = document.createElement("div");
header.className = "header";

const title = document.createElement("h1");
title.textContent = "Product Catalog";

const cart = document.createElement("div");
cart.className = "cart";
cart.textContent = "🛒";

const cartBadge = document.createElement("span");
cartBadge.className = "cart-badge";
cartBadge.textContent = "0";

cart.appendChild(cartBadge);
header.appendChild(title);
header.appendChild(cart);

const controls = document.createElement("div");
controls.className = "controls";

const searchInput = document.createElement("input");
searchInput.placeholder = "Tìm sản phẩm...";

const categories = ["all", "phone", "laptop", "accessory", "tablet"];

categories.forEach(category => {
    const btn = document.createElement("button");
    btn.textContent = category;
    btn.className = "category-btn";

    if (category === "all") {
        btn.classList.add("active");
    }

    btn.dataset.category = category;
    controls.appendChild(btn);
});

const sortSelect = document.createElement("select");

const sortOptions = [
    { value: "", text: "Sắp xếp" },
    { value: "price-asc", text: "Giá tăng" },
    { value: "price-desc", text: "Giá giảm" },
    { value: "name-az", text: "Tên A-Z" },
    { value: "rating-desc", text: "Đánh giá cao nhất" }
];

sortOptions.forEach(optionItem => {
    const option = document.createElement("option");
    option.value = optionItem.value;
    option.textContent = optionItem.text;
    sortSelect.appendChild(option);
});

const darkModeBtn = document.createElement("button");
darkModeBtn.textContent = "Dark Mode";

controls.prepend(searchInput);
controls.appendChild(sortSelect);
controls.appendChild(darkModeBtn);

const productList = document.createElement("div");
productList.className = "product-list";

app.appendChild(header);
app.appendChild(controls);
app.appendChild(productList);

function formatPrice(price) {
    return price.toLocaleString("vi-VN") + "đ";
}

function filterByCategory(list) {
    if (currentCategory === "all") {
        return list;
    }

    return list.filter(product => product.category === currentCategory);
}

function searchProducts(list) {
    return list.filter(product =>
        product.name.toLowerCase().includes(currentSearch.toLowerCase())
    );
}

function sortProducts(list) {
    const newList = [...list];

    if (currentSort === "price-asc") {
        newList.sort((a, b) => a.price - b.price);
    }

    if (currentSort === "price-desc") {
        newList.sort((a, b) => b.price - a.price);
    }

    if (currentSort === "name-az") {
        newList.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (currentSort === "rating-desc") {
        newList.sort((a, b) => b.rating - a.rating);
    }

    return newList;
}

function renderProducts() {
    productList.innerHTML = "";

    let result = [...products];

    result = filterByCategory(result);
    result = searchProducts(result);
    result = sortProducts(result);

    if (result.length === 0) {
        const emptyText = document.createElement("p");
        emptyText.textContent = "Không tìm thấy sản phẩm nào.";
        productList.appendChild(emptyText);
        return;
    }

    result.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.dataset.id = product.id;

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = formatPrice(product.price);

        const rating = document.createElement("p");
        rating.textContent = "⭐ " + product.rating;

        const stock = document.createElement("p");
        stock.className = "stock";
        stock.textContent = product.inStock ? "Còn hàng" : "Hết hàng";

        const addBtn = document.createElement("button");
        addBtn.textContent = "Thêm giỏ";
        addBtn.className = "add-cart";

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(rating);
        card.appendChild(stock);
        card.appendChild(addBtn);

        productList.appendChild(card);
    });
}

function showModal(product) {
    const modal = document.createElement("div");
    modal.className = "modal";

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;

    const name = document.createElement("h2");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = "Giá: " + formatPrice(product.price);

    const category = document.createElement("p");
    category.textContent = "Danh mục: " + product.category;

    const rating = document.createElement("p");
    rating.textContent = "Đánh giá: " + product.rating + " sao";

    const stock = document.createElement("p");
    stock.textContent = product.inStock ? "Tình trạng: Còn hàng" : "Tình trạng: Hết hàng";

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-btn";
    closeBtn.textContent = "Đóng";

    closeBtn.addEventListener("click", () => {
        modal.remove();
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    modalContent.appendChild(img);
    modalContent.appendChild(name);
    modalContent.appendChild(price);
    modalContent.appendChild(category);
    modalContent.appendChild(rating);
    modalContent.appendChild(stock);
    modalContent.appendChild(closeBtn);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

searchInput.addEventListener("input", () => {
    currentSearch = searchInput.value;
    renderProducts();
});

controls.addEventListener("click", (e) => {
    if (e.target.classList.contains("category-btn")) {
        document.querySelectorAll(".category-btn").forEach(btn => {
            btn.classList.remove("active");
        });

        e.target.classList.add("active");
        currentCategory = e.target.dataset.category;

        renderProducts();
    }
});

sortSelect.addEventListener("change", () => {
    currentSort = sortSelect.value;
    renderProducts();
});

productList.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");

    if (!card) return;

    const id = Number(card.dataset.id);
    const product = products.find(item => item.id === id);

    if (e.target.classList.contains("add-cart")) {
        e.stopPropagation();
        cartCount++;
        cartBadge.textContent = cartCount;
        return;
    }

    showModal(product);
});

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        darkModeBtn.textContent = "Light Mode";
    } else {
        darkModeBtn.textContent = "Dark Mode";
    }
});

renderProducts();
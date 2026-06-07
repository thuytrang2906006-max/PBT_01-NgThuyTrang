// restaurant_bill.js

const foods = [
{ name: "Phở bò", price: 65000, quantity: 2 },
{ name: "Trà đá", price: 5000, quantity: 3 },
{ name: "Bún chả", price: 55000, quantity: 1 }
];

const hasTip = true;
const today = "Wednesday";

let total = 0;

for (let i = 0; i < foods.length; i++) {
total += foods[i].price * foods[i].quantity;
}

let discountRate = 0;

if (total > 1000000) {
discountRate = 15;
}
else if (total > 500000) {
discountRate = 10;
}

if (today === "Wednesday") {
discountRate += 5;
}

const discountMoney = total * discountRate / 100;
const totalAfterDiscount = total - discountMoney;

const vat = totalAfterDiscount * 8 / 100;

let tip = 0;
if (hasTip) {
tip = totalAfterDiscount * 5 / 100;
}

const finalTotal = totalAfterDiscount + vat + tip;

function formatMoney(money) {
return money.toLocaleString("vi-VN") + "đ";
}

console.log("╔══════════════════════════════════════╗");
console.log("║        HÓA ĐƠN NHÀ HÀNG             ║");
console.log("╠══════════════════════════════════════╣");

for (let i = 0; i < foods.length; i++) {
const item = foods[i];
const itemTotal = item.price * item.quantity;


console.log(
    `${i + 1}. ${item.name} x${item.quantity} @${formatMoney(item.price)} = ${formatMoney(itemTotal)}`
);

}

console.log("╠══════════════════════════════════════╣");
console.log("Tổng cộng: " + formatMoney(total));
console.log("Giảm giá (" + discountRate + "%): " + formatMoney(discountMoney));
console.log("VAT (8%): " + formatMoney(vat));
console.log("Tip (5%): " + formatMoney(tip));
console.log("╠══════════════════════════════════════╣");
console.log("THANH TOÁN: " + formatMoney(finalTotal));
console.log("╚══════════════════════════════════════╝");

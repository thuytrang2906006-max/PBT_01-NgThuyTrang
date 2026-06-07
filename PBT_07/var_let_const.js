// ===================
// ĐOẠN 1
// ===================
console.log("Đoạn 1:");
console.log(x);
var x = 5;

// ===================
// ĐOẠN 2
// ===================
console.log("\nĐoạn 2:");

try {
    console.log(y);
    let y = 10;
} catch (error) {
    console.log(error.name);
}

// ===================
// ĐOẠN 3
// ===================
console.log("\nĐoạn 3:");

try {
    const z = 15;
    z = 20;
    console.log(z);
} catch (error) {
    console.log(error.name);
}

// ===================
// ĐOẠN 4
// ===================
console.log("\nĐoạn 4:");

const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

// ===================
// ĐOẠN 5
// ===================
console.log("\nĐoạn 5:");

let a = 1;

{
    let a = 2;
    console.log("Trong block:", a);
}

console.log("Ngoài block:", a);

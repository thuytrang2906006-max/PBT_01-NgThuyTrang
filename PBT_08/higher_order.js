
// 1. pipe() - nối nhiều function lại với nhau
function pipe(...fns) {
    return function(value) {
        return fns.reduce((result, fn) => fn(result), value);
    };
}

const process = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);

console.log(process(5));


// 2. memoize() - lưu lại kết quả đã tính
function memoize(fn) {
    const cache = {};

    return function(...args) {
        const key = JSON.stringify(args);

        if (key in cache) {
            return cache[key];
        }

        const result = fn(...args);
        cache[key] = result;

        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;

    for (let i = 0; i < n; i++) {
        result += i;
    }

    return result;
});

console.log(expensiveCalc(1000000));
console.log(expensiveCalc(1000000));


// 3. debounce() - chỉ chạy khi người dùng ngừng gọi hàm một lúc
function debounce(fn, delay) {
    let timer;

    return function(...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

// Test debounce: gọi liên tục nhưng chỉ in lần cuối
search("i");
search("ip");
search("iph");
search("iphone");


// 4. retry() - thử lại nếu hàm bị lỗi
async function retry(fn, maxAttempts = 3) {
    let lastError;

    for (let i = 1; i <= maxAttempts; i++) {
        try {
            return await fn();
        } catch (error) {
            console.log("Lỗi lần", i);
            lastError = error;
        }
    }

    throw lastError;
}


// Test retry
let count = 0;

async function fakeApi() {
    count++;

    if (count < 3) {
        throw new Error("API lỗi");
    }

    return "Gọi API thành công";
}

retry(fakeApi, 3)
    .then(result => console.log(result))
    .catch(error => console.log("Thất bại:", error.message));


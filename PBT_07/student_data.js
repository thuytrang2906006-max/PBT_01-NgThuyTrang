// student_data.js

const students = [
{ name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
{ name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
{ name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
{ name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
{ name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
{ name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
{ name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
{ name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

let gioi = 0;
let kha = 0;
let trungBinh = 0;
let yeu = 0;

let maxStudent = null;
let minStudent = null;

let sumMath = 0;
let sumPhysics = 0;
let sumCs = 0;

let maleTotal = 0;
let femaleTotal = 0;
let maleCount = 0;
let femaleCount = 0;

console.log("| STT | Tên | TB | Xếp loại |");
console.log("|-----|-----|-----|----------|");

for (let i = 0; i < students.length; i++) {


let st = students[i];

let avg = st.math * 0.4 + st.physics * 0.3 + st.cs * 0.3; st.avg = avg.toFixed(1);
let rank = "";

if (avg >= 8) {
    rank = "Giỏi";
    gioi++;
}
else if (avg >= 6.5) {
    rank = "Khá";
    kha++;
}
else if (avg >= 5) {
    rank = "Trung bình";
    trungBinh++;
}
else {
    rank = "Yếu";
    yeu++;
}

console.log(
    `| ${i + 1} | ${st.name} | ${avg.toFixed(1)} | ${rank} |`
);

if (maxStudent === null || avg > maxStudent.avg) {
    maxStudent = {
        name: st.name,
        avg: avg
    };
}

if (minStudent === null || avg < minStudent.avg) {
    minStudent = {
        name: st.name,
        avg: avg
    };
}

sumMath += st.math;
sumPhysics += st.physics;
sumCs += st.cs;

if (st.gender === "M") {
    maleTotal += avg;
    maleCount++;
}
else {
    femaleTotal += avg;
    femaleCount++;
}
}

console.log("\n===== THỐNG KÊ =====");

console.log("Giỏi:", gioi);
console.log("Khá:", kha);
console.log("Trung bình:", trungBinh);
console.log("Yếu:", yeu);

console.log("\n===== CAO NHẤT / THẤP NHẤT =====");

console.log("Điểm TB cao nhất:", maxStudent.name,"-", maxStudent.avg.toFixed(1)
);

console.log("Điểm TB thấp nhất:", minStudent.name, "-", minStudent.avg.toFixed(1)
);

console.log("\n===== ĐIỂM TB TOÀN LỚP =====");
console.log("Toán:", (sumMath / students.length).toFixed(2)
);

console.log("Lý:",(sumPhysics / students.length).toFixed(2)
);

console.log("CS:", (sumCs / students.length).toFixed(2)
);

console.log("\n===== TB THEO GIỚI TÍNH =====");

console.log("Nam:", (maleTotal / maleCount).toFixed(2)
);

console.log("Nữ:", (femaleTotal / femaleCount).toFixed(2)
);

// first part using module.exports (returns object) and require function
// module.exports = 121;



const sum = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => (a * b);
const PI = 3.14;

let obj = {
    sum: sum,
    sub: sub,
    mul: mul,
    PI: PI,
};
module.exports = obj;
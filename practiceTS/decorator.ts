// decorator trong TS
// Là một hàm đặc biệt, được dùng để thay đổi hành vi của class, method, property hoặc parameter
// Được áp dụng bằng cách sử dụng ký tự @ trước tên hàm decorator

// Ví dụ về decorator đơn giản
function Logger(constructor: Function) {
  console.log("Logging...");
  console.log(constructor);
}

// Sử dụng decorator
@Logger
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();

console.log(pers);

// function tính tổng từ 1 đến n
function SumTo(n: number): number {
  if (n <= 1) return n;
  return n + SumTo(n - 1);
}

console.log(SumTo(10)); // 55

// Viết một decorator caching
function cachingDecorator(func: (n: number) => number) {
  const cache = new Map();
  return function (n: number) {
    if (cache.has(n)) {
      console.log("Fetching from cache for", n);
      return cache.get(n);
    }
    console.log("Calculating result for", n);
    const result = func(n);
    cache.set(n, result);
    return result;
  };
}

// Áp dụng decorator caching cho hàm SumTo
const cachedSumTo = cachingDecorator(SumTo);

console.log(cachedSumTo(10)); // Calculating result for 10 \n 55
console.log(cachedSumTo(10)); // Fetching from cache for 10 \n 55
console.log(cachedSumTo(20)); // Calculating result for 20 \n 210
console.log(cachedSumTo(20)); // Fetching from cache for 20 \n 210

// Kết luận: Decorator giúp tăng tính tái sử dụng code, giảm trùng lặp và dễ dàng testing
// Tuy nhiên, cần cẩn thận khi sử dụng decorator vì có thể làm code khó hiểu hơn nếu lạm dụng quá nhiều

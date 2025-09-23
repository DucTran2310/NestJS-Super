// Đề bài: Xây dựng một hệ thống log, mà khi log sẽ đính kèm thời điểm log

// const logWithTime = (message: string) => {
//   const now = new Date().toISOString()
//   console.log(`${now}: ${message}`)
// }

// const warnWithTime = (message: string) => {
//   const now = new Date().toISOString()
//   console.warn(`${now}: ${message}`)
// }
// logWithTime('Hello world')
// warnWithTime('Warning!')
// const createLogWithTime = (logFn: (message: string) => void) => (message: string) => {
//   const now = new Date().toISOString()
//   logFn(`${now}: ${message}`)
// }

// const logWithTime = createLogWithTime(console.log)
// const warnWithTime = createLogWithTime(console.warn)
// const errorWithTime = createLogWithTime(console.error)

// logWithTime('Hello world')
// warnWithTime('Warning 2!')
// errorWithTime('Error 3!')

// HOF: Được dùng trong lập trình hàm, giúp tăng tính tái sử dụng code, giảm trùng lặp và dễ dàng testing

// Depedency Injection: Là một design pattern trong lập trình hướng đối tượng. Giúp tăng tính tái sử dụng code, giảm trùng lặp và dễ dàng testing

class TimeLogger {
  // logFn: Được gọi là dependency
  constructor(private logFn: (message: string) => void) {}

  log(message: string) {
    const now = new Date().toISOString();
    this.logFn(`${now}: ${message}`);
  }
}

// Tạo các instance của TimeLogger với các hàm log khác nhau
// Injection các hàm log vào trong TimeLogger
const logWithTime = new TimeLogger(console.log);
const warnWithTime = new TimeLogger(console.warn);
const errorWithTime = new TimeLogger(console.error);

logWithTime.log("Hello world");
warnWithTime.log("Warning 2!");
errorWithTime.log("Error 3!");

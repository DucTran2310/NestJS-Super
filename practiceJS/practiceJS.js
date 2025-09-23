// Class trong JavaScript
// Class giup tạo ra các object có cùng thuộc tính và phương thức. Đồng thời tăng tính tái sử dụng code và dễ dàng quản lý code hơn
// Ôn tập
// Thuộc tính (Property) và Phương thức (Method)
// Phương thức là hàm được định nghĩa bên trong class
// Kế thừa (Inheritance)
// Tính đóng gói (Encapsulation)
// Tính đa hình (Polymorphism)

// Cú pháp tạo class trong JavaScript
// class ClassName {
//   // Thuộc tính
//   property1;
//   property2;

//   // Phương thức
//   method1() {
//     // Code phương thức 1
//   }

//   method2() {
//     // Code phương thức 2
//   }

//   // Constructor - Hàm khởi tạo
//   constructor(param1, param2) {
//     this.property1 = param1;
//     this.property2 = param2;
//   }
// }

// Ví dụ về class trong JavaScript

class Car {
  constructor(engineName, brandCar) {
    // Thuộc tính
    this.engineName = engineName;
    this.brandCar = brandCar;
  }

  // Phương thức
  start() {
    console.log(`The ${this.brandCar} car with ${this.engineName} engine is starting.`);
  }

  stop() {
    console.log(`The ${this.brandCar} car is stopping.`);
  }
}

// Tạo đối tượng từ class
const myCar = new Car('V8', 'Ford');
myCar.start(); // The Ford car with V8 engine is starting.
myCar.stop();  // The Ford car is stopping.

// Kế thừa trong class
class ElectricCar extends Car {
  constructor(engineName, brandCar, batteryCapacity) {
    super(engineName, brandCar); // Gọi constructor của lớp cha
    this.batteryCapacity = batteryCapacity; // Thuộc tính riêng của lớp con
  }

  charge() {
    console.log(`The ${this.brandCar} electric car is charging with a capacity of ${this.batteryCapacity} kWh.`);
  }
}

const myElectricCar = new ElectricCar('Electric', 'Tesla', 100);
myElectricCar.start(); // The Tesla car with Electric engine is starting.
myElectricCar.charge(); // The Tesla electric car is charging with a capacity of 100 kWh.
myElectricCar.stop();  // The Tesla car is stopping.

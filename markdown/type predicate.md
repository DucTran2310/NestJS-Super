# Type Predicate trong TypeScript

## Khái niệm

**Type Predicate** trong TypeScript là một hàm trả về boolean và có cú pháp đặc biệt trong phần khai báo kiểu trả về. Nó được sử dụng để thu hẹp kiểu dữ liệu của một biến trong phạm vi của một khối mã cụ thể.

## Cú pháp

```typescript
parameterName is Type
```

Trong đó:

- `parameterName` là tên của tham số mà bạn muốn kiểm tra kiểu
- `Type` là kiểu dữ liệu mà bạn muốn xác nhận

## Cách hoạt động

Khi hàm trả về `true`, TypeScript sẽ hiểu rằng tham số đó có kiểu `Type` trong phạm vi của khối mã nơi hàm được gọi.

## Ví dụ minh họa

### 1. Type Predicate cơ bản

```typescript
function isString(value: any): value is string {
  return typeof value === 'string';
}

function example(value: any) {
  if (isString(value)) {
    // Trong khối này, TypeScript hiểu rằng 'value' là kiểu 'string'
    console.log(value.toUpperCase());
  } else {
    // Trong khối này, 'value' không phải là kiểu 'string'
    console.log('Not a string');
  }
}

example('Hello'); // Output: HELLO
example(123);     // Output: Not a string
```

### 2. Type Predicate với kiểu đối tượng tùy chỉnh

```typescript
interface Dog {
  bark(): void;
  name: string;
}

interface Cat {
  meow(): void;
  name: string;
}

function isDog(animal: Dog | Cat): animal is Dog {
  return 'bark' in animal;
}

function handleAnimal(animal: Dog | Cat) {
  if (isDog(animal)) {
    // TypeScript biết đây là Dog
    animal.bark();
  } else {
    // TypeScript biết đây là Cat
    animal.meow();
  }
}
```

### 3. Type Predicate với mảng

```typescript
function isNumberArray(value: any): value is number[] {
  return Array.isArray(value) && value.every(item => typeof item === 'number');
}

function processArray(arr: any) {
  if (isNumberArray(arr)) {
    // TypeScript biết đây là mảng số
    return arr.map(num => num * 2);
  }
  return [];
}
```

## Lợi ích

- ✅ **An toàn kiểu**: Giúp TypeScript hiểu kiểu dữ liệu chính xác
- ✅ **Tái sử dụng**: Có thể sử dụng lại các hàm kiểm tra
- ✅ **Dễ bảo trì**: Tách biệt logic kiểm tra kiểu khỏi logic nghiệp vụ
- ✅ **Tự động hoàn thành mã**: IDE cung cấp gợi ý chính xác dựa trên kiểu

## Lưu ý quan trọng

- Type Predicate chỉ hoạt động khi hàm trả về `boolean`
- Tên tham số trong type predicate phải khớp với tên tham số thực tế
- Logic kiểm tra phải đảm bảo tính chính xác để tránh lỗi runtime

Type Predicate là một công cụ mạnh mẽ giúp bạn viết TypeScript an toàn và rõ ràng hơn! 🚀

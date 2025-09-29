# Hướng dẫn sử dụng NestJS CLI và ví dụ thực tế

NestJS CLI là công cụ dòng lệnh mạnh mẽ giúp bạn tạo, quản lý và phát triển dự án NestJS một cách nhanh chóng, chuyên nghiệp.

---

## Các lệnh cơ bản với NestJS CLI

| Lệnh | Mô tả |
|------|-------|
| `nest new <project-name>` | Tạo project NestJS mới |
| `nest generate <type> <name>` | Tạo các thành phần: module, controller, service, gateway, filter, guard, interceptor, decorator, pipe |
| `nest build` | Biên dịch project NestJS |
| `nest start` | Chạy project NestJS |
| `nest info` | Hiển thị thông tin môi trường phát triển |
| `nest update` | Cập nhật NestJS và các package liên quan |
| `nest add <package>` | Thêm package vào project NestJS |
| `nest test` | Chạy các bài kiểm tra (unit test) |
| `nest lint` | Kiểm tra mã nguồn theo chuẩn linting |
| `nest format` | Định dạng mã nguồn theo chuẩn Prettier |

---

## Các alias thường dùng với NestJS

- `npm install -g @nestjs/cli` : Cài đặt NestJS CLI toàn cục
- `nest new <project-name>` : Tạo project mới
- `cd <project-name>` : Di chuyển vào thư mục project
- `npm run start` : Chạy project ở chế độ production
- `npm run start:dev` : Chạy project ở chế độ phát triển (hot reload)
- `npm run build` : Build project ra thư mục dist
- `npm run test` : Chạy test
- `npm run test:watch` : Chạy test ở chế độ watch
- `npm run test:cov` : Chạy test và tạo báo cáo coverage
- `npm run lint` : Kiểm tra code theo chuẩn lint

---

## Tạo các thành phần trong NestJS bằng CLI

- Tạo module:  
  `nest g module <module-name>`
- Tạo controller:  
  `nest g controller <controller-name>`
- Tạo service:  
  `nest g service <service-name>`

- Tạo file ko có spec-test:
  `nest g s prisma --flat --no-spec`

---

## Ví dụ: Tạo module, controller và service cho User

### 1. Tạo module `user.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

### 2. Tạo controller `user.controller.ts`

```typescript
import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }
}
```

### 3. Tạo service `user.service.ts`

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    { id: 1, name: 'John Doe' }, 
    { id: 2, name: 'Jane Doe' }
  ];

  findAll() {
    return this.users;
  }
}
```

---

## Ví dụ: Module, Controller và Service mặc định khi tạo project

### `app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### `app.controller.ts`

```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

### `app.service.ts`

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

---

## Chạy project NestJS

- Khởi động server:  
  `npm run start` hoặc `npm run start:dev`
- Truy cập:  
  [http://localhost:3000](http://localhost:3000)
- Kết quả:  
  Hiển thị dòng chữ **Hello World!**

---

## Tổng kết

NestJS CLI giúp bạn tạo và quản lý các thành phần của dự án một cách nhanh chóng, nhất quán. Hãy tận dụng CLI để tăng tốc độ phát triển và đảm bảo chất lượng mã nguồn!

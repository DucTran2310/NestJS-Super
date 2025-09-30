# 🎯 NestJS Interceptors - Comprehensive Guide

## 📖 Introduction

**Interceptor** trong NestJS là một cơ chế mạnh mẽ tương tự middleware nhưng có khả năng can thiệp sâu hơn vào cả **request** và **response**.

```typescript
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map(data => ({ data })));
  }
}
```

---

## 🎯 Các Cấp Độ Sử Dụng

### 🔧 **Global Level**

```typescript
// ❌ KHÔNG thể dùng interceptor ở global level
// app.useGlobalInterceptors(new TransformInterceptor()); // ❌ This won't work

// ✅ Phải đăng ký trong module
@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
```

### 🎮 **Controller Level**

```typescript
@Controller('users')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UserController {
  // Tất cả methods trong controller này sẽ áp dụng interceptors
}
```

### ⚡ **Method Level**

```typescript
@Controller('users')
export class UserController {
  @Get()
  @UseInterceptors(CacheInterceptor, TimeoutInterceptor)
  async findAll() {
    return this.userService.findAll();
  }
}
```

---

## 🚀 Practical Use Cases

### 📝 **Logging Interceptor**

```typescript
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    console.log(`🟡 ${method} ${url} - Start`);

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        console.log(`🟢 ${method} ${url} - ${responseTime}ms`);
      }),
      catchError((error) => {
        const responseTime = Date.now() - now;
        console.log(`🔴 ${method} ${url} - ${responseTime}ms - Error: ${error.message}`);
        return throwError(() => error);
      })
    );
  }
}
```

### ⏱️ **Timeout Interceptor**

```typescript
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000), // ⏰ Timeout sau 5 giây
      catchError(error => {
        if (error instanceof TimeoutError) {
          throw new RequestTimeoutException('Request timeout');
        }
        return throwError(() => error);
      })
    );
  }
}
```

### 🔄 **Transform Response Interceptor**

```typescript
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map(data => ({
        success: true,
        data,
        timestamp: new Date().toISOString(),
        path: context.switchToHttp().getRequest().url,
      }))
    );
  }
}

// ✅ Response format:
{
  "success": true,
  "data": { ... },
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/users"
}
```

### 💾 **Cache Interceptor**

```typescript
@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private cache = new Map<string, any>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const key = request.url;

    // 🎯 Kiểm tra cache
    if (this.cache.has(key)) {
      return of(this.cache.get(key));
    }

    return next.handle().pipe(
      tap(data => {
        // 🗄️ Lưu vào cache với TTL 5 phút
        this.cache.set(key, data);
        setTimeout(() => this.cache.delete(key), 5 * 60 * 1000);
      })
    );
  }
}
```

### 🛡️ **Authentication & Authorization Interceptor**

```typescript
@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload; // 🎯 Thêm user vào request
      return next.handle();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractToken(request: Request): string | null {
    return request.headers.authorization?.replace('Bearer ', '') || null;
  }
}
```

---

## 🔧 Advanced Interceptors

### 📊 **Performance Monitoring Interceptor**

```typescript
@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = performance.now();
    const className = context.getClass().name;
    const handlerName = context.getHandler().name;

    return next.handle().pipe(
      tap(() => {
        const executionTime = performance.now() - startTime;
        
        // 📈 Log performance metrics
        console.log(`⚡ ${className}.${handlerName} - ${executionTime.toFixed(2)}ms`);
        
        // 🎯 Có thể gửi metrics đến monitoring service
        if (executionTime > 1000) {
          console.warn(`🚨 Slow operation detected: ${executionTime.toFixed(2)}ms`);
        }
      })
    );
  }
}
```

### 🎨 **Data Transformation Interceptor**

```typescript
@Injectable()
export class SerializationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => this.transformResponse(data)),
      catchError(error => {
        // 🎯 Transform error response
        return throwError(() => this.transformError(error));
      })
    );
  }

  private transformResponse(data: any): any {
    if (Array.isArray(data)) {
      return data.map(item => this.serializeItem(item));
    }
    return this.serializeItem(data);
  }

  private serializeItem(item: any): any {
    if (item && typeof item === 'object') {
      // 🚫 Loại bỏ sensitive data
      const { password, refreshToken, ...safeData } = item;
      return safeData;
    }
    return item;
  }

  private transformError(error: any): any {
    return {
      statusCode: error.status || 500,
      message: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}
```

### 🌐 **Rate Limiting Interceptor**

```typescript
@Injectable()
export class RateLimitInterceptor implements NestInterceptor {
  private requests = new Map<string, number[]>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const ip = request.ip;
    const now = Date.now();
    const windowMs = 60000; // 1 phút
    const maxRequests = 100; // Tối đa 100 requests/phút

    const userRequests = this.requests.get(ip) || [];
    
    // 🎯 Lọc requests trong khoảng thời gian hiện tại
    const recentRequests = userRequests.filter(time => now - time < windowMs);
    
    if (recentRequests.length >= maxRequests) {
      throw new TooManyRequestsException('Rate limit exceeded');
    }

    recentRequests.push(now);
    this.requests.set(ip, recentRequests);

    return next.handle();
  }
}
```

---

## 🛠️ Multiple Interceptors Combination

### 🔄 **Chain Multiple Interceptors**

```typescript
@Controller('products')
@UseInterceptors(
  LoggingInterceptor,
  AuthInterceptor,
  TransformInterceptor,
  CacheInterceptor
)
export class ProductController {
  @Get()
  @UseInterceptors(PerformanceInterceptor) // 🎯 Thêm interceptor riêng cho method
  async findAll() {
    return this.productService.findAll();
  }

  @Post()
  @UseInterceptors(ValidationInterceptor) // 🎯 Validation chỉ cho POST
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
}
```

### 📋 **Execution Order**

```typescript
// 🎯 Thứ tự thực thi interceptors:
// 1. LoggingInterceptor - Log request
// 2. AuthInterceptor - Xác thực
// 3. ValidationInterceptor - Validate input
// 4. Controller Method - Xử lý logic
// 5. TransformInterceptor - Transform response
// 6. CacheInterceptor - Cache response
// 7. PerformanceInterceptor - Đo performance
```

---

## ⚡ RxJS Operations in Interceptors

### 🔄 **Advanced RxJS Patterns**

```typescript
@Injectable()
export class AdvancedInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      // 🕒 Timeout
      timeout(30000),
      
      // 🔄 Retry logic
      retryWhen(errors => errors.pipe(
        delay(1000),
        take(3),
        concatMap((error, index) => {
          if (index === 2) throw error;
          return of(error);
        })
      )),
      
      // 📊 Tap for side effects
      tap(data => console.log('Data processed:', data)),
      
      // 🎯 Map for transformation
      map(data => this.transformData(data)),
      
      // ⏳ Delay simulation
      delay(100),
      
      // 🛡️ Error handling
      catchError(error => this.handleError(error))
    );
  }

  private transformData(data: any): any {
    // Custom transformation logic
    return data;
  }

  private handleError(error: any): Observable<never> {
    // Custom error handling
    return throwError(() => new HttpException(
      'Custom error message',
      HttpStatus.BAD_REQUEST
    ));
  }
}
```

---

## 📊 Interceptor Use Cases Summary

| Use Case | Interceptor Type | Key Features |
|----------|-----------------|--------------|
| **Logging** | `LoggingInterceptor` | Request/Response logging, Performance tracking |
| **Authentication** | `AuthInterceptor` | Token validation, User context |
| **Transformation** | `TransformInterceptor` | Data serialization, Format standardization |
| **Caching** | `CacheInterceptor` | Response caching, TTL management |
| **Rate Limiting** | `RateLimitInterceptor` | Request throttling, Abuse prevention |
| **Validation** | `ValidationInterceptor` | Input validation, Data sanitization |
| **Performance** | `PerformanceInterceptor` | Execution time monitoring, Metrics collection |
| **Error Handling** | `ErrorInterceptor` | Global error handling, Error transformation |
| **Timeout** | `TimeoutInterceptor` | Request timeout, Resource protection |

---

## 🎯 Best Practices

### ✅ **Do's:**

```typescript
// ✅ Sử dụng specific interceptors cho từng mục đích
@UseInterceptors(LoggingInterceptor, AuthInterceptor)

// ✅ Handle errors properly trong interceptors
catchError(error => this.handleError(error))

// ✅ Sử dụng RxJS operators một cách hiệu quả
return next.handle().pipe(map(data => transform(data)))
```

### ❌ **Don'ts:**

```typescript
// ❌ Không throw error mà không xử lý
// ❌ Không block request quá lâu
// ❌ Không lạm dụng quá nhiều interceptors
// ❌ Không sử dụng global interceptors cho logic cụ thể
```

---

## 🔧 Example: Complete Interceptor Setup

```typescript
// 🎯 Main application setup với interceptors
@Module({
  imports: [AppModule],
  providers: [
    // 🎯 Global interceptors
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class MainModule {}

// 🎯 Controller với specific interceptors
@Controller('api')
@UseInterceptors(TransformInterceptor)
export class ApiController {
  @Get('data')
  @UseInterceptors(CacheInterceptor, PerformanceInterceptor)
  async getData() {
    return { message: 'Hello World' };
  }
}
```

Interceptors là một công cụ cực kỳ mạnh mẽ trong NestJS giúp bạn xử lý cross-cutting concerns một cách hiệu quả và có tổ chức! 🚀

//DTO: Data Transfer Object là một mẫu thiết kế được sử dụng để truyền dữ liệu giữa các lớp hoặc các tầng trong một ứng dụng. DTO thường được sử dụng để đóng gói dữ liệu và truyền nó qua mạng hoặc giữa các phần khác nhau của ứng dụng mà không cần phải tiết lộ toàn bộ cấu trúc của đối tượng gốc.
//Service: Trong kiến trúc phần mềm, một service (dịch vụ) là một thành phần hoặc module chịu trách nhiệm thực hiện một chức năng cụ thể hoặc cung cấp một tập hợp các chức năng liên quan. Services thường được sử dụng để tách biệt logic nghiệp vụ khỏi các thành phần khác của ứng dụng, giúp tăng tính tái sử dụng và dễ bảo trì.
//Prisma: Prisma là một công cụ ORM (Object-Relational Mapping) mã nguồn mở giúp các nhà phát triển làm việc với cơ sở dữ liệu một cách dễ dàng và hiệu quả hơn. Nó cung cấp một cách tiếp cận hiện đại để tương tác với cơ sở dữ liệu, cho phép bạn viết mã TypeScript hoặc JavaScript để truy vấn và thao tác dữ liệu thay vì phải viết SQL thủ công.
//Hashing Service: Hashing service là một dịch vụ chịu trách nhiệm chuyển đổi dữ liệu đầu vào (thường là mật khẩu) thành một chuỗi ký tự cố định có độ dài nhất định, gọi là hash. Quá trình này sử dụng các thuật toán băm (hashing algorithms) để đảm bảo rằng dữ liệu gốc không thể được khôi phục lại từ hash, giúp bảo vệ thông tin nhạy cảm như mật khẩu người dùng.
//Prisma Client Known Request Error: Prisma Client Known Request Error là một loại lỗi đặc biệt được Prisma Client sử dụng để biểu thị các lỗi đã biết xảy ra trong quá trình thực hiện các thao tác với cơ sở dữ liệu. Những lỗi này thường liên quan đến các vấn đề như vi phạm ràng buộc dữ liệu, lỗi kết nối cơ sở dữ liệu, hoặc các lỗi khác mà Prisma có thể dự đoán và xử lý một cách cụ thể.
//Ví dụ: Trong đoạn mã trên, khi cố gắng tạo một người dùng mới với email đã tồn tại trong cơ sở dữ liệu, Prisma sẽ ném ra một lỗi với mã 'P2002', biểu thị rằng có vi phạm ràng buộc duy nhất (unique constraint violation). Điều này cho phép nhà phát triển xử lý lỗi một cách cụ thể, chẳng hạn như trả về thông báo "Email already exists" thay vì để lỗi lan truyền không kiểm soát.

import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // tự động loại bỏ các thuộc tính không được định nghĩa trong DTO
      forbidNonWhitelisted: true, // ném lỗi nếu có thuộc tính không được định nghĩa trong DTO
      transform: true, // tự động chuyển đổi payload thành các instance của lớp DTO
      // transformOptions: { enableImplicitConversion: true }, // cho phép chuyển đổi kiểu ngầm định
      exceptionFactory: (validatorErrors) => {
        return new UnprocessableEntityException(
          validatorErrors.map((err) => ({
            field: err.property,
            errors: Object.values(err.constraints as any).join(', '),
          })),
        )
      },
    }),
  )
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()

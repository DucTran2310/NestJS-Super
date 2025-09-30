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

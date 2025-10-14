import { Body, Controller, Post } from '@nestjs/common'

import { ZodSerializerDto } from 'nestjs-zod'
import { AuthService } from 'src/routes/auth/auth.service'
import { IsPublic } from 'src/shared/decorators/auth.decorator'
import { RegisterBodyDTO, RegisterResDTO } from './auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @IsPublic()
  @ZodSerializerDto(RegisterResDTO)
  async register(@Body() body: RegisterBodyDTO) {
    return await this.authService.register(body)
  }
}

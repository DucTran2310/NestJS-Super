import { Body, Controller, Post, SerializeOptions } from '@nestjs/common'
import { RegisterBodyDTO } from 'src/routes/auth/auth.dto'
import { AuthService } from 'src/routes/auth/auth.service'
import { RegisterResDTO } from './auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SerializeOptions({ type: RegisterResDTO })
  @Post('register')
  async register(@Body() body: RegisterBodyDTO) {
    // return new RegisterResDTO(await this.authService.register(body))

    return await this.authService.register(body)
  }
}

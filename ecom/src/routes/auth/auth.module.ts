import { Module } from '@nestjs/common'
import { RoleService } from 'src/routes/auth/role.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  providers: [AuthService, RoleService],
  controllers: [AuthController],
})
export class AuthModule {}

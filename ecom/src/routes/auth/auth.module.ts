import { Module } from '@nestjs/common'
import { AuthRepository } from 'src/routes/auth/auth.repo'
import { RoleService } from 'src/routes/auth/role.service'
import { SharedUserRepository } from 'src/shared/repositories/shared-user.repo'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  providers: [AuthService, RoleService, AuthRepository, SharedUserRepository],
  controllers: [AuthController],
})
export class AuthModule {}

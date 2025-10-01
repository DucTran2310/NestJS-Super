import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard'
import { ApiKeyGuard } from 'src/shared/guards/api-key.guard'
import { AuthenticationGuard } from 'src/shared/guards/authentication.guard'
import { PrismaService } from 'src/shared/services/prisma.service'
import { HashingService } from './services/hashing.service'
import { TokenService } from './services/token.service'

const sharedServices = [PrismaService, HashingService, TokenService]

@Global()
@Module({
  providers: [
    ...sharedServices,
    AccessTokenGuard,
    ApiKeyGuard,
    {
      provide: 'APP_GUARD',
      useClass: AuthenticationGuard,
    },
  ],
  exports: sharedServices,
  imports: [JwtModule],
})
export class SharedModule {}

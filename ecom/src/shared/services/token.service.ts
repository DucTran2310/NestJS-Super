import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import envConfig from 'src/shared/config'
import { TokenPayload } from 'src/shared/types/jwt.type'

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  signAccessToken(payload: { userId: number }) {
    return this.jwtService.sign(payload as any, {
      secret: envConfig.ACCESS_TOKEN_SECRET,
      algorithm: 'HS256',
    })
  }

  signRefreshToken(payload: { userId: number }) {
    return this.jwtService.sign(payload as any, {
      secret: envConfig.REFRESH_TOKEN_SECRET,
      algorithm: 'HS256',
    })
  }

  verifyAccessToken(token: string): Promise<TokenPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: envConfig.ACCESS_TOKEN_SECRET,
      algorithms: ['HS256'],
    })
  }

  verifyRefreshToken(token: string): Promise<TokenPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: envConfig.REFRESH_TOKEN_SECRET,
      algorithms: ['HS256'],
    })
  }
}

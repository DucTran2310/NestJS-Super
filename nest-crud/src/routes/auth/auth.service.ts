/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { Prisma } from 'generated/prisma'
import { LoginBodyDTO } from 'src/routes/auth/auth.dto'
import { HashingService } from 'src/shared/services/hashing.service'
import { TokenService } from 'src/shared/services/token.service'
import { PrismaService } from '../../shared/services/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async register(body: any) {
    try {
      const hashedPassword = await this.hashingService.hash(body.password)
      const user = await this.prismaService.user.create({
        data: {
          email: body.email,
          password: hashedPassword,
          name: body.name,
        },
      })
      return user
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email already exists')
        }
      }

      // Nếu đã là NestJS exception thì re-throw luôn
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }

      throw error
    }
  }

  async login(body: LoginBodyDTO) {
    const user = await this.prismaService.user.findUnique({
      where: { email: body.email },
    })

    if (!user) {
      throw new UnauthorizedException('Account is not exist')
    }

    const isPasswordMatch = await this.hashingService.compare(body.password, user.password)
    if (!isPasswordMatch) {
      throw new UnprocessableEntityException([{ field: 'password', message: 'Password is incorrect' }])
    }

    const tokens = await this.generateToken({ userId: user.id })
    return tokens
  }

  async generateToken(payload: { userId: number }) {
    const [accessToken, refreshToken] = await Promise.all([
      Promise.resolve(this.tokenService.signAccessToken(payload)),
      Promise.resolve(this.tokenService.signRefreshToken(payload)),
    ])

    const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken)
    await this.prismaService.refreshToken.create({
      data: {
        token: refreshToken,
        userId: payload.userId,
        expiresAt: new Date(decodedRefreshToken.exp * 1000), // exp là thời gian tính theo giây, nên cần nhân với 1000 để ra ms
      },
    })

    return { accessToken, refreshToken }
  }

  async refreshToken(oldRefreshToken: string) {
    try {
      // 1. Verify token (xem có hợp lệ, đúng chữ ký, chưa hết hạn,...)
      const { userId } = await this.tokenService.verifyRefreshToken(oldRefreshToken)

      // 2. Kiểm tra token có trong DB không (nếu không có thì coi như không hợp lệ)
      const storedToken = await this.prismaService.refreshToken.findUnique({
        where: { token: oldRefreshToken },
      })
      if (!storedToken) {
        throw new UnauthorizedException('Refresh token is not valid')
      }

      // 3. Xoa refreshToken cũ đi (vì refresh token chỉ dùng 1 lần)
      await this.prismaService.refreshToken.delete({
        where: { token: oldRefreshToken },
      })

      // 4. Tạo mới cặp accessToken & refreshToken
      const tokens = await this.generateToken({ userId })

      return tokens
    } catch (error) {
      // Trường hợp đã refreshToken rồi, tbao cho user biêt
      // refresh của họ đã bị đánh cắp, hoặc họ đã đăng xuất khỏi tất cả các thiết bị
      if (error instanceof Prisma.PrismaClientKnownRequestError || error.code === 'P2025') {
        throw new UnauthorizedException('Refresh token has been revoked')
      }

      throw new UnauthorizedException('Refresh token is not valid')
    }
  }
}

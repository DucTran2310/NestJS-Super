/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ConflictException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common'
import { LoginBodyDTO } from 'src/routes/auth/auth.dto'
import { isNotFoundPrismaError, isUniqueConstraintPrismaError } from 'src/shared/helpers'
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
      if (isUniqueConstraintPrismaError(error)) {
        throw new ConflictException('Email already exists')
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
      if (isNotFoundPrismaError(error)) {
        throw new UnauthorizedException('Refresh token has been revoked')
      }

      throw new UnauthorizedException('Refresh token is not valid')
    }
  }

  async logout(refreshToken: string) {
    try {
      // 1. Verify token (xem có hợp lệ, đúng chữ ký, chưa hết hạn,...)
      await this.tokenService.verifyRefreshToken(refreshToken)

      // 3. Xoa refreshToken cũ đi (vì refresh token chỉ dùng 1 lần)
      await this.prismaService.refreshToken.delete({
        where: { token: refreshToken },
      })

      return { message: 'Logout successful' }
    } catch (error) {
      // Trường hợp đã refreshToken rồi, tbao cho user biêt
      // refresh của họ đã bị đánh cắp, hoặc họ đã đăng xuất khỏi tất cả các thiết bị
      if (isNotFoundPrismaError(error)) {
        throw new UnauthorizedException('Refresh token has been revoked')
      }

      throw new UnauthorizedException('Refresh token is not valid')
    }
  }
}

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
      // Kiểm tra password và confirmPassword
      if (body.password !== body.confirmPassword) {
        throw new BadRequestException('Password and confirm password do not match')
      }

      // Kiểm tra độ dài password (tuỳ chọn)
      if (body.password.length < 6) {
        throw new BadRequestException('Password must be at least 6 characters long')
      }

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
}

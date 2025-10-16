/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { RegisterBodyType, SendOTPBodyType } from 'src/routes/auth/auth.model'
import { AuthRepository } from 'src/routes/auth/auth.repo'
import { RoleService } from 'src/routes/auth/role.service'
import envConfig from 'src/shared/config'
import { TypeOfVerificationCode } from 'src/shared/constants/auth.constant'
import { generateOTP, isUniqueConstraintPrismaError } from 'src/shared/helpers'
import { FileLogger } from 'src/shared/logger/custom.logger'
import { SharedUserRepository } from 'src/shared/repositories/shared-user.repo'
import { HashingService } from 'src/shared/services/hashing.service'

@Injectable()
export class AuthService {
  private readonly logger = new FileLogger(AuthService.name)

  constructor(
    private readonly hashingService: HashingService,
    private readonly roleService: RoleService,
    private readonly authRepository: AuthRepository,
    private readonly sharedUserRepository: SharedUserRepository,
  ) {}

  async register(body: RegisterBodyType) {
    // this.logger.verbose('Register được gọi với data:', JSON.stringify(body))

    try {
      // this.logger.debug('Lấy client role ID...')
      const verificationCode = await this.authRepository.findUniqueVerificationCode({
        email: body.email,
        code: body.code,
        type: TypeOfVerificationCode.REGISTER,
      })

      if (!verificationCode) {
        throw new UnprocessableEntityException([
          {
            message: 'Mã OTP không hợp lệ.',
            path: 'code',
          },
        ])
      }

      if (verificationCode.expiresAt < new Date()) {
        throw new UnprocessableEntityException([
          {
            message: 'Mã OTP đã hết hạn',
            path: 'code',
          },
        ])
      }

      const clientRoleId = await this.roleService.getClientRoleId()

      // this.logger.debug('Hash password...')
      const hashedPassword = await this.hashingService.hash(body.password)

      // this.logger.debug('Tạo user trong database...')
      return await this.authRepository.createUser({
        email: body.email,
        name: body.name,
        phoneNumber: body.phoneNumber,
        password: hashedPassword,
        roleId: clientRoleId,
      })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        this.logger.warn(`Email ${body.email} đã tồn tại`)
        throw new UnprocessableEntityException([
          {
            message: `Email ${body.email} đã tồn tại`,
            path: 'email',
          },
        ])
      }

      throw error
    }
  }

  async sendOTP(body: SendOTPBodyType) {
    // 1. Kiểm tra email
    const user = await this.sharedUserRepository.findUnique({
      email: body.email,
    })

    if (body.type === TypeOfVerificationCode.REGISTER && user) {
      throw new UnprocessableEntityException([
        {
          message: `Email ${body.email} đã tồn tại`,
          path: 'email',
        },
      ])
    }

    // 2. Tạo mã OTP
    const code = generateOTP()

    // THÊM AWAIT và kiểm tra OTP_EXPIRES_IN
    const expiresInMs = parseInt(envConfig.OTP_EXPIRES_IN)
    const expiresAt = new Date(Date.now() + expiresInMs)

    const verificationCode = await this.authRepository.createVerificationCode({
      email: body.email,
      code,
      type: body.type,
      expiresAt: expiresAt,
    })

    // 3. Gửi mã OTP (thực tế sẽ gọi service email)
    // await this.emailService.sendOTP(body.email, code)

    return verificationCode
  }
}

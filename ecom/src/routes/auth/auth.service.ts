import { ConflictException, Injectable } from '@nestjs/common'
import { RegisterBodyType, SendOTPBodyType } from 'src/routes/auth/auth.model'
import { AuthRepository } from 'src/routes/auth/auth.repo'
import { RoleService } from 'src/routes/auth/role.service'
import { isUniqueConstraintPrismaError } from 'src/shared/helpers'
import { FileLogger } from 'src/shared/logger/custom.logger'
import { HashingService } from 'src/shared/services/hashing.service'

@Injectable()
export class AuthService {
  private readonly logger = new FileLogger(AuthService.name)

  constructor(
    private readonly hashingService: HashingService,
    private readonly roleService: RoleService,
    private readonly authRepository: AuthRepository,
  ) {}

  async register(body: RegisterBodyType) {
    // this.logger.verbose('Register được gọi với data:', JSON.stringify(body))

    try {
      // this.logger.debug('Lấy client role ID...')
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
        throw new ConflictException(`Email ${body.email} đã tồn tại`)
      }

      throw error
    }
  }

  sendOTP(body: SendOTPBodyType) {
    this.logger.debug(`SEND OTP: ${JSON.stringify(body)}`)
  }
}

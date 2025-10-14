import { Injectable } from '@nestjs/common'
import { EmailAlreadyExistsException } from 'src/routes/auth/auth.error'
import { RoleService } from 'src/routes/auth/role.service'
import { isUniqueConstraintPrismaError } from 'src/shared/helpers'
import { FileLogger } from 'src/shared/logger/custom.logger'
import { HashingService } from 'src/shared/services/hashing.service'
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class AuthService {
  private readonly logger = new FileLogger(AuthService.name)

  constructor(
    private readonly hashingService: HashingService,
    private readonly roleService: RoleService,
    private readonly prismaService: PrismaService,
  ) {}

  async register(body: any) {
    // this.logger.verbose('Register được gọi với data:', JSON.stringify(body))

    try {
      // this.logger.debug('Lấy client role ID...')
      const clientRoleId = await this.roleService.getClientRoleId()

      // this.logger.debug('Hash password...')
      const hashedPassword = await this.hashingService.hash(body.password)

      // this.logger.debug('Tạo user trong database...')
      const user = await this.prismaService.user.create({
        data: {
          email: body.email,
          password: hashedPassword,
          name: body.name,
          phoneNumber: body.phoneNumber,
          roleId: clientRoleId,
        },
        omit: {
          // password: true,
          totpSecret: true,
        },
      })

      return user
    } catch (error) {
      this.logger.error('Chi tiết lỗi:', error)

      if (isUniqueConstraintPrismaError(error)) {
        this.logger.warn(`Email ${body.email} đã tồn tại`)
        throw EmailAlreadyExistsException
      }

      this.logger.error('Lỗi không xác định:', error.stack)
      throw error
    }
  }
}

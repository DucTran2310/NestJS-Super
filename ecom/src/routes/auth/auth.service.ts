import { Injectable } from '@nestjs/common'
import { EmailAlreadyExistsException } from 'src/routes/auth/auth.error'
import { RoleService } from 'src/routes/auth/role.service'
import { isUniqueConstraintPrismaError } from 'src/shared/helpers'
import { HashingService } from 'src/shared/services/hashing.service'
import { PrismaService } from 'src/shared/services/prisma.service'
import { RegisterBodyType } from './auth.model'

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly roleService: RoleService,
    private readonly prismaService: PrismaService,
  ) {}

  async register(body: RegisterBodyType) {
    try {
      const clientRoleId = await this.roleService.getClientRoleId()
      const hashedPassword = await this.hashingService.hash(body.password)
      const user = await this.prismaService.user.create({
        data: {
          email: body.email,
          password: hashedPassword,
          name: body.name,
          phoneNumber: body.phoneNumber,
          roleId: clientRoleId,
        },
        omit: {
          password: true,
          totpSecret: true,
        },
      })
      return user
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw EmailAlreadyExistsException
      }
      throw error
    }
  }
}

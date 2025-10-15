import { createZodDto } from 'nestjs-zod'
import { RegisterBodySchema, RegisterResSchema } from 'src/routes/auth/auth.model'
import { SendOTPBodySchema } from './auth.model'

export class RegisterBodyDTO extends createZodDto(RegisterBodySchema) {}

export class RegisterResDTO extends createZodDto(RegisterResSchema) {}

export class SendOTPBodyDTO extends createZodDto(SendOTPBodySchema) {}

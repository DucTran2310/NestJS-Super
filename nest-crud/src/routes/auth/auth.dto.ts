import { Exclude, Expose, Type } from 'class-transformer'
import { IsString } from 'class-validator'
import { SuccessResDTO } from 'src/shared/shared.dto'

export class LoginBodyDTO {
  @IsString()
  email: string

  @IsString()
  password: string
}

export class RegisterBodyDTO extends LoginBodyDTO {
  @IsString()
  name: string

  @IsString()
  confirmPassword: string
}

export class RegisterData {
  id: number
  name: string
  email: string

  @Exclude()
  password: string

  @Expose()
  get emailName(): string {
    return `${this.email} - ${this.name}`
  }

  createdAt: Date
  updatedAt: Date

  constructor(partial: Partial<RegisterResDTO>) {
    Object.assign(this, partial) // gán các thuộc tính từ partial vào instance hiện tại
  }
}

export class RegisterResDTO extends SuccessResDTO {
  @Type(() => RegisterData)
  declare data: RegisterData

  constructor(partial: Partial<RegisterResDTO>) {
    super(partial)
    Object.assign(this, partial) // gán các thuộc tính từ partial vào instance hiện tại
  }
}

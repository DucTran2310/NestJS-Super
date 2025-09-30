import { Exclude, Expose } from 'class-transformer'
import { IsString } from 'class-validator'

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

export class RegisterResDTO {
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

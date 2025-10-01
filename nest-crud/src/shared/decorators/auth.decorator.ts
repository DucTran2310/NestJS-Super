import { SetMetadata } from '@nestjs/common'
import { AUTH_TYPES_TYPE, CONDITIONS_GUARD, CONDITIONS_GUARD_TYPE } from 'src/shared/constants/auth.constant'

export const AUTH_TYPE_KEY = 'authType'
export type AuthTypeDecoratorPayload = {
  authTypes: AUTH_TYPES_TYPE[]
  options: { condition: CONDITIONS_GUARD_TYPE }
}

export const Auth = (authTypes: AUTH_TYPES_TYPE[], options?: { condition: CONDITIONS_GUARD_TYPE }) => {
  return SetMetadata(AUTH_TYPE_KEY, { authTypes, options: options ?? { condition: CONDITIONS_GUARD.AND } })
}

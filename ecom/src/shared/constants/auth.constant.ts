export const REQUEST_USER_KEY = 'user'

export const AUTH_TYPES = {
  Bearer: 'Bearer',
  None: 'None',
  ApiKey: 'ApiKey',
} as const

export type AUTH_TYPES_TYPE = (typeof AUTH_TYPES)[keyof typeof AUTH_TYPES]

export const CONDITIONS_GUARD = {
  AND: 'and',
  OR: 'or',
} as const

export type CONDITIONS_GUARD_TYPE = (typeof CONDITIONS_GUARD)[keyof typeof CONDITIONS_GUARD]

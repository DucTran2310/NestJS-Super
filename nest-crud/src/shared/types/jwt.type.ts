export interface TokenPayload {
  userId: number
  exp: number // expiration time as a Unix timestamp
  iat: number // issued at time as a Unix timestamp
}

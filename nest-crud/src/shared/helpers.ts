/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Prisma } from 'generated/prisma'

// Type predicate functions: giúp TypeScript hiểu rõ hơn về kiểu của error trong các trường hợp cụ thể
export function isUniqueConstraintPrismaError(error: any): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
}

export function isNotFoundPrismaError(error: any): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'
}

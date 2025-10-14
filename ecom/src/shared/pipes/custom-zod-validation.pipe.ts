import { UnprocessableEntityException } from '@nestjs/common'
import { createZodValidationPipe } from 'nestjs-zod'
import { ZodError } from 'zod'

const CustomZodValidationPipe: any = createZodValidationPipe({
  // provide custom validation exception factory
  createValidationException: (error: ZodError) => {
    console.log()
    return new UnprocessableEntityException(
      error.issues.map((issue) => {
        return {
          ...issue,
          path: issue.path.join('.'),
        }
      }),
    )
  },
})

export default CustomZodValidationPipe

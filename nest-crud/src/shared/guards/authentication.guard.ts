import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AUTH_TYPES, CONDITIONS_GUARD } from 'src/shared/constants/auth.constant'
import { AUTH_TYPE_KEY, AuthTypeDecoratorPayload } from 'src/shared/decorators/auth.decorator'
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard'
import { ApiKeyGuard } from 'src/shared/guards/api-key.guard'

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private readonly authTypeGuardMap: Record<string, CanActivate>

  constructor(
    private reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
    private readonly apiKeyGuard: ApiKeyGuard,
  ) {
    this.authTypeGuardMap = {
      [AUTH_TYPES.Bearer]: this.accessTokenGuard,
      [AUTH_TYPES.ApiKey]: this.apiKeyGuard,
      [AUTH_TYPES.None]: { canActivate: () => true },
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypeValue = this.reflector.getAllAndOverride<AuthTypeDecoratorPayload | undefined>(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? { authTypes: [AUTH_TYPES.None], options: { condition: CONDITIONS_GUARD.AND } }

    const guards = authTypeValue.authTypes.map((type) => this.authTypeGuardMap[type])

    let error = new UnauthorizedException()

    if (authTypeValue.options.condition === CONDITIONS_GUARD.OR) {
      for (const guard of guards) {
        const canActivate = await Promise.resolve(guard.canActivate(context)).catch((err) => {
          error = err
          return false
        })
        if (canActivate) {
          return true
        }
      }
      throw error
    } else {
      for (const guard of guards) {
        const canActivate = await Promise.resolve(guard.canActivate(context)).catch((err) => {
          error = err
          return false
        })
        if (!canActivate) {
          throw new UnauthorizedException()
        }
      }
    }

    return true
  }
}

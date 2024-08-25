import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const getRolMeta = this.reflector.get<string[]>(
      'rol',
      context.getHandler(),
    );

    if (!getRolMeta) {
      return true; // Si no hay roles definidos, permite el acceso
    }

    const req = context.switchToHttp().getRequest();
    const { roles } = req.user;

    // Verificar si el usuario tiene alguno de los roles permitidos
    const isAllow = roles.some((rol) => getRolMeta.includes(rol));
    return isAllow;
  }
}

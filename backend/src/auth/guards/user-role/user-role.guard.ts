import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //* -> AQUI VA LA LÓGICA QUE QUEREMOS EMPLEAR
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    //*-> Si no existen los roles cualquier persona puede entrar
    if (!validRoles) return true;

    //*-> Si no configurado ningun rol lo dejamos pasar
    if (validRoles.length === 0) return true;

    //* Traemos el ROL de usuario
    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) throw new BadRequestException('User not found');

    //*-> Verificamos si el rol coincide
    for (const role of user.roles) {
      if (validRoles.includes(role)) return true;
    }

    throw new ForbiddenException(
      `User ${user.name} need a valid role: [${validRoles}]`,
    );
  }
}

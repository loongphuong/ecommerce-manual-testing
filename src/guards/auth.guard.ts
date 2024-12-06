import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';

import { UserEntity } from '../modules/users/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers['authorization'];

    if (!bearerToken) {
      throw new UnauthorizedException('auth.UNAUTHORIZED');
    }

    const token = bearerToken.split(' ')[1];
    const decode = jwt.verify(token, this.configService.get('JWT_SECRET')) as {
      data: UserEntity;
    };

    if (decode) {
      request.user = decode.data;
      return true;
    }
    return false;
  }
}

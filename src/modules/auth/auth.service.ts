import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { comparePassword } from '../../common/utils';
import { RoleType } from '../../constants';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const userExisted = await this.userRepository.findByEmail(email);

    if (!userExisted) {
      throw new UnauthorizedException('auth.USERNAME_OR_PASS_INCORRECT');
    }

    if (!comparePassword(password, userExisted.password)) {
      throw new UnauthorizedException('auth.USERNAME_OR_PASS_INCORRECT');
    }

    delete userExisted.password;
    const token = await jwt.sign(
      {
        data: userExisted,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_TOKEN_EXPIRE,
      },
    );

    return {
      token,
    };
  }

  async register(registerDto: RegisterDto) {
    const { email } = registerDto;

    const userExisted = await this.userRepository.findByEmail(email);
    if (userExisted) {
      throw new BadRequestException('users.EMAIL_IS_EXISTED');
    }
    const user = this.userRepository.create(registerDto);
    user.role = RoleType.USER;
    const userCreated = this.userRepository.save(user);
    return userCreated;
  }
}

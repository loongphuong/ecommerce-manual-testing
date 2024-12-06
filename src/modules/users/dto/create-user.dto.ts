import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

import { RoleType } from '../../../constants';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty({ enum: RoleType })
  role: RoleType;

  @ApiProperty()
  @IsEmail({}, { message: 'users.EMAIL_IS_INVALID' })
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

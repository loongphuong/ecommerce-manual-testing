import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsEmail({}, { message: 'users.EMAIL_IS_INVALID' })
  email: string;

  @ApiProperty()
  @IsString({
    message: 'users.PASSWORD_IS_REQUIRED',
  })
  password: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;
}

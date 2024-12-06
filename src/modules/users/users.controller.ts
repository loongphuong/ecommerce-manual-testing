import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { QueryPaginationDto } from '../../common/dto/query-pagination.dto';
import { RoleType } from '../../constants';
import { Auth } from '../../decorators/auth.decorator';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth([RoleType.ADMIN])
  async create(
    @Body() createUserDto: CreateUserDto,
    @I18n() i18n: I18nContext,
  ) {
    const user = await this.usersService.create(createUserDto);
    return {
      message: i18n.t('users.CREATE_USER_SUCCESSFULLY'),
      data: user,
    };
  }

  @Get()
  @Auth([RoleType.ADMIN])
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(
    @Query()
    query: QueryPaginationDto,
  ) {
    return this.usersService.list(query);
  }

  @Get(':id')
  @Auth([RoleType.ADMIN])
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @Auth([RoleType.ADMIN])
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    return {
      data: user,
    };
  }

  @Delete(':id')
  @Auth([RoleType.ADMIN])
  async remove(@Param('id') id: string, @I18n() i18n: I18nContext) {
    await this.usersService.remove(id);
    return {
      message: i18n.t('users.USER_DELETE_SUCCESSFULLY', {
        args: { id },
      }),
    };
  }
}

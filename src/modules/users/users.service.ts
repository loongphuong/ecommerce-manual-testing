import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { UsersRepository } from './users.repository';
import { QueryPaginationDto } from '../../common/dto/query-pagination.dto';
import { PaginationResult } from '../../interfaces';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email } = createUserDto;

    const userExisted = await this.userRepository.findByEmail(email);

    if (userExisted) {
      throw new BadRequestException('users.EMAIL_IS_EXISTED');
    }
    const userSaved = await this.userRepository.save(createUserDto);
    return userSaved;
  }

  async list(query: QueryPaginationDto): Promise<PaginationResult<UserEntity>> {
    const { limit, page } = query;
    const data = await this.userRepository.list({
      limit: limit,
      page: page,
    });

    return data;
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('users.USER_NOT_EXIST');
    }

    user.lastName = updateUserDto.lastName;
    user.firstName = updateUserDto.firstName;
    user.role = updateUserDto.role;
    const userSaved = await this.userRepository.save(user);
    return userSaved;
  }

  async remove(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('users.USER_NOT_EXIST');
    }
    return this.userRepository.remove(user);
  }
}

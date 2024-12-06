import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { TypeORMRepository } from '../../database';

export class UsersRepository extends TypeORMRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.findOne({ where: { email } });
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductsEntity } from './products.entity';
import { TypeORMRepository } from '../../database';

export class ProductsRepository extends TypeORMRepository<ProductsEntity> {
  constructor(
    @InjectRepository(ProductsEntity)
    repository: Repository<ProductsEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}

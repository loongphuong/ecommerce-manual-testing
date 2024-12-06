import { Repository, ObjectLiteral } from 'typeorm';

import { PaginationParams, PaginationResult } from '../interfaces';

export class TypeORMRepository<T extends ObjectLiteral> extends Repository<T> {
  async list(query: PaginationParams<T>): Promise<PaginationResult<T>> {
    const { limit = 10, page = 1 } = query;
    let queryBuilder = query.queryBuilder;

    if (!queryBuilder) {
      queryBuilder = this.createQueryBuilder('document').orderBy(
        'document.createdAt',
        'ASC',
      );
    }

    const [data, count] = await queryBuilder
      .limit(limit || 10)
      .offset((page - 1) * limit || 0)
      .getManyAndCount();

    return {
      data,
      count,
      currentPage: page,
      totalPage: Math.ceil(count / limit),
    };
  }
}

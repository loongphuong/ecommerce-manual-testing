import { Injectable } from '@nestjs/common';

import { InsertProductDto } from './dto/insert-product.dto';
import { ProductsRepository } from './products.repository';
import { ProductStatus } from '../../common/enum';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepo: ProductsRepository) {}

  async detail(id: string) {
    return this.productsRepo.findOne({ where: { id: id } });
  }

  async list() {
    return this.productsRepo.find({});
  }

  async create(body: InsertProductDto, id?: string) {
    const created = await this.productsRepo.save(
      this.productsRepo.create({
        name: body.name,
        description: body.description,
        discount: body.discount,
        price: body.price,
        status: body.status,
        stock: body.stock,
        sellerId: id,
      }),
    );

    return created;
  }

  async update({ id, body }: { id: string; body: InsertProductDto }) {
    await this.productsRepo.update({ id: id }, body);
  }

  async updateStatus({ id, status }: { id: string; status: ProductStatus }) {
    await this.productsRepo.update({ id: id }, { status: status });
    return {
      isSuccess: true,
    };
  }

  async delete(id: string) {
    await this.productsRepo.update(
      { id: id },
      { status: ProductStatus.DELETED },
    );
    return {
      isSuccess: true,
    };
  }
}

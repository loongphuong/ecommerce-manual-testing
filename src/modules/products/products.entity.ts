import { Column, Entity } from 'typeorm';

import { ProductStatus } from '../../common/enum';
import { AbstractEntity } from '../../database';

@Entity({ name: 'products' })
export class ProductsEntity extends AbstractEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  discount: number;

  @Column({ nullable: true })
  stock: number;

  @Column({ nullable: true })
  sold: number;

  @Column({ nullable: true })
  status: ProductStatus;

  @Column({ nullable: true })
  sellerId: string;
}

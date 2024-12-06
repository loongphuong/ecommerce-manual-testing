import { ApiProperty } from '@nestjs/swagger';

import { ProductStatus } from '../../../common/enum';

export class InsertProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  stock: number;

  @ApiProperty({ enum: ProductStatus })
  status: ProductStatus;
}

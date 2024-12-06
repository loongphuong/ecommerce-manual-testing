import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminProductsController } from './admin.products.controller';
import { ProductsEntity } from './products.entity';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { SellerProductsController } from './seller.products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity])],
  providers: [ProductsService, ProductsRepository, ConfigService],
  controllers: [SellerProductsController, AdminProductsController],
})
export class ProductsModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { InsertProductDto } from './dto/insert-product.dto';
import { ProductsService } from './products.service';
import { RoleType } from '../../constants';
import { Auth } from '../../decorators/auth.decorator';

@ApiTags('Products')
@Controller('seller/products')
export class SellerProductsController {
  constructor(private readonly productsSvr: ProductsService) {}

  @Post('')
  @Auth([RoleType.SELLER])
  async create(
    @Res() res: Response,
    @Body() body: InsertProductDto,
    @Req() req,
  ) {
    try {
      const result = await this.productsSvr.create(body, req.user.id);
      return res.status(200).json({
        status: 'Success',
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'Error',
        error: error.message,
      });
    }
  }

  @Get('')
  @Auth([RoleType.SELLER])
  async list(@Res() res: Response) {
    try {
      const result = await this.productsSvr.list();
      return res.status(200).json({
        status: 'Success',
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  @Get('/:id')
  @Auth([RoleType.SELLER])
  async getDetailById(@Res() res: Response, @Param('id') id: string) {
    try {
      const result = await this.productsSvr.detail(id);
      return res.status(200).json({
        status: 'Success',
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  @Patch('/:id/status')
  @Auth([RoleType.SELLER])
  async changeStatus(@Res() res: Response) {
    try {
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  @Put('/:id')
  @Auth([RoleType.SELLER])
  async editById(
    @Res() res: Response,
    @Body() body: InsertProductDto,
    @Param('id') id: string,
  ) {
    try {
      const result = await this.productsSvr.update({
        id,
        body,
      });
      return res.status(200).json({
        status: 'Success',
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  @Delete('/:id')
  @Auth([RoleType.SELLER])
  async deleteById(@Res() res: Response, @Param('id') id: string) {
    try {
      const result = await this.productsSvr.delete(id);
      return res.status(200).json({
        status: 'Success',
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}

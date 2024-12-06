import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { InsertProductDto } from './dto/insert-product.dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsSvr: ProductsService) {}

  @Post('')
  async create(@Res() res: Response, @Body() body: InsertProductDto) {
    try {
      const result = await this.productsSvr.create(body);
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
  async changeStatus(@Res() res: Response) {
    try {
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  @Put('/:id')
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

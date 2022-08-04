import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CategoriesService } from '../categories/categories.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { CategoryQuery, NameOrManufacturer } from '../types/query';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductResponseDto } from './dtos/product-response.dto';
import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('products')
@Serialize(ProductResponseDto)
export class ProductsController {
  constructor(
    private productService: ProductsService,
    private categoryService: CategoriesService,
  ) {}

  @Get()
  findAll(@Query() query: CategoryQuery) {
    const { category: slug } = query;
    return this.productService.findAll(slug);
  }

  @Get('search')
  async search(@Query() query: NameOrManufacturer) {
    return this.productService.findByNameOrManufacturer(query.searchTerm);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  async create(@Body() body: CreateProductDto) {
    const category = await this.categoryService.findOne(body.categoryId);
    return this.productService.create(body, category);
  }

  @Patch(':id')
  async update(@Body() body: UpdateProductDto, @Param('id') id: number) {
    let category = null;
    if (body.categoryId) {
      category = await this.categoryService.findOne(body.categoryId);
    }

    return this.productService.update(id, body, category);
  }
}

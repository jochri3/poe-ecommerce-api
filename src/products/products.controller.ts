import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductsService } from './products.service';
import { CreateCategoryDto } from "../categories/dtos/create-category.dto";

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Post()
  create(@Body() body:CreateCategoryDto){

  }
}

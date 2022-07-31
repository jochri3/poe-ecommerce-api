import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductsService } from './products.service';
import { CreateCategoryDto } from "../categories/dtos/create-category.dto";
import { CategoriesService } from "../categories/categories.service";

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService,private categoryService:CategoriesService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Post()
  async create(@Body() body:CreateCategoryDto){
      const category=await this.categoryService;
  }
}

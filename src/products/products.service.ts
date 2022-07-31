import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { Category } from '../categories/category.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  findAll() {
    return this.repo.find();
  }

  create(createProductDto: CreateProductDto, category: Category) {
    const product = this.repo.create(createProductDto);
    product.category = category;
    return this.repo.save(product);
  }
}

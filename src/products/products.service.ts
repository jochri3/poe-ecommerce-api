import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ILike, Like, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { Category } from '../categories/category.entity';
import { CategoryQuery } from '../types/query';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  async findAll(categorySlug: string) {
    return this.repo.find({
      order: {
        name: 'ASC',
      },
      where: {
        category: {
          slug: categorySlug,
        },
      },
    });
  }

  async findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async findByNameOrManufacturer(searchTerm: string) {
    console.log('Je suis là');
    return this.repo.find({
      where: [
        { name: ILike(`%${searchTerm}%`) },
        { manufacturer: ILike(`%${searchTerm}%`) },
      ],
    });
  }

  create(createProductDto: CreateProductDto, category: Category) {
    const product = this.repo.create(createProductDto);
    product.category = category;
    return this.repo.save(product);
  }
}

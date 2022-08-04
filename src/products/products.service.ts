import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ILike, Like, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { Category } from '../categories/category.entity';
import { UpdateProductDto } from './dtos/update-product.dto';

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
    const product = await this.repo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async findByNameOrManufacturer(searchTerm: string) {
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

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    category?: Category,
  ) {
    const product = await this.repo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    if (category) {
      product.category = category;
    }
    Object.assign(product, updateProductDto);
    return this.repo.save(product);
  }
}

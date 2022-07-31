import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  findAll() {
    return this.repo.find();
  }

  create(categoryDto: CreateCategoryDto) {
    const category = this.repo.create(categoryDto);
    return this.repo.save(category);
  }
}

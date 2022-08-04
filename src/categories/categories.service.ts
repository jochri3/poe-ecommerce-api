import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CategoryQuery } from '../types/query';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  findAll() {
    return this.repo.find({
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const category = await this.repo.findOneBy({ id });
    //Todo : Duplication de code à corriger
    if (!category)
      throw new NotFoundException(`Category with id #${id} doesn't exist`);
    return category;
  }

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.repo.create(createCategoryDto);
    return this.repo.save(category);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.repo.findOneBy({ id });
    //Todo : Duplication de code à corriger
    if (!category)
      throw new NotFoundException(`Category with id #${id} doesn't exist`);
    Object.assign(category, updateCategoryDto);
    return this.repo.save(category);
  }

  async delete(id: number) {
    const category = await this.repo.findOneBy({ id });
    //Todo : Duplication de code à corriger
    if (!category)
      throw new NotFoundException(`Category with id #${id} doesn't exist`);
    return this.repo.remove(category);
  }
}

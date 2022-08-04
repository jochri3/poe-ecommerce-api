import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import slugify from 'slugify';

import { Product } from '../products/product.entity';
import { slugOptions } from '../constants/slug-options';
import { BaseEntity } from '../utils/base.entity';

@Entity({ name: 'categories' })
@Unique(['slug'])
export class Category extends BaseEntity {
  @Column()
  @Index()
  name: string;

  @Column({ nullable: true })
  @Index()
  slug: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @BeforeInsert()
  @BeforeUpdate()
  slugifyName() {
    this.slug = slugify(this.name, slugOptions);
  }
}

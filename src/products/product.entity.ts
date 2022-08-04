import {
  BeforeInsert,
  BeforeUpdate,
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../categories/category.entity';
import slugify from 'slugify';
import { slugOptions } from '../constants/slug-options';
import { BaseEntity } from '../utils/base.entity';

@Entity({ name: 'products' })
// @Unique(['name', 'category'])
@Unique(['slug'])
@Check(`"price">0`)
@Check(`"stock_quantity">=0`)
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  name: string;

  @Column({ nullable: true })
  @Index()
  slug: string;

  @Column()
  manufacturer: string;

  @ManyToOne(() => Category, (category: Category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'image_url' })
  imageUrl: string;

  //@Todo: Index???
  @Column()
  price: number;

  @Column()
  description: string;

  @Column({ name: 'stock_quantity', default: 0 })
  stockQuantity: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  slugify() {
    this.slug = slugify(this.name, slugOptions);
  }
}

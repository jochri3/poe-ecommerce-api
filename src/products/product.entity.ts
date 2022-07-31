import {
  Check,
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Category } from '../categories/category.entity';

@Entity({ name: 'products' })
@Unique(['name', 'category_id'])
@Check(`"price>0`)
@Check(`"stock_quantity">=0`)
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  name: string;

  @Column()
  manufacturer: string;

  @ManyToOne(() => Category, (category: Category) => category.products)
  category: Category;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column({ name: 'stock_quantity' })
  stockQuantity;
}

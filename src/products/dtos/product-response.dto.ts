import { IsNumber, IsString, Min } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class CreateProductDto {
  @Expose()
  name: string;

  @Expose()
  manufacturer: string;

  @Expose()
  categoryId: number;

  @Expose()
  imageUrl: string;

  @Expose()
  price: number;

  @Expose()
  description: string;

  @Expose()
  stockQuantity;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}

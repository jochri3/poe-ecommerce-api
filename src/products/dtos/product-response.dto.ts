import { Expose } from 'class-transformer';

export class ProductResponseDto {
  @Expose()
  id: number;

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
  slug: string;
}

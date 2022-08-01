import { IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  manufacturer: string;

  @IsNumber()
  @Min(1)
  categoryId: number;

  @IsString()
  imageUrl: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  stockQuantity;
}

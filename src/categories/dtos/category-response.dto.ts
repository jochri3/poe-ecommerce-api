import { Exclude, Expose } from 'class-transformer';

export class CategoryResponseDto {
  @Expose()
  name: string;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  constructor(partial: Partial<CategoryResponseDto>) {
    Object.assign(this, partial);
  }
}

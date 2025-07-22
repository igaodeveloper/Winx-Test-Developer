import { IsString, IsNumber, IsOptional, IsUrl, Min, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  category: string;

  @IsString()
  categoryId: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsUrl()
  imageUrl: string;

  constructor(data: any) {
    this.name = data.name;
    this.category = data.category;
    this.categoryId = data.categoryId;
    this.price = data.price;
    this.imageUrl = data.imageUrl;
  }
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  constructor(data: any) {
    this.name = data.name;
    this.category = data.category;
    this.categoryId = data.categoryId;
    this.price = data.price;
    this.imageUrl = data.imageUrl;
  }
} 
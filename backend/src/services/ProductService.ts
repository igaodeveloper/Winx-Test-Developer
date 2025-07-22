import { ProductRepository } from '../repositories/ProductRepository';
import { validateOrReject } from 'class-validator';
import { CreateProductDto, UpdateProductDto } from '../utils/ProductDto';

export class ProductService {
  private repo = new ProductRepository();

  async list(params: any) {
    return this.repo.list(params);
  }

  async getById(id: string) {
    return this.repo.getById(id);
  }

  async create(data: any) {
    const dto = new CreateProductDto(data);
    await validateOrReject(dto);
    return this.repo.create(dto);
  }

  async update(id: string, data: any) {
    const dto = new UpdateProductDto(data);
    await validateOrReject(dto);
    return this.repo.update(id, dto);
  }

  async remove(id: string) {
    return this.repo.remove(id);
  }
} 
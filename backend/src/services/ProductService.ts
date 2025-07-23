import { ProductRepository } from '../repositories/ProductRepository';
import { validateOrReject } from 'class-validator';
import { CreateProductDto, UpdateProductDto } from '../utils/ProductDto';
import { Product } from '../utils/Product';
import { Category } from '../models/Category';
import { webSocketService } from '../server';

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
    const product = await this.repo.create(dto);
    webSocketService.broadcastProductUpdate();
    return product;
  }

  async update(id: string, data: any) {
    const dto = new UpdateProductDto(data);
    await validateOrReject(dto);
    const product = await this.repo.update(id, dto);
    webSocketService.broadcastProductUpdate();
    return product;
  }

  async remove(id: string) {
    const product = await this.repo.remove(id);
    webSocketService.broadcastProductUpdate();
    return product;
  }
}
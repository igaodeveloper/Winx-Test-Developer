import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/ProductService';

export class ProductController {
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit, category, minPrice, maxPrice, search } = req.query;
      const result = await this.service.list({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        category: category as string,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        search: search as string,
      });
      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await this.service.getById(id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await this.service.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await this.service.update(id, req.body);
      res.json(product);
    } catch (err) {
      next(err);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.service.remove(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
} 
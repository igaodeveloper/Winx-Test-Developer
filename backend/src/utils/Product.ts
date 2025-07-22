export interface Product {
  id: string | number;
  name: string;
  category: string;
  categoryId: string | number;
  price: number;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
} 
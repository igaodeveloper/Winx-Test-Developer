/**
 * Interface que representa um produto no sistema
 */
export interface Product {
  id: string | number
  name: string
  category: string
  categoryId: string | number
  price: number
  imageUrl: string
  description: string
  imageFile?: File
  createdAt?: string
  updatedAt?: string
}
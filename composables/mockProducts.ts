import type { Product } from '../types/Product'

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Notebook Gamer Nitro 5',
    category: 'Eletrônicos',
    categoryId: 1,
    price: 7999.99,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    description: 'Notebook gamer com processador Intel Core i7, 16GB RAM, SSD NVMe 1TB, placa de vídeo NVIDIA RTX 3060, tela 15.6" Full HD 144Hz.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 2,
    name: 'Smart TV 55" 4K',
    category: 'Eletrônicos',
    categoryId: 1,
    price: 2999.99,
    imageUrl: 'https://images.unsplash.com/photo-1523217311316-7bf85bcd404b?auto=format&fit=crop&w=400&q=80',
    description: 'Smart TV 4K UHD com Android TV, HDR, Wi-Fi integrado, 4 portas HDMI e 2 USB.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 3,
    name: 'Smartphone Ultra Pro',
    category: 'Eletrônicos',
    categoryId: 1,
    price: 4999.99,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    description: 'Smartphone com tela OLED 6.7", processador Snapdragon 8 Gen 2, 12GB RAM, 256GB de armazenamento, câmera tripla 50MP.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 4,
    name: 'Cadeira Gamer Profissional',
    category: 'Móveis',
    categoryId: 2,
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
    description: 'Cadeira gamer ergonômica com encosto reclinável, braços ajustáveis e costura em couro sintético.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 5,
    name: 'Mesa de Escritório',
    category: 'Móveis',
    categoryId: 2,
    price: 899.99,
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
    description: 'Mesa de escritório em madeira maciça com tampo reforçado e design moderno.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 6,
    name: 'Fone de Ouvido Sem Fio',
    category: 'Acessórios',
    categoryId: 3,
    price: 599.99,
    imageUrl: 'https://images.unsplash.com/photo-1523217311316-7bf85bcd404b?auto=format&fit=crop&w=400&q=80',
    description: 'Fone de ouvido Bluetooth com cancelamento de ruído ativo e autonomia de 30 horas.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 7,
    name: 'Mouse Gamer RGB',
    category: 'Acessórios',
    categoryId: 3,
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    description: 'Mouse gamer com 16.000 DPI, 8 botões programáveis e iluminação RGB.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 8,
    name: 'Teclado Mecânico',
    category: 'Acessórios',
    categoryId: 3,
    price: 399.99,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    description: 'Teclado mecânico com switches Cherry MX Brown, retroiluminação RGB e layout completo.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  }
]

import { Request, Response } from 'express';

class CategoryController {
    async list(req: Request, res: Response) {
        try {
            // Simulated categories data - replace with actual database query
            const categories = [
                { id: 1, name: 'Eletrônicos' },
                { id: 2, name: 'Roupas' },
                { id: 3, name: 'Livros' },
                { id: 4, name: 'Esportes' }
            ];
            
            res.json(categories);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar categorias' });
        }
    }
}

export { CategoryController };

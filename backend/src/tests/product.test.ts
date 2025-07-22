import request from 'supertest';
import app from '../app';

describe('GET /products', () => {
  it('deve retornar 200 e um array de produtos', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
}); 
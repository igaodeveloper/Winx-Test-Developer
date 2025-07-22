import { supabase } from '@config/supabase';
import { Product } from '@utils/Product';

export class ProductRepository {
  async list({ page = 1, limit = 10, category, minPrice, maxPrice, search }: any) {
    let query = supabase.from('products').select('*', { count: 'exact' });
    if (category) query = query.eq('category', category);
    if (minPrice !== undefined) query = query.gte('price', minPrice);
    if (maxPrice !== undefined) query = query.lte('price', maxPrice);
    if (search) query = query.textSearch('name', search, { type: 'websearch' });
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
    const { data, error, count } = await query;
    if (error) throw error;
    return { data, count };
  }

  async getById(id: string) {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async create(product: any) {
    const { data, error } = await supabase.from('products').insert([product]).select().single();
    if (error) throw error;
    return data;
  }

  async update(id: string, product: any) {
    const { data, error } = await supabase.from('products').update(product).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async remove(id: string) {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
} 
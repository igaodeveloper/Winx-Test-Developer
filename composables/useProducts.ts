import { Ref, ref } from 'vue'
import type { Product } from '../types/Product'
import { useNuxtApp } from 'nuxt/app'
import type { AxiosInstance } from 'axios/'
import { useLoading } from './useLoading'

export function useProducts() {
  // Lista de produtos
  const products: Ref<Product[]> = ref([])
  // Total de páginas para paginação
  const totalPages: Ref<number> = ref(1)
  // Loading states
  const { loading: loadingProducts, setLoading: setLoadingProducts } = useLoading()
  const { loading: loadingCategories, setLoading: setLoadingCategories } = useLoading()
  // Lista de categorias disponíveis
  const categories: Ref<{ id: string | number, name: string }[]> = ref([])
  // Mensagem de erro, se houver
  const error: Ref<string | null> = ref(null)

  /**
   * Busca produtos da API com filtros, paginação e busca
   * @param params Filtros e paginação
   */
  async function fetchProducts(params: {
    page?: number
    search?: string
    categoryId?: string | number
    price?: number
  } = {}): Promise<void> {
    setLoadingProducts(true)
    error.value = null
    try {
      const { $axios } = useNuxtApp()
      const axios = $axios as AxiosInstance
      const { data } = await axios.get('/products', { params })
      products.value = data.items
      totalPages.value = data.totalPages
    } catch (err: any) {
      error.value = err?.response?.data?.message || 'Erro ao buscar produtos.'
    } finally {
      setLoadingProducts(false)
    }
  }

  /**
   * Busca categorias disponíveis para filtro
   */
  async function fetchCategories(): Promise<void> {
    setLoadingCategories(true)
    try {
      const { $axios } = useNuxtApp()
      const axios = $axios as AxiosInstance
      const { data } = await axios.get('/categories')
      categories.value = data
    } catch (err) {
      console.error('Error fetching categories:', err)
      categories.value = []
    } finally {
      setLoadingCategories(false)
    }
  }

  // Carregar categorias ao iniciar
  fetchCategories()

  // Retorno padronizado e tipado
  return {
    products,
    totalPages,
    loading: loadingProducts,
    error,
    categories,
    loadingCategories,
    fetchProducts,
    fetchCategories
  } as const
}

import { Ref, ref } from 'vue'
import type { Product } from '../types/Product'
import { useNuxtApp } from 'nuxt/app'
import type { AxiosInstance } from 'axios/'

export function useProducts() {
  // Lista de produtos
  const products: Ref<Product[]> = ref([])
  // Total de páginas para paginação
  const totalPages: Ref<number> = ref(1)
  // Estado de carregamento da listagem
  const loading: Ref<boolean> = ref(false)
  // Mensagem de erro, se houver
  const error: Ref<string | null> = ref(null)
  // Lista de categorias disponíveis
  const categories: Ref<{ id: string | number, name: string }[]> = ref([])
  // Estado de carregamento das categorias
  const loadingCategories: Ref<boolean> = ref(false)

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
    loading.value = true
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
      loading.value = false
    }
  }

  /**
   * Busca categorias disponíveis para filtro
   */
  async function fetchCategories(): Promise<void> {
    loadingCategories.value = true
    try {
      const { $axios } = useNuxtApp()
      const axios = $axios as AxiosInstance
      const { data } = await axios.get('/categories')
      categories.value = data
    } catch {
      categories.value = []
    } finally {
      loadingCategories.value = false
    }
  }

  // Carregar categorias ao iniciar
  fetchCategories()

  // Retorno padronizado e tipado
  return {
    products,
    totalPages,
    loading,
    error,
    categories,
    loadingCategories,
    fetchProducts,
    fetchCategories
  } as const
}

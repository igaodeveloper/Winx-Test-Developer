import type { Product } from '../types/Product'
import { useNuxtApp } from 'nuxt/app'
import type { AxiosInstance } from 'axios'
import { AxiosError } from 'axios'
import { useLoading } from './useLoading'
import { mockProducts } from './mockProducts'

import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { useWebSocket } from './useWebSocket'

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

  // WebSocket
  const { socket, isConnected } = useWebSocket()

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
      // Using mock data for testing
      products.value = mockProducts
      totalPages.value = 1
    } catch (err) {
      console.error('Error fetching products:', err)
      error.value = 'Erro ao buscar produtos. Por favor, tente novamente mais tarde.'
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
      
      // Valida a resposta
      if (!data || !Array.isArray(data)) {
        throw new Error('Resposta da API inválida')
      }
      
      // Atualiza as categorias
      categories.value = data.map(category => ({
        id: category.id,
        name: category.name
      }))
      categories.value = data
    } catch (err: any) {
      console.error('Error fetching categories:', err)
      error.value = err?.response?.data?.message || 'Erro ao carregar categorias'
      categories.value = []
    } finally {
      setLoadingCategories(false)
    }
  }

  // Configura o listener WebSocket para atualizações
  onMounted(() => {
    if (socket.value) {
      socket.value.onmessage = (event) => {
        if (event.data === 'productUpdate') {
          fetchProducts()
        }
      }
    }
  })

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

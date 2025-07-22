import { Ref, ref } from 'vue'
import type { Product } from '../types/Product'
import { useNuxtApp } from 'nuxt/app'
import type { AxiosInstance } from 'axios'

export function useProduct() {
  // Produto selecionado
  const product: Ref<Product | null> = ref(null)
  // Estado de carregamento
  const loading: Ref<boolean> = ref(false)
  // Mensagem de erro, se houver
  const error: Ref<string | null> = ref(null)

  /**
   * Busca detalhes de um produto pelo ID
   * @param id ID do produto
   */
  async function fetchProduct(id: string | number): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const { $axios } = useNuxtApp()
      const axios = $axios as AxiosInstance
      const { data } = await axios.get(`/products/${id}`)
      product.value = data
    } catch (err: any) {
      error.value = err?.response?.data?.message || 'Erro ao buscar produto.'
      product.value = null
    } finally {
      loading.value = false
    }
  }

  // Retorno padronizado e tipado
  return {
    product,
    loading,
    error,
    fetchProduct
  } as const
} 
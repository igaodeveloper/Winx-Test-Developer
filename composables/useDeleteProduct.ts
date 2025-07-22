import { Ref, ref } from 'vue'
import { useNuxtApp } from 'nuxt/app'
import type { AxiosInstance } from 'axios'

export function useDeleteProduct() {
  // Estado de carregamento
  const loading: Ref<boolean> = ref(false)
  // Mensagem de erro geral
  const error: Ref<string | null> = ref(null)

  /**
   * Exclui um produto pelo ID
   * @param id ID do produto
   * @returns true se sucesso, false se erro
   */
  async function deleteProduct(id: string | number): Promise<boolean> {
    loading.value = true
    error.value = null
    try {
      const { $axios } = useNuxtApp()
      const axios = $axios as AxiosInstance
      await axios.delete(`/products/${id}`)
      return true
    } catch (err: any) {
      error.value = err?.response?.data?.message || 'Erro ao excluir produto.'
      return false
    } finally {
      loading.value = false
    }
  }

  // Retorno padronizado e tipado
  return {
    deleteProduct,
    loading,
    error
  } as const
} 
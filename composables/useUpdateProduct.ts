import { Ref, ref } from 'vue'
import type { Product } from '../types/Product'
import { useNuxtApp } from 'nuxt/app'
import type { AxiosInstance } from 'axios'

export function useUpdateProduct() {
  // Estado de carregamento
  const loading: Ref<boolean> = ref(false)
  // Erros de validação por campo
  const errors: Ref<Record<string, string>> = ref({})
  // Mensagem de erro geral
  const error: Ref<string | null> = ref(null)

  /**
   * Atualiza um produto existente
   * @param id ID do produto
   * @param product Dados do produto
   * @returns true se sucesso, false se erro
   */
  async function updateProduct(id: string | number, product: Partial<Product>): Promise<boolean> {
    loading.value = true
    errors.value = {}
    error.value = null
    try {
      // Validação básica
      if (!product.name) errors.value.name = 'Nome obrigatório'
      if (!product.categoryId) errors.value.categoryId = 'Categoria obrigatória'
      if (!product.imageUrl) errors.value.imageUrl = 'URL da imagem obrigatória'
      if (Object.keys(errors.value).length > 0) throw new Error('Validação')
      const { $axios } = useNuxtApp()
      const axios = $axios as AxiosInstance
      await axios.put(`/products/${id}`, product)
      return true
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        errors.value = err.response.data.errors
      } else if (err.message === 'Validação') {
        // erros já setados
      } else {
        error.value = err?.response?.data?.message || 'Erro ao atualizar produto.'
      }
      return false
    } finally {
      loading.value = false
    }
  }

  // Retorno padronizado e tipado
  return {
    updateProduct,
    loading,
    errors,
    error
  } as const
} 
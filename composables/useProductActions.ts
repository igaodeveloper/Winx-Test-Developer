import type { Product } from '../types/Product'
import { useNuxtApp } from 'nuxt/app'
import { useLoading } from './useLoading'
import { useWebSocket } from './useWebSocket'
import { ref } from 'vue'
import { useProducts } from './useProducts'
import { useRouter } from 'vue-router'

export function useProductActions() {
  const { socket } = useWebSocket()
  const { setLoading: setLoadingProducts } = useLoading()
  const { $axios } = useNuxtApp()
  const axios = $axios as any
  const error = ref<string | null>(null)
  const loading = ref(false)
  const router = useRouter()

  // Função para detalhes do produto
  async function handleDetails(product: Product) {
    try {
      loading.value = true
      router.push(`/products/${product.id}`)
    } catch (err) {
      console.error('Erro ao visualizar detalhes:', err)
      error.value = 'Erro ao visualizar detalhes. Por favor, tente novamente.'
    } finally {
      loading.value = false
    }
  }

  // Função para editar produto
  async function handleEdit(product: Product) {
    try {
      loading.value = true
      router.push(`/products/${product.id}/edit`)
    } catch (err) {
      console.error('Erro ao editar produto:', err)
      error.value = 'Erro ao editar produto. Por favor, tente novamente.'
    } finally {
      loading.value = false
    }
  }

  // Função para excluir produto
  async function handleDelete(product: Product) {
    try {
      loading.value = true
      // Confirmar exclusão
      if (!confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`)) {
        return
      }

      // Excluir produto (usando mock data)
      const products = useProducts()
      const index = products.products.value.findIndex((p: Product) => p.id === product.id)
      if (index !== -1) {
        products.products.value.splice(index, 1)
        // Emitir evento WebSocket para atualizar outros clientes
        if (socket.value) {
          socket.value.send('productUpdate')
        }
      }
      router.push('/products')
    } catch (err) {
      console.error('Erro ao excluir produto:', err)
      error.value = 'Erro ao excluir produto. Por favor, tente novamente.'
    } finally {
      loading.value = false
    }
  }

  return {
    handleDetails,
    handleEdit,
    handleDelete,
    error,
    loading
  }
}

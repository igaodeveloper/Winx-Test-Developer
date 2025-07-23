import type { Product } from '../types/Product'
import { ref } from 'vue'
import { useToast } from './useToast'

export function useProductOperations() {
  const { showToast } = useToast()
  const mockProducts = ref<Product[]>([])
  const selectedProduct = ref<Product | null>(null)
  const showDeleteModal = ref(false)

  // Simula a atualização de um produto
  async function updateProduct(updatedProduct: Product): Promise<boolean> {
    try {
      const index = mockProducts.value.findIndex(p => p.id === updatedProduct.id)
      if (index === -1) {
        showToast('Produto não encontrado', 'error')
        return false
      }

      mockProducts.value[index] = {
        ...mockProducts.value[index],
        ...updatedProduct,
        updatedAt: new Date().toISOString()
      }

      showToast('Produto atualizado com sucesso!', 'success')
      return true
    } catch (err) {
      console.error('Error updating product:', err)
      showToast('Erro ao atualizar produto', 'error')
      return false
    }
  }

  // Simula a exclusão de um produto
  async function deleteProduct(productId: number | string): Promise<boolean> {
    try {
      const index = mockProducts.value.findIndex(p => p.id === productId)
      if (index === -1) {
        showToast('Produto não encontrado', 'error')
        return false
      }

      mockProducts.value.splice(index, 1)
      showToast('Produto excluído com sucesso!', 'success')
      return true
    } catch (err) {
      console.error('Error deleting product:', err)
      showToast('Erro ao excluir produto', 'error')
      return false
    }
  }

  // Seleciona um produto para edição
  function selectProductForEdit(product: Product) {
    selectedProduct.value = product
  }

  // Limpa o produto selecionado
  function clearSelectedProduct() {
    selectedProduct.value = null
  }

  return {
    mockProducts,
    selectedProduct,
    showDeleteModal,
    updateProduct,
    deleteProduct,
    selectProductForEdit,
    clearSelectedProduct
  }
}

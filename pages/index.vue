<template>
  <div>
    <div v-if="error" class="text-red-500 mb-4">
      {{ error }}
    </div>
    <ProductFilters
      :categories="categories"
      :loading="loading"
      :loading-categories="loadingCategories"
      :min-price="0"
      :max-price="10000"
      @update:filters="onUpdateFilters"
    />
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="n in 8" :key="n" class="animate-pulse bg-white rounded-lg h-64" />
    </div>
    <div v-else-if="products.length === 0" class="text-center text-gray-500 py-12">
      Nenhum produto encontrado.
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @details="goToDetails"
        @edit="goToEdit"
        @delete="confirmDelete(product)"
      />
    </div>
    <Pagination
      v-if="totalPages > 1"
      :current-page="page"
      :total-pages="totalPages"
      @update:page="onChangePage"
    />
    <DeleteConfirmModal
      :show="showDeleteModal"
      :message="'Deseja realmente excluir o produto ' + (selectedProduct?.name || '') + '?'"
      :loading="deleting"
      @cancel="showDeleteModal = false"
      @confirm="deleteProduct"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProductCard from '../components/product/ProductCard.vue'
import ProductFilters from '../components/product/ProductFilters.vue'
import Pagination from '../components/common/Pagination.vue'
import DeleteConfirmModal from '../components/common/DeleteConfirmModal.vue'
import { useProducts } from '../composables/useProducts'
import { useDeleteProduct } from '../composables/useDeleteProduct'
import { useToast } from '../composables/useToast'
import type { Product } from '../types/Product'
import { navigateTo } from 'nuxt/app'

// Estado da página atual
const page = ref(1)
// Filtros aplicados
const filters = ref({ search: '', categoryId: '', price: 10000 })
// Composable de produtos
const { products, totalPages, loading, categories, loadingCategories, fetchProducts } = useProducts()
// Composable de exclusão
const { deleteProduct: deleteProductApi, loading: deleting, error: deleteError } = useDeleteProduct()
// Toast para feedback visual
const { showToast } = useToast()

// Modal de confirmação de exclusão
const showDeleteModal = ref(false)
const selectedProduct = ref<Product | null>(null)

/**
 * Atualiza filtros e busca produtos
 */
function onUpdateFilters(newFilters: any) {
  filters.value = newFilters
  page.value = 1
  fetchProducts({ page: page.value, ...filters.value })
}

/**
 * Troca de página
 */
function onChangePage(newPage: number) {
  page.value = newPage
  fetchProducts({ page: page.value, ...filters.value })
}

/**
 * Navega para detalhes do produto
 */
function goToDetails(product: Product) {
  navigateTo(`/products/${product.id}`)
}

/**
 * Navega para edição do produto
 */
function goToEdit(product: Product) {
  navigateTo(`/products/${product.id}/edit`)
}

/**
 * Abre modal de confirmação de exclusão
 */
function confirmDelete(product: Product) {
  selectedProduct.value = product
  showDeleteModal.value = true
}

/**
 * Exclui produto e mostra feedback visual
 */
async function deleteProduct() {
  if (!selectedProduct.value) return
  const success = await deleteProductApi(selectedProduct.value.id)
  showDeleteModal.value = false
  if (success) {
    showToast('Produto excluído com sucesso!', 'success')
    fetchProducts({ page: page.value, ...filters.value })
  } else if (deleteError.value) {
    showToast(deleteError.value, 'error')
  }
}

// Inicialização: busca produtos ao carregar
fetchProducts({ page: page.value, ...filters.value })
</script> 
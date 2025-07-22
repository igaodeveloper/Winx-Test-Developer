<template>
  <div v-if="loading" class="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 animate-pulse h-96" />
  <div v-else-if="!product" class="text-center text-gray-500 py-12">Produto não encontrado.</div>
  <div v-else class="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
    <div class="flex flex-col md:flex-row gap-6">
      <img :src="product.imageUrl" :alt="product.name" class="w-full md:w-64 h-48 object-cover rounded" />
      <div class="flex-1">
        <h1 class="text-2xl font-bold mb-2">{{ product.name }}</h1>
        <p class="text-gray-500 mb-1">Categoria: {{ product.category }}</p>
        <p class="text-primary-600 font-semibold text-xl mb-2">R$ {{ product.price.toFixed(2) }}</p>
        <div class="flex gap-2 mt-4">
          <BaseButton variant="secondary" @click="goToEdit">Editar</BaseButton>
          <BaseButton variant="danger" @click="showDeleteModal = true">Excluir</BaseButton>
        </div>
      </div>
    </div>
    <DeleteConfirmModal
      :show="showDeleteModal"
      :message="'Deseja realmente excluir o produto ' + (product?.name || '') + '?'"
      :loading="deleting"
      @cancel="showDeleteModal = false"
      @confirm="deleteProduct"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, navigateTo } from 'nuxt/app'
import BaseButton from '../../components/common/BaseButton.vue'
import DeleteConfirmModal from '../../components/common/DeleteConfirmModal.vue'
import { useProduct } from '../../composables/useProduct'
import { useDeleteProduct } from '../../composables/useDeleteProduct'
import { useToast } from '../../composables/useToast'

// Rota e ID do produto
const route = useRoute()
const id = route.params.id as string
// Composable de produto
const { product, loading, fetchProduct } = useProduct()
// Composable de exclusão
const { deleteProduct: deleteProductApi, loading: deleting, error: deleteError } = useDeleteProduct()
// Toast para feedback visual
const { showToast } = useToast()
// Modal de confirmação
const showDeleteModal = ref(false)

/**
 * Navega para edição
 */
function goToEdit() {
  navigateTo(`/products/${id}/edit`)
}

/**
 * Exclui produto e mostra feedback visual
 */
async function deleteProduct() {
  const success = await deleteProductApi(id)
  showDeleteModal.value = false
  if (success) {
    showToast('Produto excluído com sucesso!', 'success')
    navigateTo('/')
  } else if (deleteError.value) {
    showToast(deleteError.value, 'error')
  }
}

// Inicialização: busca produto ao carregar
fetchProduct(id)
</script> 
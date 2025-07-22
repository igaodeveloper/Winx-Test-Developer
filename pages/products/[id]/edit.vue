<template>
  <div class="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
    <h1 class="text-2xl font-bold mb-4">Editar Produto</h1>
    <ProductForm
      v-if="!loading"
      v-model="form"
      :categories="categories"
      :loading="updating"
      :loading-categories="loadingCategories"
      :errors="errors"
      submit-label="Salvar"
      @submit="onSubmit"
      @cancel="onCancel"
    />
    <div v-else class="animate-pulse h-80" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, navigateTo } from 'nuxt/app'
import ProductForm from '../../../components/product/ProductForm.vue'
import { useProduct } from '../../../composables/useProduct'
import { useUpdateProduct } from '../../../composables/useUpdateProduct'
import { useProducts } from '../../../composables/useProducts'
import { useToast } from '../../../composables/useToast'

// Rota e ID do produto
const route = useRoute()
const id = route.params.id as string
// Composable de produto
const { product, loading, fetchProduct } = useProduct()
// Composable de atualização
const { updateProduct, loading: updating, errors, error } = useUpdateProduct()
// Composable de categorias
const { categories, loadingCategories } = useProducts()
// Toast para feedback visual
const { showToast } = useToast()
// Estado do formulário
const form = ref({})

// Atualiza o formulário quando o produto é carregado
watch(product, val => {
  if (val) form.value = { ...val }
}, { immediate: true })

/**
 * Submete o formulário de edição
 */
async function onSubmit(updated: any) {
  const success = await updateProduct(id, updated)
  if (success) {
    showToast('Produto atualizado com sucesso!', 'success')
    navigateTo(`/products/${id}`)
  } else if (error.value) {
    showToast(error.value, 'error')
  }
}

/**
 * Cancela e volta para detalhes
 */
function onCancel() {
  navigateTo(`/products/${id}`)
}

// Inicialização: busca produto ao carregar
fetchProduct(id)
</script> 
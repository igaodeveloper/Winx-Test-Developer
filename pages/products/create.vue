<template>
  <div class="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
    <h1 class="text-2xl font-bold mb-4">Cadastrar Produto</h1>
    <ProductForm
      v-model="form"
      :categories="categories"
      :loading="loading"
      :loading-categories="loadingCategories"
      :errors="errors"
      submit-label="Cadastrar"
      @submit="onSubmit"
      @cancel="onCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProductForm from '../../components/product/ProductForm.vue'
import { useCreateProduct } from '../../composables/useCreateProduct'
import { useProducts } from '../../composables/useProducts'
import { useToast } from '../../composables/useToast'
import { navigateTo } from 'nuxt/app'

// Estado do formulário
const form = ref({})
// Composable de criação
const { createProduct, loading, errors, error } = useCreateProduct()
// Composable de categorias
const { categories, loadingCategories } = useProducts()
// Toast para feedback visual
const { showToast } = useToast()

/**
 * Submete o formulário de cadastro
 */
async function onSubmit(product: any) {
  const success = await createProduct(product)
  if (success) {
    showToast('Produto cadastrado com sucesso!', 'success')
    navigateTo('/')
  } else if (error.value) {
    showToast(error.value, 'error')
  }
}

/**
 * Cancela e volta para a listagem
 */
function onCancel() {
  navigateTo('/')
}
</script> 
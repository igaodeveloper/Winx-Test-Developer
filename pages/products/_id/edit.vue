<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Editar Produto</h1>
        <NuxtLink to="/products" class="text-primary-600 hover:text-primary-800">
          Voltar
        </NuxtLink>
      </div>

      <div v-if="loading" class="text-center py-8">
        <p class="text-gray-600">Carregando...</p>
      </div>

      <div v-else-if="error" class="text-center py-8 text-red-500">
        {{ error }}
      </div>

      <form v-else @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label for="category" class="block text-sm font-medium text-gray-700">Categoria</label>
          <input
            type="text"
            id="category"
            v-model="form.category"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label for="price" class="block text-sm font-medium text-gray-700">Preço</label>
          <input
            type="number"
            id="price"
            v-model="form.price"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            step="0.01"
            required
          />
        </div>

        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            id="description"
            v-model="form.description"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          ></textarea>
        </div>

        <div>
          <label for="imageUrl" class="block text-sm font-medium text-gray-700">URL da Imagem</label>
          <input
            type="url"
            id="imageUrl"
            v-model="form.imageUrl"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div class="flex justify-end space-x-3">
          <BaseButton variant="secondary" type="button" @click="router.push('/products')">
            Cancelar
          </BaseButton>
          <BaseButton variant="primary" type="submit" :disabled="loading">
            Salvar
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/Product'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { useProducts } from '~/composables/useProducts'

const route = useRoute()
const router = useRouter()
const products = useProducts()

const form = ref<Product>({
  id: '',
  name: '',
  category: '',
  categoryId: '',
  price: 0,
  description: '',
  imageUrl: ''
})

const loading = ref(false)
const error = ref<string | null>(null)

// Carregar produto existente
const loadProduct = async () => {
  try {
    loading.value = true
    const product = products.products.value.find(p => p.id === route.params.id)
    if (product) {
      form.value = { ...product }
    } else {
      error.value = 'Produto não encontrado'
    }
  } catch (err) {
    error.value = 'Erro ao carregar produto'
  } finally {
    loading.value = false
  }
}

// Salvar produto
const handleSubmit = async () => {
  try {
    loading.value = true
    // Aqui você implementaria a chamada à API para salvar o produto
    console.log('Salvando produto:', form.value)
    // Após salvar, redireciona para a lista de produtos
    router.push('/products')
  } catch (err) {
    error.value = 'Erro ao salvar produto'
  } finally {
    loading.value = false
  }
}

// Carregar produto quando a página é montada
onMounted(() => {
  loadProduct()
})

// Atualizar produto quando o ID muda
watch(() => route.params.id, () => {
  loadProduct()
})
</script>

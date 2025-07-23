<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Product } from '~/types/Product'
import { useProductActions } from '~/composables/useProductActions'
import { useProducts } from '~/composables/useProducts'

const route = useRoute()
const router = useRouter()
const { handleDelete: deleteProduct, error, loading } = useProductActions()

const product = ref<Product | null>(null)

// Buscar produto pelo ID
const fetchProduct = async () => {
  try {
    loading.value = true
    const productsStore = useProducts()
    const foundProduct = productsStore.products.value.find((p: Product) => p.id === route.params.id)
    if (!foundProduct) {
      error.value = 'Produto não encontrado'
      product.value = null
      return
    }
    product.value = foundProduct
  } catch (err) {
    console.error('Erro ao buscar produto:', err)
    error.value = 'Erro ao buscar produto'
    product.value = null
  } finally {
    loading.value = false
  }
}

// Redirecionar após exclusão
const handleProductDelete = async () => {
  if (product.value) {
    await deleteProduct(product.value)
    router.push('/products')
  }
}

// Carregar produto quando a página é montada
onMounted(() => {
  fetchProduct()
})

// Atualizar produto quando o ID muda
watch(() => route.params.id, () => {
  fetchProduct()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Detalhes do Produto</h1>
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

      <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
          <img :src="product.imageUrl" :alt="product.name" class="object-cover w-full h-full" />
        </div>
        <div>
          <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
          <p class="text-gray-600 mb-4">{{ product.category }}</p>
          <div class="font-bold text-2xl text-primary-600 mb-4">R$ {{ product.price.toFixed(2) }}</div>
          <p class="text-gray-700 mb-4">{{ product.description }}</p>
          <div class="flex gap-2">
            <BaseButton variant="secondary" :to="`/products/${product.id}/edit`">
              Editar
            </BaseButton>
            <BaseButton variant="danger" @click="handleProductDelete">
              Excluir
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

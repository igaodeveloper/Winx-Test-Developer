<template>
  <motion.div 
    v-if="loading" 
    class="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 h-96"
    :initial="{ opacity: 0, y: 20 }"
    :animate="{ opacity: 1, y: 0 }"
    :exit="{ opacity: 0, y: -20 }"
    :transition="{ duration: 0.5 }"
  />
  <div v-else-if="!product" class="text-center text-gray-500 py-12">
    <motion.p 
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ duration: 0.3 }"
    >
      Produto não encontrado.
    </motion.p>
  </div>
  <motion.div 
    v-else 
    class="max-w-2xl mx-auto bg-white rounded-lg shadow p-6"
    :initial="{ opacity: 0, scale: 0.95 }"
    :animate="{ opacity: 1, scale: 1 }"
    :exit="{ opacity: 0, scale: 0.95 }"
    :transition="{ duration: 0.5 }"
  >
    <motion.div 
      class="flex flex-col md:flex-row gap-6"
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :exit="{ opacity: 0, y: -20 }"
      :transition="{ duration: 0.5 }"
    >
      <motion.img 
        :src="product.imageUrl" 
        :alt="product.name" 
        class="w-full md:w-64 h-48 object-cover rounded"
        :initial="{ opacity: 0, scale: 0.9 }"
        :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0.9 }"
        :transition="{ duration: 0.5 }"
        :whileHover="{ scale: 1.05 }"
      />
      <motion.div 
        class="flex-1"
        :initial="{ opacity: 0, x: -20 }"
        :animate="{ opacity: 1, x: 0 }"
        :exit="{ opacity: 0, x: -20 }"
        :transition="{ duration: 0.5 }"
      >
        <motion.h1 
          class="text-2xl font-bold mb-2"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, y: -20 }"
          :transition="{ duration: 0.5 }"
        >
          {{ product.name }}
        </motion.h1>
        <motion.p 
          class="text-gray-500 mb-1"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, y: -20 }"
          :transition="{ duration: 0.5 }"
        >
          Categoria: {{ product.category }}
        </motion.p>
        <motion.p 
          class="text-primary-600 font-semibold text-xl mb-2"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, y: -20 }"
          :transition="{ duration: 0.5 }"
        >
          R$ {{ product.price.toFixed(2) }}
        </motion.p>
        <motion.div 
          class="flex gap-2 mt-4"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, y: -20 }"
          :transition="{ duration: 0.5 }"
        >
          <BaseButton 
            variant="secondary" 
            @click="goToEdit"
            class="hover:scale-105 transition-transform"
          >
            Editar
          </BaseButton>
          <BaseButton 
            variant="danger" 
            @click="showDeleteModal = true"
            class="hover:scale-105 transition-transform"
          >
            Excluir
          </BaseButton>
        </motion.div>
      </motion.div>
    </motion.div>
    <DeleteConfirmModal
      :show="showDeleteModal"
      :message="'Deseja realmente excluir o produto ' + (product?.name || '') + '?'"
      :loading="deleting"
      @cancel="showDeleteModal = false"
      @confirm="deleteProduct"
    />
  </motion.div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProducts } from '~/composables/useProducts'
import { useProductOperations } from '~/composables/useProductOperations'
import { useToast } from '~/composables/useToast'
import { motion } from 'framer-motion'
import type { Product } from '~/types/Product'

const route = useRoute()
const router = useRouter()
const { products, loading: productsLoading, error: productsError } = useProducts()
const { deleteProduct, updateProduct } = useProductOperations()
const { showToast } = useToast()

const product = ref<Product | null>(null)
const loading = ref(true)
const deleting = ref(false)
const showDeleteModal = ref(false)

// Busca o produto específico
const fetchProduct = async () => {
  try {
    const productId = parseInt(route.params.id as string)
    const foundProduct = products.value.find(p => p.id === productId)
    if (foundProduct) {
      product.value = foundProduct
    } else {
      throw new Error('Produto não encontrado')
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar produto'
    showToast(errorMessage, 'error')
  } finally {
    loading.value = false
  }
}

// Navega para a página de edição
const goToEdit = () => {
  router.push(`/products/${route.params.id}/edit`)
}

// Confirma a exclusão do produto
const confirmDelete = async () => {
  try {
    deleting.value = true
    if (product.value) {
      await deleteProduct(product.value.id)
      showToast('Produto excluído com sucesso!', 'success')
      router.push('/')
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Erro ao excluir produto'
    showToast(errorMessage, 'error')
  } finally {
    deleting.value = false
    showDeleteModal.value = false
  }
}

// Atualiza o produto
const updateProductHandler = async (updatedProduct: Product) => {
  try {
    await updateProduct(updatedProduct)
    showToast('Produto atualizado com sucesso!', 'success')
    router.push(`/products/${updatedProduct.id}`)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar produto'
    showToast(errorMessage, 'error')
  }
}

// Carrega os dados quando o componente é montado
onMounted(() => fetchProduct())
</script>
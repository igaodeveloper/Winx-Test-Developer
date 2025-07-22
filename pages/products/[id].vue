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
import { ref } from 'vue'
import { useRoute, navigateTo } from 'nuxt/app'
import BaseButton from '../../components/common/BaseButton.vue'
import DeleteConfirmModal from '../../components/common/DeleteConfirmModal.vue'
import { useProduct } from '../../composables/useProduct'
import { useDeleteProduct } from '../../composables/useDeleteProduct'
import { useToast } from '../../composables/useToast'
import { motion } from 'framer-motion/vue'

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
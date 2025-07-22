<template>
  <div class="flex flex-col md:flex-row gap-3 md:items-end mb-4">
    <div class="flex-1">
      <SearchInput v-model="filters.search" placeholder="Buscar por nome..." :loading="loading" />
    </div>
    <div class="w-full md:w-48">
      <CategorySelect v-model="filters.categoryId" :categories="categories" :loading="loadingCategories" />
    </div>
    <div class="w-full md:w-64">
      <PriceRangeSlider v-model="filters.price" :min="minPrice" :max="maxPrice" label="Preço até" />
    </div>
    <div>
      <BaseButton variant="secondary" @click="clearFilters">Limpar</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import SearchInput from '../../components/common/SearchInput.vue'
import CategorySelect from '../../components/common/CategorySelect.vue'
import PriceRangeSlider from '../../components/common/PriceRangeSlider.vue'
import BaseButton from '../../components/common/BaseButton.vue'

// Props dos filtros de produto
const props = defineProps<{
  categories: { id: string | number, name: string }[],
  loading?: boolean,
  loadingCategories?: boolean,
  minPrice?: number,
  maxPrice?: number
}>()

const emit = defineEmits(['update:filters'])

// Estado reativo dos filtros
const filters = reactive({
  search: '',
  categoryId: '',
  price: props.maxPrice || 10000
})

// Emite os filtros sempre que mudam
watch(filters, val => emit('update:filters', { ...val }), { deep: true })

/**
 * Limpa todos os filtros
 */
function clearFilters() {
  filters.search = ''
  filters.categoryId = ''
  filters.price = props.maxPrice || 10000
}
</script> 
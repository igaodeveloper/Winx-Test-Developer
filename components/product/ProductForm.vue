<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <BaseInput v-model="form.name" label="Nome" :error="errors?.name" required />
    <CategorySelect v-model="form.categoryId" :categories="categories" label="Categoria" :error="errors?.categoryId" :loading="loadingCategories" required />
    <ImageUpload v-model="form.imageFile" label="Imagem do Produto" :error="errors?.imageUrl" required />
    <PriceRangeSlider v-model="form.price" :min="0" :max="10000" :step="0.01" label="Preço" />
    <div class="flex gap-2 justify-end">
      <BaseButton type="submit" :loading="loading">{{ submitLabel }}</BaseButton>
      <BaseButton variant="secondary" type="button" @click="$emit('cancel')">Cancelar</BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, toRefs, watch, computed } from 'vue'
import BaseInput from '../../components/common/BaseInput.vue'
import BaseButton from '../../components/common/BaseButton.vue'
import CategorySelect from '../../components/common/CategorySelect.vue'
import PriceRangeSlider from '../../components/common/PriceRangeSlider.vue'
import ImageUpload from '../../components/common/ImageUpload.vue'
import type { Product } from '../../types/Product'
import type { File } from 'vue/types/jsx'

// Props do formulário
const props = defineProps<{
  modelValue?: Partial<Product>,
  categories: { id: string | number, name: string }[],
  loading?: boolean,
  loadingCategories?: boolean,
  errors?: Record<string, string>,
  submitLabel?: string
}>()

const emit = defineEmits(['update:modelValue', 'submit', 'cancel'])

// Estado reativo do formulário
const form = reactive({
  name: props.modelValue?.name || '',
  categoryId: props.modelValue?.categoryId || '',
  imageFile: props.modelValue?.imageFile || null,
  price: props.modelValue?.price || 0
})

// Atualiza o modelValue do formulário
watch(form, val => emit('update:modelValue', { ...val }), { deep: true })

/**
 * Emite o evento de submit com os dados do formulário
 */
function onSubmit() {
  emit('submit', { ...form })
}
</script> 
<template>
  <div>
    <label v-if="label" :for="id" class="block mb-1 font-medium text-gray-700">{{ label }}</label>
    <select
      :id="id"
      v-bind="$attrs"
      :class="[
        'w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition',
        error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary-200',
        disabled ? 'bg-gray-100 cursor-not-allowed' : ''
      ]"
      :disabled="disabled || loading"
      v-model="selectValue"
    >
      <option value="" disabled>Selecione uma categoria</option>
      <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
    </select>
    <div v-if="loading" class="text-xs text-gray-400 mt-1">Carregando categorias...</div>
    <p v-if="error" class="text-xs text-red-500 mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Category {
  id: string | number
  name: string
}

const props = defineProps<{
  modelValue: string | number | null,
  categories: Category[],
  label?: string,
  error?: string,
  loading?: boolean,
  id?: string,
  disabled?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const selectValue = ref(props.modelValue)

watch(() => props.modelValue, val => selectValue.value = val)
watch(selectValue, val => emit('update:modelValue', val))
</script> 
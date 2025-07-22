<template>
  <div class="relative w-full">
    <input
      type="text"
      :placeholder="placeholder || 'Buscar...'"
      v-model="inputValue"
      :disabled="disabled"
      class="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 transition border-gray-300 focus:ring-primary-200 disabled:bg-gray-100"
      v-bind="$attrs"
    />
    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" /></svg>
    </span>
    <span v-if="loading" class="absolute right-3 top-1/2 -translate-y-1/2 animate-spin">

    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string,
  placeholder?: string,
  loading?: boolean,
  disabled?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)

watch(() => props.modelValue, val => inputValue.value = val)
watch(inputValue, val => emit('update:modelValue', val))
</script> 
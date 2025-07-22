<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block mb-1 font-medium text-gray-700">{{ label }}</label>
    <input
      :id="id"
      v-bind="$attrs"
      :type="type"
      :class="[
        'w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition',
        error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary-200',
        disabled ? 'bg-gray-100 cursor-not-allowed' : ''
      ]"
      :disabled="disabled"
      v-model="inputValue"
    />
    <p v-if="error" class="text-xs text-red-500 mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

const props = defineProps<{
  modelValue: string | number,
  label?: string,
  error?: string,
  type?: string,
  id?: string,
  disabled?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)

watch(() => props.modelValue, val => inputValue.value = val)
watch(inputValue, val => emit('update:modelValue', val))
</script> 
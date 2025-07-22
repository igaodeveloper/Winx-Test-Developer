<template>
  <button
    :class="[
      'inline-flex items-center justify-center font-semibold rounded transition focus:outline-none focus:ring-2 focus:ring-offset-2',
      variantClass,
      loading ? 'opacity-70 cursor-wait' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    ]"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <span v-if="loading" class="animate-spin mr-2 w-4 h-4 border-2 border-t-transparent border-white rounded-full"></span>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'danger',
  loading?: boolean,
  disabled?: boolean
}>()

const variantClass = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700';
    default:
      return 'bg-primary-600 text-white hover:bg-primary-700';
  }
})
</script>

<style scoped>
.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 1em;
  height: 1em;
  animation: spin 1s linear infinite;
  display: inline-block;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 
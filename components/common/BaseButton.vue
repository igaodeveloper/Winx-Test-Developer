<template>
  <button
    :class="[
      'inline-flex items-center justify-center font-semibold rounded-lg transform transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] active:shadow-sm',
      variantClass,
      loading ? 'opacity-70 cursor-wait' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    ]"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <span v-if="loading" class="animate-spin mr-2 w-6 h-6 border-4 border-t-transparent border-white rounded-full"></span>
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
      return [
        'bg-gray-200 text-gray-800 hover:bg-gray-300',
        'hover:scale-[1.02] hover:shadow-md',
        'active:scale-[0.98] active:shadow-sm',
        'transition-all duration-200 ease-out'
      ].join(' ');
    case 'danger':
      return [
        'bg-red-600 text-white hover:bg-red-700',
        'hover:scale-[1.02] hover:shadow-md',
        'active:scale-[0.98] active:shadow-sm',
        'transition-all duration-200 ease-out'
      ].join(' ');
    default:
      return [
        'bg-primary-600 text-white hover:bg-primary-700',
        'hover:scale-[1.02] hover:shadow-md',
        'active:scale-[0.98] active:shadow-sm',
        'transition-all duration-200 ease-out'
      ].join(' ');
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
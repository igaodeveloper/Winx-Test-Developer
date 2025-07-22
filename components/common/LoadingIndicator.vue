<template>
  <div class="relative">
    <div v-if="loading" class="fixed inset-0 z-50 bg-white/90 flex items-center justify-center">
      <div class="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-transparent"></div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  loading: boolean
}

const props = defineProps<Props>()
</script>

<style scoped>
/* Add smooth transitions */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

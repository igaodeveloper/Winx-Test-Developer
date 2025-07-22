<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <span class="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></span>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps<{ show: boolean }>()
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style> 
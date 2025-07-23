<template>
  <div class="min-h-screen flex flex-col">
    <div class="bg-yellow-400 shadow-md py-4 px-8 flex items-center justify-start transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Logo class="ml-8" />
    </div>
    <main class="flex-1 container mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Logo from '~/components/common/Logo.vue'
// Layout base, sem lógica adicional
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

nav {
  animation: fadeIn 0.5s ease-out forwards;
}
</style> 
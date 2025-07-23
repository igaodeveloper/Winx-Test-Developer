<template>
  <div class="min-h-screen flex flex-col">
    <nav class="bg-yellow-400 shadow-md py-4 px-8 flex items-center justify-between transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Logo class="ml-8 mr-4" />
      <div class="flex gap-4">
        <NuxtLink to="/" class="bg-white px-4 py-2 rounded-full text-gray-800 hover:bg-gray-100 transition-all duration-300 hover:shadow-md hover:scale-[1.02] transform hover:translate-y-[-2px]">Produtos</NuxtLink>
        <NuxtLink to="/products/create" class="bg-white px-4 py-2 rounded-full text-gray-800 hover:bg-gray-100 transition-all duration-300 hover:shadow-md hover:scale-[1.02] transform hover:translate-y-[-2px]">Novo Produto</NuxtLink>
      </div>
    </nav>
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
<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <nav class="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <NuxtLink to="/" class="text-2xl font-bold text-blue-600">Product CRUD</NuxtLink>
      <div class="flex gap-4">
        <NuxtLink to="/" class="text-gray-700 hover:text-blue-600 transition">Produtos</NuxtLink>
        <NuxtLink to="/products/create" class="text-gray-700 hover:text-blue-600 transition">Novo Produto</NuxtLink>
      </div>
    </nav>
    <main class="flex-1 container mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// Layout base, sem lógica adicional
</script>

<style scoped>
</style> 
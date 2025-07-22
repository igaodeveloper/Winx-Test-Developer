<template>
  <div class="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col h-full group">
    <div class="relative w-full aspect-[4/3] mb-3 overflow-hidden rounded">
      <img :src="product.imageUrl" :alt="product.name" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
    </div>
    <h3 class="font-semibold text-lg mb-1 truncate">{{ product.name }}</h3>
    <p class="text-sm text-gray-500 mb-2 truncate">{{ product.category }}</p>
    <div class="font-bold text-primary-600 text-xl mb-3">R$ {{ product.price.toFixed(2) }}</div>
    <div class="mt-auto flex gap-2">
      <BaseButton variant="primary" @click="$emit('details', product)">Detalhes</BaseButton>
      <BaseButton variant="secondary" @click="$emit('edit', product)">Editar</BaseButton>
      <BaseButton variant="danger" @click="$emit('delete', product)">Excluir</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../../types/Product'
import BaseButton from '../../components/common/BaseButton.vue'

// Props do card de produto
// Exibe informações e ações do produto

defineProps<{ product: Product }>()
</script> 
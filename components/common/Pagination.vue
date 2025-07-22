<template>
  <nav class="flex items-center justify-center gap-2 mt-4 select-none">
    <button
      class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      :disabled="currentPage === 1"
      @click="$emit('update:page', currentPage - 1)"
    >
      &lt;
    </button>
    <span class="mx-2 text-sm">Página {{ currentPage }} de {{ totalPages }}</span>
    <button
      class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      :disabled="currentPage === totalPages"
      @click="$emit('update:page', currentPage + 1)"
    >
      &gt;
    </button>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number,
  totalPages: number
}>()
</script> 
<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm animate-fadeIn">
        <h3 class="text-lg font-semibold mb-2">Confirmação</h3>
        <p class="mb-4">{{ message || 'Tem certeza que deseja excluir este item?' }}</p>
        <div class="flex justify-end gap-2">
          <BaseButton variant="secondary" @click="$emit('cancel')">Cancelar</BaseButton>
          <BaseButton variant="danger" :loading="loading" @click="$emit('confirm')">Excluir</BaseButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean,
  message?: string,
  loading?: boolean
}>()
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style> 
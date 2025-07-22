<template>
  <transition name="toast-fade">
    <div v-if="visible" :class="[
      'fixed top-6 right-6 z-50 px-4 py-3 rounded shadow-lg flex items-center gap-2',
      type === 'success' ? 'bg-green-600 text-white' : '',
      type === 'error' ? 'bg-red-600 text-white' : '',
      type === 'info' ? 'bg-primary-600 text-white' : ''
    ]">
      <slot>{{ message }}</slot>
      <button class="ml-2 text-white/80 hover:text-white" @click="close">&times;</button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{
  message: string,
  type?: 'success' | 'error' | 'info',
  duration?: number
}>()

const emit = defineEmits(['close'])
const visible = ref(true)

function close() {
  visible.value = false
  emit('close')
}

watch(() => props.message, () => {
  visible.value = true
})

onMounted(() => {
  if (props.duration !== 0) {
    setTimeout(close, props.duration || 3000)
  }
})
</script>

<style scoped>
.toast-fade-enter-active, .toast-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.toast-fade-enter-from, .toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style> 
<template>
  <NuxtLayout />
  <GlobalLoader :show="globalLoading" />
  <Toast v-if="toast" :key="toast.key" :message="toast.message" :type="toast.type" :duration="toast.duration" @close="clearToast" />
</template>

<script setup lang="ts">
import '@/assets/styles/main.css'
import GlobalLoader from '../components/common/GlobalLoader.vue'
import Toast from '../components/common/Toast.vue'
import { useToast } from '../composables/useToast'
import { ref, watch } from 'vue'

const { toast, clearToast } = useToast()
const globalLoading = ref(false)

// Exemplo: escutar loading global de requests (pode ser customizado)
// watchEffect(() => {
//   globalLoading.value = ...
// })
</script>

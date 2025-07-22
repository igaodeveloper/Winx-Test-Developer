import { ref } from 'vue'

const toast = ref<{
  message: string
  type: 'success' | 'error' | 'info'
  duration: number
  key: number
} | null>(null)

let toastKey = 0

/**
 * Composable para exibir toasts de feedback visual
 * Exemplo de uso:
 *   const { showToast } = useToast()
 *   showToast('Mensagem', 'success')
 */
export function useToast() {
  function showToast(message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000) {
    toastKey++
    toast.value = { message, type, duration, key: toastKey }
  }
  function clearToast() {
    toast.value = null
  }
  return { toast, showToast, clearToast }
} 
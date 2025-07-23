import { ref, onMounted, onUnmounted } from 'vue'

export function useWebSocket() {
  const socket = ref<WebSocket | null>(null)
  const isConnected = ref(false)

  const connect = () => {
    socket.value = new WebSocket('ws://localhost:3000')

    socket.value.onopen = () => {
      isConnected.value = true
      console.log('WebSocket connected')
    }

    socket.value.onclose = () => {
      isConnected.value = false
      console.log('WebSocket disconnected')
    }

    socket.value.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  }

  const disconnect = () => {
    if (socket.value) {
      socket.value.close()
    }
  }

  onMounted(connect)
  onUnmounted(disconnect)

  return {
    socket,
    isConnected,
    connect,
    disconnect
  }
}

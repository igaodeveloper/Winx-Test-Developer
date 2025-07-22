import { ref, Ref } from 'vue'

export interface LoadingState {
  loading: Ref<boolean>
  setLoading: (value: boolean) => void
  start: () => void
  stop: () => void
}

export function useLoading(): LoadingState {
  const loading = ref(false)

  const setLoading = (value: boolean) => {
    loading.value = value
  }

  const start = () => {
    loading.value = true
  }

  const stop = () => {
    loading.value = false
  }

  return {
    loading,
    setLoading,
    start,
    stop
  }
}

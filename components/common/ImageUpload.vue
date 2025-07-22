<template>
  <div class="relative w-full">
    <!-- Preview Area -->
    <div v-if="preview" class="relative mb-4">
      <img 
        :src="preview" 
        class="w-full h-64 object-cover rounded-lg shadow-lg"
        alt="Imagem do produto"
      />
      <button 
        @click="removeImage"
        class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center 
        hover:bg-red-600 transition-all duration-200
        hover:scale-110 hover:shadow-lg
        active:scale-95 active:shadow-md
      " data-cy="remove-image-button"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Upload Area -->
    <div 
      class="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer 
      transition-all duration-300 ease-in-out
      hover:border-blue-500 hover:shadow-md hover:scale-[1.01]
      group"
      :class="{ 'bg-blue-50 border-blue-100': preview }"
    >
      <div class="mb-4">
        <svg 
          class="w-12 h-12 text-gray-400 group-hover:text-blue-500 transition-colors duration-300"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      </div>
      <div class="text-center text-gray-600">
        <p class="text-lg font-medium transition-all duration-300 group-hover:text-blue-600">Arraste e solte ou clique para fazer upload</p>
        <p class="text-sm text-gray-500 mt-1 transition-all duration-300 group-hover:text-gray-700">Formatos suportados: JPG, PNG, GIF</p>
        <p class="text-xs text-gray-400 transition-all duration-300 group-hover:text-gray-500">Tamanho máximo: 5MB</p>
      </div>
      <input 
        type="file" 
        accept="image/*"
        class="hidden"
        @change="handleFileChange"
        ref="fileInput"
        multiple
      >
    </div>

    <!-- Error Message -->
    <div v-if="error" class="mt-2 text-red-500 text-sm text-center">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'

import { ref, computed } from 'vue'
import { useToast } from '../../composables/useToast'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: File,
    default: null
  }
})

const { showToast } = useToast()
const fileInput = ref<HTMLInputElement | null>(null)
const preview = ref<string | null>(null)
const error = ref<string | null>(null)

// Atualiza a prévia quando o arquivo muda
watch(() => props.modelValue, (newFile: File | null) => {
  error.value = null
  if (newFile) {
    const reader = new FileReader()
    reader.onload = (e) => {
      preview.value = e.target?.result as string
    }
    reader.readAsDataURL(newFile)
  } else {
    preview.value = null
  }
}, { immediate: true })

// Lida com a mudança do arquivo
function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    
    // Validação de tamanho
    if (file.size > 5 * 1024 * 1024) {
      error.value = 'O arquivo deve ter no máximo 5MB'
      showToast('Arquivo muito grande! O máximo permitido é 5MB', 'error')
      return
    }

    // Validação de tipo
    if (!file.type.startsWith('image/')) {
      error.value = 'Formato de arquivo não suportado'
      showToast('Formato de arquivo não suportado! Use JPG, PNG ou GIF', 'error')
      return
    }

    emit('update:modelValue', file)
  }
}

// Remove a imagem atual
function removeImage() {
  preview.value = null
  emit('update:modelValue', null)
}

// Expor métodos para uso externo
const expose = {
  click: () => {
    fileInput.value?.click()
  },
  setFile: (file: File | null) => {
    emit('update:modelValue', file)
  }
}
</script>

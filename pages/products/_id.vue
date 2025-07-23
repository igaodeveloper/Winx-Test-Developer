<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Product } from '~/types/Product'
import { useProductActions } from '~/composables/useProductActions'
import { useProducts } from '~/composables/useProducts'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrar o plugin ScrollTrigger do GSAP
gsap.registerPlugin(ScrollTrigger)

const route = useRoute()
const router = useRouter()
const { handleDelete: deleteProduct, error, loading } = useProductActions()

const product = ref<Product | null>(null)

// Buscar produto pelo ID
const fetchProduct = async () => {
  try {
    loading.value = true
    const productsStore = useProducts()
    const foundProduct = productsStore.products.value.find((p: Product) => p.id === route.params.id)
    if (!foundProduct) {
      error.value = 'Produto não encontrado'
      product.value = null
      return
    }
    product.value = foundProduct
  } catch (err) {
    console.error('Erro ao buscar produto:', err)
    error.value = 'Erro ao buscar produto'
    product.value = null
  } finally {
    loading.value = false
  }
}

// Redirecionar após exclusão
const handleProductDelete = async () => {
  if (product.value) {
    await deleteProduct(product.value)
    router.push('/products')
  }
}

// Carregar produto quando a página é montada
const cardRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLElement | null>(null)

// Animação de entrada
gsap.fromTo(
  '.card-animation',
  { 
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  { 
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.6,
    ease: 'power2.out',
    onComplete: () => {
      // Anima a imagem quando o card terminar de entrar
      if (imageRef.value) {
        gsap.fromTo(
          imageRef.value,
          { scale: 0.9, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.8,
            ease: 'back.out(1.4)'
          }
        )
      }
    }
  }
)

// Efeito de parallax na imagem
const setupParallax = () => {
  if (imageRef.value) {
    gsap.to(imageRef.value, {
      y: 20,
      scrollTrigger: {
        trigger: cardRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    })
  }
}

// Efeito de hover nos botões
const setupButtonHover = () => {
  const buttons = document.querySelectorAll('.action-button')
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.2,
        ease: 'power2.out'
      })
    })
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out'
      })
    })
  })
}

// Limpar animações quando o componente for desmontado
onBeforeUnmount(() => {
  gsap.killTweensOf('.card-animation')
  gsap.killTweensOf(imageRef.value)
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})

onMounted(() => {
  fetchProduct()
  // Espera um pouco para garantir que o DOM foi atualizado
  setTimeout(() => {
    setupParallax()
    setupButtonHover()
  }, 100)
})

// Atualizar produto quando o ID muda
watch(() => route.params.id, () => {
  fetchProduct()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div ref="cardRef" class="card-animation bg-white rounded-lg shadow p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Detalhes do Produto</h1>
        <NuxtLink to="/products" class="text-primary-600 hover:text-primary-800">
          Voltar
        </NuxtLink>
      </div>

      <div v-if="loading" class="text-center py-8">
        <p class="text-gray-600">Carregando...</p>
      </div>

      <div v-else-if="error" class="text-center py-8 text-red-500">
        {{ error }}
      </div>

      <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-lg">
          <img 
            ref="imageRef"
            :src="product.imageUrl" 
            :alt="product.name" 
            class="object-cover w-full h-full transform transition-transform duration-700 hover:scale-105" 
          />
        </div>
        <div>
          <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
          <p class="text-gray-600 mb-4">{{ product.category }}</p>
          <div class="font-bold text-2xl text-primary-600 mb-4">R$ {{ product.price.toFixed(2) }}</div>
          <p class="text-gray-700 mb-4">{{ product.description }}</p>
          <div class="flex gap-2">
            <BaseButton 
              class="action-button" 
              variant="secondary" 
              :to="`/products/${product.id}/edit`"
            >
              Editar
            </BaseButton>
            <BaseButton 
              class="action-button" 
              variant="danger" 
              @click="handleProductDelete"
            >
              Excluir
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

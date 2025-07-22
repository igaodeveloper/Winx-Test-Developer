<template>
  <div class="relative">
    <!-- Framer Motion Animation -->
    <div class="motion-container">
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5 }"
        :viewport="{ once: true }"
        :class="['motion-element', motionElementClass]"
      >
        <slot name="motion-content"></slot>
      </motion.div>
    </div>

    <!-- GSAP Scroll Animation -->
    <div class="gsap-container">
      <div
        ref="scrollElement"
        class="scroll-element"
      >
        <slot name="scroll-content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

const scrollElement = ref(null)

onMounted(() => {
  if (scrollElement.value) {
    gsap.from(scrollElement.value, {
      scrollTrigger: {
        trigger: scrollElement.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      opacity: 0,
      y: 50,
      ease: 'power2.inOut'
    })
  }
})
</script>

<style scoped>
.motion-container {
  width: 100%;
  padding: 2rem;
}

.motion-element {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.gsap-container {
  width: 100%;
  padding: 2rem;
}

.scroll-element {
  opacity: 0;
  transform: translateY(50px);
}
</style>

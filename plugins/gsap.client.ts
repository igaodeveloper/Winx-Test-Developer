import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import type { App } from 'vue'

export default {
  name: 'gsap',
  install(vueApp: App) {
    // Register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger)
    
    vueApp.config.globalProperties.$gsap = gsap
    vueApp.config.globalProperties.$scrollTrigger = ScrollTrigger
  }
}

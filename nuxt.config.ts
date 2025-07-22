// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ['form-data', 'gsap']
  },
  plugins: [
    '~/plugins/form-data.client.ts',
    '~/plugins/gsap.client.ts',
    '~/plugins/framer-motion.client.ts'
  ],
  nitro: {
    compatibilityDate: '2025-07-22',
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    head: {
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js' }
      ]
    }
  }
})

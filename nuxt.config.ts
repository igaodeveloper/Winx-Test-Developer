// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_API_URL || 'http://localhost:3001/api'
    }
  },
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
      script: []
    }
  }
})

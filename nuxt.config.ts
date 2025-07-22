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
    transpile: ['form-data']
  },
  plugins: [
    '~/plugins/form-data.client.ts'
  ],
  nitro: {
    compatibilityDate: '2025-07-22',
  },
})

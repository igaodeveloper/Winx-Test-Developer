import { defineNuxtPlugin, useRuntimeConfig } from '#imports'
import axios from 'axios'
import type { NuxtApp } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const config = useRuntimeConfig()

  const instance = axios.create({
    baseURL: config.public.apiBase || 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  instance.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
  )

  nuxtApp.provide('axios', instance)
})

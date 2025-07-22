import { defineNuxtPlugin } from 'nuxt/app'
import { useRuntimeConfig } from 'nuxt/app'

import axios from 'axios'
import type { NuxtApp } from 'nuxt/app'
import { useLoading } from '~/composables/useLoading'

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const config = useRuntimeConfig()
  const { start, stop } = useLoading()

  const instance = axios.create({
    baseURL: config.public.apiBase as string || 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Interceptor para requests
  instance.interceptors.request.use((config) => {
    start()
    return config as any
  })

  // Interceptor para responses
  instance.interceptors.response.use(
    (response) => {
      stop()
      return response
    },
    (error) => {
      stop()
      return Promise.reject(error)
    }
  )

  nuxtApp.provide('axios', instance)
})

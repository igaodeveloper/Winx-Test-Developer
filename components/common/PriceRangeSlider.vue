<template>
  <div class="w-full">
    <label v-if="label" class="block mb-1 font-medium text-gray-700">{{ label }}</label>
    <div class="flex items-center gap-2">
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model.number="sliderValue"
        class="w-full accent-primary-600"
        v-bind="$attrs"
      />
      <span class="text-sm w-12 text-right">R$ {{ sliderValue }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: number,
  min?: number,
  max?: number,
  step?: number,
  label?: string
}>()

const emit = defineEmits(['update:modelValue'])

const sliderValue = ref(props.modelValue)

watch(() => props.modelValue, val => sliderValue.value = val)
watch(sliderValue, val => emit('update:modelValue', val))
</script> 
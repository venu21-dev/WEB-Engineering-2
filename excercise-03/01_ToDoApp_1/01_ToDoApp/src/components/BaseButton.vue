<template>
  <button :type="type" :disabled="disabled" :class="buttonClasses" :aria-disabled="disabled">
    <slot name="icon" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
})

const buttonClasses = computed(() => {
  const base = [
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-xl',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ]

  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5',
    lg: 'px-6 py-3 text-lg',
  }

  const variants: Record<string, string> = {
    primary: [
      'bg-amber-500 hover:bg-amber-600 active:bg-amber-700',
      'text-white',
      'shadow-md shadow-amber-500/20 hover:shadow-lg',
      'focus:ring-amber-500',
    ].join(' '),
    secondary: [
      'bg-stone-100 hover:bg-stone-200 active:bg-stone-300',
      'text-stone-700',
      'focus:ring-stone-500',
    ].join(' '),
    danger: [
      'text-red-600 hover:text-red-700',
      'hover:bg-red-50 active:bg-red-100',
      'focus:ring-red-500',
    ].join(' '),
  }

  return [...base, sizes[props.size], variants[props.variant]].join(' ')
})
</script>

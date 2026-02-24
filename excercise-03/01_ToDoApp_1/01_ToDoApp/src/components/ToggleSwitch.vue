<template>
  <button
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :aria-label="ariaLabel"
    :class="[
      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2',
      modelValue ? 'bg-amber-500 hover:bg-amber-600' : 'bg-stone-300 hover:bg-stone-400'
    ]"
    @click="emit('update:modelValue', !modelValue)"
  >
    <span
      aria-hidden="true"
      :class="[
        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-all duration-200 ease-in-out',
        modelValue ? 'translate-x-5' : 'translate-x-0'
      ]"
    />
  </button>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  ariaLabel?: string
}

interface Emits {
  'update:modelValue': [value: boolean]
}

withDefaults(defineProps<Props>(), {
  ariaLabel: 'Toggle',
})

const emit = defineEmits<Emits>()
</script>

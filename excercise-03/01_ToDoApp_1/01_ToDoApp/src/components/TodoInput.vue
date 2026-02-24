<template>
  <form @submit.prevent="handleSubmit" class="flex items-start gap-3">
    <div class="flex-1">
      <input
        id="new-todo-input"
        ref="inputRef"
        v-model="todoInput.value.value"
        type="text"
        placeholder="What do you want to do?"
        :class="[
          'w-full px-4 py-3 bg-stone-50 border rounded-xl text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:border-transparent focus:bg-white transition-all',
          todoInput.error.value && todoInput.touched.value
            ? 'border-red-300 focus:ring-red-500'
            : 'border-stone-200 focus:ring-amber-500'
        ]"
        @blur="handleBlur"
      />
      <label for="new-todo-input" class="sr-only">New task</label>
      <p v-if="todoInput.error.value && todoInput.touched.value" class="text-red-500 text-xs px-1 mt-1">
        {{ todoInput.error.value }}
      </p>
    </div>
    <BaseButton type="submit" :disabled="!todoInput.isValid.value || !todoInput.value.value.trim()">
      <template #icon>
        <PlusIcon class="w-5 h-5" aria-hidden="true" />
      </template>
      <span class="hidden sm:inline">Add</span>
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PlusIcon } from '@heroicons/vue/20/solid'
import BaseButton from '@/components/BaseButton.vue'
import { useValidation, rules } from '@/composables/useValidation'

interface Emits {
  'add-todo': [content: string]
}

const emit = defineEmits<Emits>()

const todoInput = useValidation('', [
  rules.required('Please enter a task'),
  rules.minLength(2, 'At least 2 characters required'),
  rules.maxLength(200, 'Maximum 200 characters allowed'),
])

const inputRef = ref<HTMLInputElement | null>(null)
const hasInteracted = ref(false)

onMounted(() => inputRef.value?.focus())

const handleBlur = () => {
  if (hasInteracted.value) {
    todoInput.validate()
  }
  hasInteracted.value = true
}

const handleSubmit = () => {
  hasInteracted.value = true
  if (todoInput.validate()) {
    emit('add-todo', todoInput.value.value.trim())
    todoInput.value.value = ''
    todoInput.reset()
    hasInteracted.value = false
  }
}
</script>

<template>
  <form class="p-5 space-y-5" @submit.prevent="updateTodo">
    <fieldset>
      <label for="todo-content" class="block text-sm font-medium text-stone-600 mb-2">
        Description
      </label>
      <input
        id="todo-content"
        v-model="localTodo.content"
        type="text"
        class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent focus:bg-white transition-all"
        placeholder="What do you want to do?"
      />
    </fieldset>

    <fieldset class="flex items-center justify-between py-4 px-4 bg-stone-50 rounded-xl">
      <legend class="sr-only">Change status</legend>
      <div>
        <p class="font-medium text-stone-700">Status</p>
        <p class="text-sm text-stone-500">Mark as completed</p>
      </div>
      <ToggleSwitch v-model="localTodo.completed" aria-label="Mark task as completed" />
    </fieldset>

    <footer class="flex items-center justify-between pt-4 border-t border-stone-100">
      <BaseButton variant="danger" @click="showDeleteModal = true">
        <template #icon>
          <TrashIcon class="w-5 h-5" aria-hidden="true" />
        </template>
        Delete
      </BaseButton>
      <BaseButton type="submit">
        <template #icon>
          <CheckIcon class="w-5 h-5" aria-hidden="true" />
        </template>
        Save
      </BaseButton>
    </footer>
  </form>

  <ConfirmModal
    :is-open="showDeleteModal"
    title="Delete task?"
    message="This action cannot be undone."
    @confirm="confirmDelete"
    @cancel="showDeleteModal = false"
  />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { TrashIcon, CheckIcon } from '@heroicons/vue/20/solid'
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import BaseButton from '@/components/BaseButton.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import type { Todo } from '@/models'

interface Props {
  todo: Todo
}

interface Emits {
  'update-todo': [todo: Todo]
  'remove-todo': []
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const localTodo = reactive({ ...props.todo })
const showDeleteModal = ref(false)

const updateTodo = () => emit('update-todo', { ...localTodo })

const confirmDelete = () => {
  showDeleteModal.value = false
  emit('remove-todo')
}
</script>

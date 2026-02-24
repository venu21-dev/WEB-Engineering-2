<template>
  <ul class="space-y-2" role="list">
    <li v-for="todo in todos" :key="todo.id" class="group">
      <div
        :class="[
          'flex items-center gap-4 p-4 rounded-xl transition-all',
          todo.completed ? 'bg-stone-200/60' : 'bg-white shadow-sm hover:shadow-md'
        ]"
      >
        <button
          type="button"
          :class="[
            'flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500',
            todo.completed
              ? 'bg-amber-500 border-amber-500 hover:bg-amber-600 hover:border-amber-600'
              : 'border-stone-300 hover:border-amber-500 hover:bg-amber-50'
          ]"
          :aria-label="todo.completed ? 'Mark as incomplete' : 'Mark as complete'"
          @click.stop="emit('toggle-todo', todo.id)"
        >
          <CheckIcon v-if="todo.completed" class="w-4 h-4 text-white" aria-hidden="true" />
        </button>

        <RouterLink :to="`/todo/show/${todo.id}`" class="flex-1 min-w-0 flex items-center gap-4">
          <div class="flex-1 min-w-0">
            <p
              :class="[
                'font-medium truncate transition-colors',
                todo.completed ? 'text-stone-400 line-through' : 'text-stone-800'
              ]"
            >
              {{ todo.content }}
            </p>
            <time class="text-xs text-stone-400 mt-0.5 block" :datetime="todo.created_at">
              {{ todo.created_at }}
            </time>
          </div>
          <ChevronRightIcon
            class="flex-shrink-0 w-5 h-5 text-stone-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all"
            aria-hidden="true"
          />
        </RouterLink>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ChevronRightIcon, CheckIcon } from '@heroicons/vue/20/solid'
import type { Todo } from '@/models'

interface Props {
  todos: Todo[]
}

interface Emits {
  'toggle-todo': [id: number]
}

defineProps<Props>()

const emit = defineEmits<Emits>()
</script>

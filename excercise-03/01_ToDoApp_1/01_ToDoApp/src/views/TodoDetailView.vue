<template>
  <main class="min-h-screen p-4 sm:p-6 lg:p-8">
    <div class="max-w-4xl mx-auto">
      <nav class="mb-6">
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 px-3 py-2 -ml-3 text-stone-500 hover:text-stone-800 hover:bg-stone-200 rounded-lg transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <ArrowLeftIcon class="w-5 h-5 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          <span>Back to overview</span>
        </RouterLink>
      </nav>

      <article class="bg-white rounded-2xl shadow-xl shadow-stone-900/5 overflow-hidden">
        <template v-if="todo">
          <header class="p-5 border-b border-stone-100">
            <div class="flex items-center justify-between">
              <h1 class="text-xl font-semibold text-stone-800">Edit task</h1>
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-medium',
                  todo.completed ? 'bg-amber-100 text-amber-700' : 'bg-stone-100 text-stone-600'
                ]"
              >
                {{ todo.completed ? 'Completed' : 'Open' }}
              </span>
            </div>
            <p class="text-sm text-stone-500 mt-1">
              <time :datetime="todo.created_at">Created on {{ todo.created_at }}</time>
            </p>
          </header>

          <section>
            <TodoEditForm :todo="todo" @update-todo="handleUpdateTodo" @remove-todo="handleRemoveTodo" />
          </section>
        </template>

        <section v-else class="p-12 text-center">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mb-4">
            <ExclamationTriangleIcon class="w-7 h-7 text-red-500" aria-hidden="true" />
          </div>
          <p class="text-stone-700 font-medium">Task not found</p>
          <p class="text-stone-500 text-sm mt-1">This task no longer exists</p>
        </section>
      </article>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeftIcon, ExclamationTriangleIcon } from '@heroicons/vue/20/solid'
import TodoEditForm from '@/components/TodoEditForm.vue'
import type { Todo } from '@/models'
import { useTodos } from '@/composables/useTodos'

interface Props {
  todoId: number
}

const props = defineProps<Props>()
const router = useRouter()
const { getTodoById, updateTodo, deleteTodo } = useTodos()

const todo = computed((): Todo | undefined => getTodoById(props.todoId))

const navigateHome = () => router.push('/')

const handleUpdateTodo = async (updatedTodo: Todo) => {
  if (todo.value) {
    await updateTodo(todo.value.id, updatedTodo)
    navigateHome()
  }
}

const handleRemoveTodo = async () => {
  if (todo.value) {
    await deleteTodo(todo.value.id)
    navigateHome()
  }
}
</script>

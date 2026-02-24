<template>
  <main class="min-h-screen p-4 sm:p-6 lg:p-8">
    <div class="max-w-4xl mx-auto">
      <header class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500 mb-4 shadow-lg shadow-amber-500/30">
          <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-stone-800 mb-1">My Tasks</h1>
        <p class="text-stone-500">Organize your day efficiently</p>
      </header>

      <article class="bg-white rounded-2xl shadow-xl shadow-stone-900/5 overflow-hidden">
        <section class="p-5 border-b border-stone-100">
          <TodoInput @add-todo="handleAddTodo" />
        </section>

        <nav class="px-5 py-3 bg-stone-50 border-b border-stone-100">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium text-stone-600">
                {{ filteredTodos.length }} {{ filteredTodos.length === 1 ? 'task' : 'tasks' }}
              </span>
              <span v-if="completedCount > 0" class="text-xs text-stone-400">
                ({{ completedCount }} completed)
              </span>
            </div>
            <label class="flex items-center gap-3 cursor-pointer group">
              <span class="text-sm text-stone-500 group-hover:text-stone-700 transition-colors">
                Hide completed
              </span>
              <ToggleSwitch v-model="hideCompleted" aria-label="Hide completed tasks" />
            </label>
          </div>
        </nav>

        <section class="p-4 bg-stone-50">
          <TodoList v-if="filteredTodos.length" :todos="filteredTodos" @toggle-todo="handleToggleTodo" />
          <div v-else class="py-12 text-center">
            <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-stone-200 mb-4">
              <svg class="w-7 h-7 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p class="text-stone-600 font-medium">No tasks yet</p>
            <p class="text-stone-400 text-sm mt-1">Add your first task above</p>
          </div>
        </section>
      </article>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import TodoInput from '@/components/TodoInput.vue'
import TodoList from '@/components/TodoList.vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import { useTodos } from '@/composables/useTodos'
import type { Todo } from '@/models'

const { getTodos, fetchTodos, createNewTodo, toggleTodo } = useTodos()

// Todos beim Start der App vom Backend laden
onMounted(async () => {
  await fetchTodos()
})

const hideCompleted = ref(false)
const allTodos = computed(() => getTodos())
const completedCount = computed(() => allTodos.value.filter((t: Todo) => t.completed).length)
const filteredTodos = computed((): Todo[] =>
  hideCompleted.value ? allTodos.value.filter((t: Todo) => !t.completed) : allTodos.value
)

const handleAddTodo = async (content: string) => await createNewTodo(content)
const handleToggleTodo = async (id: number) => await toggleTodo(id)
</script>

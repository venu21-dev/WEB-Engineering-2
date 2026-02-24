import { state } from './state'
import type { Todo } from '@/models'

// URL zum Backend – alle Anfragen gehen hierhin
const API_URL = 'http://localhost:3000/api/todos'

/** Composable for Todo CRUD operations */
export function useTodos() {
  // Liest den lokalen State (synchron, kein fetch nötig)
  const getTodos = (): Todo[] => state.todos

  // Sucht ein einzelnes Todo im lokalen State (synchron)
  const getTodoById = (id: number): Todo | undefined => {
    return state.todos.find((todo) => todo.id === id)
  }

  // GET /api/todos – Alle Todos vom Backend laden und in den State schreiben
  async function fetchTodos(): Promise<void> {
    const response = await fetch(API_URL)
    state.todos = await response.json()
  }

  // POST /api/todos – Neues Todo im Backend erstellen, dann in den State hinzufügen
  async function createNewTodo(content: string): Promise<void> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    })
    const newTodo = await response.json()
    state.todos.push(newTodo)
  }

  // PUT /api/todos/:id – Bestehendes Todo im Backend aktualisieren, dann State anpassen
  async function updateTodo(id: number, newTodo: Todo): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newTodo.content, completed: newTodo.completed }),
    })
    const updated = await response.json()
    const index = state.todos.findIndex((todo) => todo.id === id)
    if (index !== -1) state.todos[index] = updated
  }

  // DELETE /api/todos/:id – Todo im Backend löschen, dann aus State entfernen
  async function deleteTodo(id: number): Promise<void> {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    const index = state.todos.findIndex((todo) => todo.id === id)
    if (index !== -1) state.todos.splice(index, 1)
  }

  // Toggle: ruft updateTodo auf, das seinerseits PUT an das Backend schickt
  async function toggleTodo(id: number): Promise<void> {
    const todo = state.todos.find((todo) => todo.id === id)
    if (!todo) return
    await updateTodo(id, { ...todo, completed: !todo.completed })
  }

  return {
    getTodos,
    getTodoById,
    fetchTodos,
    createNewTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  }
}

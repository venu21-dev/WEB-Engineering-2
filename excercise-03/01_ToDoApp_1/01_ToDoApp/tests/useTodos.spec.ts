import { describe, it, expect, beforeEach } from 'vitest'
import { useTodos } from '@/composables/useTodos'
import { state } from '@/composables/state'

describe('useTodos', () => {
  beforeEach(() => {
    // Reset state before each test
    state.todos = []
    state.id = 1
  })

  describe('createNewTodo', () => {
    it('creates a todo with valid content', () => {
      const { createNewTodo, getTodos } = useTodos()

      const todo = createNewTodo('Test task')

      expect(todo).not.toBeNull()
      expect(todo?.content).toBe('Test task')
      expect(todo?.completed).toBe(false)
      expect(getTodos()).toHaveLength(1)
    })

    it('trims whitespace from content', () => {
      const { createNewTodo } = useTodos()

      const todo = createNewTodo('  Test task  ')

      expect(todo?.content).toBe('Test task')
    })

    it('returns null for empty content', () => {
      const { createNewTodo, getTodos } = useTodos()

      const todo = createNewTodo('   ')

      expect(todo).toBeNull()
      expect(getTodos()).toHaveLength(0)
    })

    it('increments ID for each new todo', () => {
      const { createNewTodo } = useTodos()

      const todo1 = createNewTodo('First')
      const todo2 = createNewTodo('Second')

      expect(todo1?.id).toBe(1)
      expect(todo2?.id).toBe(2)
    })
  })

  describe('getTodoById', () => {
    it('finds an existing todo', () => {
      const { createNewTodo, getTodoById } = useTodos()

      createNewTodo('Test task')
      const found = getTodoById(1)

      expect(found?.content).toBe('Test task')
    })

    it('returns undefined for non-existent ID', () => {
      const { getTodoById } = useTodos()

      const found = getTodoById(999)

      expect(found).toBeUndefined()
    })
  })

  describe('updateTodo', () => {
    it('updates an existing todo', () => {
      const { createNewTodo, updateTodo, getTodoById } = useTodos()

      const todo = createNewTodo('Original')!
      const updated = { ...todo, content: 'Updated' }

      const success = updateTodo(todo.id, updated)

      expect(success).toBe(true)
      expect(getTodoById(todo.id)?.content).toBe('Updated')
    })

    it('returns false for non-existent todo', () => {
      const { updateTodo } = useTodos()

      const success = updateTodo(999, { id: 999, content: 'Test', completed: false, created_at: '' })

      expect(success).toBe(false)
    })
  })

  describe('deleteTodo', () => {
    it('deletes an existing todo', () => {
      const { createNewTodo, deleteTodo, getTodos } = useTodos()

      const todo = createNewTodo('To delete')!

      const success = deleteTodo(todo.id)

      expect(success).toBe(true)
      expect(getTodos()).toHaveLength(0)
    })

    it('returns false for non-existent todo', () => {
      const { deleteTodo } = useTodos()

      const success = deleteTodo(999)

      expect(success).toBe(false)
    })
  })

  describe('toggleTodo', () => {
    it('toggles completed status', () => {
      const { createNewTodo, toggleTodo, getTodoById } = useTodos()

      const todo = createNewTodo('Toggle me')!
      expect(todo.completed).toBe(false)

      toggleTodo(todo.id)
      expect(getTodoById(todo.id)?.completed).toBe(true)

      toggleTodo(todo.id)
      expect(getTodoById(todo.id)?.completed).toBe(false)
    })

    it('returns false for non-existent todo', () => {
      const { toggleTodo } = useTodos()

      const success = toggleTodo(999)

      expect(success).toBe(false)
    })
  })
})

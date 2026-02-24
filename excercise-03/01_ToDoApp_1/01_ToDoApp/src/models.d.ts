/** Single todo item */
export interface Todo {
  id: number
  content: string
  created_at: string
  completed: boolean
}

/** Global application state */
export interface TodoState {
  todos: Array<Todo>
  id: number
}

/** Global reactive state – Todos werden vom Backend geladen, nicht mehr aus localStorage */
import { reactive } from 'vue'
import type { TodoState } from '@/models'

export const state: TodoState = reactive({ todos: [], id: 1 })

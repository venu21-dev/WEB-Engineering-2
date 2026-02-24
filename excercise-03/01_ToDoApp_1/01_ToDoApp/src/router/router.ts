import { createWebHistory, createRouter } from 'vue-router'
import propsParser from 'vue-router-parse-props'
import Dashboard from '@/views/Dashboard.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    component: Dashboard,
    name: 'Dashboard',
  },
  {
    path: '/todo/show/:todoId',
    name: 'Todo',
    component: () => import('@/views/TodoDetailView.vue'),
    props: propsParser({ todoId: Number }),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

export default createRouter({ history: createWebHistory(), routes })

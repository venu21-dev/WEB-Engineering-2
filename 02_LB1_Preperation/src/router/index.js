import { createRouter, createWebHistory } from 'vue-router'
import UebersichtView from '@/views/UebersichtView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'uebersicht',
      component: UebersichtView
    }
  ]
})

export default router

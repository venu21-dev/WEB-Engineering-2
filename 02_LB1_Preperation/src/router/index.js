import { createRouter, createWebHistory } from 'vue-router'
import UebersichtView from '@/views/UebersichtView.vue'
import RezeptDetailView from '@/views/RezeptDetailView.vue'
import NeuesRezeptView from '@/views/NeuesRezeptView.vue'
import FavoritenView from '@/views/FavoritenView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'uebersicht', component: UebersichtView },
    { path: '/rezept/:id', name: 'rezept-detail', component: RezeptDetailView },
    { path: '/neues-rezept', name: 'neues-rezept', component: NeuesRezeptView },
    { path: '/favoriten', name: 'favoriten', component: FavoritenView }
  ]
})

export default router

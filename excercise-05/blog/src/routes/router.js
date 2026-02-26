
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Blog from '../components/Blog.vue'
import Post from '../components/Post.vue'
import NotFound from '../components/NotFound.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/blog', component: Blog },
  { path: '/blog/:id', component: Post },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

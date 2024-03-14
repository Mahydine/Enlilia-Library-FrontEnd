import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PanierView from '../views/PanierView.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/connexion',
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '/panier',
      name: 'PanierView',
      component: PanierView
    },
    {
      path: '/:catchAll(.*)',
      component: NotFound
    }
  ]
})

export default router

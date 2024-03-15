import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import ShopView from '../views/ShopView.vue';
import NotFound from '../views/NotFound.vue';

// Importez le store Vuex
import store from '../store';

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
      path: '/boutique',
      name: 'ShopView',
      component: ShopView
    },
    {
      path: '/:catchAll(.*)',
      component: NotFound
    }
  ]
});

export default router;

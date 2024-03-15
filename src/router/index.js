import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ShopView from '../views/ShopView.vue';
import LivrePageView from '../views/LivrePageView.vue';
import ProfilView from '../views/ProfilView.vue';
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
      path: '/inscription',
      name: 'RegisterView',
      component: RegisterView
    },
    {
      path: '/boutique',
      name: 'ShopView',
      component: ShopView
    },
    {
      path: '/profil',
      name: 'ProfilView',
      component: ProfilView
    },
    {
      path: '/livre-detail/:livre_id',
      name: 'LivrePageView',
      component: LivrePageView
    },
    {
      path: '/:catchAll(.*)',
      component: NotFound
    }
  ]
});

export default router;

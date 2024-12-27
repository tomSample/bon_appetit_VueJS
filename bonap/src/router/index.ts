import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Restaurant from '../views/Restaurant.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/restaurant/:id',
      name: 'restaurant',
      component: Restaurant,
    }
  ],
});


export default router

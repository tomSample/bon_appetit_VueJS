import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Restaurant from '../views/Restaurant.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Mentions from '../views/Mentions.vue'
import CondGe from '@/views/ConditionsGenerales.vue'
import About from '@/views/About.vue'
import ResetCo from '@/views/ResetCo.vue'
import Checkout from '@/views/Checkout.vue'
import OwnerCreate from '@/views/OwnerCreate.vue'
import OwnerDashboard from '@/views/OwnerDashboard.vue'

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
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/mentions',
      name: 'mentions',
      component: Mentions,
    },
    {
      path:'/conditions-generales',
      name:'conditions-generales',
      component: CondGe,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/reset-co',
      name: 'reset-co',
      component: ResetCo,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
    },
    {
      path: '/owner/create',
      name: 'owner-create',
      component: OwnerCreate,
    },
    {
      path: '/owner/dashboard',
      name: 'owner-dashboard',
      component: OwnerDashboard,
    }
  ],
});


export default router

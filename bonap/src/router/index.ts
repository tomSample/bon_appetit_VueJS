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
import MyAccount from '@/views/MyAccount.vue'
import { useAuthStore } from '@/stores/auth'

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
      path: '/signup/client',
      name: 'signup-client',
      component: SignUp,
      // attribuer le role 'client' par le path
      meta: { requiresAuth: false, role : 2 },
    },
    {
      path: '/signup/owner',
      name: 'signup-owner',
      component: SignUp,
      // attribuer le role 'restaurateur' par le path
      meta:  { requiresAuth: false, role : 3 },
    },
    {
      path: '/signup/carrier',
      name: 'signup-carrier',
      component: SignUp,
      // attribuer le role 'livreur' par le path
      meta: { requiresAuth: false, role : 4 },
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
      // authentification requise et role 'restaurateur' nécessaire
      meta: { requiresAuth: true, role: 'owner' },
    },
    {
      path: '/owner/dashboard',
      name: 'owner-dashboard',
      component: OwnerDashboard,
      // authentification requise et role 'restaurateur' nécessaire
      meta: { requiresAuth: true, role: 'owner' },
    },
    {
      path: '/my-account',
      name: 'my-account',
      component: MyAccount,
    }
  ],
});

// permet de vérifier si l'utilisateur est connecté 
// et si il a le bon role pour accéder à certaines pages
// sinon le redirige vers la page de login
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
      next('/login');
  } else if (to.meta.requiresAuth && to.meta.role && authStore.userRole !== to.meta.role) {
      next('/');
  } else {
      next();
  }
});


export default router

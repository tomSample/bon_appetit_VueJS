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
import OwnerCreateRestaurant from '@/views/OwnerCreateRestaurant.vue'
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
      meta: { requiresAuth: false, role: 2 },
    },
    {
      path: '/signup/owner',
      name: 'signup-owner',
      component: SignUp,
      meta: { requiresAuth: false, role: 3 },
    },
    {
      path: '/signup/carrier',
      name: 'signup-carrier',
      component: SignUp,
      meta: { requiresAuth: false, role: 4 },
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
      path: '/conditions-generales',
      name: 'conditions-generales',
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
      component: OwnerCreateRestaurant,
      meta: { requiresAuth: true, role: 'owner' },
    },
    {
      path: '/owner/dashboard',
      name: 'owner-dashboard',
      component: OwnerDashboard,
      meta: { requiresAuth: true, role: 'owner' },
    },
    {
      path: '/my-account',
      name: 'my-account',
      component: MyAccount,
    }
  ],
});

// Vérifie si l'utilisateur est connecté et a le bon rôle pour accéder à certaines pages
// Sinon, redirige vers la page de login ou la page d'accueil
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

export default router;
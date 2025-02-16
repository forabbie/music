import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Manage from '../views/ManageView.vue'

import { useAuthStore } from '@/stores/auth.store'

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'manage',
    path: '/manage',
    meta: {
      requiresAuth: true
    },
    component: Manage,
    beforeEnter: (to, from, next) => {
      next()
    }
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

router.beforeEach((to, from, next) => {
  // console.log(to.matched);

  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next()
    return
  }

  if (useAuthStore().userLoggedIn) {
    next()
  } else {
    next({ name: 'home' })
  }
})
export default router

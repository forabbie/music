import { createRouter, createWebHistory } from 'vue-router'
// import { useAuthStore } from '@/stores/auth.store'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

// const storeAuth = useAuthStore()

router.beforeEach((to, from, next) => {
  // console.log(to.matched);

  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next()
    return
  }

  // if (storeAuth.userLoggedIn) {
  //   next()
  // } else {
  //   next({ name: 'home' })
  // }
})
export default router

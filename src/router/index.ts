import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                title: 'Home',
            },
        },
        /* {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    }, */
    ],
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = `${to.meta.title} - Songify`
    }
    next()
})

export default router

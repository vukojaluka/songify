import { createRouter, createWebHistory } from 'vue-router'
import SongsView from '../views/SongsView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'songs',
            component: SongsView,
            meta: {
                title: 'Songs',
            },
        },
        {
            path: '/playlists',
            name: 'playlists',
            component: () => import('../views/PlaylistsView.vue'),
        },
        {
            path: '/favorites',
            name: 'favorites',
            component: () => import('../views/FavoritesView.vue'),
        },
    ],
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = `${to.meta.title} - Songify`
    }

    next()

    /* if (!document.startViewTransition) {
        next()
        return
    }

    document.startViewTransition(() => next()) */
})

export default router

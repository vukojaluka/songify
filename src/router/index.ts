import { createRouter, createWebHistory } from 'vue-router'
import SongsView from '../views/SongsView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior() {
        return { top: 0, behavior: 'instant' }
    },
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
            meta: {
                title: 'Playlists',
            },
        },
        {
            path: '/favorites',
            name: 'favorites',
            component: () => import('../views/FavoritesView.vue'),
            meta: {
                title: 'Favorites',
            },
        },
        {
            path: '/playlists/:id',
            name: 'playlist',
            component: () => import('../views/PlaylistView.vue'),
            meta: {
                title: 'Playlist',
                parentRouteName: 'playlists',
            },
        },
    ],
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = `${to.meta.title} - Songify`
    }

    next()
})

export default router

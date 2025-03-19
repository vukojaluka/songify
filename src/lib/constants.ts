import IconSongs from '@/components/icons/IconSongs.vue'
import IconPlaylists from '@/components/icons/IconPlaylists.vue'
import IconFavorites from '@/components/icons/IconFavorites.vue'

export const navigationLinks = [
    {
        label: 'Songs',
        path: '/',
        name: 'songs',
        icon: IconSongs,
    },
    {
        label: 'Playlists',
        path: '/playlists',
        name: 'playlists',
        icon: IconPlaylists,
    },
    {
        label: 'Favorites',
        path: '/favorites',
        name: 'favorites',
        icon: IconFavorites,
    },
]

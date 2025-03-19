import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { usePlaylistsStore } from './usePlaylists'

import { type Song } from '@/lib/data'
import { getDataFromLocalStorage } from '@/lib/utils'

const FAVORITES_KEY = 'favorites'
const persistedFavorites = getDataFromLocalStorage<Record<number, Song>>(FAVORITES_KEY) || {}

export const useFavoritesStore = defineStore('favorites', () => {
    const favorites = ref<Record<number, Song>>(persistedFavorites)
    const searchFavoritesQuery = ref('')
    const playlistsStore = usePlaylistsStore()

    // Compute filtered favorite songs
    const filteredFavorites = computed(() => {
        return Object.entries(favorites.value)
            .map(([_, data]) => ({
                ...data,
            }))
            .filter((song) =>
                song.title.toLowerCase().includes(searchFavoritesQuery.value.toLowerCase()),
            )
    })

    function addFavorite(song: Song) {
        if (!(song.id in favorites.value)) {
            favorites.value[song.id] = {
                ...song,
                addedAt: new Date().toISOString(),
            }
            playlistsStore.updateFavoriteStatus(song.id, true)
        }
    }

    function removeFavorite(songId: number) {
        delete favorites.value[songId]
        playlistsStore.updateFavoriteStatus(songId, false)
    }

    return { favorites, searchFavoritesQuery, filteredFavorites, addFavorite, removeFavorite }
})

import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

import { usePlaylistsStore } from './use-playlists'

import { type Song } from '@/lib/data'
import { getDataFromLocalStorage, setDataToLocalStorage } from '@/lib/utils'

const FAVORITES_KEY = 'favorites'
const persistedFavorites = getDataFromLocalStorage<Record<number, Song>>(FAVORITES_KEY) || {}

export const useFavoritesStore = defineStore('favorites', () => {
    const playlistsStore = usePlaylistsStore()

    const favorites = ref<Record<number, Song>>(persistedFavorites)
    const searchFavoritesQuery = ref('')

    const filteredFavorites = computed(() => {
        return Object.values(favorites.value).filter((song) =>
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

    watch(
        favorites,
        (newFavorites) => {
            setDataToLocalStorage(FAVORITES_KEY, newFavorites)
        },
        {
            deep: true,
        },
    )

    return { favorites, searchFavoritesQuery, filteredFavorites, addFavorite, removeFavorite }
})

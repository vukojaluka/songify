import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { songs as songsData } from '@/lib/data'
import { getDataFromLocalStorage, setDataToLocalStorage } from '../lib/utils'

const FAVORITE_SONGS_KEY = 'favorite-songs'

export const useUserSongsStore = defineStore('user-songs', () => {
    const searchFavoriteSongsQuery = ref('')
    const favoriteSongs = ref<typeof songsData>(
        getDataFromLocalStorage(FAVORITE_SONGS_KEY, []) ?? [],
    )

    const filteredFavoriteSongs = computed(() => {
        if (!searchFavoriteSongsQuery.value.trim())
            return favoriteSongs.value?.sort((a, b) => {
                if (!a.createdAt || !b.createdAt) return 0
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            })

        return favoriteSongs.value.filter((song) =>
            song.title.toLowerCase().includes(searchFavoriteSongsQuery.value.toLowerCase()),
        )
    })

    function addSongToFavorites(song: (typeof songsData)[number]) {
        song.createdAt = new Date().toISOString()
        favoriteSongs.value.push(song)
        setDataToLocalStorage(FAVORITE_SONGS_KEY, favoriteSongs.value)
    }

    function removeSongFromFavorites(songId: number) {
        favoriteSongs.value = favoriteSongs.value.filter((song) => song.id !== songId)
        setDataToLocalStorage(FAVORITE_SONGS_KEY, favoriteSongs.value)
    }

    return {
        filteredFavoriteSongs,
        searchFavoriteSongsQuery,
        addSongToFavorites,
        removeSongFromFavorites,
    }
})

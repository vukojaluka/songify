import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { songs as songsData } from '@/lib/data'
import { getDataFromLocalStorage, setDataToLocalStorage } from '../lib/utils'

const FAVORITE_SONGS_KEY = 'favorite-songs'
const MY_PLAYLISTS_KEY = 'favorite-playlists'

export const useUserDataStore = defineStore('user-data', () => {
    const favoriteSongs = ref<typeof songsData>(
        getDataFromLocalStorage(FAVORITE_SONGS_KEY, []) ?? [],
    )
    const myPlaylists = ref(getDataFromLocalStorage(MY_PLAYLISTS_KEY, []) ?? [])

    const searchFavoriteSongsQuery = ref('')
    const searchMyPlaylistsQuery = ref('')

    const filteredFavoriteSongs = computed(() => {
        if (!searchFavoriteSongsQuery.value.trim()) return favoriteSongs.value

        return favoriteSongs.value.filter((song) =>
            song.title.toLowerCase().includes(searchFavoriteSongsQuery.value.toLowerCase()),
        )
    })

    function toggleFavoriteSong(songId: number) {
        const song = favoriteSongs.value.find((song) => song.id === songId)
        if (song) {
            song.isFavorite = !song.isFavorite
            setDataToLocalStorage(FAVORITE_SONGS_KEY, favoriteSongs.value)
        }
    }

    return {
        favoriteSongs,
        filteredFavoriteSongs,
        searchFavoriteSongsQuery,
        toggleFavoriteSong,
        myPlaylists,
        searchMyPlaylistsQuery,
    }
})

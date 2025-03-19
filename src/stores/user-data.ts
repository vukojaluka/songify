import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { songs as songsData } from '@/lib/data'
import { getDataFromLocalStorage, setDataToLocalStorage } from '../lib/utils'

const FAVORITE_SONGS_KEY = 'favorite-songs'
const MY_PLAYLISTS_KEY = 'favorite-playlists'

export const useUserDataStore = defineStore('user-data', () => {
    const searchFavoriteSongsQuery = ref('')
    const favoriteSongs = ref<typeof songsData>(
        getDataFromLocalStorage(FAVORITE_SONGS_KEY, []) ?? [],
    )

    const filteredFavoriteSongs = computed(() => {
        if (!searchFavoriteSongsQuery.value.trim()) return favoriteSongs.value

        return favoriteSongs.value.filter((song) =>
            song.title.toLowerCase().includes(searchFavoriteSongsQuery.value.toLowerCase()),
        )
    })

    function addSongToFavorites(song: (typeof songsData)[number]) {
        song.createdAt = new Date()
        favoriteSongs.value.push(song)
        setDataToLocalStorage(FAVORITE_SONGS_KEY, favoriteSongs.value)
    }

    function removeSongFromFavorites(songId: number) {
        favoriteSongs.value = favoriteSongs.value.filter((song) => song.id !== songId)
        setDataToLocalStorage(FAVORITE_SONGS_KEY, favoriteSongs.value)
    }

    const searchMyPlaylistsQuery = ref('')
    const myPlaylists = ref(getDataFromLocalStorage(MY_PLAYLISTS_KEY, []) ?? [])

    return {
        favoriteSongs,
        filteredFavoriteSongs,
        searchFavoriteSongsQuery,
        addSongToFavorites,
        removeSongFromFavorites,
        myPlaylists,
        searchMyPlaylistsQuery,
    }
})

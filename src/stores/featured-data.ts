import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { featuredPlaylists as featuredPlaylistsData, songs as songsData } from '@/lib/data'
import { getDataFromLocalStorage, setDataToLocalStorage } from '../lib/utils'

const FEATURED_SONGS_KEY = 'featured-songs'
const FEATURED_PLAYLISTS_KEY = 'featured-playlists'

export const useFeaturedDataStore = defineStore('featured-data', () => {
    const featuredSongs = ref(getDataFromLocalStorage(FEATURED_SONGS_KEY, songsData) ?? [])
    const featuredPlaylists = ref(
        getDataFromLocalStorage(FEATURED_PLAYLISTS_KEY, featuredPlaylistsData) ?? [],
    )
    const searchSongsQuery = ref('')

    const filteredSongs = computed(() => {
        if (!searchSongsQuery.value.trim()) return featuredSongs.value

        return featuredSongs.value.filter((song) =>
            song.title.toLowerCase().includes(searchSongsQuery.value.toLowerCase()),
        )
    })

    function toggleRecommendedFavoriteSong(songId: number) {
        const song = featuredSongs.value.find((song) => song.id === songId)
        if (song) {
            song.isFavorite = !song.isFavorite
            setDataToLocalStorage(FEATURED_SONGS_KEY, featuredSongs.value)
        }
    }

    return {
        featuredPlaylists,
        filteredSongs,
        searchSongsQuery,
        toggleRecommendedFavoriteSong,
    }
})

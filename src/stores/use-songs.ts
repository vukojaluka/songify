import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { useFavoritesStore } from './use-favorites'

import { songs as songsData, type Song, featuredPlaylists } from '@/lib/data'
import { getDataFromLocalStorage, setDataToLocalStorage } from '@/lib/utils'

const SONGS_KEY = 'songs'
const persistedSongs = getDataFromLocalStorage<Song[]>(SONGS_KEY) || songsData

const bootstrapPublicData = () => {
    const songs = getDataFromLocalStorage<Song[]>(SONGS_KEY) || songsData

    if (!songs) {
        setDataToLocalStorage(SONGS_KEY, songsData)
    }

    return { songs, featuredPlaylists }
}

bootstrapPublicData()

export const useSongsStore = defineStore('songs', () => {
    const favoritesStore = useFavoritesStore()

    const songs = ref(persistedSongs)
    const searchSongsQuery = ref('')

    const filteredSongs = computed(() => {
        return songs.value
            .map((song) => ({
                ...song,
                isFavorite: song.id in favoritesStore.favorites,
            }))
            .filter((song) =>
                song.title.toLowerCase().includes(searchSongsQuery.value.toLowerCase()),
            )
    })

    function toggleFavorite(song: Song) {
        if (song.id in favoritesStore.favorites) {
            favoritesStore.removeFavorite(song.id)
        } else {
            favoritesStore.addFavorite(song)
        }
    }

    return { songs, searchSongsQuery, filteredSongs, toggleFavorite }
})

import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { useFavoritesStore } from './use-favorites'

import {
    songs as songsData,
    type Song,
    featuredPlaylists as featuredPlaylistsData,
    type FeaturedPlaylist,
} from '@/lib/data'
import { getDataFromLocalStorage } from '@/lib/utils'

const SONGS_KEY = 'songs'
const persistedSongs = getDataFromLocalStorage<Song[]>(SONGS_KEY) || songsData

const FEATURED_PLAYLISTS_KEY = 'featuredPlaylists'
const persistedFeaturedPlaylists =
    getDataFromLocalStorage<FeaturedPlaylist[]>(FEATURED_PLAYLISTS_KEY) || featuredPlaylistsData

export const useSongsStore = defineStore('songs', () => {
    const favoritesStore = useFavoritesStore()

    const featuredPlaylists = ref(persistedFeaturedPlaylists)

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

    return { songs, searchSongsQuery, filteredSongs, toggleFavorite, featuredPlaylists }
})

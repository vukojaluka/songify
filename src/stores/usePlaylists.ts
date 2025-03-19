import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { useFavoritesStore } from './useFavorites'

import type { Song } from '@/lib/data'
import { getDataFromLocalStorage } from '@/lib/utils'
type Playlist = {
    id: string
    name: string
    songs: (Song & { isFavorite: boolean })[]
}

const PLAYLISTS_KEY = 'playlists'
const persistedPlaylists = getDataFromLocalStorage<Record<string, Playlist>>(PLAYLISTS_KEY) || {}

export const usePlaylistsStore = defineStore('playlists', () => {
    const favoritesStore = useFavoritesStore()

    const playlists = ref<Record<string, Playlist>>(persistedPlaylists)
    const searchQuery = ref('')

    // Compute filtered playlists by name
    const filteredPlaylists = computed(() => {
        return Object.values(playlists.value).filter((playlist) =>
            playlist.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
        )
    })

    function createPlaylist(name: string) {
        const playlistId = crypto.randomUUID()
        if (!(playlistId in playlists.value)) {
            playlists.value[playlistId] = { id: playlistId, name, songs: [] }
        }
    }

    function addSongToPlaylist(playlistId: string, newSong: Song) {
        if (playlistId in playlists.value) {
            const playlist = playlists.value[playlistId]
            if (!playlist.songs.some((song) => song.id === newSong.id)) {
                playlist.songs.push({
                    ...newSong,
                    isFavorite: newSong.id in favoritesStore.favorites,
                })
            }
        }
    }

    function removeSongFromPlaylist(playlistId: string, songId: number) {
        if (playlistId in playlists.value) {
            playlists.value[playlistId].songs = playlists.value[playlistId].songs.filter(
                (song) => song.id !== songId,
            )
        }
    }

    function updateFavoriteStatus(songId: number, isFavorite: boolean) {
        for (const playlist of Object.values(playlists.value)) {
            for (const song of playlist.songs) {
                if (song.id === songId) {
                    song.isFavorite = isFavorite
                    return
                }
            }
        }
    }

    return {
        playlists,
        searchQuery,
        filteredPlaylists,
        createPlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        updateFavoriteStatus,
    }
})

import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

import { useFavoritesStore } from './use-favorites'

import { featuredPlaylists as featuredPlaylistsData } from '@/lib/data'
import type { FeaturedPlaylist, Song } from '@/lib/data'
import { getDataFromLocalStorage, setDataToLocalStorage } from '@/lib/utils'

type Playlist = {
    id: string
    name: string
    songs: (Song & { isFavorite: boolean })[]
}

const PLAYLISTS_KEY = 'playlists'
const persistedPlaylists = getDataFromLocalStorage<Record<string, Playlist>>(PLAYLISTS_KEY) || {}

const FEATURED_PLAYLISTS_KEY = 'featuredPlaylists'
const persistedFeaturedPlaylists =
    getDataFromLocalStorage<FeaturedPlaylist[]>(FEATURED_PLAYLISTS_KEY) || featuredPlaylistsData

const bootstrapPublicData = () => {
    const featuredPlaylists =
        getDataFromLocalStorage<FeaturedPlaylist[]>(FEATURED_PLAYLISTS_KEY) || featuredPlaylistsData

    if (!featuredPlaylists) {
        setDataToLocalStorage(FEATURED_PLAYLISTS_KEY, featuredPlaylistsData)
    }

    return { featuredPlaylists }
}

bootstrapPublicData()

export const usePlaylistsStore = defineStore('playlists', () => {
    const favoritesStore = useFavoritesStore()

    const featuredPlaylists = ref(persistedFeaturedPlaylists)

    const playlists = ref<Record<string, Playlist>>(persistedPlaylists)
    const searchPlaylistsQuery = ref('')

    const filteredPlaylists = computed(() => {
        return Object.values(playlists.value).filter((playlist) =>
            playlist.name.toLowerCase().includes(searchPlaylistsQuery.value.toLowerCase()),
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
            if (playlists.value[playlistId].songs.length === 0) {
                delete playlists.value[playlistId]
            }
        }
    }

    function updateFavoriteStatus(songId: number, isFavorite: boolean) {
        Object.values(playlists.value).forEach((playlist) => {
            playlist.songs.forEach((song) => {
                if (song.id === songId) {
                    song.isFavorite = isFavorite
                }
            })
        })
        Object.values(featuredPlaylists.value).forEach((playlist) => {
            playlist.songs.forEach((song) => {
                if (song && song.id === songId) {
                    song.isFavorite = isFavorite
                }
            })
        })
    }

    function addPublicPlaylistToMyPlaylists(playlist: FeaturedPlaylist) {
        const playlistId = crypto.randomUUID()
        if (!(playlistId in playlists.value)) {
            playlists.value[playlistId] = {
                id: playlistId,
                name: playlist.title,
                songs: playlist.songs,
            }
        }
    }

    watch(
        playlists,
        (newPlaylists) => {
            setDataToLocalStorage(PLAYLISTS_KEY, newPlaylists)
        },
        {
            deep: true,
        },
    )

    watch(
        featuredPlaylists,
        (newFeaturedPlaylists) => {
            setDataToLocalStorage(FEATURED_PLAYLISTS_KEY, newFeaturedPlaylists)
        },
        {
            deep: true,
        },
    )

    return {
        playlists,
        searchPlaylistsQuery,
        filteredPlaylists,
        createPlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        updateFavoriteStatus,
        featuredPlaylists,
        addPublicPlaylistToMyPlaylists,
    }
})

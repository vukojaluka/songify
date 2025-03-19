import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { songs as songsData } from '@/lib/data'
import { getDataFromLocalStorage, setDataToLocalStorage } from '../lib/utils'

const USER_PLAYLISTS_KEY = 'user-playlists'

export const useUserPlaylistsStore = defineStore('user-playlists', () => {
    const searchPlaylistsQuery = ref('')

    return {
        searchPlaylistsQuery,
    }
})

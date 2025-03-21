<script setup lang="ts">
    import { ref } from 'vue'

    import { RecommendedSongItem } from '@/components/pages/songs/recommended-song-item'
    import { AddToPlaylistModal } from '@/components/shared/add-to-playlist-modal'

    import { useSongsStore } from '@/stores/use-songs'

    import type { Song } from '@/lib/data'

    const songsStore = useSongsStore()

    const songToAddToPlaylist = ref<Song | null>(null)
    function addSongToPlaylist(song: Song) {
        songToAddToPlaylist.value = song
    }

    function closeModal() {
        songToAddToPlaylist.value = null
    }
</script>

<template>
    <div class="flex max-w-[870px] flex-col gap-[10px] pr-[26px] lg:gap-[18px] lg:pr-[40px]">
        <RecommendedSongItem
            v-for="song in songsStore.filteredSongs"
            :key="song.id"
            :song="song"
            @add-to-playlist="addSongToPlaylist"
        />
    </div>
    <AddToPlaylistModal
        :is-open="!!songToAddToPlaylist"
        @close="closeModal"
        :song="songToAddToPlaylist"
    />
</template>

<script setup lang="ts">
    import { RecommendedSongItem } from '@/components/pages/songs/recommended-song-item'
    import { useSongsStore } from '@/stores/use-songs'

    const songsStore = useSongsStore()
</script>

<template>
    <div class="flex max-w-[870px] flex-col gap-[18px] pr-[26px] lg:pr-[40px]">
        <RecommendedSongItem v-for="song in songsStore.filteredSongs" :key="song.id" :song="song" />
    </div>
</template>

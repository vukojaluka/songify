<script setup lang="ts">
    import { useFeaturedDataStore } from '@/stores/featured-data'
    import { RecommendedSongItem } from '@/components/shared/recommended-song-item'
    const featuredDataStore = useFeaturedDataStore()
</script>

<template>
    <div class="flex max-w-[870px] flex-col gap-[18px] pr-[40px]">
        <RecommendedSongItem
            v-for="song in featuredDataStore.filteredSongs"
            :key="song.id"
            :song="song"
        />
    </div>
</template>

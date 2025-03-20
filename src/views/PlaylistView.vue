<script setup lang="ts">
    import { computed } from 'vue'
    import { useRoute } from 'vue-router'

    import { useSongsStore } from '@/stores/use-songs'

    const route = useRoute()

    const songsStore = useSongsStore()

    const playlist = computed(() => {
        return songsStore.featuredPlaylists.find(
            (playlist) => playlist.id === Number(route.params.id),
        )
    })
</script>

<template>
    <div>
        <h1>{{ playlist?.title }}</h1>
    </div>
</template>

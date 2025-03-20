<script setup lang="ts">
    import { ref } from 'vue'

    import { FavoritesListItem } from '@/components/pages/favorites/favorites-list-item'
    import { AddToPlaylistModal } from '@/components/shared/add-to-playlist-modal'

    import { useFavoritesStore } from '@/stores/use-favorites'

    import type { Song } from '@/lib/data'

    const favoritesStore = useFavoritesStore()

    const songToAddToPlaylist = ref<Song | null>(null)
    function addSongToPlaylist(song: Song) {
        songToAddToPlaylist.value = song
    }

    function toggleModal() {
        songToAddToPlaylist.value = null
    }
</script>

<template>
    <TransitionGroup
        name="fade"
        tag="div"
        class="relative flex max-w-[870px] flex-col gap-[18px] pr-[26px] lg:pr-[40px]"
    >
        <FavoritesListItem
            v-for="favorite in favoritesStore.filteredFavorites"
            :key="favorite.id"
            :favorite="favorite"
            @add-to-playlist="addSongToPlaylist"
        />
    </TransitionGroup>
    <AddToPlaylistModal
        :is-open="!!songToAddToPlaylist"
        @close="toggleModal"
        :song="songToAddToPlaylist"
    />
</template>

<style scoped>
    .fade-move,
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .fade-leave-from {
        opacity: 0;
    }

    .fade-leave-active {
        position: absolute;
        opacity: 0;
        width: 100%;
    }
</style>

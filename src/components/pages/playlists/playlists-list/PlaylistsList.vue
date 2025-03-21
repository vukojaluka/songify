<script setup lang="ts">
    import { Accordion } from '@/components/ui/accordion'
    import { PlaylistsListItem } from '@/components/pages/playlists/playlists-list-item'

    import { usePlaylistsStore } from '@/stores/use-playlists'

    const playlistsStore = usePlaylistsStore()
</script>

<template>
    <TransitionGroup name="fade" tag="div" class="relative flex flex-col lg:gap-[20px]">
        <Accordion v-for="playlist in playlistsStore.filteredPlaylists" :key="playlist.id">
            <template #title>
                <div class="mr-[66px] flex grow items-center justify-between gap-[10px]">
                    <span class="block font-bold">{{ playlist.name }}</span>
                    <span class="block text-sm text-black dark:text-white">
                        {{ playlist.songs.length }} songs
                    </span>
                </div>
            </template>
            <template #content>
                <PlaylistsListItem
                    v-for="song in playlist.songs"
                    :key="song.id"
                    :song="song"
                    @remove-song="playlistsStore.removeSongFromPlaylist(playlist.id, song.id)"
                />
            </template>
        </Accordion>
    </TransitionGroup>
</template>

<style scoped>
    .fade-move,
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.2s ease-out;
    }

    .fade-enter-from,
    .fade-leave-to {
        @apply opacity-0;
    }

    .fade-leave-from {
        @apply opacity-100;
    }

    .fade-leave-active {
        @apply absolute w-full max-w-[calc(100%-27px)] opacity-0 lg:max-w-[calc(870px-42px-19px)];
    }
</style>

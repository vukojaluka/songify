<script setup lang="ts">
    import { Check } from 'lucide-vue-next'

    import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
    import { Button } from '@/components/ui/button'
    import { Accordion } from '@/components/ui/accordion'
    import { PlaylistsListItem } from '@/components/pages/playlists/playlists-list-item'
    import { NewPlaylistModal } from '@/components/shared/new-playlist-modal'

    import { usePlaylistsStore } from '@/stores/use-playlists'

    import type { Song } from '@/lib/data'
    import { ref } from 'vue'

    const props = defineProps<{
        isOpen: boolean
        song: Song | null
        onClose: () => void
    }>()

    const playlistsStore = usePlaylistsStore()

    function addSongToPlaylist(playlistId: string) {
        playlistsStore.addSongToPlaylist(playlistId, props.song!)
        props.onClose()
    }

    const isCreatePlaylistModalOpen = ref(false)

    function openCreatePlaylistModal() {
        isCreatePlaylistModalOpen.value = true
    }
</script>

<template>
    <Dialog :open="props.isOpen" @update:open="(open) => !open && props.onClose()">
        <DialogContent :animation-enabled="false">
            <DialogHeader>
                <DialogTitle class="text-xl font-bold leading-[100%]">Add to Playlist</DialogTitle>
            </DialogHeader>

            <div class="my-[50px] flex w-full flex-col items-center gap-y-[50px] px-[16px]">
                <Button type="button" @click="openCreatePlaylistModal">New Playlist</Button>
                <div class="w-full">
                    <TransitionGroup
                        name="fade"
                        tag="div"
                        class="relative flex flex-col lg:gap-[20px]"
                    >
                        <Accordion
                            v-for="playlist in playlistsStore.playlists"
                            :key="playlist.id"
                            title-class-names="!pr-0 !pl-0"
                        >
                            <template #title>
                                <div
                                    class="mr-[66px] flex grow items-center justify-between gap-[10px]"
                                >
                                    <span class="block font-bold">{{ playlist.name }}</span>
                                    <span class="block text-sm text-black dark:text-white">
                                        {{ playlist.songs.length }} songs
                                    </span>
                                </div>
                                <button class="mr-[20px]" @click="addSongToPlaylist(playlist.id)">
                                    <span class="sr-only">Add to playlist</span>
                                    <Check class="text-accent-foreground" />
                                </button>
                            </template>
                            <template #content>
                                <PlaylistsListItem
                                    v-for="song in playlist.songs"
                                    :key="song.id"
                                    :song="song"
                                    @remove-song="
                                        playlistsStore.removeSongFromPlaylist(playlist.id, song.id)
                                    "
                                />
                            </template>
                        </Accordion>
                    </TransitionGroup>
                </div>
            </div>
        </DialogContent>
    </Dialog>

    <NewPlaylistModal
        :is-trigger-button-visible="false"
        :is-open="isCreatePlaylistModalOpen"
        @close="isCreatePlaylistModalOpen = false"
    />
</template>

<script setup lang="ts">
    import { onUnmounted, ref } from 'vue'
    import { Check } from 'lucide-vue-next'

    import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
    import { Button } from '@/components/ui/button'
    import { Accordion } from '@/components/ui/accordion'
    import { PlaylistsListItem } from '@/components/pages/playlists/playlists-list-item'
    import { NewPlaylistModal } from '@/components/shared/new-playlist-modal'

    import { usePlaylistsStore } from '@/stores/use-playlists'

    import type { Song } from '@/lib/data'

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

    const isAnimationEnabled = ref(false)
    const animationTimeout = ref<number | null>(null)
    const ANIMATION_DURATION = 200

    const isCreatePlaylistModalOpen = ref(false)
    function openCreatePlaylistModal() {
        isCreatePlaylistModalOpen.value = true
        isAnimationEnabled.value = true
    }
    function closeCreatePlaylistModal() {
        isCreatePlaylistModalOpen.value = false
        isAnimationEnabled.value = false
        props.onClose()
    }
    function backToAddToPlaylistModal() {
        isCreatePlaylistModalOpen.value = false

        animationTimeout.value = setTimeout(() => {
            isAnimationEnabled.value = false
        }, ANIMATION_DURATION)
    }

    onUnmounted(() => {
        if (animationTimeout.value) {
            clearTimeout(animationTimeout.value)
        }
    })
</script>

<template>
    <Dialog :open="props.isOpen" @update:open="(open) => !open && props.onClose()">
        <DialogContent
            :animation-enabled="isAnimationEnabled"
            class="max-h-[75%] w-full max-w-[570px] overflow-y-auto transition-transform duration-200 ease-out"
            :class="{
                'pointer-events-none !-translate-x-[100vw] opacity-0': isCreatePlaylistModalOpen,
                '!-translate-x-1/2 opacity-100': !isCreatePlaylistModalOpen,
            }"
        >
            <DialogHeader>
                <DialogTitle class="text-xl font-bold leading-[100%]">Add to Playlist</DialogTitle>
            </DialogHeader>

            <div
                class="my-[20px] flex w-full flex-col items-center gap-y-[18px] lg:my-[50px] lg:gap-y-[50px] lg:px-[16px]"
            >
                <div
                    v-if="song"
                    class="flex w-full items-center justify-between gap-y-[20px] px-[30px] lg:hidden"
                >
                    <div class="flex flex-col justify-between gap-y-[10px]">
                        <span class="font-bold text-foreground/60">{{ song.artist }}</span>
                        <span class="text-sm leading-[100%] text-foreground/60">{{
                            song.title
                        }}</span>
                    </div>
                    <span class="text-[15px] text-foreground/60">{{ song.duration }}</span>
                </div>
                <Button type="button" @click="openCreatePlaylistModal">New Playlist</Button>
                <div class="w-full" v-if="Object.keys(playlistsStore.playlists).length > 0">
                    <TransitionGroup
                        name="fade"
                        tag="div"
                        class="relative flex flex-col lg:gap-[20px]"
                    >
                        <Accordion
                            v-for="playlist in playlistsStore.playlists"
                            :key="playlist.id"
                            title-class-names="!pl-0 lg:!pr-0"
                        >
                            <template #title>
                                <div
                                    class="mr-[20px] flex grow items-center justify-between gap-[10px] lg:mr-[66px]"
                                >
                                    <span class="block text-left font-bold">{{
                                        playlist.name
                                    }}</span>
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
        :is-nested="true"
        :is-open="isCreatePlaylistModalOpen"
        @back="backToAddToPlaylistModal"
        @close="closeCreatePlaylistModal"
        :state="isCreatePlaylistModalOpen ? 'back' : 'default'"
    />
</template>

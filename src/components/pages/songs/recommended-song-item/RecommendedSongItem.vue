<script setup lang="ts">
    import { onUnmounted, ref } from 'vue'

    import { SongItem } from '@/components/shared/song-item'
    import IconHeart from '@/components/icons/IconHeart.vue'
    import IconPlaylistAdd from '@/components/icons/IconPlaylistAdd.vue'

    import { useSongsStore } from '@/stores/use-songs'
    import { type Song } from '@/lib/data'

    const props = defineProps<{
        song: Song
        onAddToPlaylist: (song: Song) => void
    }>()

    const songsStore = useSongsStore()

    const isFavoriteAnimating = ref(false)
    const isFavoriteAnimatingTimeout = ref<number | null>(null)
    const FAVORITE_ANIMATION_DURATION = 500

    function toggleFavoriteSong(song: Song) {
        isFavoriteAnimating.value = !song.isFavorite ? true : false
        songsStore.toggleFavorite(song)

        isFavoriteAnimatingTimeout.value = setTimeout(() => {
            isFavoriteAnimating.value = false
        }, FAVORITE_ANIMATION_DURATION)
    }

    onUnmounted(() => {
        if (isFavoriteAnimatingTimeout.value) {
            clearTimeout(isFavoriteAnimatingTimeout.value)
            isFavoriteAnimatingTimeout.value = null
        }
    })
</script>

<template>
    <SongItem :song="props.song">
        <template #actions="{ isPlaying }">
            <div class="ml-auto flex items-center gap-[22px] pl-[15px]">
                <span class="block text-sm leading-[150%]">{{ props.song.duration }}</span>
                <transition name="actions-fade">
                    <div v-if="!isPlaying" class="flex items-center gap-[22px]">
                        <button @click="props.onAddToPlaylist(props.song)">
                            <IconPlaylistAdd />
                        </button>
                        <button
                            @click="toggleFavoriteSong(props.song)"
                            :class="[
                                props.song.isFavorite ? 'text-destructive' : 'text-action-button',
                                { 'animate-pulse': isFavoriteAnimating },
                                { 'transition-colors duration-200': !isFavoriteAnimating },
                            ]"
                        >
                            <IconHeart
                                :class="{ 'transition-fill duration-200': !isFavoriteAnimating }"
                                :stroke="props.song.isFavorite ? 'currentColor' : 'currentColor'"
                                :fill="props.song.isFavorite ? 'currentColor' : 'transparent'"
                            />
                        </button>
                    </div>
                </transition>
            </div>
        </template>
    </SongItem>
</template>

<style scoped>
    .actions-fade-enter-active,
    .actions-fade-leave-active {
        @apply lg:transition-all lg:duration-200 lg:ease-in-out;
    }
    .actions-fade-enter-from {
        @apply lg:opacity-0;
    }
    .actions-fade-leave-to,
    .actions-fade-enter-to {
        @apply lg:translate-x-[-50px] lg:opacity-0;
    }

    .animate-pulse {
        animation: pulse 0.2s ease-out;
    }
</style>

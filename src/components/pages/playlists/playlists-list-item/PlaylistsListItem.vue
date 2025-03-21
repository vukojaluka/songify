<script setup lang="ts">
    import { onUnmounted, ref } from 'vue'

    import SongItem from '@/components/shared/song-item/SongItem.vue'
    import IconHeart from '@/components/icons/IconHeart.vue'
    import IconPlaylistRemove from '@/components/icons/IconPlaylistRemove.vue'

    import { useSongsStore } from '@/stores/use-songs'

    import { type Song } from '@/lib/data'

    const props = defineProps<{
        song: Song
        onRemoveSong?: () => void
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
    <SongItem :song="props.song" :key="props.song.id">
        <template #actions="{ isPlaying }">
            <div class="ml-auto flex items-center gap-[22px] pl-[15px]">
                <span class="block text-sm leading-[150%]">{{ props.song.duration }}</span>
                <div v-if="!isPlaying" class="flex w-[70px] flex-col gap-[7px]">
                    <div class="flex items-center justify-end gap-[22px]">
                        <button @click="props.onRemoveSong">
                            <IconPlaylistRemove />
                        </button>
                        <button
                            @click="toggleFavoriteSong(song)"
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
                </div>
            </div>
        </template>
    </SongItem>
</template>

<style scoped>
    .animate-pulse {
        animation: pulse 0.2s ease-out;
    }
</style>

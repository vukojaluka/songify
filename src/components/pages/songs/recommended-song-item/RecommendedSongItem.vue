<script setup lang="ts">
    import { ref } from 'vue'
    import { SongItem } from '@/components/shared/song-item'
    import IconHeart from '@/components/icons/IconHeart.vue'
    import IconPlaylistAdd from '@/components/icons/IconPlaylistAdd.vue'

    import { useUserDataStore } from '@/stores/user-data'
    import { useFeaturedDataStore } from '@/stores/featured-data'
    import { songs } from '@/lib/data'

    const props = defineProps<{
        song: (typeof songs)[number]
    }>()

    const userDataStore = useUserDataStore()
    const featuredDataStore = useFeaturedDataStore()

    const isFavoriteAnimating = ref(false)
    function toggleFavoriteSong(song: (typeof songs)[number]) {
        isFavoriteAnimating.value = !song.isFavorite ? true : false
        if (song.isFavorite) {
            userDataStore.removeSongFromFavorites(song.id)
        } else {
            userDataStore.addSongToFavorites(song)
        }
        featuredDataStore.toggleRecommendedFavoriteSong(song.id)
    }
</script>

<template>
    <SongItem :song="props.song">
        <template #actions="{ isPlaying }">
            <div class="ml-auto flex items-center gap-[22px] pl-[15px]">
                <span class="block text-sm leading-[150%]">{{ props.song.duration }}</span>
                <transition name="actions-fade">
                    <div v-if="!isPlaying" class="flex items-center gap-[22px]">
                        <button>
                            <IconPlaylistAdd />
                        </button>
                        <button
                            @click="toggleFavoriteSong(props.song)"
                            :class="[
                                props.song.isFavorite ? 'text-destructive' : 'text-action-button',
                                { 'animate-pulse': isFavoriteAnimating },
                                { 'transition-colors duration-100': !isFavoriteAnimating },
                            ]"
                        >
                            <IconHeart
                                :class="{ 'transition-fill duration-100': !isFavoriteAnimating }"
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
        animation: pulse 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.5);
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
        }

        70% {
            transform: scale(1.8);
        }

        98% {
            opacity: 0.8;
            transform: scale(2.2);
        }

        100% {
            transform: scale(1);
        }
    }
</style>

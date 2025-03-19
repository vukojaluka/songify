<script setup lang="ts">
    import { ref } from 'vue'

    import SongItem from '@/components/shared/song-item/SongItem.vue'
    import IconPlaylistAdd from '@/components/icons/IconPlaylistAdd.vue'
    import IconHeart from '@/components/icons/IconHeart.vue'

    import { useFeaturedDataStore } from '@/stores/featured-data'
    import { useUserDataStore } from '@/stores/user-data'

    import { songs } from '@/lib/data'

    const props = defineProps<{
        favorite: (typeof songs)[number]
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
    <SongItem :song="props.favorite">
        <template #actions="{ isPlaying }">
            <div class="ml-auto flex items-center gap-[22px] pl-[15px]">
                <span class="block text-sm leading-[150%]">{{ props.favorite.duration }}</span>
                <transition name="actions-fade">
                    <div v-if="!isPlaying" class="flex flex-col">
                        <div class="flex items-center gap-[22px]">
                            <button>
                                <IconPlaylistAdd />
                            </button>
                            <button
                                @click="toggleFavoriteSong(props.favorite)"
                                :class="[
                                    props.favorite.isFavorite
                                        ? 'text-destructive'
                                        : 'text-action-button',
                                    { 'animate-pulse': isFavoriteAnimating },
                                    { 'transition-colors duration-100': !isFavoriteAnimating },
                                ]"
                            >
                                <IconHeart
                                    :class="{
                                        'transition-fill duration-100': !isFavoriteAnimating,
                                    }"
                                    :stroke="
                                        props.favorite.isFavorite ? 'currentColor' : 'currentColor'
                                    "
                                    :fill="
                                        props.favorite.isFavorite ? 'currentColor' : 'transparent'
                                    "
                                />
                            </button>
                        </div>
                        <span class="text-sm leading-[150%]">{{
                            props.favorite.createdAt?.toLocaleString()
                        }}</span>
                    </div>
                </transition>
            </div>
        </template>
    </SongItem>
</template>

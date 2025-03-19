<script setup lang="ts">
    import { ref, computed } from 'vue'

    import SongItem from '@/components/shared/song-item/SongItem.vue'
    import IconPlaylistAdd from '@/components/icons/IconPlaylistAdd.vue'
    import IconHeart from '@/components/icons/IconHeart.vue'

    import { useFeaturedDataStore } from '@/stores/featured-data'
    import { useUserSongsStore } from '@/stores/user-songs'

    import { songs } from '@/lib/data'
    import { timeAgo } from '@/lib/utils'
    const props = defineProps<{
        favorite: (typeof songs)[number]
    }>()

    const userSongsStore = useUserSongsStore()
    const featuredDataStore = useFeaturedDataStore()

    const isFavoriteAnimating = ref(false)
    function removeFavoriteSong(song: (typeof songs)[number]) {
        isFavoriteAnimating.value = !song.isFavorite ? true : false
        userSongsStore.removeSongFromFavorites(song.id)
        featuredDataStore.toggleRecommendedFavoriteSong(song.id)
    }

    const formattedTimeAgo = computed(() => {
        if (!props.favorite.createdAt) return ''
        return timeAgo(props.favorite.createdAt)
    })
</script>

<template>
    <SongItem :song="props.favorite" :key="props.favorite.id">
        <template #actions="{ isPlaying }">
            <div class="ml-auto flex items-center gap-[22px] pl-[15px]">
                <span class="block text-sm leading-[150%]">{{ props.favorite.duration }}</span>
                <div v-if="!isPlaying" class="flex w-[70px] flex-col gap-[7px]">
                    <div class="flex items-center gap-[22px]">
                        <button>
                            <IconPlaylistAdd />
                        </button>
                        <button
                            @click="removeFavoriteSong(props.favorite)"
                            class="text-destructive"
                        >
                            <IconHeart stroke="currentColor" fill="currentColor" />
                        </button>
                    </div>
                    <span class="truncate text-sm leading-[100%]">{{ formattedTimeAgo }}</span>
                </div>
            </div>
        </template>
    </SongItem>
</template>

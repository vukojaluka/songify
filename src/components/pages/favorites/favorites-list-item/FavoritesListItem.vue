<script setup lang="ts">
    import { ref, computed } from 'vue'

    import SongItem from '@/components/shared/song-item/SongItem.vue'
    import IconPlaylistAdd from '@/components/icons/IconPlaylistAdd.vue'
    import IconHeart from '@/components/icons/IconHeart.vue'

    import { useSongsStore } from '@/stores/use-songs'

    import { type Song } from '@/lib/data'
    import { timeAgo } from '@/lib/utils'

    const props = defineProps<{
        favorite: Song
    }>()

    const songsStore = useSongsStore()

    function removeFavoriteSong(song: Song) {
        songsStore.toggleFavorite(song)
    }

    const formattedTimeAgo = computed(() => {
        if (!props.favorite.addedAt) return ''
        return timeAgo(props.favorite.addedAt)
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

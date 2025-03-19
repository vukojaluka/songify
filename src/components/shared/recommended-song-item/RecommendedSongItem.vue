<script setup lang="ts">
    import { SongItem } from '@/components/shared/song-item'
    import IconHeart from '@/components/icons/IconHeart.vue'
    import IconPlaylistAdd from '@/components/icons/IconPlaylistAdd.vue'
    import { songs } from '@/lib/data'

    const props = defineProps<{
        song: (typeof songs)[number]
    }>()
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
                        <button>
                            <IconHeart />
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
        transition:
            opacity 0.1s ease-in-out,
            transform 0.1s ease-in-out;
    }
    .actions-fade-enter-from {
        opacity: 0;
    }
    .actions-fade-leave-to {
        opacity: 0;
        transform: translateX(-50px);
    }
</style>

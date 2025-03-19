<script setup lang="ts">
    import Circle from '@/components/shared/circle/Circle.vue'
    import IconPlay from '@/components/icons/IconPlay.vue'
    import IconPause from '@/components/icons/IconPause.vue'
    import { songs } from '@/lib/data'
    import { ref } from 'vue'

    const props = defineProps<{
        song: (typeof songs)[number]
    }>()

    const isPlaying = ref(false)

    function togglePlay() {
        isPlaying.value = !isPlaying.value
    }
</script>

<template>
    <div class="relative flex h-[50px] items-center">
        <button @click="togglePlay" class="relative size-[44px]">
            <Circle
                class="absolute inset-0"
                :class="!isPlaying ? 'pl-[16px] pr-[12px] opacity-100' : 'opacity-0'"
            >
                <IconPlay
                    class="text-black transition-opacity duration-300 ease-in-out dark:text-foreground"
                    :class="!isPlaying ? 'opacity-100' : 'opacity-0'"
                />
            </Circle>
            <Circle class="absolute inset-0" :class="isPlaying ? 'opacity-100' : 'opacity-0'">
                <IconPause
                    class="absolute text-black transition-opacity duration-300 ease-in-out dark:text-foreground"
                    :class="isPlaying ? 'opacity-100' : 'opacity-0'"
                />
            </Circle>
        </button>
        <transition name="fade-details">
            <div
                class="ml-[20px] flex flex-col justify-between"
                v-if="!isPlaying"
                :key="`song-item-details-${isPlaying}`"
            >
                <p class="truncate text-base font-bold">{{ props.song.artist }}</p>
                <h3 class="truncate text-xs">{{ props.song.title }}</h3>
            </div>
        </transition>
        <transition name="progress">
            <div
                class="ml-[19px] flex grow items-center gap-[15px]"
                v-if="isPlaying"
                :key="`song-item-progress-${isPlaying}`"
            >
                <span class="block text-sm leading-[150%]">1:50</span>
                <div class="bg-progress-bar relative h-[5px] grow rounded-[20px]">
                    <div
                        class="absolute left-0 top-0 h-[5px] w-[20px] rounded-[20px] bg-accent-foreground"
                    />
                </div>
            </div>
        </transition>
        <slot name="actions" :isPlaying="isPlaying" />
    </div>
</template>

<style scoped>
    .fade-details-enter-active,
    .fade-details-leave-active {
        @apply absolute left-[var(--circle-size)] w-full transition-opacity duration-300 ease-in-out;
    }
    .fade-details-enter-from {
        @apply opacity-0;
    }
    .fade-details-leave-to {
        @apply opacity-0;
    }

    .progress-enter-active,
    .progress-leave-active {
        transition:
            opacity 0.4s ease-in-out,
            transform 0.2s ease-in-out;
        @apply origin-left lg:origin-right;
    }
    .progress-leave-active {
        @apply absolute left-[var(--circle-size)] lg:static lg:left-[unset];
    }
    .progress-enter-from {
        @apply scale-x-0 opacity-0;
    }
    .progress-leave-to {
        @apply scale-x-0 opacity-0;
    }
</style>

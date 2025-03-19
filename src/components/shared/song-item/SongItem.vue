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
        console.log('togglePlay', isPlaying.value)
    }
</script>

<template>
    <div class="relative flex h-[50px] items-center">
        <button @click="togglePlay">
            <Circle>
                <IconPlay
                    class="absolute text-black transition-opacity duration-300 ease-in-out"
                    :class="!isPlaying ? 'opacity-100' : 'opacity-0'"
                />
                <IconPause
                    class="absolute text-black transition-opacity duration-300 ease-in-out"
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
                <p class="text-base font-bold">{{ props.song.artist }}</p>
                <h3 class="text-xs">{{ props.song.title }}</h3>
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
        transition: opacity 0.3s ease-in-out;
        position: absolute; /* Make it absolute during transition */
        left: 44px;
        width: 100%; /* Ensure it doesn’t shrink */
    }
    .fade-details-enter-from {
        opacity: 0;
    }
    .fade-details-leave-to {
        opacity: 0;
    }

    .progress-enter-active,
    .progress-leave-active {
        transition:
            opacity 0.4s ease-in-out,
            transform 0.2s ease-in-out;
        transform-origin: right;
    }
    .progress-enter-from {
        opacity: 0;
        transform: scaleX(0);
    }
    .progress-leave-to {
        opacity: 0;
        transform: scaleX(0);
    }
</style>

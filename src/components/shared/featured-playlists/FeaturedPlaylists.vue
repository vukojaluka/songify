<script setup lang="ts">
    import { useFeaturedDataStore } from '@/stores/featured-data'

    const featuredDataStore = useFeaturedDataStore()
</script>

<template>
    <div class="relative">
        <div
            class="scrollbar-hidden flex max-w-fit snap-x snap-mandatory flex-nowrap gap-[9px] overflow-x-auto scroll-smooth pr-[22px]"
        >
            <RouterLink
                v-for="playlist in featuredDataStore.featuredPlaylists"
                :key="playlist.id"
                :to="`/playlists/${playlist.id}`"
            >
                <figure class="flex h-[240px] w-[147px] shrink-0 snap-start flex-col">
                    <img
                        :src="playlist.thumbnail"
                        :alt="playlist.title"
                        class="h-[185px] w-full rounded-[30px] object-cover"
                    />
                    <figcaption class="flex grow flex-col justify-between">
                        <h3 class="mt-[9px] text-base font-bold leading-[100%]">
                            {{ playlist.title }}
                        </h3>
                        <span class="text-sm">{{ playlist.songs.length }} Songs</span>
                    </figcaption>
                </figure>
            </RouterLink>
        </div>
        <div
            class="opacity-1 absolute right-0 top-0 h-[240px] w-[75px] bg-[linear-gradient(90deg,hsla(0,0%,100%,0),hsla(0,0%,100%,1))] dark:bg-[linear-gradient(to_right,hsla(0,0%,0%,0)_35%,hsla(0,0%,0%,0.25),hsla(0,0%,0%,0.5))] dark:opacity-50 lg:w-[147px]"
        />
    </div>
</template>

<style scoped>
    /* Hide scrollbar but allow scrolling */
    .scrollbar-hidden {
        scrollbar-width: none; /* Firefox */
    }
    .scrollbar-hidden::-webkit-scrollbar {
        display: none; /* Chrome, Safari */
    }
</style>

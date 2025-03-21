<script setup lang="ts">
    import { computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'

    import { RecommendedPlaylists } from '@/components/pages/playlists/recommended-playlists'
    import IconArrowRight from '@/components/icons/IconArrowRight.vue'
    import { Button } from '@/components/ui/button'

    import { usePlaylistsStore } from '@/stores/use-playlists'
    import type { FeaturedPlaylist } from '@/lib/data'

    const route = useRoute()
    const router = useRouter()
    const playlistsStore = usePlaylistsStore()

    const playlist = computed(() => {
        return playlistsStore.featuredPlaylists.find(
            (playlist) => playlist.id === Number(route.params.id),
        )
    })

    function handleSavePlaylist(playlist: FeaturedPlaylist) {
        playlistsStore.addPublicPlaylistToMyPlaylists(playlist)
        router.push('/playlists')
    }
</script>

<template>
    <template v-if="playlist">
        <div
            class="relative -left-[20px] -top-[23px] h-[185px] w-[calc(100%+20px)] max-w-[870px] overflow-hidden lg:left-0 lg:top-0 lg:mb-[20px] lg:w-full"
        >
            <img
                :src="playlist.thumbnail"
                :alt="playlist.title"
                class="h-full w-full object-cover lg:rounded-[30px]"
            />
        </div>
        <div class="mb-[32px] flex max-w-[870px] items-center gap-[28px]">
            <router-link to="/playlists" class="flex items-center gap-[10px] lg:hidden">
                <IconArrowRight class="rotate-180" />
                <p class="sr-only">Back to playlists</p>
            </router-link>
            <div class="flex flex-col gap-[9px]">
                <h1 class="text-lg font-bold leading-[100%]">{{ playlist.title }}</h1>
                <p class="text-sm leading-[100%] text-black dark:text-white">
                    {{ playlist.songs.length }} songs
                </p>
            </div>
            <Button class="ml-auto mr-[20px] lg:mr-[40px]" @click="handleSavePlaylist(playlist)">
                Save
            </Button>
        </div>
        <RecommendedPlaylists :playlist-songs="playlist.songs.filter(Boolean) || []" />
    </template>
    <div v-else class="mt-[50px] flex flex-col items-center justify-center gap-y-[20px]">
        <p class="text-sm">Playlist not found</p>
        <router-link to="/playlists">Back to playlists</router-link>
    </div>
</template>

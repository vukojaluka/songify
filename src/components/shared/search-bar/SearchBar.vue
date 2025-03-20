<script setup lang="ts">
    import { computed } from 'vue'
    import { Input } from '@/components/ui/input'
    import { Switch } from '@/components/ui/switch'
    import IconSearch from '@/components/icons/IconSearch.vue'

    import { useTheme } from '@/hooks/use-theme'
    import { useSongsStore } from '../../../stores/use-songs'
    import { useFavoritesStore } from '../../../stores/use-favorites'
    import { usePlaylistsStore } from '../../../stores/use-playlists'

    const props = defineProps<{
        placeholder?: string
        type: 'recommended' | 'playlists' | 'favorites'
    }>()

    const songsStore = useSongsStore()
    const favoritesStore = useFavoritesStore()
    const playlistsStore = usePlaylistsStore()
    const searchQuery = computed({
        get() {
            switch (props.type) {
                case 'recommended':
                    return songsStore.searchSongsQuery
                case 'playlists':
                    return playlistsStore.searchPlaylistsQuery
                case 'favorites':
                    return favoritesStore.searchFavoritesQuery
                default:
                    return ''
            }
        },
        set(value) {
            switch (props.type) {
                case 'recommended':
                    songsStore.searchSongsQuery = value
                    break
                case 'playlists':
                    playlistsStore.searchPlaylistsQuery = value
                    break
                case 'favorites':
                    favoritesStore.searchFavoritesQuery = value
                    break
            }
        },
    })

    const { isDark, toggleTheme } = useTheme()
</script>

<template>
    <div class="flex items-center justify-between gap-[51px] pr-[40px] lg:gap-[0] lg:pr-[63px]">
        <div class="relative w-full max-w-[750px]">
            <IconSearch class="absolute left-[10px] top-1/2 -translate-y-1/2 text-foreground" />
            <Input
                v-model="searchQuery"
                class="h-[40px] rounded-[20px] border-none p-[10px] pl-[calc(25px+20px)] text-sm font-normal shadow-none duration-300 ease-out placeholder:text-sm placeholder:font-normal placeholder:text-placeholder focus-visible:bg-white focus-visible:shadow-sm focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-background"
                :placeholder="props.placeholder"
            />
        </div>
        <Switch :model-value="!isDark" @update:model-value="toggleTheme" />
    </div>
</template>

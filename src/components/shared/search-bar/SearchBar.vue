<script setup lang="ts">
    import { computed } from 'vue'
    import { Input } from '@/components/ui/input'
    import { Switch } from '@/components/ui/switch'
    import IconSearch from '@/components/icons/IconSearch.vue'

    import { useTheme } from '@/hooks/use-theme'
    import { useFeaturedDataStore } from '../../../stores/featured-data'

    const props = defineProps<{
        placeholder?: string
        type: 'recommended' | 'playlists' | 'favorites'
    }>()

    const featuredDataStore = useFeaturedDataStore()

    const searchQuery = computed({
        get() {
            switch (props.type) {
                case 'recommended':
                    return featuredDataStore.searchSongsQuery
                case 'playlists':
                    return ''
                case 'favorites':
                    return ''
                default:
                    return ''
            }
        },
        set(value) {
            switch (props.type) {
                case 'recommended':
                    //recommendedSearchQuery.value = value
                    featuredDataStore.searchSongsQuery = value
                    break
                case 'playlists':
                    //playlistsSearchQuery.value = value
                    // Update store for playlists when implemented
                    break
                case 'favorites':
                    //favoritesSearchQuery.value = value
                    // Update store for favorites when implemented
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

<script setup lang="ts">
    import { Search } from '@/components/shared/search-bar'
    import { SectionHeader } from '@/components/shared/section-header'
    import { FeaturedPlaylists } from '@/components/pages/songs/featured-playlists'
    import { RecommendedSongs } from '@/components/pages/songs/recommended-songs'
</script>

<template>
    <Search placeholder="Find favorite Songs & Artists" type="recommended" />
    <SectionHeader title="Featured Playlists">
        <FeaturedPlaylists />
    </SectionHeader>
    <SectionHeader title="Recommended" class="mt-[12px]">
        <RecommendedSongs />
    </SectionHeader>
</template>

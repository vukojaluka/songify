<script setup lang="ts">
    import { Search } from '@/components/shared/search-bar'
    import { SectionHeader } from '@/components/shared/section-header'
    import { PlaylistsList } from '@/components/pages/playlists/playlists-list'
    import { PlaylistsCreate } from '@/components/pages/playlists/playlists-create'
</script>

<template>
    <Search placeholder="Find playlist" type="playlists" toggler-class-names="hidden lg:block" />
    <SectionHeader title="My Playlists" sectionContentClass="lg:pl-[22px]">
        <PlaylistsCreate />
        <PlaylistsList />
    </SectionHeader>
</template>

<script setup lang="ts">
    import { Search } from '@/components/shared/search-bar'
    import { SectionHeader } from '@/components/shared/section-header'
    import { FavoritesList } from '@/components/pages/favorites/favorites-list'
</script>

<template>
    <Search placeholder="Search Favorites" type="favorites" />
    <SectionHeader title="Favorites">
        <FavoritesList />
    </SectionHeader>
</template>

<script setup lang="ts">
    import { Search } from '@/components/shared/search-bar'
    import { SectionHeader } from '@/components/shared/section-header'
    import { FavoritesList } from '@/components/pages/favorites/favorites-list'
</script>

<template>
    <Search placeholder="Search Favorites" type="favorites" toggler-class-names="hidden lg:block" />
    <SectionHeader title="Favorites" sectionContentClass="lg:pl-[41px]">
        <FavoritesList />
    </SectionHeader>
</template>

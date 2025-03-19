<script setup lang="ts">
    import { FavoritesListItem } from '@/components/pages/favorites/favorites-list-item'
    import { useUserDataStore } from '@/stores/user-data'

    const userDataStore = useUserDataStore()
</script>

<template>
    <div class="flex max-w-[870px] flex-col gap-[18px] pr-[26px] lg:pr-[40px]">
        <FavoritesListItem
            v-for="favorite in userDataStore.favoriteSongs"
            :key="favorite.id"
            :favorite="favorite"
        />
    </div>
</template>

<script setup lang="ts">
    import { FavoritesListItem } from '@/components/pages/favorites/favorites-list-item'

    import { useFavoritesStore } from '@/stores/use-favorites'

    const favoritesStore = useFavoritesStore()
</script>

<template>
    <TransitionGroup
        name="fade"
        tag="div"
        class="relative flex max-w-[870px] flex-col gap-[18px] pr-[26px] lg:pr-[40px]"
    >
        <FavoritesListItem
            v-for="favorite in favoritesStore.filteredFavorites"
            :key="favorite.id"
            :favorite="favorite"
        />
    </TransitionGroup>
</template>

<style scoped>
    .fade-move,
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .fade-leave-from {
        opacity: 0;
    }

    .fade-leave-active {
        position: absolute;
        opacity: 0;
        width: 100%;
    }

    .fade-move {
    }
</style>

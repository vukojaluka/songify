<script setup lang="ts">
    import { RouterView } from 'vue-router'
    import SideMenu from '@/components/layout/SideMenu.vue'
</script>

<template>
    <div class="grid min-h-screen grid-cols-1 lg:grid-cols-[var(--sidebar-width)_1fr]">
        <aside
            class="fixed bottom-0 left-0 h-auto w-full bg-sidebar-background lg:relative lg:h-full lg:py-[68px]"
        >
            <SideMenu />
        </aside>
        <main class="pb-[var(--sidebar-mobile-height)] lg:pb-0">
            <RouterView />
        </main>
    </div>
</template>

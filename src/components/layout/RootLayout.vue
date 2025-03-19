<script setup lang="ts">
    import { RouterView } from 'vue-router'
    import SideMenu from '@/components/layout/SideMenu.vue'
</script>

<template>
    <div
        class="mx-auto grid min-h-screen max-w-[1200px] grid-cols-1 overflow-hidden rounded-[43px] lg:grid-cols-[var(--sidebar-width)_1fr]"
    >
        <aside
            class="fixed bottom-0 left-0 z-50 h-auto w-full rounded-bl-[43px] rounded-br-[43px] bg-sidebar-background lg:relative lg:h-full lg:rounded-bl-none lg:rounded-br-none lg:py-[68px]"
        >
            <SideMenu />
        </aside>
        <main
            class="overflow-x-hidden bg-background pb-[var(--sidebar-mobile-height)] pl-[20px] pt-[23px] text-foreground lg:pb-[35px] lg:pl-[22px] lg:pt-[27px]"
        >
            <RouterView />
        </main>
    </div>
</template>

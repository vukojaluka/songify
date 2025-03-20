<script setup lang="ts">
    import { RouterLink } from 'vue-router'
    import { navigationLinks } from '@/lib/constants'
    import { useRoute } from 'vue-router'

    const route = useRoute()

    const isActive = (name: string) => {
        if (route.meta.parentRouteName === name) {
            return true
        }
        return route.name === name
    }
</script>

<template>
    <nav class="flex justify-around gap-[15px] px-5 pb-[10px] lg:flex-col lg:px-0">
        <RouterLink
            v-for="link in navigationLinks"
            :key="link.name"
            :to="link.path"
            class="flex h-[60px] flex-col items-center gap-[17px] text-foreground transition-colors ease-out lg:h-auto lg:flex-row lg:justify-start lg:gap-[23px] lg:py-[15px] lg:pl-[45px] [&:not(.router-link-active)]:dark:text-foreground/60 lg:[&:not(.router-link-active)]:hover:bg-secondary/25 [&:not(.router-link-active)]:lg:dark:text-foreground lg:[&:not(.router-link-active)]:dark:hover:bg-background/75"
            :class="{
                'router-link-active': isActive(link.name),
            }"
        >
            <span
                :key="link.path"
                class="block h-[4px] w-[37px] origin-center scale-x-0 rounded-bl-[4px] rounded-br-[4px] bg-transparent duration-200 lg:hidden [.router-link-active_&]:bg-accent-foreground"
                aria-hidden="true"
                :class="{
                    'scale-x-100': isActive(link.name),
                    'scale-x-0': !isActive(link.name),
                }"
            />
            <component :is="link.icon" />
            <span class="sr-only font-bold lg:not-sr-only">
                {{ link.label }}
            </span>
        </RouterLink>
    </nav>
</template>

<script setup lang="ts">
    import { useAttrs } from 'vue'

    const attrs = useAttrs()
</script>

<template>
    <div
        class="flex size-[44px] items-center justify-center rounded-full bg-secondary/25 dark:bg-accent-foreground/25"
        v-bind="attrs"
    >
        <slot />
    </div>
</template>

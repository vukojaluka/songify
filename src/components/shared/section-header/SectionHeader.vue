<script setup lang="ts">
    import { cn } from '@/lib/utils'
    const {
        title,
        class: className,
        sectionContentClass: sectionContentClassName,
    } = defineProps<{
        title: string
        class?: string
        sectionContentClass?: string
    }>()
</script>

<template>
    <section :class="cn('flex flex-col gap-[16px] pt-[9px] lg:gap-[22px] lg:pt-[5px]', className)">
        <h2 class="py-[12px] pl-[14px] text-xl font-bold leading-[100%] lg:pl-[22px]">
            {{ title }}
        </h2>
        <div :class="cn('lg:pl-[58px]', sectionContentClassName)">
            <slot />
        </div>
    </section>
</template>

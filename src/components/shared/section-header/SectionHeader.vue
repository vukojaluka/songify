<script setup lang="ts">
    const { title, class: className } = defineProps<{
        title: string
        class?: string
    }>()
</script>

<template>
    <section :class="['flex flex-col gap-[22px] pt-[9px] lg:pt-[5px]', className]">
        <h2 class="py-[12px] pl-[14px] text-xl font-bold leading-[100%] lg:pl-[22px]">
            {{ title }}
        </h2>
        <div class="lg:pl-[58px]">
            <slot />
        </div>
    </section>
</template>

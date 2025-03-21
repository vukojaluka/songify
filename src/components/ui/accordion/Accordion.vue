<script setup lang="ts">
    import { ref } from 'vue'
    import IconArrowRight from '@/components/icons/IconArrowRight.vue'
    import { cn } from '@/lib/utils'

    const props = defineProps<{
        titleClassNames?: string
    }>()

    const isOpen = ref(false)
</script>

<template>
    <div class="flex w-full max-w-full flex-col lg:max-w-[870px]">
        <button
            type="button"
            :class="
                cn(
                    'flex items-center justify-between py-[15px] pr-[22px] lg:pl-[50px] lg:pr-[42px]',
                    props.titleClassNames,
                )
            "
            @click="isOpen = !isOpen"
        >
            <slot name="title"></slot>
            <IconArrowRight
                :class="{
                    'rotate-90 transition-transform duration-200 ease-out': isOpen,
                    'rotate-0 transition-transform duration-200 ease-out': !isOpen,
                }"
            />
        </button>
        <transition name="accordion">
            <div v-show="isOpen">
                <TransitionGroup
                    name="fade"
                    tag="div"
                    class="relative flex flex-col gap-[18px] pr-[27px] lg:mt-[24px] lg:pl-[19px] lg:pr-[42px]"
                >
                    <slot name="content"></slot>
                </TransitionGroup>
            </div>
        </transition>
    </div>
</template>

<style scoped>
    .accordion-enter-from {
        @apply -translate-y-[45px] opacity-25 lg:-translate-y-[69px];
    }
    .accordion-enter-to {
        @apply translate-y-0 opacity-100;
    }
    .accordion-enter-active {
        @apply transition-all duration-200 ease-out;
    }

    .accordion-leave-from {
        @apply translate-y-0 opacity-100;
    }
    .accordion-leave-to {
        @apply -translate-y-[45px] opacity-0 lg:-translate-y-[69px];
    }
    .accordion-leave-active {
        @apply transition-all duration-200 ease-out;
    }
</style>

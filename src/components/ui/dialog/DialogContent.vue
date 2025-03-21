<script setup lang="ts">
    import { cn } from '@/lib/utils'
    import {
        DialogClose,
        DialogContent,
        type DialogContentEmits,
        type DialogContentProps,
        DialogOverlay,
        DialogPortal,
        useForwardPropsEmits,
    } from 'reka-ui'
    import { computed, type HTMLAttributes } from 'vue'
    import IconClose from '@/components/icons/IconClose.vue'
    const props = defineProps<
        DialogContentProps & { class?: HTMLAttributes['class']; animationEnabled?: boolean }
    >()
    const emits = defineEmits<DialogContentEmits>()

    const delegatedProps = computed(() => {
        const { class: _, ...delegated } = props

        return delegated
    })

    const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
    <DialogPortal>
        <DialogOverlay
            class="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
            :class="!props.animationEnabled && '!duration-0'"
        />
        <DialogContent
            v-bind="forwarded"
            :class="
                cn(
                    'fixed bottom-0 left-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 bg-background px-[20px] py-[37px] shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] dark:bg-black lg:bottom-[unset] lg:top-1/2 lg:-translate-y-1/2 lg:rounded-[24px] lg:px-[35px]',
                    props.class,
                    !props.animationEnabled && '!duration-0',
                )
            "
        >
            <slot />

            <DialogClose
                class="fixed right-[35px] top-[37px] translate-y-[2px] transition-opacity focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-offset-1 disabled:pointer-events-none data-[state=open]:bg-placeholder data-[state=open]:text-muted-foreground"
            >
                <IconClose />
                <span class="sr-only">Close</span>
            </DialogClose>
        </DialogContent>
    </DialogPortal>
</template>

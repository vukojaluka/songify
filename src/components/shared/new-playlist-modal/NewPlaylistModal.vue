<script setup lang="ts">
    import { ref, watch } from 'vue'
    import {
        Dialog,
        DialogContent,
        DialogFooter,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
    } from '@/components/ui/dialog'
    import { Button } from '@/components/ui/button'
    import { Input } from '@/components/ui/input'
    import IconArrowRight from '@/components/icons/IconArrowRight.vue'

    import { usePlaylistsStore } from '@/stores/use-playlists'

    const props = withDefaults(
        defineProps<{
            isTriggerButtonVisible?: boolean
            isOpen?: boolean
            isNested?: boolean
            state?: 'default' | 'back'
        }>(),
        {
            isTriggerButtonVisible: true,
            isOpen: false,
            isNested: false,
            state: 'default',
        },
    )

    const emit = defineEmits<{
        (e: 'close'): void
        (e: 'back'): void
    }>()

    const playlistsStore = usePlaylistsStore()

    const dialogOpen = ref(props.isOpen)

    watch(
        () => props.isOpen,
        (newValue) => {
            dialogOpen.value = newValue
        },
    )

    const playlistName = ref('')
    const playlistNameError = ref('')

    function resetForm() {
        playlistName.value = ''
        playlistNameError.value = ''
    }

    function handleCreatePlaylist() {
        if (playlistName.value.length === 0) {
            playlistNameError.value = 'Playlist name is required.'
            return
        }

        playlistsStore.createPlaylist(playlistName.value)

        if (props.state === 'default') {
            handleDialogClose()
        } else {
            handleBack()
        }
    }

    function handleDialogClose() {
        resetForm()
        emit('close')
    }
    function handleBack() {
        resetForm()
        emit('back')
    }
</script>

<template>
    <Dialog v-model:open="dialogOpen" @update:open="(open) => !open && handleDialogClose()">
        <DialogTrigger as-child v-if="props.isTriggerButtonVisible">
            <Button>Create new Playlist</Button>
        </DialogTrigger>
        <DialogContent :animation-enabled="props.isNested">
            <DialogHeader class="flex flex-row items-center gap-[52px]">
                <IconArrowRight
                    v-if="props.isNested"
                    class="rotate-180 cursor-pointer"
                    @click="handleBack"
                />
                <DialogTitle class="text-xl font-bold leading-[100%]">New Playlist</DialogTitle>
            </DialogHeader>

            <div
                class="my-[50px] flex flex-col items-center gap-y-[30px] px-[16px] lg:gap-y-[50px]"
            >
                <form
                    class="flex w-full flex-col gap-y-[10px]"
                    @submit.prevent="handleCreatePlaylist"
                >
                    <Input
                        v-model="playlistName"
                        placeholder="Playlist name"
                        class="h-[50px] w-full rounded-[20px] border-accent-foreground px-[25px] py-[16px] shadow-input placeholder:text-placeholder focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <span v-if="playlistNameError" class="block pl-2 text-sm text-destructive">{{
                        playlistNameError
                    }}</span>
                </form>
                <DialogFooter>
                    <Button @click="handleCreatePlaylist">New Playlist</Button>
                </DialogFooter>
            </div>
        </DialogContent>
    </Dialog>
</template>

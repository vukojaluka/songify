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

    import { usePlaylistsStore } from '@/stores/use-playlists'

    const props = withDefaults(
        defineProps<{
            isTriggerButtonVisible?: boolean
            isOpen?: boolean
        }>(),
        {
            isTriggerButtonVisible: true,
            isOpen: false,
        },
    )

    const emit = defineEmits<{
        (e: 'close'): void
    }>()

    const playlistsStore = usePlaylistsStore()

    const dialogOpen = ref(props.isOpen)

    // Watch for changes in props.isOpen to sync with internal state
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
        resetForm()
        dialogOpen.value = false
        emit('close')
    }

    function handleDialogClose() {
        resetForm()
        emit('close')
    }
</script>

<template>
    <Dialog v-model:open="dialogOpen" @update:open="(open) => !open && handleDialogClose()">
        <DialogTrigger as-child v-if="props.isTriggerButtonVisible">
            <Button>Create new Playlist</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
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
                    <Button type="submit">New Playlist</Button>
                </DialogFooter>
            </div>
        </DialogContent>
    </Dialog>
</template>

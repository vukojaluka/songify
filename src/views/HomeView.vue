<script setup lang="ts">
    import {
        Dialog,
        DialogContent,
        DialogDescription,
        DialogFooter,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
    } from '@/components/ui/dialog'
    import { Button } from '@/components/ui/button'
    import { Input } from '@/components/ui/input'
</script>

<template>
    <Dialog>
        <DialogTrigger> Edit Profile </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                    <Input />
                </DialogDescription>
            </DialogHeader>

            <DialogFooter>
                <Button> Save changes </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

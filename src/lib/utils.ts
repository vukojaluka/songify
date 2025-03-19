import type { Updater } from '@tanstack/vue-table'
import type { Ref } from 'vue'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
    ref.value = typeof updaterOrValue === 'function' ? updaterOrValue(ref.value) : updaterOrValue
}

export function getDataFromLocalStorage<T>(key: string, defaultValue?: T) {
    const data = localStorage.getItem(key)

    try {
        return data ? (JSON.parse(data) as T) : (defaultValue ?? null)
    } catch (error) {
        console.error('[ERROR]: Failed to get data from local storage', error)
        return defaultValue ?? null
    }
}

export function setDataToLocalStorage<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function timeAgo(dateString: string) {
    const now = new Date()
    const addedDate = new Date(dateString)
    const diffInSeconds = Math.floor((now.getTime() - addedDate.getTime()) / 1000)
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInMinutes < 1) {
        return 'just now'
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} min ago`
    } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    } else {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
    }
}

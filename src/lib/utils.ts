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

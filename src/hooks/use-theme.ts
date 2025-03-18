import { ref, watchEffect } from 'vue'

export function useTheme() {
    const isDark = ref(
        localStorage.getItem('theme') === 'dark' ||
            (!localStorage.getItem('theme') &&
                window.matchMedia('(prefers-color-scheme: dark)').matches),
    )

    const toggleTheme = () => {
        isDark.value = !isDark.value
        localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    }

    watchEffect(() => {
        document.documentElement.classList.toggle('dark', isDark.value)
    })

    return { isDark, toggleTheme }
}

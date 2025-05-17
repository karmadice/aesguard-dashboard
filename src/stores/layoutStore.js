import { ref, reactive, watch, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useDark, useToggle } from '@vueuse/core'

export const useLayoutStore = defineStore('layout', () => {
    const isDarkMode = ref(useDark())
    const isDark = ref(useDark())

    const theme = reactive({
        isDark
    })

    const toggleDarkModeFunction = useToggle(isDarkMode)

    const toggleDark = () => {
        toggleDarkModeFunction()
        isDark.value = !isDark.value
    }

    return { theme, toggleDark }
})
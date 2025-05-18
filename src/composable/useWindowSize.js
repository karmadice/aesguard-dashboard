import { onMounted, ref, onBeforeUnmount } from "vue"

const useWindowSize = () => {
    const windowSize = ref(window.innerWidth)

    const handleResize = () => {
        const width = window.innerWidth
        windowSize.value = width
    }

    onMounted(() => {
        // Initial setup
        handleResize()

        // Add event listener for window resize
        window.addEventListener("resize", handleResize)

        // Cleanup event listener on component unmount
        onBeforeUnmount(() => {
            window.removeEventListener("resize", handleResize)
        })
    })

    return {
        windowSize
    }
}

export default useWindowSize
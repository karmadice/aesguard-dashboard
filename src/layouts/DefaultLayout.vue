<template>
    <div>
        <NavbarTop
        :is-sidebar-open="isSidebarOpen"
        :toggle-sidebar="toggleSidebar"
        >

        </NavbarTop>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import NavbarTop from '@/components/shared/NavbarTop.vue'
defineProps({
    isSidebarOpen: {
        type: Boolean,
        default: false
    },
    toggleSidebar: {
        type: Function,
        default: () => {}
    }
})

</script>
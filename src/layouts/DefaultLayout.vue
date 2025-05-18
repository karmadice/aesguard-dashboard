
<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import NavbarTop from '@/components/shared/NavbarTop.vue'
import LeftSideBar from '@/components/sidebar/LeftSideBar.vue'
defineProps({
    isSidebarOpen: {
        type: Boolean,
        default: false
    },
    toggleSidebar: {
        type: Function,
        default: () => {}
    },
    setSidebar: {
        type: Function,
        default: () => {}
    }
    
})

</script>
<template>
    <div>
        <NavbarTop
        :is-sidebar-open="isSidebarOpen"
        :toggle-sidebar="toggleSidebar"
        >

        </NavbarTop>
        <LeftSideBar
        :is-sidebar-open="isSidebarOpen"
        :toggle-sidebar="toggleSidebar"
        :set-sidebar="setSidebar"
        ></LeftSideBar>
    </div>
</template>
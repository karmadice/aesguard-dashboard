<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import NavbarTop from "@/components/shared/NavbarTop.vue";
import LeftSideBar from "@/components/sidebar/LeftSideBar.vue";

const isSidebarOpen = ref(true);
const setSidebar = (value) => {
  isSidebarOpen.value = value;
};

const toggleSidebar = () => {
  setSidebar(!isSidebarOpen.value);
};
</script>
<template>
  <div>
    <NavbarTop :isSidebarOpen="isSidebarOpen" :toggleSidebar="toggleSidebar" />
    <LeftSideBar
      :is-sidebar-open="isSidebarOpen"
      :toggleSidebar="toggleSidebar"
      :set-sidebar="setSidebar"
    ></LeftSideBar>
  </div>
</template>

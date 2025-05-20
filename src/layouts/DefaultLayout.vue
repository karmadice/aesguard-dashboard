<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import NavbarTop from "@/components/shared/NavbarTop.vue";
import LeftSideBar from "@/components/sidebar/LeftSideBar.vue";

//Sidebar state
const isSidebarOpen = ref(true);

// Methods to control sidebar
const setSidebar = (value) => {
  isSidebarOpen.value = value;
};

const toggleSidebar = () => {
  setSidebar(!isSidebarOpen.value);
};
</script>
<template>
  <div class="flex bg-[#f6f8fb] min-h-screen">
    <!-- Topbar -->
      <NavbarTop
        :isSidebarOpen="isSidebarOpen"
        :toggleSidebar="toggleSidebar"
      />
    
    <!-- Sidebar -->
    <LeftSideBar
      :is-sidebar-open="isSidebarOpen"
      :toggleSidebar="toggleSidebar"
      class="fixed top-0 left-0 h-full z-30"
    />

    <!-- Main Content -->
    <div
      :class="[
        'flex flex-col flex-1 min-h-screen transition-all duration-300',
        isSidebarOpen ? 'ml-[280px]' : 'ml-0'
      ]"
    >

      <!-- Spacer for Topbar -->
      <div class="h-[72px]"></div>

      <!-- Content Container -->
      <main class="p-6 md:p-8 lg:p-10 space-y-6">
        <div class="bg-white rounded-2xl shadow-sm p-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

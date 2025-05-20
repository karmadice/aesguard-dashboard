<script setup>
import { ref } from "vue";
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
  <div class="relative min-h-screen bg-muted/40 text-muted-foreground flex">
    <!-- Sidebar -->
    <LeftSideBar
      :is-sidebar-open="isSidebarOpen"
      :toggle-sidebar="toggleSidebar"
      :set-sidebar="setSidebar"
    />

    <!-- Main content area -->
    <div class="flex-1 flex flex-col">
      <!-- Top Navbar -->
      <NavbarTop
        :isSidebarOpen="isSidebarOpen"
        :toggleSidebar="toggleSidebar"
      />

      <!-- Page content below navbar -->
      <main
        class="pt-[64px] md:pt-[72px] lg:pt-[88px] transition-all duration-300"
        :class="{
          'ml-[280px] xxxl:ml-[336px]': isSidebarOpen
        }"
      >
        <div class="px-4 md:px-6 xl:px-10 py-6 max-w-[1700px] mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

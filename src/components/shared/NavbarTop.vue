<template>
  <nav
    class="px-4 xxl:px-6 py-2 xl:py-3 shadow-sm duration-300 dark:border-b dark:border-n700 navbar-top z-20 xxl:py-3.5 gap-3 bg-n0 dark:bg-bg4 fixed flex justify-between items-center"
    :class="{
  'w-full xxxl:w-[calc(100%-336px)] xxl:w-[calc(100%-280px)] ltr:xxxl:ml-[336px] ltr:xxl:ml-[280px] rtl:xxxl:mr-[336px] rtl:xxl:mr-[280px]': isSidebarOpen,
  'w-full': !isSidebarOpen
}"


  >
    <div class="flex grow md:gap-4 xxl:gap-6 items-center">
      <button @click="toggleSidebar">
        <IconMenu2 />
      </button>
      <form class="bg-primary/5 dark:bg-bg3 hidden md:flex gap-3 rounded-[30px] border border-transparent focus-within:border-primary px-6 xxl:px-8 items-center justify-between max-w-[493px] w-full">
        <input type="text" placeholder="Search" class="bg-transparent py-2 md:py-2.5 xxl:py-3 focus:outline-none w-full" />
        <button>
          <IconSearch :size="20" />
        </button>
      </form>
    </div>
    <div class="flex items-center gap-3 sm:gap-4 xxl:gap-6">
      <ModeSwitcher/>
      <NotificationDropdown/>
    </div>
  </nav>
</template>

<script setup>
import { IconMenu2, IconSearch } from '@tabler/icons-vue'
import ModeSwitcher from '@/components/topbar/ModeSwitcher.vue'
import NotificationDropdown from '@/components/topbar/NotificationDropdown.vue'
defineProps({
  isSidebarOpen: Boolean,
  toggleSidebar: Function,
});
</script>

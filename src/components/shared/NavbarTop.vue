<script setup>
import { IconMenu2, IconSearch } from "@tabler/icons-vue";
import ModeSwitcher from "@/components/topbar/ModeSwitcher.vue";
import NotificationDropdown from "@/components/topbar/NotificationDropdown.vue";
import SwitchLanguage from "@/components/topbar/SwitchLanguage.vue";
import ProfileDropDown from "@/components/topbar/ProfileDropDown.vue";
const props = defineProps({
  isSidebarOpen: Boolean,
  toggleSidebar: Function,
});
</script>

<template>
  <nav
    class="fixed top-0 right-0 z-20 flex items-center justify-between gap-3 px-4 xxl:px-6 py-2 xl:py-3 xxl:py-3.5 shadow-sm duration-300 bg-[rgb(var(--color-primary))] text-[rgb(var(--color-text))] dark:border-b dark:border-[rgb(var(--color-neutral))]"
    :class="{
      'w-full': !isSidebarOpen,
      'w-[calc(100%-280px)] xxxl:w-[calc(100%-336px)]': isSidebarOpen,
    }"
  >
    <div class="flex grow md:gap-4 xxl:gap-6 items-center">
      <button @click="props.toggleSidebar">
        <IconMenu2 />
      </button>
      <form
        class="bg-primary/5 dark:bg-bg3 hidden md:flex gap-3 rounded-[30px] border border-transparent focus-within:border-primary px-6 xxl:px-8 items-center justify-between max-w-[493px] w-full"
      >
        <input
          type="text"
          placeholder="Search"
          class="bg-transparent py-2 md:py-2.5 xxl:py-3 focus:outline-none w-full"
        />
        <button>
          <IconSearch :size="20" />
        </button>
      </form>
    </div>
    <div class="flex items-center gap-3 sm:gap-4 xxl:gap-6">
      <ModeSwitcher />
      <NotificationDropdown />
      <SwitchLanguage />
      <ProfileDropDown />
    </div>
  </nav>
</template>

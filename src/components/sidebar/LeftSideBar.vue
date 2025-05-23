<script setup>
import { onMounted, ref, watch, nextTick } from "vue";
import AnimateHeight from "vue-animate-height";
import { useLayoutStore } from "@/composable/stores/layoutStore";
import { useSidebar } from "@/composable/useSidebar";
import useWindowSize from "@/composable/useWindowSize";
import { RouterLink, useRouter } from "vue-router";
import { IconChevronRight, IconX, IconLogout } from "@tabler/icons-vue";

const activeMenu = ref("");
const pathName = ref("");
const { theme } = useLayoutStore();
const { sidebarGroups } = useSidebar();
const props = defineProps({
  isSidebarOpen: {
    type: Boolean,
    default: true,
  },
  setSidebar: {
    type: Function,
    default: () => {},
  },
});

const router = useRouter();

const sidebarRef = ref(null);

const focusableElements = ref([]);

let focusIndex = 0;

const updatePathName = () => {
  pathName.value = router.currentRoute.value.fullPath;
};

const setActiveMenu = (name) => {
  activeMenu.value = activeMenu.value === name ? "" : name;
  nextTick(() => updateFocusableElements());
};

const isActive = (submenues = []) => {
  return submenues.some(({ path }) => pathName.value === path);
};

const updateActiveMenu = async () => {
  await router.isReady();
  for (const group of sidebarGroups.value) {
    for (const item of group.items) {
      if (
        item.children?.some(
          (child) => child.path === router.currentRoute.value.path
        )
      ) {
        activeMenu.value = item.meta?.title || "";
        return;
      }
    }
  }
};

const { windowSize } = useWindowSize();

const handleRouteClick = () => {
  if (windowSize.value < 1400) {
    props.setSidebar(false);
  }
};

const updateFocusableElements = () => {
  focusableElements.value =
    sidebarRef.value?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1" ])'
    ) || [];
  focusIndex = 0;
};

const handleKeyDown = (event) => {
  if (!props.isSidebarOpen) return;
  switch (event.key) {
    case "ArrowDown":
      focusIndex = (focusIndex + 1) % focusableElements.value.length;
      focusableElements.value[focusIndex]?.focus();
      event.preventDefault();
      break;
    case "ArrowUp":
      focusIndex =
        (focusIndex - 1 + focusableElements.value.length) %
        focusableElements.value.length;
      focusableElements.value[focusIndex]?.focus();
      event.preventDefault();
      break;
    case "Escape":
      props.setSidebar(false);
      break;
    case "Tab":
      if (event.shiftKey) {
        focusIndex =
          (focusIndex - 1 + focusableElements.value.length) %
          focusableElements.value.length;
      } else {
        focusIndex = (focusIndex + 1) % focusableElements.value.length;
      }
      focusableElements.value[focusIndex]?.focus();
      event.preventDefault();
      break;
    default:
      break;
  }
};

onMounted(() => {
  updatePathName();
  router.afterEach(updatePathName);
  updateActiveMenu();
  updateFocusableElements();
  window.addEventListener("resize", updateFocusableElements);
  window.addEventListener("keydown", handleKeyDown);
});

watch(() => router.currentRoute.value.path, updateActiveMenu);
</script>

<template>
  <div>
    <div
      @click="setSidebar(false)"
      class="duration-500"
      :class="{
        'hidden fixed inset-0 bg-neutral-800/10': isSidebarOpen,
      }"
    ></div>
    <aside
      ref="sidebarRef"
      class="w-[280px] h-screen top-0 left-0 xxxl:w-[336px] shadow-sm z-[21] min-h-screen duration-300 fixed bg-gray-100 dark:bg-gray-900"
      :class="{
        'translate-x-0 visible': isSidebarOpen,
        '-translate-x-full invisible': !isSidebarOpen,
      }"
      role="navigation"
      aria-label="Sidebar Navigation"
    >
      <div class="p-4 xxl:px-6 xxxl:px-[30px] xxl:py-5">
        <div class="flex justify-between items-center">
          <RouterLink to="/">
            <img
              :width="174"
              :height="38"
              src="/images/logo-with-text.png"
              alt="Logo"
            />
          </RouterLink>
        </div>
      </div>
      <div class="overflow-y-auto fixed right-0 left-0 h-full">
        <div class="px-4 xxl:px-6 xxxl:px-8 pb-3">
          <div v-for="group in sidebarGroups" :key="group.title">
            <p
              class="text-xs font-semibold py-4 xl:py-5 border-t-2 border-dashed border-neutral/20"
            >
              {{ group.title }}
            </p>
            <ul class="mb-5 flex flex-col gap-2" role="menu">
              <li
                v-for="menu in group.items"
                :key="menu.name"
                class="relative rounded-xl duration-300 dark:text-white"
                :class="{
                  'bg-neutral/5 dark:bg-neutral-700':
                    activeMenu === menu.meta?.title,
                }"
                :aria-expanded="activeMenu === menu.meta?.title"
              >
                <button
                  @click="setActiveMenu(menu.meta?.title)"
                  class="px-4 w-full group flex justify-between items-center xxxl:px-5 py-2.5 xxl:py-3.5 rounded-lg hover:bg-primary hover:text-n0 duration-300"
                  :class="{
                    'bg-primary text-n0':
                      isActive(menu.children) ||
                      activeMenu === menu.meta?.title,
                  }"
                  :title="menu.meta?.title"
                  :aria-label="menu.meta?.title"
                >
                  <span class="flex items-center gap-2">
                    <span
                      class="text-primary group-hover:text-n0"
                      :class="{
                        '!text-n0':
                          isActive(menu.children) ||
                          activeMenu === menu.meta?.title,
                      }"
                    >
                      <component :is="menu.meta?.icon" :size="20" />
                    </span>
                    <span class="text-sm">{{ menu.meta?.title }}</span>
                  </span>
                  <IconChevronRight
                    :size="18"
                    class="duration-300 transition-transform"
                    :class="{ 'rotate-90': activeMenu === menu.meta?.title }"
                  />
                </button>
                <AnimateHeight
                  :height="activeMenu === menu.meta?.title ? 'auto' : 0"
                  :duration="500"
                  :id="menu.meta?.title"
                >
                  <ul class="px-2 xl:px-3 py-2">
                    <li
                      @click="handleRouteClick"
                      v-for="submenu in menu.children"
                      :key="submenu.meta?.title"
                    >
                      <RouterLink
                        class="block py-1.5 xl:py-2 text-sm duration-300 capitalize px-3 xxl:px-4"
                        :to="submenu.path"
                        :class="{
                          'text-primary font-semibold':
                            pathName === submenu.path,
                          'hover:text-primary': pathName !== submenu.path,
                        }"
                        :title="submenu.meta?.title"
                        :aria-label="submenu.meta?.title"
                      >
                        <span class="pr-2">•</span>
                        <span class="whitespace-nowrap text-sm">{{
                          submenu.meta?.title
                        }}</span>
                      </RouterLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>
            </ul>
          </div>
        </div>
        <div class="px-4 xxl:px-6 xxxl:px-8 pb-28">
          <RouterLink
            to="/login-1"
            class="px-4 w-full group flex justify-between items-center xxxl:px-6 py-2.5 lg:py-3 rounded-2xl hover:bg-primary hover:text-n0 duration-300"
            aria-label="Log out"
          >
            <span class="flex items-center gap-2">
              <span class="text-primary group-hover:text-n0">
                <IconLogout class="w-5 h-5 lg:w-6 lg:h-6" />
              </span>
              <span class="text-sm">Log Out</span>
            </span>
          </RouterLink>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  color: rgb(var(--primary-color));
}
</style>
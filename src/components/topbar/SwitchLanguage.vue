<script setup>
import { IconChevronDown, IconWorld } from '@tabler/icons-vue'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'


const isOpen = ref(false)
const languages = ['English', 'Arabic', 'Bangla', 'Spanish']
const selected = ref(languages[0])
const target = ref(null)

onClickOutside(target, () => {
  isOpen.value = false
})
</script>

<template>
  <div ref="target" class="relative inline-block text-left">
    <button
      @click="isOpen = !isOpen"
      class="inline-flex items-center gap-1 px-4 py-2 sm:py-2.5 rounded-full bg-primary/10 dark:bg-bg3 text-sm font-medium transition-colors hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-haspopup="true"
      :aria-expanded="isOpen.toString()"
    >
      <IconWorld :size="20" />
      <IconChevronDown :size="22" class="transition-transform duration-200" :class="{ 'rotate-180': isOpen }" />
    </button>

    <transition name="fade-scale">
      <div
        v-show="isOpen"
        class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-n0 dark:bg-bg4 border border-n40 dark:border-n500 shadow-lg focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <ul class="py-1 text-sm">
          <li
            v-for="lang in languages"
            :key="lang"
            @click="selected = lang; isOpen = false"
            class="block px-4 py-2 cursor-pointer rounded-md transition-all duration-200 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary"
            :class="{ 'bg-primary text-n0 hover:!text-n0': selected === lang }"
            role="menuitem"
          >
            {{ lang }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 200ms ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
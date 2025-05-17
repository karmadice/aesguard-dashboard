<script setup lang="jsx">
import { IconMessage } from '@tabler/icons-vue'
import { IconLifebuoy } from '@tabler/icons-vue'
import { IconLogout } from '@tabler/icons-vue'
import { IconSettings } from '@tabler/icons-vue'
import { IconUser } from '@tabler/icons-vue'

import { ref } from 'vue'

import { onClickOutside } from '@vueuse/core'
const isOpen = ref(false)
const target = ref(null)
const profileLinks = [
  {
    icon: IconUser,
    url: '/profile',
    title: 'My Profile'
  },
  {
    icon: IconMessage,
    url: '/dashboards/messaging',
    title: 'Meassages'
  },
  {
    icon: IconLifebuoy,
    url: '#',
    title: 'Help'
  },
  {
    icon: IconSettings,
    url: '/settings',
    title: 'Settings'
  },
  {
    icon: IconLogout,
    url: '/login-1',
    title: 'Logout'
  }
]

onClickOutside(target, () => (isOpen.value = false))
</script>

<template>
    <div class="relative" ref="target">
        <div @click="isOpen = !isOpen" class="cursor-pointer">
            <img src="/images/user.png" alt="profile img" :width="48" :height="48" class="rounded-full w-10 h-10 md:h-12" />
        </div>
        <div
        class="bg-light border dark:border-netural-500 origin-top-right dark:bg-netural-800 rounded-md right-0 shadow-lg absolute top-full duration-300 z-10"
        :class="{
            'opacity-100 scale-100 visible': isOpen,
            'opacity-0 scale-0 invisible': !isOpen,
        }"
        >
        <div class="flex flex-col text-center items-center lg:p-4 p-3 border-b dark:border-netural-500">
            <img src="/images/user.png" alt="profile img" :width="60" :height="60" class="rounded-full" />
            <h5 class="mt-2">John Doe</h5>
            <span class="text-sm">james@mail.com</span>
        </div>
        <ul class="flex flex-col w-[250px] p-2 md:p-4">
        <li v-for="item in profileLinks" :key="item.title">
          <RouterLink :to="item.url" class="flex items-center gap-2 p-2 rounded-md text-sm lg:text-base duration-300 hover:bg-primary/20 hover:text-text">
            <span>
              <component :size="20" :is="item.icon"></component>
            </span>
            {{ item.title }}
          </RouterLink>
        </li>
      </ul>
        </div>
    </div>
</template>

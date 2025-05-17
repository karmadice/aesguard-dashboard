<script setup lang="ts">
import { IconChevronDown, IconWorld } from '@tabler/icons-vue';

</script>

<template>
    <div class="relative" ref="target">
        <button @click="@isOpen = !isOpen" class="flex gap-1 p-2 sm:p-3 rounded-full bg-primary/5 dark:bg-bg3">
            <IconWorld :size="20" />
            <IconChevronDown :size="22" />
        </button>
    </div>
</template>
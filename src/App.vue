<script setup lang="ts">
import DefaultLayout from './layouts/DefaultLayout.vue';
import { ref } from 'vue';
</script>

<template>
  <component :is="DefaultLayout">
    <RouterView />
  </component>
</template>
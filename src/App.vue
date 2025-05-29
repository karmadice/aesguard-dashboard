<script setup>
import DefaultLayout from "./layouts/DefaultLayout.vue";
</script>

<template>
  <component :is="DefaultLayout">
    <RouterView />
  </component>
</template>

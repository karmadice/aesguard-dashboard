<script setup>
import BaseFileInput from "@/components/base/BaseFileInput.vue";
import { ref } from "vue";

const uploadedFiles = ref([]);
</script>

<template>
  <BaseFileInput
    v-model="uploadedFiles"
    :accept="'.pdf,.csv,application/vnd.ms-excel'"
    :multiple="true"
    :max-size-mb="5"
    :max-files="5"
  />
</template>

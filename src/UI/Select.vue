<script setup>
import BaseSelect from '@/components/base/BaseSelect.vue'
import { ref } from 'vue'

const country = ref('')
const countries = [
  { label: 'United States', value: 'us' },
  { label: 'India', value: 'in' },
  { label: 'Germany', value: 'de' },
]
</script>

<template>
  <BaseSelect v-model="country" :options="countries" label="Country" />
</template>
<script setup>
import BaseSelect from '@/components/base/BaseSelect.vue'
import { ref } from 'vue'

const country = ref('')
const selectedValues = ref([])
const countries = [
  { label: 'United States', value: 'us' },
  { label: 'India', value: 'in' },
  { label: 'Germany', value: 'de' },
]
</script>

<template>
  <!-- Single select -->
  <BaseSelect v-model="country" :options="countries" label="Country" />

  <!-- Multi-select -->
  <BaseSelect
    v-model="selectedValues"
    :options="countries"
    label="Select Countries"
    :multiple="true"
    :searchable="true"
    :chips="true"
    :checkboxes="true"
  />
</template>

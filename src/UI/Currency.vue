<script setup>
import CurrencyInput from "@/components/base/CurrencyInput.vue";
import { ref } from "vue";

const balance = ref(0);
const selectedCurrency = ref("USD");
</script>

<template>
  <CurrencyInput
    v-model:amount="balance"
    v-model:currency="selectedCurrency"
    label="Account Balance"
    :appendDropdown="false"
  />
</template>

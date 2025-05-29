<script setup>
import { ref, computed, watch } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  modelValue: {
    type: Number,
    default: null,
  },
  currency: {
    type: String,
    default: "USD",
  },
  currencies: {
    type: Array,
    default: () => [
      { label: "$", value: "USD" },
      { label: "€", value: "EUR" },
      { label: "₹", value: "INR" },
      { label: "£", value: "GBP" },
    ],
  },
});

const emit = defineEmits(["update:modelValue", "update:currency"]);

const localValue = ref(props.modelValue);
const localCurrency = ref(props.currency);
const dropdownOpen = ref(false);

const currencySymbol = computed(() => {
  return props.currencies.find((c) => c.value === localCurrency.value)?.label || "";
});

// Emit changes
watch(localValue, (val) => emit("update:modelValue", parseFloat(val)));
watch(localCurrency, (val) => emit("update:currency", val));

const toggleDropdown = () => (dropdownOpen.value = !dropdownOpen.value);
const selectCurrency = (currency) => {
  localCurrency.value = currency.value;
  dropdownOpen.value = false;
};

// Close dropdown on outside click
const dropdownRef = ref(null);
onClickOutside(dropdownRef, () => (dropdownOpen.value = false));
</script>

<template>
  <div ref="dropdownRef" class="relative w-full max-w-md">
    <div
      class="flex items-center border rounded overflow-hidden focus-within:ring-2 ring-blue-500"
    >
      <!-- Currency Button -->
      <button
        type="button"
        class="px-3 py-2 bg-gray-100 text-sm border-r border-gray-300"
        @click="toggleDropdown"
      >
        {{ currencySymbol }}
      </button>

      <!-- Amount Input -->
      <input
        type="number"
        class="flex-1 px-3 py-2 text-sm outline-none"
        :value="localValue"
        @input="localValue = $event.target.value"
        placeholder="Enter amount"
      />
    </div>

    <!-- Dropdown -->
    <ul
      v-if="dropdownOpen"
      class="absolute left-0 mt-1 bg-white border rounded shadow w-32 z-50"
    >
      <li
        v-for="currency in currencies"
        :key="currency.value"
        class="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
        @click="selectCurrency(currency)"
      >
        {{ currency.label }} - {{ currency.value }}
      </li>
    </ul>
  </div>
</template>

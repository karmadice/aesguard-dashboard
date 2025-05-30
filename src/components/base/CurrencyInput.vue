<script setup>
import { ref, watch, onMounted } from "vue";
import BaseButton from "@/components/base/BaseButton.vue";

const props = defineProps({
  modelValue: [Number, String],
  currency: String,
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
const localCurrency = ref(props.currency || "USD");
const dropdownOpen = ref(false);
const dropdownRef = ref(null);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const selectCurrency = (currency) => {
  localCurrency.value = currency.value;
  emit("update:currency", currency.value);
  dropdownOpen.value = false;
};

watch(localValue, (val) => {
  emit("update:modelValue", val);
});

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener("click", (e) => {
    if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
      dropdownOpen.value = false;
    }
  });
});
</script>

<template>
  <div
    class="relative inline-flex items-center border rounded w-full max-w-sm overflow-visible"
  >
    <!-- Currency Selector Button -->
    <div ref="dropdownRef" class="relative">
      <BaseButton
        class="px-3 border-r bg-white dark:bg-gray-900 rounded-none text-sm font-medium whitespace-nowrap"
        variant="primary"
        @click="toggleDropdown"
      >
        {{ currencies.find((c) => c.value === localCurrency)?.label || localCurrency }}
      </BaseButton>

      <!-- Dropdown Menu -->
      <div
        v-if="dropdownOpen"
        class="absolute left-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-md z-50 w-32"
      >
        <ul>
          <li
            v-for="currency in currencies"
            :key="currency.value"
            class="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="selectCurrency(currency)"
          >
            {{ currency.label }} — {{ currency.value }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Input Field -->
    <input
      type="number"
      class="flex-1 px-3 py-2 outline-none dark:bg-gray-900 dark:text-white"
      v-model="localValue"
      placeholder="Enter amount"
    />
  </div>
</template>

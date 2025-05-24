<script setup>
import { ref, computed, watch, onMounted, nextTick} from "vue"

const props = defineProps({
  modelValue: {
    type: [String, Number, Object],
    default: null,
  },
  options: {
    type: Array,
    default: () => [],
  },
  optionLabel: {
    type: String,
    default: 'label',
  },
  optionValue: {
    type: String,
    default: 'value',
  },
  placeholder: {
    type: String,
    default: "Select an option",
  },
  disabled: {
    type: Boolean,
    id: String,
    default: false,
  },
  id: {
    type: String,
    default: '',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  searchable: {
    type: Boolean,
    default: false,
  },
  chips: {
    type: Boolean,
    default: false,
  },
  checkboxes: {
    type: Boolean,
    default: false,
  },
   label: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(["update:modelValue"])

const isOpen = ref(false)

const triggerRef = ref(null)
const optionsRef = ref(null)

const selectedLable = computed(() => {
    const selected = props.options.find(
        (opt) => (typeof props.modelValue === "object" ? opt[props.optionValue] === props.modelValue?.[props.optionValue]
    : opt[props.optionValue] === props.modelValue)
    )

    return selected?.[props.optionsLabel] || ''
})

const toggleDropdown = () => {
    if(!props.disabled) isOpen.value = !isOpen.value
}

const selectedOption = computed(() => {
  return (props.options || []).find(option => option[props.optionValue] === props.modelValue)
})
const closeDropdown = () => {
    isOpen.value = false
}

const handleClickOutside = (event) => {
    if(
        !triggerRef.value?.contains(event.target) && !dropdownRef.value?.contains(event.target)
    ) {
        closeDropdown()
    }
}

onMounted(() => {
    document.addEventListener("click", handleClickOutside)
})
</script>

<template>
  <div class="relative w-full">
    <label v-if="label" :for="id" class="block mb-1 text-sm font-medium">
      {{ label }}
    </label>

    <!-- Trigger -->
    <div
      ref="triggerRef"
      :id="id"
      tabindex="0"
      @click="toggleDropdown"
      class="w-full cursor-pointer px-4 py-2 border rounded bg-white dark:bg-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
    >
      {{ selectedLable || placeholder }}
    </div>

    <!-- Options -->
    <transition name="fade">
      <ul
        v-if="isOpen"
        ref="optionsRef"
        class="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow"
      >
        <li
  v-for="option in options"
  :key="option[optionValue]"
  @click="selectOption(option)"
  class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
>
  {{ option[optionLabel] }}
</li>
      </ul>
    </transition>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

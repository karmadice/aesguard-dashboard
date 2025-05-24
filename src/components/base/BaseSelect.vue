<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Object, Array],
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
    default: 'Select an option',
  },
  disabled: {
    type: Boolean,
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

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const searchQuery = ref('')
const triggerRef = ref(null)
const dropdownRef = ref(null)

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) return props.options
  return props.options.filter((opt) =>
    String(opt[props.optionLabel])
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  )
})

const selectedLabel = computed(() => {
  if (props.multiple) return ''
  const selected = props.options.find((opt) =>
    typeof props.modelValue === 'object'
      ? opt[props.optionValue] === props.modelValue?.[props.optionValue]
      : opt[props.optionValue] === props.modelValue
  )
  return selected?.[props.optionLabel] || ''
})

const selectedItems = computed(() => {
  if (!props.multiple || !Array.isArray(props.modelValue)) return []
  return props.options.filter((opt) =>
    props.modelValue.includes(opt[props.optionValue])
  )
})

const toggleDropdown = () => {
  if (!props.disabled) isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const handleClickOutside = (event) => {
  if (
    !triggerRef.value?.contains(event.target) &&
    !dropdownRef.value?.contains(event.target)
  ) {
    closeDropdown()
  }
}

const isSelected = (option) => {
  if (props.multiple) {
    return (
      Array.isArray(props.modelValue) &&
      props.modelValue.includes(option[props.optionValue])
    )
  } else {
    return props.modelValue === option[props.optionValue]
  }
}

const selectOption = (option) => {
  const value = option[props.optionValue]
  if (props.multiple) {
    const current = Array.isArray(props.modelValue)
      ? [...props.modelValue]
      : []
    const exists = current.includes(value)
    const updated = exists
      ? current.filter((v) => v !== value)
      : [...current, value]
    emit('update:modelValue', updated)
  } else {
    emit('update:modelValue', value)
    closeDropdown()
  }
}

const removeChip = (value) => {
  if (!props.multiple || !Array.isArray(props.modelValue)) return
  const updated = props.modelValue.filter((v) => v !== value)
  emit('update:modelValue', updated)
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
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
      <template v-if="multiple && chips && selectedItems.length">
        <div class="flex flex-wrap gap-1">
          <span
            v-for="item in selectedItems"
            :key="item[props.optionValue]"
            class="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-white text-xs px-2 py-1 rounded-full flex items-center"
          >
            {{ item[props.optionLabel] }}
            <button
              class="ml-1 text-xs text-red-500 hover:text-red-700"
              @click.stop="removeChip(item[props.optionValue])"
            >
              &times;
            </button>
          </span>
        </div>
      </template>
      <template v-else>
        {{ selectedLabel || placeholder }}
      </template>
    </div>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      ref="dropdownRef"
      class="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow"
    >
      <input
        v-if="searchable"
        v-model="searchQuery"
        type="text"
        class="w-full px-4 py-2 border-b dark:bg-gray-900 border-gray-200 dark:border-gray-700 outline-none"
        placeholder="Search..."
      />

      <ul>
        <li
          v-for="option in filteredOptions"
          :key="option[props.optionValue]"
          @click="selectOption(option)"
          class="flex items-center cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          :class="{
            'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-white font-semibold':
              isSelected(option),
          }"
        >
          <input
            v-if="multiple && checkboxes"
            type="checkbox"
            class="mr-2"
            :checked="isSelected(option)"
            readonly
          />
          {{ option[props.optionLabel] }}
        </li>
      </ul>
    </div>
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

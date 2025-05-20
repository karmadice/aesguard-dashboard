<script setup>
import { computed, useAttrs } from "vue";

const props = defineProps({
  as: {
    type: String,
    default: "button", // 'a', | 'button' | 'input'
  },
  variant: {
    type: String,
    default: "primary", // 'primary' | 'secondary' | 'tertiary'
  },
  size: {
    type: String,
    default: "md", // 'sm' | 'md' | 'lg'
  },
  href: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "button", // 'button' | 'submit' | 'reset'
  },
  loading: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["click"]);
const attrs = useAttrs();

const isDisabled = computed(
  () => props.disabled || props.loading || attrs.disabled
);


const isLink = computed(() => props.as === 'a')

const baseStyles = computed(() => {
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
  }

  return [
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    'h-10 px-4 py-2 gap-2',
    variants[props.variant] || variants.default,
    props.fullWidth ? 'w-full' : ''
  ].join(' ')
})
</script>

<template>
  <component
    :is="as"
    :href="isLink ? href : undefined"
    :type="!isLink ? type : undefined"
    :disabled="!isLink && (disabled || loading)"
    :class="baseStyles"
  >
    <!-- Left Icon -->
    <slot name="icon" />

    <!-- Button Content -->
    <span v-if="!loading">
      <slot />
    </span>
    <span v-else class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>

    <!-- Right Icon -->
    <slot name="icon-right" />
  </component>
</template>

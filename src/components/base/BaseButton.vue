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
});

const emit = defineEmits(["click"]);
const attrs = useAttrs();

const isDisabled = computed(
  () => props.disabled || props.loading || attrs.disabled
);

const classes = computed(() => {
  const base =
    "inline-flex items-center justify-center rouned-xl font-medium transition duraiton-200 focus:outline-none focus-visible: ring02 focus-visible:ring-offset-2";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 disabled:bg-primary/50",
    secondary:
      "bg-secondary text-black hover:bg-secondary/90 disabled:bg-secondary/50",
    outline:
      "border border-primary text-primary hover:bg-primary/5 disabled:opacity-50",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return [base, variants[props.variant], sizes[props.size]];
});

function handleClick(event) {
  if (isDisabled.value) {
    event.preventDefault();
    event.stopImmediatePropagation?.();
    return;
  }
  emit("click", event);
}
</script>

<template>
  <component
    :is="props.as"
    v-bind="attrs"
    :type="
      props.as === 'button' || props.as === 'input' ? props.type : undefined
    "
    :aria-disabled="isLink ? isDisabled : undefined"
    :disabled="!isLink && isDisabled"
    class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-white hover:bg-primary/90"
  >
    <template v-if="loading">
      <svg
        class="animate-spin h-4 w-4 mr-2 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    </template>
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </component>
</template>

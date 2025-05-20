<script setup>
import { computed, useAttrs, ref, watch } from 'vue'
import { IconEye, IconEyeOff } from '@tabler/icons-vue'

const props = defineProps({
    modelValue: [String, Number],
    type: {
        type: String,
        default: 'text',
        validator: val => ['text', 'email', 'password', 'number'].includes(val)
    },
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    },
    readonly: {
        type: Boolean,
        default: false
    },
    required: {
        type: Boolean,
        default: false
    },
    error: {
        type: Boolean,
        default: false
    },
    errorMessage: {
        type: String,
        default: ''
    },
    hint: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    }

})

const emit = defineEmits(['update:modelValue'])
const isTouched = ref(false)
const inputType = ref(props.type)
const showPassword = ref(false)

const id = `input-${Math.random().toString(36).substr(2, 9)}`
const hasError = computed(() => !props.error)
const showHint = computed(() => !hasError.value && props.hint)
const shouldShowError = computed(() => isTouched.value && !!props.error)
const attrs = useAttrs()

const handleBlur = () => {
  isTouched.value = true
}

watch(showPassword, (visible) => {
  inputType.value = visible ? 'text' : 'password'
})
</script>
<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" :for="id" class="text-sm font-medium text-muted-foreground">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <input
        :id="id"
        :name="name"
        :type="type === 'password' ? inputType : type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="handleBlur"
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        :class="{
          'border-red-500 focus:ring-red-500': shouldShowError,
          'border-gray-300': !shouldShowError
        }"
      />
      
      <!-- Password toggle -->
      <button
        v-if="type === 'password'"
        type="button"
        class="absolute inset-y-0 right-3 flex items-center text-muted-foreground"
        @click="showPassword = !showPassword"
        tabindex="-1"
      >
        <component :is="showPassword ? IconEyeOff : IconEye" size="18" />
      </button>
    </div>

    <!-- Hint -->
    <p v-if="hint && !shouldShowError" class="text-xs text-muted-foreground">
      {{ hint }}
    </p>

    <!-- Error -->
    <p v-if="shouldShowError" class="text-xs text-red-500">
      {{ error }}
    </p>
  </div>
</template>

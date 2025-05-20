<script setup>
import { ref } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'

const form = ref({
  name: '',
  email: '',
  password: '',
  age: ''
})

const formErrors = ref({
  email: '',
  password: ''
})

const validateForm = () => {
  formErrors.value.email = ''
  formErrors.value.password = ''

  if (!form.value.email) {
    formErrors.value.email = 'Email is required.'
  } else if (!form.value.email.includes('@')) {
    formErrors.value.email = 'Email must be valid.'
  }

  if (!form.value.password) {
    formErrors.value.password = 'Password is required.'
  } else if (form.value.password.length < 8) {
    formErrors.value.password = 'Password must be at least 8 characters.'
  }
}
</script>

<template>
  <form @submit.prevent="validateForm" class="max-w-md space-y-6 p-6 border rounded-md shadow-sm bg-white">
    <BaseInput
      id="name"
      label="Full Name"
      placeholder="Enter your full name"
      v-model="form.name"
      required
      hint="This name will be displayed publicly."
    />

    <BaseInput
      id="email"
      label="Email Address"
      type="email"
      placeholder="you@example.com"
      v-model="form.email"
      :error="formErrors.email"
      required
      hint="We'll never share your email."
    />

    <BaseInput
      id="password"
      label="Password"
      type="password"
      v-model="form.password"
      :error="formErrors.password"
      required
      hint="Minimum 8 characters required."
    />

    <BaseInput
      id="age"
      label="Your Age"
      type="number"
      placeholder="e.g. 30"
      v-model="form.age"
      hint="Optional: helps us personalize your experience."
    />

    <button
      type="submit"
      class="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
    >
      Submit
    </button>
  </form>
</template>

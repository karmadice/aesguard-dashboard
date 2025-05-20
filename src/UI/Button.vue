<script setup>
import BaseButton from '@/components/base/BaseButton.vue';
</script>
<template>
    <h3>Full Width Loading Button</h3>
<BaseButton :loading="true" fullWidth>
  Saving...
</BaseButton>
<h3>Button with Right Icon</h3>
<BaseButton>
  Next
  <template #icon-right>
    <IconArrowRight class="w-4 h-4" />
  </template>
</BaseButton>
<h3> Outline Link Button with Left Icon</h3>
<BaseButton as="a" href="/dashboard" variant="outline">
  <template #icon>
    <IconDashboard class="w-4 h-4" />
  </template>
  Dashboard
</BaseButton>
<h4>Basic submit button</h4>
<BaseButton type="submit">Submit</BaseButton>
</template>
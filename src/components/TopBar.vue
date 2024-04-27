<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <div class="flex space-x-4 justify-between h-12 px-4 py-2 border-b border-gray-500">
    <div class="text-lg font-semibold">{{ name }}</div>
    <slot name="right"></slot>
  </div>
</template>

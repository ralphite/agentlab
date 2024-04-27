<script setup lang="ts">
import TopBar from '@/components/TopBar.vue';
import ChatPanel from '@/components/ChatPanel.vue'
import ModelSelector from '@/components/ModelSelector.vue';
</script>

<template>
  <TopBar name="Chat">
    <template #right>
      <ModelSelector />
    </template>
  </TopBar>
  <ChatPanel />
</template>
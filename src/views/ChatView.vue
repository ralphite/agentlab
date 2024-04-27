<script setup lang="ts">
import TopBar from '@/components/TopBar.vue';
import ChatPanel from '../components/ChatPanel.vue'
import { useChatStore } from '@/stores/chat';

const chatStore = useChatStore();
</script>

<template>
  <TopBar name="Chat">
    <template #right-menu>
      <div class="flex items-center">
        <div class="flex items-center">
          <span class="text-sm font-medium">Model: {{ chatStore.model }}</span>
        </div>
      </div>
    </template>
  </TopBar>
  <ChatPanel />
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import CommunityIcon from './components/icons/IconCommunity.vue'
</script>

<template>
  <div class="flex h-screen w-screen bg-gray-700 text-gray-100">
    <nav class="w-64 bg-gray-800 p-4 space-y-6">
      <div class="text-xl font-bold">Agent Lab</div>
      <ul class="space-y-4">
        <li>
          <div class="flex items-center space-x-2">
            <CommunityIcon />
            <RouterLink to="/">Home</RouterLink>
          </div>
        </li>
        <li>
          <div class="flex items-center space-x-2">
            <CommunityIcon />
            <RouterLink to="/chat">Chat</RouterLink>
          </div>
        </li>
        <li>
          <div class="flex items-center space-x-2">
            <CommunityIcon />
            <RouterLink to="/generate">Generate</RouterLink>
          </div>
        </li>
      </ul>
    </nav>
    <main class="flex-1 flex flex-col">
      <RouterView />
    </main>
  </div>
</template>

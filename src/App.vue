<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="flex h-screen w-screen bg-gray-700 text-gray-100">
    <nav class="w-64 bg-gray-800 p-4 space-y-6">
      <div class="text-xl font-bold">Agent Lab</div>
      <ul class="space-y-4">
        <li class="hover:text-blue-400">
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li class="hover:text-blue-400">
          <RouterLink to="/chat">Chat</RouterLink>
        </li>
        <li class="hover:text-blue-400">
          <RouterLink to="/generate">Generate</RouterLink>
        </li>
      </ul>
    </nav>
    <main class="flex-1 flex flex-col">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useChatStore, models } from '@/stores/chat';
const chatStore = useChatStore();
</script>

<template>
    <div class="flex items-center">
        <select name="models" v-model="chatStore.model"
            class="mt-1 block w-full px-2 py-2 text-base border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-700 text-white">
            <option v-for="model in models" :key="model" :value="model">{{ model }}</option>
        </select>
    </div>
</template>

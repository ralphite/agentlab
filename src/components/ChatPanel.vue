<template>
    <div class="flex-1 flex flex-col space-y-4 bg-gray-700 p-4">
        <div id="messages-list" class="flex-1 w-full bg-gray-600 p-2 overflow-y-scroll">
            <ul class="flex flex-col space-y-4">
                <li v-for="m in chatStore.messages" :key="m.created_at">
                    <div class="text-gray-400">{{ m.ollama_message.role }}</div>
                    <textarea class="text-gray-100 bg-gray-600 w-full text-sm"
                        disabled>{{ m.ollama_message.content }}</textarea>
                </li>
            </ul>
        </div>
        <form @submit.prevent="chatStore.generate()" class="flex space-x-4">
            <input type="text" placeholder="Enter your message here.."
                class="flex-1 p-2 bg-gray-800 text-gray-300 border border-gray-600 rounded" v-model="chatStore.input">
            <button type="submit" :disabled="chatStore.loading" class="px-8 bg-blue-600 hover:bg-blue-700 rounded">{{
                chatStore.loading &&
                'Generating...' || 'Send' }}</button>
        </form>
    </div>
</template>

<style scoped>
#messages-list {
    max-height: calc(100vh - 136px);
}

textarea {
    resize: vertical;
    overflow-y: auto;
}
</style>

<script setup lang="ts">
import { useChatStore } from '@/stores/chat';
const chatStore = useChatStore();
</script>
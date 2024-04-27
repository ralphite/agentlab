<template>
    <div class="flex-1 flex flex-col space-y-4 bg-gray-700 p-4">
        <div id="messages-list" class="flex-1 p-1 overflow-y-scroll">
            <ul class="flex flex-col space-y-4">
                <li v-for="m in chatStore.messages" :key="m.created_at">
                    <div class="flex space-x-2 items-center text-lg text-gray-300">
                        <v-icon name="fa-user" v-if="m.ollama_message.role == 'user'" />
                        <v-icon name="fa-robot" v-else />
                        <span>{{ m.ollama_message.role }}</span>
                    </div>
                    <div class="ml-7 text-sm text-white markdown">
                        <Markdown :source="m.ollama_message.content" />
                    </div>
                </li>
            </ul>
        </div>
        <form @submit.prevent="chatStore.sendMessage()" class="flex space-x-4">
            <input type="text" placeholder="Enter your message here.."
                class="flex-1 p-2 bg-gray-800 text-gray-300 border border-gray-600 rounded" v-model="chatStore.input">
            <button type="submit" :disabled="isPending(chatStore.sendMessageFetchState)"
                class="px-8 bg-blue-600 hover:bg-blue-700 rounded">{{
                    isPending(chatStore.sendMessageFetchState) &&
                    'Generating...' || 'Send' }}</button>
        </form>
    </div>
</template>

<style>
#messages-list {
    max-height: calc(100vh - 140px);
}
</style>

<script setup lang="ts">
import Markdown from '@/components/Markdown.vue';
import { useChatStore } from '@/stores/chat';
import { isPending } from '@/utils/fetch';

const chatStore = useChatStore();
</script>
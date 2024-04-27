<template>
    <div class="flex-1 flex flex-col space-y-4 bg-gray-700 p-4">
        <form @submit.prevent="generateStore.generate()">
            <div class="mb-4">
                <input type="text" placeholder="Enter your prompt here..."
                    class="w-full p-2 bg-gray-800 text-gray-300 border border-gray-600 rounded"
                    v-model="generateStore.prompt">
            </div>
            <button type="submit" :disabled="generateStore.loading"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">Submit</button>
        </form>
        <div v-if="generateStore.loading" class="text-gray-300">Loading...</div>
        <textarea v-if="generateStore.response" class="flex-1 w-full bg-gray-600 p-2"
            disabled>{{ generateStore.response }}</textarea>
    </div>
</template>

<script setup lang="ts">
import { useGenerateStore } from '@/stores/generate';

const generateStore = useGenerateStore();
</script>

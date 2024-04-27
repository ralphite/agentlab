<script setup lang="ts">
import TopBar from '@/components/TopBar.vue';
import { useLocalOllamaModels } from '@/stores/models';
import { onMounted } from 'vue';

const localOllamaModels = useLocalOllamaModels();

onMounted(() => {
  localOllamaModels.callApi();
});

</script>

<template>
  <TopBar name="Home" />
  <div class="flex-1 flex flex-col space-y-4 bg-gray-700 p-4">
    <h2>Local Ollama models:</h2>
    <ul v-if="localOllamaModels?.data">
      <li v-for="model in localOllamaModels?.data?.models" :key="model.name">
        {{ model.name }}
      </li>
    </ul>
  </div>
</template>

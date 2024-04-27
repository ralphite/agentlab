import { defineApiStore } from "@/utils/fetch";

export const useLocalOllamaModels = defineApiStore(
  "localOllamaModels",
  fetch("http://localhost:11434/api/tags")
);

import { defineStore } from "pinia";

export const useGenerateStore = defineStore("generate", {
  state: () => ({
    prompt: "" as string,
    response: "" as string,
    loading: false as boolean,
  }),
  getters: {},
  actions: {
    async generate() {
      try {
        this.loading = true;
        this.response = "";
        const response = await fetch("http://localhost:11434/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama3",
            prompt: this.prompt,
            stream: false,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          this.response = data["response"];
        } else {
          // Handle the API error
          const error = await response.text();
          console.error(error);
        }
      } catch (error) {
        // Handle network or other errors
        console.error(error);
      }
      this.loading = false;
    },
  },
});

import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", {
  state: () => ({
    model: "llama3" as string,
    messages: [] as ChatMessage[],
    input: "" as string,
    loading: false as boolean,
    errorMessage: "" as string,
  }),
  getters: {
    chatRequestPayload(): OllamaChatRequestPayload {
      return {
        model: this.model,
        messages: this.messages.map((message) => message.ollama_message),
        stream: false,
      };
    },
  },
  actions: {
    async generate() {
      if (!this.input) {
        return;
      }
      try {
        this.loading = true;
        this.errorMessage = "";
        this.messages.push({
          ollama_message: {
            content: this.input,
            role: "user",
          },
          created_at: new Date().toISOString(),
        });
        this.input = "";

        const response = await fetch("http://localhost:11434/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.chatRequestPayload),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          this.messages.push({
            ollama_message: data["message"],
            created_at: data["created_at"],
          });
        } else {
          // Handle the API error
          const error = await response.text();
          console.error(error);
          this.errorMessage = error;
        }
      } catch (error) {
        // Handle network or other errors
        console.error(error);
        this.errorMessage = "Network error or other error";
      } finally {
        this.loading = false;

        if (this.errorMessage) {
          this.input = this.messages.pop()?.ollama_message.content || "";
        }
      }
    },
  },
});

interface ChatMessage {
  created_at: string;
  ollama_message: OllamaMessage;
}

interface OllamaMessage {
  role: "user" | "assistent";
  content: string;
}

interface OllamaChatRequestPayload {
  model: string;
  messages: OllamaMessage[];
  stream: boolean;
}

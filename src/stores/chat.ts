import { defineStore } from "pinia";
import { AsyncStatus, getDefaultFetchState } from "@/utils/fetch";

export const models = ["llama3:latest", "llama3:70b-instruct", "phi3:latest"];

export const useChatStore = defineStore("chat", {
  state: () => ({
    model: "llama3:latest" as string,
    messages: [] as ChatMessage[],
    input: "" as string,
    sendMessageFetchState: getDefaultFetchState<ChatMessage>(),
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
    async sendMessage() {
      if (!this.input) {
        return;
      }
      try {
        this.messages.push({
          ollama_message: {
            content: this.input,
            role: "user",
          },
          created_at: new Date().toISOString(),
        });
        this.input = "";

        this.sendMessageFetchState = {
          ...getDefaultFetchState<ChatMessage>(),
          status: AsyncStatus.LOADING,
        };

        const response = await fetch("http://localhost:11434/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.chatRequestPayload),
        });

        if (response.ok) {
          const data = await response.json();

          this.sendMessageFetchState.status = AsyncStatus.SUCCESS;
          this.sendMessageFetchState.data = {
            ollama_message: data["message"],
            created_at: data["created_at"],
          };

          this.messages.push(this.sendMessageFetchState.data);
        } else {
          // Handle the API error
          const error = await response.text();
          this.sendMessageFetchState.status = AsyncStatus.ERROR;
          this.sendMessageFetchState.error = error;
        }
      } catch (error) {
        // Handle network or other errors
        this.sendMessageFetchState.status = AsyncStatus.ERROR;
        this.sendMessageFetchState.error = "Network error or other error";
      } finally {
        if (this.sendMessageFetchState.status === AsyncStatus.ERROR) {
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

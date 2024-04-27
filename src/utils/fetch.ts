import { defineStore } from "pinia";

export enum AsyncStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface FetchState<T> {
  status: AsyncStatus;
  data: T | null;
  error: string | null;
}

export function getDefaultFetchState<T>(): FetchState<T> {
  return {
    status: AsyncStatus.IDLE,
    data: null,
    error: null,
  };
}

export function isPending(state: FetchState<any>) {
  return state.status === AsyncStatus.LOADING;
}

export function hasError(state: FetchState<any>) {
  return state.status === AsyncStatus.ERROR;
}

const FetchUtil = {
  AsyncStatus,
  getDefaultFetchState,
  isPending,
  hasError,
};

export default FetchUtil;

export const defineApiStore = (
  name: string,
  fetchPromise: Promise<Response>,
  successCallback: any = null,
  errorCallback: any = null
) => {
  return defineStore(name, {
    state: () => ({
      status: AsyncStatus.IDLE,
      data: null as any,
      error: null as string | null,
    }),
    getters: {
      isPending(): boolean {
        return this.status === AsyncStatus.LOADING;
      },
      hasError(): boolean {
        return this.status === AsyncStatus.ERROR;
      },
    },
    actions: {
      async callApi() {
        if (this.status !== AsyncStatus.IDLE) return;
        try {
          this.status = AsyncStatus.LOADING;
          this.data = null;
          this.error = null;

          const response = await fetchPromise;

          if (response.ok) {
            const data = await response.json();

            this.status = AsyncStatus.SUCCESS;
            this.data = data;
            if (successCallback) successCallback(data);
          } else {
            // Handle the API error
            const error = await response.text();
            this.status = AsyncStatus.ERROR;
            this.error = error;
            if (errorCallback) errorCallback(error);
          }
        } catch (error) {
          // Handle network or other errors
          this.status = AsyncStatus.ERROR;
          this.error = "Network error or other error";
          if (errorCallback) errorCallback(error);
        }
      },
    },
  });
};

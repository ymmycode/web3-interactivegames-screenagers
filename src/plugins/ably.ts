import Ably from "ably";

export default defineNuxtPlugin(() => {
  if(import.meta.client) {
    return {
      provide: {
        ably: Ably,
      },
    };
  }
})
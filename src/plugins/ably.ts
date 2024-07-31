import Spaces from "@ably/spaces";
import Ably from "ably";

export default defineNuxtPlugin(() => {
  if(import.meta.client) {
    return {
      provide: {
        ably: Ably,
        ablySpaces: Spaces,
      },
    };
  }
})
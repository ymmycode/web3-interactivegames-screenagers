import * as rive from "@rive-app/canvas";

export default defineNuxtPlugin(() => {
  if(import.meta.client) {
    return {
      provide: {
        rive: rive,
      },
    };
  }
})
import { Fireworks } from 'fireworks-js'

export default defineNuxtPlugin(() => {
  if(import.meta.client) {
    return {
      provide: {
        fireworks: Fireworks,
      },
    };
  }
})
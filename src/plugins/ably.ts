import Ably from "ably";

export default defineNuxtPlugin(() => {
  if(import.meta.client) {
    const config = useRuntimeConfig()
    let ably = new Ably.Realtime({
      key: config.app.ablyAPIKey,
      clientId : 'test-nuxt-ably', //optional
    });

    ably.connection.once("connected", () => {
      console.log("Connected to Ably!")
    })

    return {
      provide: {
        ably: ably,
      },
    };
  }
})
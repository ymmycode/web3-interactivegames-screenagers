<template>
  <div class="flex items-center gap-1 w-full h-full">
    <input type="text"
      class="mx-2 bg-transparent h-full w-full focus:outline-none focus:border-b border-primary-1 text-white"
      v-model="textInput"
      @change="typing"
      />
    <button @click="sendMessage" class="p-5 flex-shrink-0 bg-primary-1 text-black rounded-3xl">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 " viewBox="0 0 24 24"><path fill="currentColor" d="m12.815 12.197l-7.532 1.255a.5.5 0 0 0-.386.318L2.3 20.728c-.248.64.421 1.25 1.035.942l18-9a.75.75 0 0 0 0-1.341l-18-9c-.614-.307-1.283.303-1.035.942l2.598 6.958a.5.5 0 0 0 .386.318l7.532 1.255a.2.2 0 0 1 0 .395"/></svg>
    </button>
  </div>
</template>

<script setup>
const mainStore = useMainStore()
const { roomID } = storeToRefs(mainStore)

// ably realtime
const config = useRuntimeConfig()
const { $ably, $ablySpaces } = useNuxtApp();
let ably = null
let gameRoom = null
const roomIDSync = computed(() => roomID.value)
const textInput = ref("")

const initChannel =  async () => {
  ably = new $ably.Realtime({
    key: config.app.ablyAPIKey,
  });
  gameRoom = ably.channels.get(`room-${roomIDSync.value}`);
}

const sendMessage = async () => {
  await gameRoom.publish({
    data: {
      chat: textInput.value,
    }
  }).then(() => {
    textInput.value = ""
  })
}

onMounted(() => {
  nextTick(() => {
    initChannel()
  })
})
</script>
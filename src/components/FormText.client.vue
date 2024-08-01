<template>
  <div class="flex items-center w-full h-full ">
    <div class="box-text-input w-full h-full">
      <input type="text"
        class="bg-transparent h-full w-full focus:outline-none text-white px-[2vw] pr-[6vw]"
        v-model="textInput"
        @change="typing"
        max="200"
      />
    </div>
    <div class="flex-shrink-0 relative h-full items-stretch w-[15%]">
      <button @click="sendMessage" class="absolute top-0 right-0 w-[10vh] h-full bg-primary-1 text-black box-send-button flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="send-svg" viewBox="0 0 24 24"><path fill="currentColor" d="m12.815 12.197l-7.532 1.255a.5.5 0 0 0-.386.318L2.3 20.728c-.248.64.421 1.25 1.035.942l18-9a.75.75 0 0 0 0-1.341l-18-9c-.614-.307-1.283.303-1.035.942l2.598 6.958a.5.5 0 0 0 .386.318l7.532 1.255a.2.2 0 0 1 0 .395"/></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
const mainStore = useMainStore()
const { roomID, player } = storeToRefs(mainStore)

// ably realtime
const config = useRuntimeConfig()
const { $ably, $ablySpaces } = useNuxtApp();
let ably = null
let gameRoom = null
const roomIDSync = computed(() => roomID.value)
const playerData = computed(() => player.value)
const textInput = ref("")

const initChannel =  async () => {
  ably = new $ably.Realtime({
    key: config.app.ablyAPIKey,
  });
  gameRoom = ably.channels.get(`room-${roomIDSync.value}`);
}

const sendMessage = async () => {
  if(textInput.value !== "") {
    await gameRoom.publish({
      data: {
        chat: textInput.value,
        clientId: playerData.value.id
      }
    }).then(() => {
      textInput.value = ""
    })
  }
}

onMounted(() => {
  nextTick(() => {
    initChannel()
  })
})
</script>
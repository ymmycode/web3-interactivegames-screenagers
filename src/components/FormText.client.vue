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
import { createAvatar } from '@dicebear/core';
import { botttsNeutral } from '@dicebear/collection';

const { $ably, $ablySpaces  } = useNuxtApp();
const channel = $ably.channels.get('globalChatRoom');

const character = ["Felix","Aneka"]
const characterRandom = character[Math.floor(Math.random() * character.length-1)];

const eyesData = ["bulging","dizzy","eva", "bulging","dizzy","eva","frame1","frame2","glow","happy"]
const eyesRandom1 = eyesData[Math.floor(Math.random() * eyesData.length-1)];
const eyesRandom2 = eyesData[Math.floor(Math.random() * eyesData.length-1)];
const eyesRandom3 = eyesData[Math.floor(Math.random() * eyesData.length-1)];

const bgColors = ['b6e3f4','c0aede','d1d4f9','ffd5dc','ffdfbf']
const bgColor1 = bgColors[Math.floor(Math.random() * bgColors.length-1)];
const bgColor2 = bgColors[Math.floor(Math.random() * bgColors.length-1)];
const bgColor3 = bgColors[Math.floor(Math.random() * bgColors.length-1)];

const avatar = createAvatar(botttsNeutral, {
  randomizeIds: true,
  seed: characterRandom,
  eyes: [eyesRandom1, eyesRandom2, eyesRandom3],
  bgColors: [bgColor1, bgColor2, bgColor3],
});
const svg = avatar.toDataUri();

const mainStore = useMainStore()
const { chatID } = storeToRefs(mainStore)
const textInput = ref("")

const sendMessage = async () => {
  await channel.publish({
    data: {
      img: svg,
      chat: textInput.value,
      chatID: chatID.value
    }
  }).then(() => {
    textInput.value = ""
  })
}

const typing = async () => {
  // await channel.presence.update('typing', (member) => {
  //   console.log(member.data);
  // });
}
</script>
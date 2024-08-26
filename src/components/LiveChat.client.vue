<template>
  <div v-if="allItems.length > 0 " class="w-full h-full box-live-coms relative z-1">
    <div class="relative w-full h-full flex flex-col justify-end masking-top-live-chat">
      <div v-for="item in allItems" :key="item.clientId" class="relative cursor-pointer">
        <div v-if="item.clientId == player.id"  class="w-full flex justify-end">
          <div class="box-text-container-sender bg-primary-2 w-fit">
            <span class="unbounded text-black text-chat-constant">{{ item.chat }}</span>
          </div>
          <div class="masking-text-container-mobile-sender">
            <div class="box-text-container-bottom-mobile-sender"></div>
          </div>
        </div>
        <div v-else class="w-full flex justify-start">
          <div class="box-text-container bg-primary-1 w-fit">
            <span class="unbounded text-black text-chat-constant">{{ item.chat }}</span>
          </div>
          <div class="masking-text-container-mobile">
            <div class="box-text-container-bottom-mobile"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="w-full h-full box-live-coms">
    <h1 class="text-primary-1 text-[4vw] py-[4vw] px-5 unbounded tracking-wider">Chat with Us</h1>
  </div>
</template>

<script setup>
import badwords from "indonesian-badwords";
const mainStore = useMainStore()
const { roomID, player } = storeToRefs(mainStore)

// ably realtime
const config = useRuntimeConfig()
const { $ably } = useNuxtApp();
let ably = null
let gameRoom = null
const roomIDSync = computed(() => roomID.value)
const playerData = computed(() => player.value)
const allItems = ref([])

// const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
//   allItems,
//   {
//     itemHeight: 100,
//   },
// )

const newMessage = ref("")
const attachChannel = async () => {
  ably = new $ably.Realtime({
    key: config.app.ablyAPIKey,
  });
  gameRoom = ably.channels.get(`room-${roomIDSync.value}`);
  gameRoom.attach()
  await gameRoom.subscribe((message) => {
    newMessage.value = message.data
  });
}

onMounted(() => {
  nextTick( async () => {
    attachChannel()

    const history = await gameRoom.history({limit: 20});
    if(history.items.length > 0) {
      history.items.reverse().forEach((item) => {
        allItems.value.push(item.data)
      })
    }
  })
})

// const doubleScrollTo = () => {
//   const to1 = setTimeout(() => {
//     scrollTo(allItems.value.length - 1)
//     clearTimeout(to1)

//     const to2 = setTimeout(() => {
//       scrollTo(allItems.value.length - 1)
//       clearTimeout(to2)
//     }, 200) 
//   }, 200)
// }

watch(() => newMessage.value,
  (val) => {
    console.log(newMessage.value)
    newMessage.value.chat = badwords.censor(val.chat)
    allItems.value.push(newMessage.value)
    // doubleScrollTo()
  }
)



</script>
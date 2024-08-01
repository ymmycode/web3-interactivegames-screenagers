<template>
  <div v-if="allItems.length > 0 " class="w-full box-live-coms relative z-1 py-[4vw] px-[3vw]">
    <div v-bind="containerProps" id="chats-content" class="flex flex-col justify-end">
      <div v-bind="wrapperProps" class="w-full h-full">
        <div v-for="item in list" :key="item.index" class="relative cursor-pointer">
          <div class="w-full">
            <div class="box-text-container bg-primary-1 w-fit">
              <span class="unbounded text-black text-chat-constant">{{ item.data.chat }}</span>
            </div>
            <div class="masking-text-container">
              <div class="box-text-container-bottom"></div>
            </div>
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
const { roomID } = storeToRefs(mainStore)

// ably realtime
const config = useRuntimeConfig()
const { $ably, $ablySpaces } = useNuxtApp();
let ably = null
let gameRoom = null
const roomIDSync = computed(() => roomID.value)
const allItems = ref([])

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
  allItems,
  {
    itemHeight: 100,
  },
)

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

const doubleScrollTo = () => {
  const to1 = setTimeout(() => {
    scrollTo(allItems.value.length - 1)
    clearTimeout(to1)

    const to2 = setTimeout(() => {
      scrollTo(allItems.value.length - 1)
      clearTimeout(to2)
    }, 200) 
  }, 200)
}

watch(() => newMessage.value,
  (val) => {
    console.log(newMessage.value)
    newMessage.value.chat = badwords.censor(val.chat)
    allItems.value.push(newMessage.value)
    doubleScrollTo()
  }
)



</script>
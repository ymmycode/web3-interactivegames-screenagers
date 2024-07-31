<template>
  <div v-if="allItems.length > 0 " class="w-full h-full">
    <div v-bind="containerProps" class="!h-full" id="chats-content">
      <div v-bind="wrapperProps" class="w-auto">
        <div v-for="item in list" :key="item.index" class="p-5 flex gap-6 items-start justify-start flex-row text-white ">
          <div class="text-white text-base md:text-2xl">{{ item.data.chat }}</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="w-full h-full">
    <h1 class="text-primary-1 text-lg md:text-4xl py-8 px-5 unbounded tracking-wider">There is no chats going on <br>Come On Join!!!</h1>
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
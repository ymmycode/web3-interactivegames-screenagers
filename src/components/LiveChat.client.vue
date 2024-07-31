<template>
  <div v-if="allItems.length > 0 " class="w-full h-full">
    <div v-bind="containerProps" class="!h-full" id="chats-content">
      <div v-bind="wrapperProps" class="w-auto">
        <div v-for="item in list" :key="item.index" class="p-5 flex gap-6 items-start justify-start flex-row text-white ">
          <figure class="flex flex-shrink-0">
            <img :src="item.data.img" alt="avatar" class="w-20 h-20">
          </figure>
          <div class="text-white text-base md:text-2xl">{{ item.data.chat }}</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="w-full h-full">
    <h1 class="text-primary-1 text-lg md:text-4xl py-8 px-5 unbounded tracking-wider">There is no chats going on <br>Come On Join!!!</h1>
  </div>
  <!-- <button @click="scrollTo(allItems.length-1);" class="absolute bottom-5 right-5 p-5 z-10 bg-primary-1 text-black rounded-full">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.171l4.95-4.95l1.414 1.415L12 16L5.636 9.636L7.05 8.222z"/></svg>
  </button> -->
</template>

<script setup>
import badwords from "indonesian-badwords";
const { $ably, $ablySpaces  } = useNuxtApp();
const allItems = ref([])

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
  allItems,
  {
    itemHeight: 100,
  },
)

const newMessage = ref("")
const channel = $ably.channels.get('globalChatRoom')
const attachChannel = async () => {
  channel.attach()
  await channel.subscribe((message) => {
    newMessage.value = message.data
  });
}

onMounted(() => {
  nextTick( async () => {
    attachChannel()

    const history = await channel.history({limit: 20});
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
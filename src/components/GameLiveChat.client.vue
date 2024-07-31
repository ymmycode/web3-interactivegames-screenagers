<template>
  <div class="w-[33vh] h-[50vh] flex flex-col justify-end">
    <TransitionSlide
      :group="true"
      :move-duration="200"
      :duration="500"
      :offset="{
        enter: [-50, 0],
        leave: [50, 0]
      }"
      :easing="{
        enter: 'cubic-bezier(0.22, 1, 0.36, 1)',
        leave: 'cubic-bezier(0.22, 1, 0.36, 1)'
      }"
      :no-opacity="false"
    >
      <div v-for="(msg, i) in messages" :key="msg.id" class="relative cursor-pointer">
        <div class="w-full">
          <div class="box-text-container bg-primary-1 w-fit">
            <span class="unbounded text-black text-chat-constant">{{ msg.text }}</span>
          </div>
          <div class="masking-text-container">
            <div class="box-text-container-bottom"></div>
          </div>
        </div>
      </div>
    </TransitionSlide>
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

const messages = ref([])

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
  })
})

const popUpMessageHandler = (message) => {
  messages.value.push(
    {
      id: messages.value.length < 1 ? 0 : messages.value.length+messages.value[messages.value.length-1].id,
      text: message.chat,
    }
  )
}

let interval = null;
const clearMessage = () => {
  clearInterval(interval)
  interval = setInterval(() => {
    messages.value.splice(0, 1)
  }, 12000)
}

watch(() => newMessage.value,
  (val) => {
    newMessage.value.chat = badwords.censor(val.chat)
    popUpMessageHandler(newMessage.value)

    if(messages.value.length > 0) {
      clearMessage()
    }
  }
)

watch(() => messages.value.length,
  (val) => {
    if(val > 4) {
      messages.value.splice(0, 1)
    }
  }
)
</script>
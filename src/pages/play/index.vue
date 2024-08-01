<template>
  <!-- <transition name="fade">
    <div v-if="intro" class="fixed w-full h-full top-0 left-0 bg-black z-20 flex justify-center flex-col items-center text-primary-1">
      <h1 class="unbounded text-2xl tracking-wider">Welcome to The Game</h1>
      <h2 class="text-xl unbounded tracking-wider">Get Ready!</h2>
    </div>
  </transition> -->

  <div class="w-full h-[100dvh] p-[2vw] container-ui-controller">
    <div class="relative w-full h-full box-player flex flex-col items-stretch py-[5vw] px-[4vw] gap-[4vw]">
      <div class="w-full h-[70%] box-attack-button flex flex-col justify-center items-center gap-[8vw]">
        <div class="unbounded text-2xl text-primary-1 tracking-wider">Aim at The Enemy</div>
        <button class="disable-dbl-tap-zoom button-attack bg-primary-1 flex justify-center items-center box-radial-button">
          <div class="unbounded text-2xl text-center origin-center font-bold">ATTACK</div>
        </button>
      </div>
      <div class="w-full h-[30%] box-chat flex flex-col justify-center items-center py-[2vw] gap-[2vw]">
        <button @click="showComs = !showComs" class="disable-dbl-tap-zoom button-chat w-full bg-primary-1 flex justify-center items-center box-radial-button-small">
          <div class="unbounded text-2xl text-center origin-center font-bold text-black p-[1vw]">
            <svg class="max-w-[8vw] w-full h-auto" viewBox="0 0 100 88" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M91 0H8L0 8V87.5H3.04054L22.5 75H91L100 66V9L91 0Z" fill="currentColor "/>
            </svg>
          </div>
        </button>
        <div class="unbounded text-lg text-primary-1 tracking-wider">Coms</div>
      </div>
    </div>
  </div>

  <TransitionFade>
    <ChatRoom v-if="true"/>
  </TransitionFade>
</template>

<script setup>
import MakeId from '~/includes/MakeId';

definePageMeta({
  layout: 'client-layout',
});

const mainStore = useMainStore()
const { player } = storeToRefs(mainStore)
const intro = ref(true)
const config = useRuntimeConfig()
const route = useRoute()
const { $ably, $ablySpaces  } = useNuxtApp();
const showComs = ref(false)

onMounted(async () => {
  nextTick(() => {
    const to = setTimeout(() => {
      intro.value = false
      clearTimeout(to)
    }, 1000)
  })
})

// ably realtime
let ably = null
let gameRoom = null
const roomIDSync = computed(() => route.query.room)
const playerID = computed(() => player.value.id)
const id = playerID.value ? playerID.value : mainStore.setPlayerID(MakeId(6))

onMounted(() => {
  
  nextTick(async () => {
    setTimeout(() => {
      ably = new $ably.Realtime({
        key: config.app.ablyAPIKey,
        clientId: id
      });
      gameRoom = ably.channels.get(`room-${roomIDSync.value}`);
      gameRoom.presence.enter()
      mainStore.setPlayerID(id)
    }, 300)
  })
})

onBeforeUnmount(() => {
  nextTick(() => {
    mainStore.resetPlayerID()
    gameRoom?.presence.leave()
  })
})
</script>
<template>
  <main class="fixed top-0 left-0 full-height w-full">
    <!-- <Background/> -->
    
    <div v-if="isDesktopOrTablet" class="absolute w-full h-full z-1">
      <div class="container-ui">
        <div class="relative w-full h-full box">
          <UIElements :connectedDevice="deviceConnected"/>
          <GamePlay/>
        </div>
      </div>
    </div>
    <div v-else class="absolute left-0 top-0 w-full h-full text-center text-lg unbounded flex justify-center items-center text-primary-1">
      This Link Must Be Opened On Desktop or Tablet
    </div>
  </main>
</template>

<script setup>
definePageMeta({
  layout: 'index-layout',
});

useSeoMeta({
  title: 'Tap Buddies',
})

const mainStore = useMainStore()
const { roomID } = storeToRefs(mainStore)
const { isDesktopOrTablet } = useDevice()

// ably realtime
const config = useRuntimeConfig()
const { $ably } = useNuxtApp();
let ably = null
let gameRoom = null
const roomIDSync = computed(() => roomID.value)
const deviceConnected = ref(0)

const initGameplay = async () => {
  ably = new $ably.Realtime({
    key: config.app.ablyAPIKey,
  });
  ably.connection.once('connected', () => {
    gameRoom = ably.channels.get(`room-${roomIDSync.value}`);
    gameRoom.presence.subscribe("enter", (player) => {
      console.log('new player add to the team')
    });
    gameRoom.presence.subscribe("leave", (player) => {
      console.log('someone leave')
    });

    gameRoom.presence.subscribe(async (presenceMessage) => {
      const presenceSet = await gameRoom.presence.get();

      if (presenceSet.length > 0) {
        console.log('There are ' + presenceSet.length + ' players on this channel');
        deviceConnected.value = presenceSet.length
      } else {
        console.log('There are ' + presenceSet.length + ' players on this channel');
        deviceConnected.value = 0
      }
    });
  })
}

onMounted(() => {
  nextTick(async () => {
    await initGameplay()
    mainStore.setIdleState()
  })
}) 

watch(() => deviceConnected.value,
  (val) => {
    if (val > 0) {
      mainStore.setStartGameState()
    } else {
      mainStore.setIdleState()
    }
  }
)
</script>
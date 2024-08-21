<template>
  <TresCanvas :bind="gl" class="gameplay-canvas">
    <Experience />
  </TresCanvas>
</template>

<script setup>
const mainStore = useMainStore()
const { roomID } = storeToRefs(mainStore)

// threejs props
const gl = {
  windowSize: false, 
  shadow: false, 
  antialias: true,
  alpha: true,
  clearColor: "#000000",
  depth: false, 
  renderMode: 'on-demand'
}

// ably realtime
// const { $ably, $ablySpaces  } = useNuxtApp();
// let gameRoom = null

// const roomIDSync = computed(() => roomID.value)

// watch(() => roomIDSync.value,
//   (val) => {
//     console.log(`room-${val}`)
//     $ably.connection.once('connected', () => {
//       const gameRoom = $ably.channels.get(`room-${val}`);
//       gameOverCh = $ably.channels.get(`times-out`);
//       gameOverCh.subscribe(`game-over-notif`, (msg) => {});
//     })
//   }
// )

onMounted(() => {
  nextTick(() => {
  })
})

</script>

<style lang="scss" scoped>

</style>
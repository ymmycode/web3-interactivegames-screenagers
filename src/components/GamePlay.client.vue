<template>
  <div></div>
</template>

<script setup>
const mainStore = useMainStore()
const { roomID } = storeToRefs(mainStore)

// ably realtime
const { $ably, $ablySpaces  } = useNuxtApp();
let gameRoom = null

const roomIDSync = computed(() => roomID.value)

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
</script>

<style lang="scss" scoped>

</style>
<template>
  <TresCanvas :bind="gl" class="gameplay-canvas">
    <TresPerspectiveCamera :position="[0, 0, 20]" />
    <OrbitControls
      ref="orbitControlsRef"
      :autoRotate="true"
    />

    <Plane
      ref="enemyPlane" 
      :args="[10, 10, 10, 10]"
      :rotation="[0, 0, Math.PI / 2]"
      :position="[0, 0, 0]"
    >
      <TresMeshBasicMaterial
        color="#003f00"
      />
    </Plane>

    <Crosshair/>
    
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
  renderMode: 'always'
}

// orbit controls
const orbitControlsRef = shallowRef()
console.log(orbitControlsRef.value)

const players = shallowRef([
  {
    id: 1,
    name: 'Player 1',
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    color: '#0000ff'
  }
])

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
</script>

<style lang="scss" scoped>

</style>
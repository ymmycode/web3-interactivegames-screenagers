<template>
  <Suspense>
    <AnimatedSprite
      image="/boss-animation.png"
      atlas="/boss-animation.json"
      :animation="animationsProps.animations[0]"
      :fps="animationsProps.fps[0]"
      :loop="animationsProps.loop"
      :center="[0.5, 0.5]"
      :scale="[3.5, 3.5]"
      :position="[0,-1, 0]"
    />
  </Suspense>
</template>

<script setup>
const mainStore = useMainStore()
const { health, stepHealth, state } = storeToRefs(mainStore)
const bossHealthStatus = computed(() => health.value)
const healthDecreaseStep = computed(() => stepHealth.value)
const totalHealth = computed(() => bossHealthStatus.value / healthDecreaseStep.value)

// @pointer-down="attackedAnimation"
// @pointer-up="idleAnimation"

// 'idle', 5
// 'attacked' 12 
// 'destroyed' 5

const animationsProps = ref({
  animations: ['idle'],
  fps: [5],
  loop: true
})

const attackedAnimation = async () => {
  animationsProps.value.animations[0] = 'attacked'
    animationsProps.value.fps[0] = 12
    animationsProps.value.loop = true

  setTimeout(() => {
    animationsProps.value.animations[0] = 'idle'
    animationsProps.value.fps[0] = 5
    animationsProps.value.loop = true
  }, 1000)
}

const destroyedAnimation = async () => {
  animationsProps.value.animations[0] = 'destroyed'
  animationsProps.value.fps[0] = 5
  animationsProps.value.loop = false
}

const { roomID, player } = storeToRefs(mainStore)

// ably realtime
const config = useRuntimeConfig()
const { $ably, $ablySpaces } = useNuxtApp();
let ably = null
let gameRoom = null
const roomIDSync = computed(() => roomID.value)
const newMessage = ref({})

onMounted(() => {
  nextTick(async () => {
    ably = new $ably.Realtime({
      key: config.app.ablyAPIKey,
    });
    gameRoom = ably.channels.get(`room-${roomIDSync.value}`);
    gameRoom.attach()
    await gameRoom.subscribe((message) => {
      if(!totalHealth < 1){
        attackedAnimation()
      }
    });
  })
})

watch(() => totalHealth.value,
  (val) => {
    if (val < 1) {
      destroyedAnimation()
    }
  }
)

</script>

<style lang="scss" scoped>

</style>
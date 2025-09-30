<template>
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
</template>

<script setup>
const mainStore = useMainStore()
const { health, state } = storeToRefs(mainStore)
const bossHealthStatus = computed(() => health.value)
const totalHealth = computed(() => {
  const currentHealth = bossHealthStatus.value
  const maxHealth = 400 // Match the initial health value from store
  
  // Calculate health percentage (0-100)
  const percentage = (currentHealth / maxHealth) * 100
  return isNaN(percentage) ? 100 : Math.max(0, Math.min(100, percentage))
})
const canAttack = ref(true)

const animationsProps = ref({
  animations: ['idle'],
  fps: [5],
  loop: true
})

const resetAnimationProps = () => {
  animationsProps.value.animations[0] = 'idle'
  animationsProps.value.fps[0] = 5
  animationsProps.value.loop = true
}

let idleAnimationTimeout
const attackedAnimation = async () => {
  animationsProps.value.animations[0] = 'attacked'
  animationsProps.value.fps[0] = 12
  animationsProps.value.loop = true

  idleAnimationTimeout = setTimeout(() => {
    if(state.value === 'won') {
      animationsProps.value.animations[0] = 'destroyed'
      animationsProps.value.fps[0] = 5
      animationsProps.value.loop = false
    } else {
      animationsProps.value.animations[0] = 'idle'
      animationsProps.value.fps[0] = 5
      animationsProps.value.loop = true
    }

  }, 1000)
}

const destroyedAnimation = async () => {
  clearTimeout(idleAnimationTimeout)
  animationsProps.value.animations[0] = 'destroyed'
  animationsProps.value.fps[0] = 5
  animationsProps.value.loop = false
}

const { roomID, player } = storeToRefs(mainStore)

// ably realtime
const config = useRuntimeConfig()
const { $ably } = useNuxtApp();
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
      if(totalHealth.value > 0 && canAttack.value) {
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

watch(() => state.value,
  (val) => {
    if(val === 'idle') {
      resetAnimationProps()
    }

    if(val === 'start') {
      canAttack.value = true
    }

    if(val === 'over') {
      canAttack.value = false
    }

    if(val === 'won') {
      canAttack.value = false
    }
  }
)

</script>

<style lang="scss" scoped>

</style>
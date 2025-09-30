<template>
  <div class="z-1 absolute top-[2vh] left-1/2 -translate-x-1/2 w-full h-[4vh] max-w-[40vw] -skew-x-[20deg] border-2 border-primary-1 z-1 p-[.5vh]">
    <div class="relative w-full h-full z-1">
      <div ref="healthBarRef" class="absolute h-full w-full top-0 left-0 transition-[color,background-color,border-color,text-decoration-color,fill,stroke,background] z-1"
        :class="[
          {'full-health': totalHealth >= 60,},
          {'mid-health': totalHealth <= 60 && totalHealth >= 30,},
          {'low-health': totalHealth <= 30,},
        ]"
      ></div>
    </div>
  </div>
  <div class="z-1 absolute top-[2vh] left-1/2 -translate-x-1/2 w-full h-[4vh] max-w-[40vw] z-2 p-[.5vh]">
    <div class="relative w-full h-full z-1">
      <figure class="absolute heartbeat-position z-2 heartbeat">
        <img src="/images/heart.png" width="80" height="80" alt="">
      </figure>
    </div>
  </div>
</template>

<script setup>

const mainStore = useMainStore()
const { roomID, player } = storeToRefs(mainStore)

// ably realtime
const config = useRuntimeConfig()
const { $ably } = useNuxtApp();
let ably = null
let gameRoom = null
const roomIDSync = computed(() => roomID.value)
const newMessage = ref({})

const healthBarRef = ref()
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

const sendState = async (command) => {
  await gameRoom.publish({
    data: {
      state: command,
    }
  })
}

onMounted(() => {
  nextTick(async () => {
    ably = new $ably.Realtime({
      key: config.app.ablyAPIKey,
    });
    gameRoom = ably.channels.get(`room-${roomIDSync.value}`);
    gameRoom.attach()
    await gameRoom.subscribe((message) => {
      const currentHealth = totalHealth.value
      if(!isNaN(currentHealth) && currentHealth >= 1 && canAttack.value) {
        newMessage.value = message.data
        mainStore.decreaseHealth(newMessage.value.hitPoint)
      }
    });
  })
})

watch(() => totalHealth.value,
  (val) => {
    console.log('Health percentage:', val)
    // val is already a percentage (0-100), so use it directly
    healthBarRef.value.style.width = `${val}%`
    if(val <= 0) {
      mainStore.setWinState()
    }
  }
)

watch(() => state.value,
  (val) => {
    if(val === 'start') {
      canAttack.value = true
    }

    if(val === 'over') {
      canAttack.value = false
      sendState('over')
    }

    if(val === 'won') {
      canAttack.value = false
      sendState('won')
    }
  }
)
</script>
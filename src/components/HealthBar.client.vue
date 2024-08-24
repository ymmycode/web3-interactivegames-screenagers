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
const healthBarRef = ref()
const mainStore = useMainStore()
const { health, stepHealth, state } = storeToRefs(mainStore)
const bossHealthStatus = computed(() => health.value)
const healthDecreaseStep = computed(() => stepHealth.value)
const totalHealth = computed(() => bossHealthStatus.value / healthDecreaseStep.value)

// mainStore.decreaseHealth(1)
// healthBarRef.value.style.width = `${totalHealth.value}%`
// mainStore.setStartGameState()

watch(() => totalHealth.value,
  (val) => {
    if(val <= 0) {
      mainStore.setWinState()
    }
  }
)
</script>
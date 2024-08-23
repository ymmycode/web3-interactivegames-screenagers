<template>
  <div class="absolute top-[2vh] left-1/2 -translate-x-1/2 w-full h-[4vh] max-w-[40vw] -skew-x-[20deg] border-2 border-primary-1 z-10 p-[.5vh]">
    <div class="relative w-full h-full">
      <div ref="healthBarRef" class="absolute h-full w-full top-0 left-0 bg-primary-1"></div>
    </div>
  </div>
</template>

<script setup>
const healthBarRef = ref()
const mainStore = useMainStore()
const { health, stepHealth } = storeToRefs(mainStore)
const bossHealthStatus = computed(() => health.value)
const healthDecreaseStep = computed(() => stepHealth.value)

onMounted(() => {
  window.addEventListener('click', () => {
    mainStore.decreaseHealth(1)
    healthBarRef.value.style.width = `${bossHealthStatus.value / healthDecreaseStep.value}%`
    mainStore.setStartGameState()
  })

})
</script>
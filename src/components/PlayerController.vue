<template>
  <div class="text-white">
    <div>DeviceOrientationEvent {{ orientationCheck }}</div>
    <div>beta {{ orientationStats.beta }}</div>
    <div>gamma {{ orientationStats.gamma }}</div>
  </div>
</template>

<script setup>
const orientationCheck = ref(false)
const orientationStats = ref({})

const handleOrientation = (event) => {
  const absolute = event.absolute;
  const alpha = event.alpha.toFixed(0);
  const beta = event.beta.toFixed(0);
  const gamma = event.gamma.toFixed(0);

  orientationStats.value = {
    absolute,
    alpha,
    beta,
    gamma
  }
}

onMounted(() => {
  nextTick(() => {
    alert(window.DeviceOrientationEvent)
    if (window.DeviceOrientationEvent) {
      orientationCheck.value = true
      window.addEventListener("deviceorientation", (event) => {
        const update =  setTimeout(() => {
          handleOrientation(event)
          clearTimeout(update)
        }, 1000 / 10)
      }, false);
    }
  })
})
</script>
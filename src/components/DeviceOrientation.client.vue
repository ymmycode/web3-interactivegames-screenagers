<template>
  <div class="text-white">
    <div>have orientation {{ orientationCheck }}</div>
    <div>absolute {{ orientationStats.absolute }}</div>
    <div>alpha {{ orientationStats.alpha }}</div>
    <div>beta {{ orientationStats.beta }}</div>
    <div>gamma {{ orientationStats.gamma }}</div>
  </div>
</template>

<script setup>
const orientationCheck = ref(false)
const orientationStats = ref({})

const handleOrientation = (event) => {
  const absolute = event.absolute;
  const alpha = event.alpha;
  const beta = event.beta;
  const gamma = event.gamma;

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
        setTimeout(() => {
          handleOrientation(event)
        }, 1000 / 10)
      }, true);
    }
  })
})
</script>
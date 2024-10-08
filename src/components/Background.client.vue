<template>
  <div id="videoContainer" class="fixed w-full h-full top-0 left-0 z-0">
    <video preload="metadata" autoplay muted loop playsInline class="w-full h-full video-background">
      <source src="/videos/background.mp4">
    </video>
  </div>
  <TransitionFade :duration="1000"><div v-if="fadeBackground" class="absolute w-full h-full bg-black top-0 left-0 z-1"></div></TransitionFade>
</template>

<script setup>
const fadeBackground = ref(true)
let container = null

const resizeVideo = () => {
  window.addEventListener('resize', maintainAspect )
}

const maintainAspect = () => {
  let scale = 1;
  let videoRatio = 16 / 9;
  let viewportRatio = container.offsetWidth / container.offsetHeight;
  if (videoRatio < viewportRatio) {
    scale = viewportRatio / videoRatio;
  } else if (viewportRatio < videoRatio) {
    scale = videoRatio / viewportRatio;
  }
  container.style.transform = `scale(${scale})`;
}

onMounted(() => {
  nextTick(() => {
    const to = setTimeout(() => {
      fadeBackground.value = false
      container = document.getElementById('videoContainer')
      maintainAspect()
      resizeVideo()
      clearTimeout(to)
    }, 1000)
  })
})
</script>
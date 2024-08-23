<template>
  <Suspense>
    <AnimatedSprite
      image="/boss-animation.png"
      atlas="/boss-animation.json"
      :animation="animationsProps.animations[0]"
      :fps="animationsProps.fps[0]"
      :loop="true"
      :center="[0.5, 0.5]"
      :scale="[3.5, 3.5]"
      :position="[0,-1, 0]"
      @pointer-down="attackedAnimation"
      @pointer-up="idleAnimation"
    />
  </Suspense>
</template>

<script setup>
const animationsProps = ref({
  animations: [
    'idle',
    'attacked'
  ],

  fps: [
    5,
    12
  ]
})

const attackedAnimation = async () => {
  animationsProps.value.animations.push(animationsProps.value.animations.shift())
  animationsProps.value.fps.push(animationsProps.value.fps.shift())
}

const idleAnimation = async () => {
  const timeout = setTimeout(() => {
    animationsProps.value.animations.push(animationsProps.value.animations.shift())
    animationsProps.value.fps.push(animationsProps.value.fps.shift())
    clearTimeout(timeout)
  }, 200)
}

watchEffect(() => {
  console.log(animationsProps.value)
})
</script>

<style lang="scss" scoped>

</style>
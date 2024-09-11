<template>
  <TresCanvas v-bind="gl" class="gameplay-canvas">
    <Experience />
  </TresCanvas>

  <HealthBar/>
</template>

<script setup>
// threejs props
const gl = {
  windowSize: false, 
  shadow: false, 
  antialias: true,
  alpha: true,
  depth: false, 
  renderMode: 'always'
}
</script>

<style lang="scss" scoped>

</style>
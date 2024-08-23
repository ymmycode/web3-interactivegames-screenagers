<template>

  <TresPerspectiveCamera
    :position="[0, 0, 20]"
  />
  <!-- <OrbitControls /> -->
  
  <Enemy/>

  <!-- <Crosshair/> -->

</template>

<script setup>
import { useTresContext, useTresContextProvider, useLoop } from '@tresjs/core'

const { camera, renderer, scene } = useTresContext()

const { onBeforeRender, pause, resume } = useLoop()

</script>

<style lang="scss" scoped>

</style>
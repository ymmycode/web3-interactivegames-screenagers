<template>
  <TresPerspectiveCamera
    :position="[0, 0, 20]"
  />
  <!-- <OrbitControls :auto-rotate="true" /> -->

  <TresMesh 
    ref="enemyPlane" 
    :rotation="[0, 0, Math.PI / 2]"
    :position="[0, 0, 0]"
  >
    <TresPlaneGeometry :args="[10, 10, 10, 10]"/>
    <TresMeshBasicMaterial color="#003f00"/>
  </TresMesh>

  <Crosshair/>
</template>

<script setup>
import { useTresContext, useTresContextProvider, useLoop } from '@tresjs/core'

const { camera, renderer, scene } = useTresContext()

const { onBeforeRender, pause, resume } = useLoop()

</script>

<style lang="scss" scoped>

</style>
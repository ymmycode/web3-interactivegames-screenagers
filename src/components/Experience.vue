<template>

  <TresPerspectiveCamera
    :position="[0, 0, 20]"
  />
  <!-- <OrbitControls /> -->
  
  
  <Suspense>
    <Enemy/>
  </Suspense>

  <!-- <Suspense>
    <BackgroundSprite/>
  </Suspense> -->

</template>

<script setup>
import { useTresContext, useTresContextProvider, useLoop } from '@tresjs/core'

const { camera, renderer, scene } = useTresContext()

const { onBeforeRender, pause, resume } = useLoop()

</script>
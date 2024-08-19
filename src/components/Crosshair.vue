<template>
  <Suspense>
    <TresMesh 
      ref="playerCrosshair" 
      :rotation="[0, 0, 0]"
      :position="[0, 0, 2]"
    >
      <TresPlaneGeometry :args="[1, 1]" />
      <TresMeshBasicMaterial />
    </TresMesh>
  </Suspense>
</template>

<script setup>
const getCrossColor = () => {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  return "#" + randomColor;
}

import { useLoader } from '@tresjs/core'
import { TextureLoader, Color } from 'three'
const playerCrosshair = shallowRef()
const crosshair = useLoader(TextureLoader, '/images/crosshair.png')
crosshair.then((texture) => {
  playerCrosshair.value.material.map = texture
  playerCrosshair.value.material.color = new Color(getCrossColor())
  playerCrosshair.value.material.transparent = true
  playerCrosshair.value.material.needUpdate = true
})
</script>
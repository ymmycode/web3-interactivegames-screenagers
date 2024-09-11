<template>
  <TresGroup 
    :position="[0, -0.5, -1]"
  >
    <TresSprite ref="bgRef"  :scale="[31, 17]"/>

  </TresGroup>
  
</template>

<script setup>
import * as THREE from 'three'
const bgRef = ref()
const bgTexture = await useTexture(['/texture/bg-frame.png'])
bgTexture.flipY = true
bgTexture.colorSpace = THREE.SRGBColorSpace

const initMaterial = () => {
  bgRef.value.material = new THREE.SpriteMaterial({
    map: bgTexture,
    transparent: true,
    opacity: 1
  })
}

onMounted(() => {
  initMaterial()
})
</script>
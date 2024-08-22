<template>
  <Suspense>
    <TresMesh 
      ref="playerCrosshair" 
      :rotation="[0, 0, 0]"
      :position="[0, 0, 1]"
    >
      <TresPlaneGeometry :args="[1, 1]" />
      <TresMeshBasicMaterial />
    </TresMesh>
  </Suspense>
</template>

<script setup>
import { useLoader } from '@tresjs/core'
import { TextureLoader, Color, Vector3 } from 'three'

const { camera } = useTresContext()
const { onLoop, resume } = useRenderLoop()

const getCrossColor = () => {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  return "#" + randomColor;
}

const playerCrosshair = shallowRef()
const crosshair = useLoader(TextureLoader, '/images/crosshair.png')
crosshair.then((texture) => {
  playerCrosshair.value.material.map = texture
  playerCrosshair.value.material.color = new Color(getCrossColor())
  playerCrosshair.value.material.transparent = true
  playerCrosshair.value.material.needUpdate = true
})

let mouseX, mouseY
const mousePosition = (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1

  const newPos = new Vector3(mouseX, mouseY, 2)
  newPos.unproject(camera.value)
  const direction = newPos.sub(camera.value.position).normalize()
  const distance = -camera.value.position.z / direction.z
  const pos = camera.value.position.clone().add(direction.multiplyScalar(distance))
  playerCrosshair.value.position.copy(pos)
}

onMounted(() => {
  nextTick(() => {
    window.addEventListener('mousemove', mousePosition)
  })
})

onLoop(({ delta, elapsed, clock }) => {
  if (playerCrosshair.value) {
    playerCrosshair.value.rotation.z -= delta * 2
  }
})
</script>
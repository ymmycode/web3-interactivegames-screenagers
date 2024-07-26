<template>
  <LazyConnectedDevice :connected-device="props.connectedDevice" class="absolute bottom-[0.5vh] left-[1vh]"/>
  <LazyQRRoom class="absolute bottom-0 right-0"/>
</template>

<script setup>
const props = defineProps({
  connectedDevice: {
    type: Number,
    default: 0
  }
})
</script>

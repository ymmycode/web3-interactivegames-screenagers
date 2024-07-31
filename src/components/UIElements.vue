<template>
  <BackgroundPattern/>
  <LazyConnectedDevice :connected-device="props.connectedDevice" class="absolute bottom-[0.5vh] left-[1vh] z-1"/>
  <Score class="absolute top-[0.8vh] left-[1vh] z-1"/>
  <GameLiveChat class="absolute bottom-[50vh] translate-y-[45vh] left-[1vh] z-1"/>
  <LazyQRRoom class="absolute bottom-0 right-0 z-1"/>
</template>

<script setup>
import ChatDisplayClient from './ChatDisplay.client.vue';

const props = defineProps({
  connectedDevice: {
    type: Number,
    default: 0
  }
})
</script>

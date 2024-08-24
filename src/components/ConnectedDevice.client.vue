<template>
  <div>
    <span v-if="deviceConnected < 1" class="unbounded text-primary-1 text-base-constant tracking-wide animate-pulse">Waiting for Players...</span>
    <span v-else class="unbounded text-primary-1 text-base-constant tracking-wide">Connected Player : {{ deviceConnected }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  connectedDevice: {
    type: Number,
    default: 0
  }
})
const deviceConnected = computed(() => props.connectedDevice)
</script>
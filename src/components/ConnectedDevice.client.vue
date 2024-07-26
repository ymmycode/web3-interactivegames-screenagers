<template>
  <div class="unbounded text-primary-1 text-base-constant tracking-wide">
    Connected Player : {{ deviceConnected }}
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
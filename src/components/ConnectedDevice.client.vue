<template>
  <div class="unbounded text-primary-1 text-base-constant tracking-wide">
    Connected Player : {{ deviceConnected }}
  </div>
</template>

<script setup>
const mainStore = useMainStore()
const { roomID } = storeToRefs(mainStore)
const deviceConnected = ref(0)

const roomIDSync = computed(() => roomID.value)

watch(() => roomIDSync.value,
  (val) => {
    console.log(roomIDSync.value)
  }
)
</script>
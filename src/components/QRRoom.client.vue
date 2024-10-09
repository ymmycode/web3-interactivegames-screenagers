<template>
  <!-- :value="`https://192.168.0.107:3000/play?room=${roomIDSync}`" -->
  <!-- :value="`https://proto-multi-game.netlify.app/play?room=${roomIDSync}`" -->
  <div class="absolute bottom-0 right-0 w-fit z-1">
    <QRCodeVue3
      :value="`https://tapbuddies.screenagers.io/play?room=${roomIDSync}`"
      :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
      :imageOptions="{ imageSize: 0.4, }"
      image="/images/qr-logo.png"
      :dotsOptions="{
        type: 'square',
        color: 'black',
      }"
      :backgroundOptions="{ color: '#E3E935' }"
      :cornersSquareOptions="{ type: 'square', color: 'black' }"
      :cornersDotOptions="{ type: 'square', color: 'black' }"
      myclass="my-qr"
      imgclass="img-qr"
      :download="false"
    />
  </div>
</template>

<script setup>
import makeID from '../includes/MakeId';
const mainStore = useMainStore()
const { roomID } = storeToRefs(mainStore)

const roomIDSync = computed(() => roomID.value)

// const id = makeID(5)
const id = "ArsRz"
onMounted( async () => {
  await mainStore.setRoomID(id)
})
</script>
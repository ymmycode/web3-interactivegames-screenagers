<template>
  <div>
    <QRCodeVue3
      :value="`http://localhost:3000/play?id=${roomIDSync}`"
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
    />
  </div>
</template>

<script setup>
import makeID from '../includes/MakeId';
const mainStore = useMainStore()
const { roomID } = storeToRefs(mainStore)

const roomIDSync = computed(() => roomID.value)

const id = makeID(20)
onMounted( async () => {
  await mainStore.setRoomID(id)
})
</script>
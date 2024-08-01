<template>
  <div class="w-full h-[100dvh] p-[2vw] top-0 left-0 absolute z-10 bg-black bg-opacity-60 backdrop-blur-lg">
    <div class="w-full h-full box-container-coms overflow-clip">
      <button class="box-button-close absolute top-0 right-0 bg-primary-1 z-10">
        <div @click="closeComs" class="bg-primary-1 text-black">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-[5.5vh] h-[5.5vh] absolute top-0 right-0 close-svg" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m7.5 15.5l3-3l3 3m-6-9l3 3l3-3"/></svg>
        </div>
      </button>
      <div class="relative w-full h-full flex flex-col items-stretch py-[5vw] px-[4vw] gap-[4vw] z-1">
        <div class="w-full h-[88%] relative flex-grow-0 overflow-auto">
          <BackgroundPatternComs class="absolute top-0 left-0 w-full h-full"/>
          <LiveChat/>
        </div>
        <div class="w-full h-[10%]">
          <FormText/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['closeComs'])

const closeComs = () => {
  emits('closeComs')
}
</script>
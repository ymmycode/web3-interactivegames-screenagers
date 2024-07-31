<template>
  <div class="w-full h-[100dvh] p-[2vw] top-0 left-0 container-ui-controller absolute z-10 bg-black">
    <div class="relative w-full h-full box-player flex flex-col items-stretch py-[5vw] px-[4vw] gap-[4vw]">
      <div class="w-full h-[70%] box-attack-button flex flex-col justify-center items-center gap-[8vw]">
        <LiveChat/>
      </div>
      <div class="w-full h-[30%] box-chat flex flex-col justify-center items-center py-[2vw] gap-[2vw]">
        <FormText/>
      </div>
    </div>
  </div>
</template>
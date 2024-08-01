<template>
  <div class="w-full h-[100dvh] p-[2vw] top-0 left-0 absolute z-10 bg-black bg-opacity-60 backdrop-blur-lg">
    <div class="w-full h-full box-container-coms overflow-clip">
      <div class="relative w-full h-full flex flex-col items-stretch py-[5vw] px-[4vw] gap-[4vw]">
        <div class="w-full h-[90%] relative flex-grow-0">
          <BackgroundPatternComs class="absolute top-0 left-0 w-full h-full"/>
          <LiveChat/>
        </div>
        <div class="w-full h-[10%] flex-shrink-0">
          <FormText/>
        </div>
      </div>
    </div>
  </div>
</template>
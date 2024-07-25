<template>
  <div class="fixed top-0 left-0 bg-black full-height w-full">
    <div class="w-full h-full flex justify-start items-stretch max-w-screen-big-screen mx-auto">
      <div class="w-full h-full rounded-3xl border border-primary-1 overflow-clip">
        <div class="w-full h-full px-4 py-6 pb-12 flex flex-col gap-4">
          <div class="relative h-full w-full max-h-[90%] rounded-3xl border border-primary-1 overflow-clip">
            <LiveChat/>
          </div>
          <div class="py-2 px-1 border border-primary-1 rounded-3xl overflow-clip">
            <FormText/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
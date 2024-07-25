<template>
  <main class="fixed top-0 left-0 full-height w-full">

    <Background/>

    <UIElements/>

    <GamePlay/>

    <section class="w-auto h-auto">
      <div class="w-full h-full flex justify-start items-stretch max-w-screen-big-screen mx-auto">
        <!-- <div class="w-full h-full rounded-3xl border border-primary-1 overflow-clip">

          <div class="w-full h-full px-4 py-6 pb-12">

            <div class="relative h-full w-full max-h-[98%] rounded-3xl border border-primary-1 overflow-clip">
              <LiveChat/>
            </div>

            <div class="py-3">
              <UserListener/>
            </div>

          </div>
          
        </div>

        <div class="px-2 relative flex-shrink-0">
          <h1 class="unbounded text-primary-1 text-4xl max-w-screen-big-screen mx-auto py-2 text-center">Chat App</h1>
          <QRRoom/>
        </div> -->

      </div>
    </section>
  </main>
</template>

<script setup>
definePageMeta({
  layout: 'index-layout',
});
</script>
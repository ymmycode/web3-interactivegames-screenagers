<template>
  <transition name="fade">
    <div v-if="intro" class="fixed w-full h-full top-0 left-0 bg-black z-20 flex justify-center flex-col items-center text-primary-1">
      <h1 class="unbounded text-3xl -tracking-wide">Welcome to The Game</h1>
      <h2 class="text-xl">Have a Good Time</h2>
    </div>
  </transition>
</template>

<script setup>
definePageMeta({
  layout: 'index-layout',
});

const intro = ref(true)

onMounted(async () => {
  nextTick(() => {
    const to = setTimeout(() => {
      intro.value = false
      clearTimeout(to)
    }, 1000)
  })
})
</script>
<template>
  <div v-if="state == 'won'" class="absolute fireworks top-0 left-0 w-full h-full z-20"></div>
  <div class="absolute w-full h-full top-0 left-0 bg-black bg-opacity-70 z-10 flex justify-center items-center">
    <div class="text-score-constant unbounded font-bold text-primary-1 !tracking-widest opacity-0 -translate-y-[2vh] uppercase transition-[transform,opacity] duration-500"
    :class="[
      {'opacity-0 -translate-y-[2vh]': !props.state},
      {'opacity-100 translate-y-0 delay-200': props.state == 'start' || props.state == 'over' || props.state == 'won'},
    ]"
    >{{ props.stateString }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  state: {
    type: String,
    default: ""
  },
  stateString: {
    type: String,
    default: ""
  }
})

const mainStore = useMainStore()
const { state } = storeToRefs(mainStore)
const { $fireworks } = useNuxtApp()

onMounted(() => {
  nextTick(() => {
    if(state.value == 'won') {
      const container = document.querySelector('.fireworks')
      const fireworks = new $fireworks(container, { })
      fireworks.start()
    }
  })
})
</script>
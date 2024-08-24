<template>
  <BackgroundPattern/>
  <LazyConnectedDevice :connected-device="props.connectedDevice" class="absolute bottom-[0.5vh] left-[1vh] z-1"/>
  <Timer class="absolute top-[0.8vh] left-[1vh] z-1"/>
  <GameLiveChat class="absolute bottom-[50vh] translate-y-[45vh] left-[1vh] z-1"/>
  <LazyQRRoom/>
  <TransitionFade>
    <GameplayState v-if="stateStatusWindowShow" :state="state" :state-string="stateString"/>
  </TransitionFade>
</template>

<script setup>
const props = defineProps({
  connectedDevice: {
    type: Number,
    default: 0
  }
})

const mainStore = useMainStore()
const { state } = storeToRefs(mainStore)
const stateString = ref('')

const stateStatusWindowShow = ref(false)
const changeStateStatusWindow = () => {
  stateStatusWindowShow.value = true
  const timeout = setTimeout(() => {
    stateStatusWindowShow.value = false
    clearTimeout(timeout)
  }, 1000)
}

watch(() => state.value,
  (val) => {
    console.log(val)
    if(val == 'start') {
      changeStateStatusWindow()
      stateString.value = 'Battle Started'
    } else if(val == 'over') {
      changeStateStatusWindow()
      stateString.value = 'Battle Over'
    } else if(val == 'won') {
      changeStateStatusWindow()
      stateString.value = 'Victory'
    }
  }
)
</script>

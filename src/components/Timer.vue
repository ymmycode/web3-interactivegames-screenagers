<template>
  <div class="unbounded text-primary-1 text-base-constant">
    TIMER <br>
    <div v-if="!timeLimitReached" class="flex items-center justify-center gap-[1vh]">
      <div class="text-center unbounded font-bold text-primary-1 text-score-constant w-2/4">{{ minutesString }}</div>
      <div class="text-center text-score-constant w-1/3">:</div>
      <div class="text-center unbounded font-bold text-primary-1 text-score-constant w-2/4">{{ secondsString }}</div>
    </div>
    <div v-else class="flex items-center justify-center gap-[1vh]">
      <div class="text-center unbounded font-bold text-primary-1 text-score-constant">Times Up</div>
    </div>
  </div>
</template>

<script setup>
const mainStore = useMainStore()
const { state } = storeToRefs(mainStore)

const minutesInput = ref(1)
const minutesTime = ref(1)
const secondsTime = ref(0)
const minutesString = ref("")
const secondsString = ref("")
const timeLimitReached = ref(false)
let interval

minutesString.value = String(minutesInput.value).padStart(2, '0')
secondsString.value = "0".padStart(2, '0')

const timerInterval = () => {
  const now = new Date(new Date() + (minutesInput.value * 60 * 1000)).getTime();

  clearInterval(interval)
  interval = setInterval(() => {
    const currentTime = new Date().getTime();

    const distance = now - currentTime;

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    
    minutesTime.value = minutesInput.value + minutes
    secondsTime.value = 60 + seconds
    console.log(minutesTime.value, secondsTime.value)
    if(minutesTime.value === -1 && secondsTime.value === 59) {
      minutesString.value = String(minutesInput.value).padStart(2, '0')
      secondsString.value = "0".padStart(2, '0')
      mainStore.setGameOverState()
    } else {
      minutesString.value = String(minutesTime.value).padStart(2, '0')
      secondsString.value = String(secondsTime.value + 1).padStart(2, '0')
    }
  }, 1000);  
}

const startTimer = () => {
  minutesTime.value = minutesInput.value
  minutesString.value = String(minutesTime.value).padStart(2, '0')
  secondsString.value = "0".padStart(2, '0')
  timeLimitReached.value = false
  const delay = setTimeout(() => {
    timerInterval()
    clearTimeout(delay)
  }, 1000)
}

const stopTimer = () => {
  timeLimitReached.value = true
  minutesTime.value = minutesInput.value
  minutesString.value = String(minutesTime.value).padStart(2, '0')
  secondsString.value = "0".padStart(2, '0')
  clearInterval(interval)

  const to = setTimeout(() => {
    idlesState()
    clearTimeout(to)
  }, 10000)
}

const stopTimerWon = () => {
  timeLimitReached.value = false
  clearInterval(interval)
}

const idlesState = () => {
  timeLimitReached.value = false
  minutesTime.value = minutesInput.value
  minutesString.value = String(minutesTime.value).padStart(2, '0')
  secondsString.value = "0".padStart(2, '0')
  mainStore.setHealth({health: 100, step: 1})
  interval && clearInterval(interval)
  mainStore.setIdleState()
}

onMounted(() => {
  mainStore.setIdleState()
})

watch(() => state.value, (val) => {
  console.log(val)
  if (val === 'start') {
    startTimer()
  } else if (val === 'over') {
    stopTimer()
  } else if (val === 'won') {
    stopTimerWon()
  } else if (val === 'idle') {
    idlesState()
  }
})


</script>
<template>
  <div class="lato text-primary-1 text-base-constant">
    TIMER <br>
    <div v-if="!timeLimitReached" class="flex items-center justify-center gap-[1vh]">
      <div class="text-center lato font-bold text-primary-1 text-score-constant w-2/4">{{ minutesString }}</div>
      <div class="text-center text-score-constant w-1/3">:</div>
      <div class="text-center lato font-bold text-primary-1 text-score-constant w-2/4">{{ secondsString }}</div>
    </div>
    <div v-else class="flex items-center justify-center gap-[1vh]">
      <div class="text-center lato font-bold text-primary-1 text-score-constant">Times Up</div>
    </div>
  </div>
</template>

<script setup>
const mainStore = useMainStore()
const { health, state } = storeToRefs(mainStore)

const bossHealthStatus = computed(() => health.value)
const totalHealth = computed(() => {
  const currentHealth = bossHealthStatus.value
  const maxHealth = 400 // Match the initial health value from store
  
  // Calculate health percentage (0-100)
  const percentage = (currentHealth / maxHealth) * 100
  return isNaN(percentage) ? 100 : Math.max(0, Math.min(100, percentage))
})
const canAttack = ref(true)

const minutesInput = ref(2)
const minutesTime = ref(2)
const secondsTime = ref(0)
const minutesString = ref("")
const secondsString = ref("")
const timeLimitReached = ref(false)
let interval = null
let startTime = null
let endTime = null

// Safari/iOS visibility handling
let isVisible = ref(true)

minutesString.value = String(minutesInput.value).padStart(2, '0')
secondsString.value = "00"

const timerInterval = () => {
  // Safari/iOS compatible date calculation
  startTime = Date.now();
  endTime = startTime + (minutesInput.value * 60 * 1000);

  if (interval) {
    clearInterval(interval)
  }
  
  interval = setInterval(() => {
    const currentTime = Date.now();
    const distance = endTime - currentTime;

    if (distance <= 0) {
      // Timer expired
      const currentHealth = totalHealth.value
      if (!isNaN(currentHealth) && currentHealth > 1) {
        minutesString.value = String(minutesInput.value).padStart(2, '0')
        secondsString.value = "00"
        mainStore.setGameOverState()
      } else {
        minutesString.value = String(minutesInput.value).padStart(2, '0')
        secondsString.value = "00"
        mainStore.setWinState()
      }
      clearInterval(interval)
      interval = null
      return
    }

    // Calculate remaining time
    const minutes = Math.floor(distance / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Check win condition
    const currentHealth = totalHealth.value
    if (!isNaN(currentHealth) && currentHealth < 1) {
      minutesString.value = String(minutesInput.value).padStart(2, '0')
      secondsString.value = "00"
      mainStore.setWinState()
      clearInterval(interval)
      interval = null
      return
    }

    // Update display
    minutesString.value = String(minutes).padStart(2, '0')
    secondsString.value = String(seconds).padStart(2, '0')
  }, 1000);  
}

const startTimer = () => {
  minutesTime.value = minutesInput.value
  minutesString.value = String(minutesTime.value).padStart(2, '0')
  secondsString.value = "00"
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
  secondsString.value = "00"
  if (interval) {
    clearInterval(interval)
    interval = null
  }

  const to = setTimeout(() => {
    idlesState()
    clearTimeout(to)
  }, 10000)
}

const stopTimerWon = () => {
  timeLimitReached.value = false
  if (interval) {
    clearInterval(interval)
    interval = null
  }

  const to = setTimeout(() => {
    idlesState()
    clearTimeout(to)
  }, 10000)
}

const idlesState = () => {
  timeLimitReached.value = false
  minutesTime.value = minutesInput.value
  minutesString.value = String(minutesTime.value).padStart(2, '0')
  secondsString.value = "00"
  mainStore.setHealth({health: 400, step: 2})
  if (interval) {
    clearInterval(interval)
    interval = null
  }
  startTime = null
  endTime = null
  mainStore.setIdleState()
}

// Safari/iOS page visibility handling
const handleVisibilityChange = () => {
  if (typeof document !== 'undefined') {
    isVisible.value = !document.hidden
    
    // Recalculate timer when page becomes visible again (Safari/iOS fix)
    if (isVisible.value && interval && startTime && endTime) {
      const currentTime = Date.now()
      const distance = endTime - currentTime
      
      if (distance <= 0) {
        clearInterval(interval)
        const currentHealth = totalHealth.value
        if (!isNaN(currentHealth) && currentHealth > 1) {
          mainStore.setGameOverState()
        } else {
          mainStore.setWinState()
        }
      }
    }
  }
}

onMounted(() => {
  mainStore.setIdleState()
  
  // Safari/iOS compatibility: Add visibility change listener
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', handleVisibilityChange)
  }
  
  // Safari/iOS compatibility: Add page focus/blur listeners
  if (typeof window !== 'undefined') {
    window.addEventListener('focus', handleVisibilityChange)
    window.addEventListener('blur', handleVisibilityChange)
  }
})

onBeforeUnmount(() => {
  // Clean up intervals and timers
  if (interval) {
    clearInterval(interval)
    interval = null
  }
  
  // Remove event listeners
  if (typeof document !== 'undefined') {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  }
  
  if (typeof window !== 'undefined') {
    window.removeEventListener('focus', handleVisibilityChange)
    window.removeEventListener('blur', handleVisibilityChange)
  }
})

watch(() => state.value, (val) => {
  if (val === 'idle') {
    idlesState()
  }

  if (val === 'start') {
    startTimer()
  } else if (val === 'over') {
    stopTimer()
  } else if (val === 'won') {
    stopTimerWon()
  }
})


</script>
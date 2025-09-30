<template>
  <transition name="fade">
    <div v-if="intro" class="fixed w-full h-full top-0 left-0 bg-black z-20 flex justify-center flex-col items-center text-primary-1">
      <h1 class="lato text-2xl tracking-wider">Welcome to The Game</h1>
      <h2 class="text-xl lato tracking-wider">Get Ready!</h2>
    </div>
  </transition>

  <transition name="fade">
    <div v-if="won" class="fixed w-full h-full top-0 left-0 bg-black bg-opacity-80 backdrop-blur-lg z-20 flex justify-center flex-col gap-4 items-center text-primary-1">
      <h1 class="lato text-3xl font-bold tracking-widest">Victory</h1>
      <transition name="fade">
        <button v-if="showButton" @click="refreshPage" class="no-zoom-button text-black text-xl lato tracking-wider bg-primary-1 px-4 py-2 outline-none focus:outline-none">Restart?</button>
      </transition>
    </div>
  </transition>

  <transition name="fade">
    <div v-if="over" class="fixed w-full h-full top-0 left-0 bg-black bg-opacity-80 backdrop-blur-lg z-20 flex justify-center flex-col gap-4 items-center text-primary-1">
      <h1 class="lato text-2xl font-bold tracking-widest">You Lose</h1>
      <transition name="fade">
        <button v-if="showButton" @click="refreshPage" class="no-zoom-button text-black text-xl lato tracking-wider bg-primary-1 px-4 py-2 outline-none focus:outline-none">Restart?</button>
      </transition>
    </div>
  </transition>

  <div class="w-full h-[100dvh] p-[2vw] container-ui-controller">
    <div class="relative w-full h-full box-player flex flex-col items-stretch py-[5vw] px-[4vw] gap-[4vw]">
      <div class="w-full h-[70%] box-attack-button flex flex-col justify-center items-center gap-[8vw]">
        <div class="lato text-2xl text-primary-1 tracking-wider">Attack The Boss</div>
        <button 
          ref="attackButton" 
          @click="attackPub" 
          @touchstart.prevent
          @touchend.prevent
          class="disable-dbl-tap-zoom no-zoom-button button-attack bg-primary-1 flex justify-center items-center box-radial-button"
        >
          <div class="touch-none select-none lato text-2xl text-center origin-center font-bold">ATTACK</div>
        </button>
      </div>
      <div class="w-full h-[30%] box-chat flex flex-col justify-center items-center py-[2vw] gap-[2vw]">
        <button 
          @click.prevent="showComs = !showComs" 
          @touchstart.prevent
          @touchend.prevent
          class="disable-dbl-tap-zoom no-zoom-button button-chat w-full bg-primary-1 flex justify-center items-center box-radial-button-small"
        >
          <div class="disable-dbl-tap-zoom touch-none select-none lato text-2xl text-center origin-center font-bold text-black p-[1vw]">
            <svg class="max-w-[8vw] w-full h-auto" viewBox="0 0 100 88" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M91 0H8L0 8V87.5H3.04054L22.5 75H91L100 66V9L91 0Z" fill="currentColor "/>
            </svg>
          </div>
        </button>
        <div class="lato text-lg text-primary-1 tracking-wider touch-none select-none">Coms</div>
      </div>
    </div>
  </div>

  <TransitionFade>
    <ChatRoom v-if="showComs" @closeComs="showComs = false"/>
  </TransitionFade>
</template>

<script setup>
import MakeId from '~/includes/MakeId';

definePageMeta({
  layout: 'client-layout',
});

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover' }
  ]
})

const mainStore = useMainStore()
const { player, state, health } = storeToRefs(mainStore)
const intro = ref(true)
const won = ref(false)
const over = ref(false)
const config = useRuntimeConfig()
const route = useRoute()
const { $ably } = useNuxtApp();
const showComs = ref(false)
const attackButton = ref()
const showButton = ref(false)

const refreshPage = () => {
  location.reload();
}

const disableZoom = (e) => {
  e.preventDefault();
}

// Prevent iOS zoom on double tap and gesture zoom
const preventZoom = (e) => {
  // Prevent double tap zoom
  if (e.touches && e.touches.length > 1) {
    e.preventDefault();
  }
  
  // Prevent gesture zoom
  if (e.scale && e.scale !== 1) {
    e.preventDefault();
  }
}

onMounted(async () => {
  // Add iOS-specific zoom prevention
  document.addEventListener('touchstart', preventZoom, { passive: false });
  document.addEventListener('touchmove', preventZoom, { passive: false });
  document.addEventListener('touchend', preventZoom, { passive: false });
  document.addEventListener('gesturestart', preventZoom, { passive: false });
  document.addEventListener('gesturechange', preventZoom, { passive: false });
  document.addEventListener('gestureend', preventZoom, { passive: false });
  
  nextTick(() => {
    const to = setTimeout(() => {
      intro.value = false
      clearTimeout(to)
    }, 500)
  })
})

// ably realtime
let ably = null
let gameRoom = null
const roomIDSync = computed(() => route.query.room)
const playerID = computed(() => player.value.id)
console.log(roomIDSync)
console.log(playerID.value)
let id
const newMessage = ref({})

const sendHit = async (command) => {
  await gameRoom.publish({
    data: {
      hitPoint: 2,
    }
  })
}

const hitEnemy = () => {
  attackButton.value.disabled=true;
  setTimeout(() => {attackButton.value.disabled=false},500);
  sendHit()
}

const attackPub = (e) => {
  e.preventDefault()
  e.stopPropagation()
  
  // Additional iOS zoom prevention for this specific action
  if (e.touches) {
    e.preventDefault()
  }
  
  hitEnemy()
}

const gameplayState = (val) => {
  if(val === 'over') {
    over.value = true
    const to = setTimeout(() => {
      gameRoom?.presence.leave()
      showButton.value = true
      clearTimeout(to)
    }, 10000)
  }

  if(val === 'won') {
    won.value = true
    const to = setTimeout(() => {
      gameRoom?.presence.leave()
      showButton.value = true
      clearTimeout(to)
    }, 10000)
  }
}

onMounted(() => {

  nextTick(async () => {
    if(!playerID.value) {
      mainStore.setPlayerID(MakeId(6))
      id = player.value.id
    }
    else id = playerID.value
    console.log(id)

    setTimeout(async () => {
      ably = new $ably.Realtime({
        key: config.app.ablyAPIKey,
        clientId: id
      });
      gameRoom = ably.channels.get(`room-${roomIDSync.value}`);
      gameRoom.presence.enter()
      mainStore.setPlayerID(id)


      gameRoom.attach()
      await gameRoom.subscribe((message) => {
        newMessage.value = message.data

        if(newMessage.value?.state === 'over') {
          gameplayState('over')
        }

        if(newMessage.value?.state === 'won') {
          gameplayState('won')
        }
      });
    }, 500)
  })
})

onBeforeUnmount(() => {
  // Remove event listeners
  document.removeEventListener('touchstart', preventZoom);
  document.removeEventListener('touchmove', preventZoom);
  document.removeEventListener('touchend', preventZoom);
  document.removeEventListener('gesturestart', preventZoom);
  document.removeEventListener('gesturechange', preventZoom);
  document.removeEventListener('gestureend', preventZoom);
  
  nextTick(() => {
    mainStore.resetPlayerID()
    gameRoom?.presence.leave()
  })
})

watch
</script>

<style lang="scss" scoped>
.disable-dbl-tap-zoom {
  touch-action: manipulation;
}
</style>
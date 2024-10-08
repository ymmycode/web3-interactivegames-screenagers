<template>
  <TransitionFade>
    <div v-if="intro" class="fixed w-full h-full top-0 left-0 bg-black z-20 flex justify-center flex-col items-center text-primary-1">
      <h1 class="unbounded text-2xl tracking-wider">Welcome to The Game</h1>
      <h2 class="text-xl unbounded tracking-wider">Get Ready!</h2>
    </div>
  </TransitionFade>

  <TransitionFade>
    <div v-if="won" class="fixed w-full h-full top-0 left-0 bg-black bg-opacity-80 backdrop-blur-lg z-20 flex justify-center flex-col gap-4 items-center text-primary-1">
      <h1 class="unbounded text-3xl font-bold tracking-widest">Victory</h1>
      <TransitionFade>
        <button v-if="showButton" @click="refreshPage" class="text-black text-xl unbounded tracking-wider bg-primary-1 px-4 py-2 outline-none focus:outline-none">Restart?</button>
      </TransitionFade>
    </div>
  </TransitionFade>

  <TransitionFade>
    <div v-if="over" class="fixed w-full h-full top-0 left-0 bg-black bg-opacity-80 backdrop-blur-lg z-20 flex justify-center flex-col gap-4 items-center text-primary-1">
      <h1 class="unbounded text-2xl font-bold tracking-widest">You Lose</h1>
      <TransitionFade>
        <button v-if="showButton" @click="refreshPage" class="text-black text-xl unbounded tracking-wider bg-primary-1 px-4 py-2 outline-none focus:outline-none">Restart?</button>
      </TransitionFade>
    </div>
  </TransitionFade>

  <div class="w-full h-[100dvh] p-[2vw] container-ui-controller">
    <div class="relative w-full h-full box-player flex flex-col items-stretch py-[5vw] px-[4vw] gap-[4vw]">
      <div class="w-full h-[70%] box-attack-button flex flex-col justify-center items-center gap-[8vw]">
        <div class="unbounded text-2xl text-primary-1 tracking-wider">Attack The Boss</div>
        <button ref="attackButton" @click="attackPub" class="disable-dbl-tap-zoom button-attack bg-primary-1 flex justify-center items-center box-radial-button">
          <div class="disable-dbl-tap-zoom unbounded text-2xl text-center origin-center font-bold">ATTACK</div>
        </button>
      </div>
      <div class="w-full h-[30%] box-chat flex items-center justify-center gap-4">

        <div class="flex flex-col justify-center items-center gap-[2vw]">
          <button @click.stop="showComs = !showComs" class="disable-dbl-tap-zoom button-chat w-full bg-primary-1 flex justify-center items-center box-radial-button-small">
            <div class="disable-dbl-tap-zoom unbounded text-2xl text-center origin-center font-bold text-black">
              <svg xmlns="http://www.w3.org/2000/svg" class="max-w-[7vw] w-full h-auto" viewBox="0 0 24 24">
                <path fill="currentColor" d="M10.425 1.414a3.33 3.33 0 0 1 3.026-.097l.19.097l6.775 3.995l.096.063l.092.077l.107.075a3.22 3.22 0 0 1 1.266 2.188l.018.202l.005.204v7.284c0 1.106-.57 2.129-1.454 2.693l-.17.1l-6.803 4.302c-.918.504-2.019.535-3.004.068l-.196-.1l-6.695-4.237a3.23 3.23 0 0 1-1.671-2.619L2 15.502V8.217c0-1.106.57-2.128 1.476-2.705zM12 11h-1l-.117.007a1 1 0 0 0 0 1.986L11 13v3l.007.117a1 1 0 0 0 .876.876L12 17h1l.117-.007a1 1 0 0 0 .876-.876L14 16l-.007-.117a1 1 0 0 0-.764-.857l-.112-.02L13 15v-3l-.007-.117a1 1 0 0 0-.876-.876zm.01-3l-.127.007a1 1 0 0 0 0 1.986L12 10l.127-.007a1 1 0 0 0 0-1.986z"/>
              </svg>
            </div>
          </button>
          <div class="unbounded text-xs text-primary-1 tracking-wider text-center">Info</div>
        </div>

        <!-- <div class="flex flex-col justify-center items-center gap-[2vw]">
          <button @click.stop="showComs = !showComs" class="disable-dbl-tap-zoom button-chat w-full bg-primary-1 flex justify-center items-center box-radial-button-small">
            <div class="disable-dbl-tap-zoom unbounded text-2xl text-center origin-center font-bold text-black">
              <svg class="max-w-[6vw] w-full h-auto" viewBox="0 0 100 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M91 0H8L0 8V87.5H3.04054L22.5 75H91L100 66V9L91 0Z" fill="currentColor "/>
              </svg>
            </div>
          </button>
          <div class="unbounded text-xs text-primary-1 tracking-wider text-center">Coms</div>
        </div> -->

        <div class="flex flex-col justify-center items-center gap-[2vw]">
          <button @click.stop="showWalletForm = !showWalletForm" class="disable-dbl-tap-zoom button-chat w-full bg-primary-1 flex justify-center items-center box-radial-button-small">
            <div class="disable-dbl-tap-zoom unbounded text-2xl text-center origin-center font-bold text-black">
              <svg xmlns="http://www.w3.org/2000/svg" class="max-w-[6vw] w-full h-auto" viewBox="0 0 48 48">
                <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4">
                  <path fill="currentColor" d="M4 8h40v8s-10 2-10 8s10 8 10 8v8H4z"/>
                  <path stroke-linecap="round" d="M44 24h-2"/>
                </g>
              </svg>
            </div>
          </button>
          <div class="unbounded text-xs text-primary-1 tracking-wider text-center">Connect</div>
        </div>

      </div>
    </div>
  </div>

  <TransitionFade>
    <ChatRoom v-if="showComs" @closeComs="showComs = false"/>
  </TransitionFade>

  <TransitionFade>
    <Wallet v-if="showWalletForm" @closeWalletForm="showWalletForm = false" />
  </TransitionFade>
</template>

<script setup>
import MakeId from '~/includes/MakeId';

definePageMeta({
  layout: 'client-layout',
});

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no' }
  ]
})

useSeoMeta({
  title: 'Controller',
});

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
const showWalletForm = ref(false)

const disableZoom = (e) => {
  e.preventDefault();
}

onMounted(async () => {
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
const id = computed(() => playerID.value ? playerID.value : mainStore.setPlayerID(MakeId(6)))
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

const initiateGame = () => {
  setTimeout(async () => {
    ably = new $ably.Realtime({
      key: config.app.ablyAPIKey,
      clientId: id.value
    });
    gameRoom = ably.channels.get(`room-${roomIDSync.value}`);
    gameRoom.presence.enter()
    mainStore.setPlayerID(id.value)


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
  }, 300)
}

onMounted(() => {
  nextTick(() => {
    initiateGame()
  })
})

const refreshPage = () => {
  gameRoom?.presence.leave()
  won.value = false
  over.value = false
  initiateGame()
}

onBeforeUnmount(() => {
  nextTick(() => {
    gameRoom?.presence.leave()
  })
})

watchEffect(() => {
  console.log(playerID.value)
  console.log(id.value)
})
</script>
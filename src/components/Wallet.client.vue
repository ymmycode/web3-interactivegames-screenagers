<template>
  <div class="absolute top-0 left-0 w-full h-full z-50">
    <div @click="closeWalletForm" class="absolute w-full h-full top-0 left-0 bg-black bg-opacity-90 backdrop-blur-lg z-1 overlay"></div>
    <TransitionSlide :offset="[0, 50]">
      <div v-if="open" class="bg-black w-full absolute bottom-0 left-0 z-2 bottom-sheet">
        <div class="relative w-full">
          <BackgroundPatternComs class="absolute top-0 left-0 w-full h-full z-0 opacity-35"/>
          <div class="relative z-10 p-[2vh] space-y-7 text-primary-1 shadow-wallet-box">
            <h1 class="text-xl unbounded tracking-wider text-center">Connect Wallet</h1>
            <div v-if="!connected && !selectedWallet" class="w-full">
              <div v-for="item in wallets" :key="item.id" @click="selectWallet(item)"
                class="w-full border border-primary-1 border-opacity-80 p-[1vh] flex items-center justify-between gap-1"
              >
                <div v-html="item.icon"></div>
                <div v-if="!connected" class="unbounded text-[2vh]">{{ item.name }}</div>
                <div class="relative">
                  <div v-if="!connected" class="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="16" stroke-dashoffset="16" d="M12 3c4.97 0 9 4.03 9 9"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="16;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path><path stroke-dasharray="64" stroke-dashoffset="64" stroke-opacity="0.3" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s" values="64;0"/></path></g></svg>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="w-full">
              <div
                class="w-full border border-primary-1 border-opacity-80 p-[1vh] flex items-center justify-between gap-1"
              >
                <div v-html="selectedWallet.icon"></div>
                <div v-if="!connected" class="unbounded text-[2vh]">Connect</div>
                <div class="relative">
                  <div v-if="!connected" class="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="16" stroke-dashoffset="16" d="M12 3c4.97 0 9 4.03 9 9"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="16;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path><path stroke-dasharray="64" stroke-dashoffset="64" stroke-opacity="0.3" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s" values="64;0"/></path></g></svg>
                  </div>
                  <div v-if="connected" class="relative">
                    <div class="w-[65vw]">
                      <div class="truncate unbounded text-[2vh]">
                        {{ publicKey }}
                      </div>
                    </div>
                  </div>
                </div>
                <button v-if="connected" @click.stop="selectedWallet.disconnectFunction()" class="unbounded text-[2vh] bg-primary-1 bg-opacity-20 p-[1vh] hover:bg-opacity-50 border border-opacity-0 hover:border-opacity-100 border-primary-1 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-[2.5vh] h-auto" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" d="m17 11l4.586 4.586a2 2 0 0 1 0 2.828l-3.172 3.172a2 2 0 0 1-2.828 0L11 17m6-9h4m-5-1V3M8 21v-4m-5-1h4m0-3L2.414 8.414a2 2 0 0 1 0-2.828l3.172-3.172a2 2 0 0 1 2.828 0L13 7"/></svg>
                </button>
              </div>
            </div>
            <div class="w-fit mx-auto">
              <button @click="closeWalletForm" class="border border-primary-1 p-[1vh] text-center hover:bg-primary-1 hover:bg-opacity-20 group">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-auto w-[3vh] group-hover:rotate-90 transition-transform duration-300" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m42 42l-9-9M6 6l9 9zm0 36l9-9M42 6l-9 9zM24 29a5 5 0 1 0 0-10a5 5 0 0 0 0 10"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </TransitionSlide>
  </div>
</template>

<script setup>
const emits = defineEmits(['closeWalletForm'])

const solana = useSolana()
const wallet = storeToRefs(solana)

const open = ref(false)
const connected = ref(false)
const publicKey = ref()
const walletSelection = ref(null)
const selectedWallet = ref(null)

const wallets = ref([
  {
    id: 'phantom',
    name: 'Phantom',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-auto w-[5vh]" viewBox="0 0 24 24"><path fill="#ab9ff2" d="M4.367 20c2.552 0 4.47-2.132 5.614-3.817a3.2 3.2 0 0 0-.216 1.103c0 .984.588 1.685 1.748 1.685c1.593 0 3.294-1.342 4.176-2.788a2 2 0 0 0-.093.581c0 .686.402 1.119 1.222 1.119c2.583 0 5.182-4.4 5.182-8.246C22 6.639 20.422 4 16.462 4C9.502 4 2 12.172 2 17.45C2 19.523 3.16 20 4.367 20m9.698-10.692c0-.745.433-1.267 1.067-1.267c.619 0 1.052.522 1.052 1.267c0 .746-.433 1.283-1.052 1.283c-.634 0-1.067-.537-1.067-1.283m3.31 0c0-.745.433-1.267 1.067-1.267c.62 0 1.052.522 1.052 1.267c0 .746-.433 1.283-1.052 1.283c-.634 0-1.067-.537-1.067-1.283"/></svg>`,
    connectFunction: async() => {
      solana.setWalletSelection('phantom')
      walletSelection.value = 'phantom'
      solana.getWallet();

      const to = setTimeout(async () => {
        clearTimeout(to)
        if(!connected.value) {
          solana.connect()
        }
      }, 1000)
    },

    disconnectFunction: async () => {
      if(connected.value) {
        solana.disconnect()
        connected.value = false
      }
    }
  },

  {
    id: 'solflare',
    name: 'Solflare',
    icon: `
      <svg class="h-auto w-[5vh]" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.1708 47.9104C25.6958 47.9104 26.1215 48.3314 26.1215 48.8507C26.1215 49.37 25.6958 49.7909 25.1708 49.7909C24.6458 49.7909 24.2201 49.37 24.2201 48.8507C24.2201 48.3314 24.6458 47.9104 25.1708 47.9104ZM24.138 2.99475C24.6026 3.03311 24.9778 3.38515 25.0407 3.84156L26.1714 12.0573C26.5512 14.7716 29.8249 15.9477 31.8457 14.1032L43.1748 3.79162C43.4481 3.54289 43.8737 3.56013 44.1255 3.83013C44.3564 4.07785 44.3634 4.4571 44.1416 4.7129L34.2625 16.1087C32.4438 18.2029 33.7857 21.473 36.5581 21.7065L45.2749 22.5468C45.709 22.5886 46.0266 22.9702 45.9842 23.3992C45.9493 23.7529 45.6768 24.0387 45.3214 24.0941L36.162 25.5243C33.5027 25.8868 32.2984 29.036 34.0281 31.0819L37.2481 34.878C37.5075 35.1838 37.4669 35.6395 37.1573 35.8958C36.8951 36.113 36.5154 36.1214 36.2435 35.9161L32.2741 32.9183C30.132 31.3074 27.0444 32.6766 26.818 35.3426L25.9433 45.7402C25.9071 46.1697 25.5255 46.4889 25.0908 46.4532C24.7218 46.4229 24.4237 46.1435 24.3737 45.7811L22.9866 35.7374C22.6149 33.023 19.3412 31.847 17.3123 33.6915L5.26035 44.6655C5.01088 44.8926 4.62226 44.8769 4.39235 44.6305C4.18141 44.4043 4.175 44.0581 4.37742 43.8245L14.8956 31.686C16.7143 29.5918 15.3805 26.3216 12.608 26.0882L3.88928 25.2477C3.45515 25.2059 3.13756 24.8242 3.17992 24.3953C3.21485 24.0416 3.48731 23.7559 3.84262 23.7003L12.996 22.2704C15.6554 21.9079 16.8678 18.7587 15.1381 16.7128L12.9461 14.1287C12.6244 13.7495 12.6748 13.1844 13.0587 12.8666C13.384 12.5972 13.855 12.5869 14.1921 12.8417L16.8839 14.8764C19.026 16.4873 22.1136 15.1181 22.34 12.4521L23.0641 3.89212C23.1098 3.35132 23.5906 2.94955 24.138 2.99475ZM0.95067 23.4344C1.47571 23.4344 1.90134 23.8554 1.90134 24.3747C1.90134 24.894 1.47571 25.315 0.95067 25.315C0.425629 25.315 0 24.894 0 24.3747C0 23.8554 0.425629 23.4344 0.95067 23.4344ZM48.6304 22.4797C49.1554 22.4797 49.5811 22.9007 49.5811 23.42C49.5811 23.9393 49.1554 24.3602 48.6304 24.3602C48.1054 24.3602 47.6797 23.9393 47.6797 23.42C47.6797 22.9007 48.1054 22.4797 48.6304 22.4797ZM24.0008 0C24.5258 0 24.9514 0.420973 24.9514 0.94027C24.9514 1.45957 24.5258 1.88054 24.0008 1.88054C23.4757 1.88054 23.0501 1.45957 23.0501 0.94027C23.0501 0.420973 23.4757 0 24.0008 0Z" fill="url(#paint0_linear)"/>
        <path d="M24.571 32.7792C29.5306 32.7792 33.5512 28.8027 33.5512 23.8973C33.5512 18.992 29.5306 15.0154 24.571 15.0154C19.6114 15.0154 15.5908 18.992 15.5908 23.8973C15.5908 28.8027 19.6114 32.7792 24.571 32.7792Z" fill="url(#paint1_radial)"/>
        <defs>
          <linearGradient id="paint0_linear" x1="6.47835" y1="7.92" x2="34.9107" y2="33.6593" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFC10B"/>
            <stop offset="1" stop-color="#FB3F2E"/>
          </linearGradient>
          <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(22.5202 20.6183) rotate(67.5196) scale(13.056 13.1829)">
            <stop stop-color="#FFC10B"/>
            <stop offset="1" stop-color="#FB3F2E"/>
          </radialGradient>
        </defs>
      </svg>

    `,
    connectFunction: async() => {
      walletSelection.value = 'solflare'
      solana.setWalletSelection('solflare')
      solana.getWallet();


      const to = setTimeout(async () => {
        clearTimeout(to)
        if(!connected.value) {
          solana.connect()
        }
      }, 1000)
    },

    disconnectFunction: async () => {
      if(connected.value) {
        solana.disconnect()
        connected.value = false
      }
    }
  },
])

const selectWallet = async (wallet) => {
  selectedWallet.value = wallet
  selectedWallet.value.connectFunction()
}

const closeWalletForm = () => {
  emits('closeWalletForm')
}

onMounted(async () => {
  nextTick(async () => {
    if(solana.walletSelection.value) {
      selectWallet(solana.walletSelection.value)
    }
    if(!solana.wallet.value && !solana.adapter.value) {
      solana.connect();
      publicKey.value = wallet.adapter.value.publicKey.toBase58()
      connected.value = true
    }
  })

  const to = setTimeout(() => {
    open.value = true
    clearTimeout(to)
  }, 200)
})

onBeforeUnmount(() => {
  solana.setWalletSelection(walletSelection.value)
})

watchEffect(async () => {
  console.log(solana.walletSelection.value)
  if(wallet.adapter.value && wallet.wallet.value) {
    if(wallet.adapter.value.connecting) {
      connected.value = false
    } else {
      publicKey.value = wallet.adapter.value?.publicKey.toBase58()
      connected.value = true
    }
  }
})

</script>

<style lang="scss" scoped>

</style>
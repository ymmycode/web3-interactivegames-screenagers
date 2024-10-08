import { defineStore } from 'pinia'

export const useSolana = defineStore('solana', {
  id: 'solana',
  state: () => {
    return {
      walletSelection: '',
      wallet: null,
      adapter: null,
      publicKey: null,
    }
  },

  actions: {

    async getWallet() {
      if(this.walletSelection === 'phantom') {
        const { PhantomWalletAdapter } = await import('@solana/wallet-adapter-phantom')
        const getPhantomWallet = () => ({
          name: 'Phantom',
          url: 'https://phantom.app',
          icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjM0IiB3aWR0aD0iMzQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iLjUiIHgyPSIuNSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM1MzRiYjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1NTFiZjkiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDE9Ii41IiB4Mj0iLjUiIHkxPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9Ii44MiIvPjwvbGluZWFyR3JhZGllbnQ+PGNpcmNsZSBjeD0iMTciIGN5PSIxNyIgZmlsbD0idXJsKCNhKSIgcj0iMTciLz48cGF0aCBkPSJtMjkuMTcwMiAxNy4yMDcxaC0yLjk5NjljMC02LjEwNzQtNC45NjgzLTExLjA1ODE3LTExLjA5NzUtMTEuMDU4MTctNi4wNTMyNSAwLTEwLjk3NDYzIDQuODI5NTctMTEuMDk1MDggMTAuODMyMzctLjEyNDYxIDYuMjA1IDUuNzE3NTIgMTEuNTkzMiAxMS45NDUzOCAxMS41OTMyaC43ODM0YzUuNDkwNiAwIDEyLjg0OTctNC4yODI5IDEzLjk5OTUtOS41MDEzLjIxMjMtLjk2MTktLjU1MDItMS44NjYxLTEuNTM4OC0xLjg2NjF6bS0xOC41NDc5LjI3MjFjMCAuODE2Ny0uNjcwMzggMS40ODQ3LTEuNDkwMDEgMS40ODQ3LS44MTk2NCAwLTEuNDg5OTgtLjY2ODMtMS40ODk5OC0xLjQ4NDd2LTIuNDAxOWMwLS44MTY3LjY3MDM0LTEuNDg0NyAxLjQ4OTk4LTEuNDg0Ny44MTk2MyAwIDEuNDkwMDEuNjY4IDEuNDkwMDEgMS40ODQ3em01LjE3MzggMGMwIC44MTY3LS42NzAzIDEuNDg0Ny0xLjQ4OTkgMS40ODQ3LS44MTk3IDAtMS40OS0uNjY4My0xLjQ5LTEuNDg0N3YtMi40MDE5YzAtLjgxNjcuNjcwNi0xLjQ4NDcgMS40OS0xLjQ4NDcuODE5NiAwIDEuNDg5OS42NjggMS40ODk5IDEuNDg0N3oiIGZpbGw9InVybCgjYikiLz48L3N2Zz4K',
          adapter: () => new PhantomWalletAdapter()
        })
        this.wallet = getPhantomWallet()
      }

      if(this.walletSelection === 'solflare') {
        const { SolflareWalletAdapter } = await import('@solana/wallet-adapter-solflare')
        const getSolflareWallet = () => ({
          name: 'Solflare',
          url: 'https://solflare.com/',
          icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMjUuMTcwOCA0Ny45MTA0QzI1LjY5NTggNDcuOTEwNCAyNi4xMjE1IDQ4LjMzMTQgMjYuMTIxNSA0OC44NTA3QzI2LjEyMTUgNDkuMzcgMjUuNjk1OCA0OS43OTA5IDI1LjE3MDggNDkuNzkwOUMyNC42NDU4IDQ5Ljc5MDkgMjQuMjIwMSA0OS4zNyAyNC4yMjAxIDQ4Ljg1MDdDMjQuMjIwMSA0OC4zMzE0IDI0LjY0NTggNDcuOTEwNCAyNS4xNzA4IDQ3LjkxMDRaTTI0LjEzOCAyLjk5NDc1QzI0LjYwMjYgMy4wMzMxMSAyNC45Nzc4IDMuMzg1MTUgMjUuMDQwNyAzLjg0MTU2TDI2LjE3MTQgMTIuMDU3M0MyNi41NTEyIDE0Ljc3MTYgMjkuODI0OSAxNS45NDc3IDMxLjg0NTcgMTQuMTAzMkw0My4xNzQ4IDMuNzkxNjJDNDMuNDQ4MSAzLjU0Mjg5IDQzLjg3MzcgMy41NjAxMyA0NC4xMjU1IDMuODMwMTNDNDQuMzU2NCA0LjA3Nzg1IDQ0LjM2MzQgNC40NTcxIDQ0LjE0MTYgNC43MTI5TDM0LjI2MjUgMTYuMTA4N0MzMi40NDM4IDE4LjIwMjkgMzMuNzg1NyAyMS40NzMgMzYuNTU4MSAyMS43MDY1TDQ1LjI3NDkgMjIuNTQ2OEM0NS43MDkgMjIuNTg4NiA0Ni4wMjY2IDIyLjk3MDIgNDUuOTg0MiAyMy4zOTkyQzQ1Ljk0OTMgMjMuNzUyOSA0NS42NzY4IDI0LjAzODcgNDUuMzIxNCAyNC4wOTQxTDM2LjE2MiAyNS41MjQzQzMzLjUwMjcgMjUuODg2OCAzMi4yOTg0IDI5LjAzNiAzNC4wMjgxIDMxLjA4MTlMMzcuMjQ4MSAzNC44NzhDMzcuNTA3NSAzNS4xODM4IDM3LjQ2NjkgMzUuNjM5NSAzNy4xNTczIDM1Ljg5NThDMzYuODk1MSAzNi4xMTMgMzYuNTE1NCAzNi4xMjE0IDM2LjI0MzUgMzUuOTE2MUwzMi4yNzQxIDMyLjkxODNDMzAuMTMyIDMxLjMwNzQgMjcuMDQ0NCAzMi42NzY2IDI2LjgxOCAzNS4zNDI2TDI1Ljk0MzMgNDUuNzQwMkMyNS45MDcxIDQ2LjE2OTcgMjUuNTI1NSA0Ni40ODg5IDI1LjA5MDggNDYuNDUzMkMyNC43MjE4IDQ2LjQyMjkgMjQuNDIzNyA0Ni4xNDM1IDI0LjM3MzcgNDUuNzgxMUwyMi45ODY2IDM1LjczNzRDMjIuNjE0OSAzMy4wMjMgMTkuMzQxMiAzMS44NDcgMTcuMzEyMyAzMy42OTE1TDUuMjYwMzUgNDQuNjY1NUM1LjAxMDg4IDQ0Ljg5MjYgNC42MjIyNiA0NC44NzY5IDQuMzkyMzUgNDQuNjMwNUM0LjE4MTQxIDQ0LjQwNDMgNC4xNzUgNDQuMDU4MSA0LjM3NzQyIDQzLjgyNDVMMTQuODk1NiAzMS42ODZDMTYuNzE0MyAyOS41OTE4IDE1LjM4MDUgMjYuMzIxNiAxMi42MDggMjYuMDg4MkwzLjg4OTI4IDI1LjI0NzdDMy40NTUxNSAyNS4yMDU5IDMuMTM3NTYgMjQuODI0MiAzLjE3OTkyIDI0LjM5NTNDMy4yMTQ4NSAyNC4wNDE2IDMuNDg3MzEgMjMuNzU1OSAzLjg0MjYyIDIzLjcwMDNMMTIuOTk2IDIyLjI3MDRDMTUuNjU1NCAyMS45MDc5IDE2Ljg2NzggMTguNzU4NyAxNS4xMzgxIDE2LjcxMjhMMTIuOTQ2MSAxNC4xMjg3QzEyLjYyNDQgMTMuNzQ5NSAxMi42NzQ4IDEzLjE4NDQgMTMuMDU4NyAxMi44NjY2QzEzLjM4NCAxMi41OTcyIDEzLjg1NSAxMi41ODY5IDE0LjE5MjEgMTIuODQxN0wxNi44ODM5IDE0Ljg3NjRDMTkuMDI2IDE2LjQ4NzMgMjIuMTEzNiAxNS4xMTgxIDIyLjM0IDEyLjQ1MjFMMjMuMDY0MSAzLjg5MjEyQzIzLjEwOTggMy4zNTEzMiAyMy41OTA2IDIuOTQ5NTUgMjQuMTM4IDIuOTk0NzVaTTAuOTUwNjcgMjMuNDM0NEMxLjQ3NTcxIDIzLjQzNDQgMS45MDEzNCAyMy44NTU0IDEuOTAxMzQgMjQuMzc0N0MxLjkwMTM0IDI0Ljg5NCAxLjQ3NTcxIDI1LjMxNSAwLjk1MDY3IDI1LjMxNUMwLjQyNTYyOSAyNS4zMTUgMCAyNC44OTQgMCAyNC4zNzQ3QzAgMjMuODU1NCAwLjQyNTYyOSAyMy40MzQ0IDAuOTUwNjcgMjMuNDM0NFpNNDguNjMwNCAyMi40Nzk3QzQ5LjE1NTQgMjIuNDc5NyA0OS41ODExIDIyLjkwMDcgNDkuNTgxMSAyMy40MkM0OS41ODExIDIzLjkzOTMgNDkuMTU1NCAyNC4zNjAyIDQ4LjYzMDQgMjQuMzYwMkM0OC4xMDU0IDI0LjM2MDIgNDcuNjc5NyAyMy45MzkzIDQ3LjY3OTcgMjMuNDJDNDcuNjc5NyAyMi45MDA3IDQ4LjEwNTQgMjIuNDc5NyA0OC42MzA0IDIyLjQ3OTdaTTI0LjAwMDggMEMyNC41MjU4IDAgMjQuOTUxNCAwLjQyMDk3MyAyNC45NTE0IDAuOTQwMjdDMjQuOTUxNCAxLjQ1OTU3IDI0LjUyNTggMS44ODA1NCAyNC4wMDA4IDEuODgwNTRDMjMuNDc1NyAxLjg4MDU0IDIzLjA1MDEgMS40NTk1NyAyMy4wNTAxIDAuOTQwMjdDMjMuMDUwMSAwLjQyMDk3MyAyMy40NzU3IDAgMjQuMDAwOCAwWiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyKSIvPgogIDxwYXRoIGQ9Ik0yNC41NzEgMzIuNzc5MkMyOS41MzA2IDMyLjc3OTIgMzMuNTUxMiAyOC44MDI3IDMzLjU1MTIgMjMuODk3M0MzMy41NTEyIDE4Ljk5MiAyOS41MzA2IDE1LjAxNTQgMjQuNTcxIDE1LjAxNTRDMTkuNjExNCAxNS4wMTU0IDE1LjU5MDggMTguOTkyIDE1LjU5MDggMjMuODk3M0MxNS41OTA4IDI4LjgwMjcgMTkuNjExNCAzMi43NzkyIDI0LjU3MSAzMi43NzkyWiIgZmlsbD0idXJsKCNwYWludDFfcmFkaWFsKSIvPgogIDxkZWZzPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyIiB4MT0iNi40NzgzNSIgeTE9IjcuOTIiIHgyPSIzNC45MTA3IiB5Mj0iMzMuNjU5MyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjRkZDMTBCIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZCM0YyRSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQxX3JhZGlhbCIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgyMi41MjAyIDIwLjYxODMpIHJvdGF0ZSg2Ny41MTk2KSBzY2FsZSgxMy4wNTYgMTMuMTgyOSkiPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjRkZDMTBCIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZCM0YyRSIvPgogICAgPC9yYWRpYWxHcmFkaWVudD4KICA8L2RlZnM+Cjwvc3ZnPgo=",
          adapter: () => new SolflareWalletAdapter()
        })
        this.wallet = getSolflareWallet()
      }
    },
    setWallet(wallet) {
      this.wallet = wallet
    },
    setWalletSelection(selection) {
      this.walletSelection = selection
    },
    async connect() {
      try {
        this.adapter = await this.wallet.adapter()
        await this.adapter.connect()
      } catch (e) {
        console.log(e)
      }
    },
    async disconnect() {
      try {
        this.adapter.disconnect()
      } catch (e) {
        console.log(e)
      }
    }
  },
}, { persist: true })
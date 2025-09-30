import { defineStore } from 'pinia';

export const useMainStore = defineStore({
  id: 'main-store',
  state: () => {
    return {
      health: 400,
      stepHealth: 2,
      receivedData: null,
      roomID: null, 
      gameOver: false, 
      timesOut :false,
      state: 'idle',
      player: {},
    };
  },
  actions: {
    async setData (payload) {
      this.receivedData = payload;
    },

    async setRoomID (payload) {
      this.roomID = payload;
    },

    gameReset () {
      this.gameOver = false;
      this.timesOut = false;
    },

    setGameOver () {
      this.gameOver = true;
      this.timesOut = true;
    },

    setPlayerID (payload) {
      this.player.id = payload
    },

    resetPlayerID () {
      this.player.id = {}
    },

    setHealth (payload) {
      this.health = payload.health
      this.stepHealth = payload.step
    },

    decreaseHealth (payload) {
      if (typeof payload === 'number' && !isNaN(payload)) {
        this.health = Math.max(0, this.health - payload) // Prevent negative health
      }
    },

    setIdleState () {
      this.state = 'idle'
    },

    setStartGameState () {
      this.state = 'start'
    },

    setGameOverState () {
      this.state = 'over'
    },

    setWinState () {
      this.state = 'won'
    }

  },
});

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useNavbarStore, import.meta.hot));
// }

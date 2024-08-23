import { defineStore } from 'pinia';

export const useMainStore = defineStore({
  id: 'main-store',
  state: () => {
    return {
      health: 100,
      stepHealth: 1,
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
      this.health -= payload
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

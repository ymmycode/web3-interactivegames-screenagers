import { defineStore } from 'pinia';

export const useMainStore = defineStore({
  id: 'main-store',
  state: () => {
    return {
      receivedData: null,
      roomID: null, 
      gameOver: false, 
      timesOut :false,
      score: 0,
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

  },
});

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useNavbarStore, import.meta.hot));
// }

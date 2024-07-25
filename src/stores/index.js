import { defineStore } from 'pinia';

export const useMainStore = defineStore({
  id: 'main-store',
  state: () => {
    return {
      receivedData: null,
      roomID: null, 
    };
  },
  actions: {
    async setData (payload) {
      this.receivedData = payload;
    },

    async setRoomID (payload) {
      this.roomID = payload;
    }
  },
});

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useNavbarStore, import.meta.hot));
// }

// store.js
import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      showPanier: false
    }
  },
  mutations: {
    setShowPanier(state, value) {
      state.showPanier = value;
    }
  },
  actions: {
    // Déclarer les actions ici
  },
  getters: {
    // Déclarer les getters ici
  }
})


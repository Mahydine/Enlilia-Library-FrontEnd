// store.js
import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      showPanier: false,
      isLoggedIn: false,
      isMenuOpen: false,
      panier: [],
      user: [],
      nbLivresInPanier: 0,
    }
  },
  mutations: {
    updateLoginState(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    setShowPanier(state, value) {
      state.showPanier = value;
    },
    setPanier(state, value) {
      state.panier = value;
    },
    setUser(state, value) {
      state.user = value;
    },
    setNbLivresInPanier(state, value) {
      state.nbLivresInPanier = value;
    },
    toggleMenu(state, value) {
      state.isMenuOpen = value;
    },
  },
  actions: {
    async checkLoginStatus({ commit }) {
      const accessToken = localStorage.getItem('accessToken');
      try {
        const response = await fetch("http://127.0.0.1:8000/islogged/", { method: "GET", credentials: 'include', headers: { 'Authorization': `Bearer ${accessToken}` } });
        const data = await response.json();
        commit('updateLoginState', (data.logged) ? true : false);
      } catch (error) {
        console.error("Erreur d'accès à l'API", error);
      }
    },

    async getPanier({ commit }) {
      const accessToken = localStorage.getItem('accessToken');
      try {
        const response = await fetch("http://127.0.0.1:8000/panier/", {
          method: "GET",
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        const panier = await response.json();

        if (Array.isArray(panier.livres)) {
          commit('setPanier', panier.livres);
        }

        commit('setNbLivresInPanier', (panier.livres.length > 0) ? panier.livres.length : 0);

      } catch (error) {
        console.error("Erreur d'accès à l'API", error);
      }
    },

    async getUserData({ commit }) {
      const accessToken = localStorage.getItem('accessToken');
      try {
        const response = await fetch("http://127.0.0.1:8000/user/profile/", {
          method: "GET",
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        const user = await response.json();

        if (user) {
          commit('setUser', user);
        }

      } catch (error) {
        console.error("Erreur d'accès à l'API", error);
      }
    },
  },
  getters: {
    // Déclarer les getters ici
  }
})


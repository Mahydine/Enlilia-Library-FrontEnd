<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<script>
import PanierComponent from "@/components/PanierComponent.vue";

export default {
  async created() {
    try {
      await this.$store.dispatch('checkLoginStatus');
      await this.$store.dispatch('getPanier');
      await this.$store.dispatch('getUserData');
    } catch (error) {
      console.error("Une erreur est survenue lors de l'initialisation", error);
    }
  },

  components: {
    PanierComponent,
  },
}
</script>

<template>
  <PanierComponent v-if="this.$store.state.showPanier" />
  <RouterView />
</template>

<style>
body {
  font-family: 'GTWalsheimPro', sans-serif !important;
  overflow-x: hidden;
}

.custom-bg-success {
  color: #2dd343 !important;
  background-color: rgba(0, 255, 21, 0.205) !important;

}

.custom-bg-info {
  color: #ce9907 !important;
  background-color: rgba(255, 136, 0, 0.205) !important;
}

.custom-bg-dark {
  color: #6b6b6b !important;
  background-color: rgba(26, 26, 26, 0.205) !important;
}

.custom-bg-blue {
  color: #00e7d8 !important;
  background-color: rgba(0, 255, 204, 0.205) !important;
}

.custom-bg-danger {
  color: rgb(161, 20, 20) !important;
  background-color: #e73c3c96 !important;
}

.custom-badge {
  font-size: clamp(9px, 0.7vw, 11px) !important;
  font-weight: 700;
  color: white;
  display: inline-block;
  padding: 10px 10px;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 15px;
  width: 100%;
}

@font-face {
  font-display: swap;
  font-family: GTWalsheimPro;
  font-weight: 300;
  src: url(https://25344453.fs1.hubspotusercontent-eu1.net/hubfs/25344453/Font/Regular/otf/GT-Walsheim-Light.otf) format("opentype"), url(https://25344453.fs1.hubspotusercontent-eu1.net/hubfs/25344453/Font/Regular/ttf/GT-Walsheim-Light.ttf) format("truetype")
}

@font-face {
  font-display: swap;
  font-family: GTWalsheimPro;
  font-weight: 400;
  src: url(https://25344453.fs1.hubspotusercontent-eu1.net/hubfs/25344453/Font/Regular/otf/GT-Walsheim-Regular.otf) format("opentype"), url(https://25344453.fs1.hubspotusercontent-eu1.net/hubfs/25344453/Font/Regular/ttf/GT-Walsheim-Regular.ttf) format("truetype")
}

@font-face {
  font-display: swap;
  font-family: GTWalsheimPro;
  font-weight: 500;
  src: url(https://25344453.fs1.hubspotusercontent-eu1.net/hubfs/25344453/Font/Regular/otf/GT-Walsheim-Medium.otf) format("opentype"), url(https://25344453.fs1.hubspotusercontent-eu1.net/hubfs/25344453/Font/Regular/ttf/GT-Walsheim-Medium.ttf) format("truetype")
}

@font-face {
  font-display: swap;
  font-family: GTWalsheimPro;
  font-weight: 700;
  src: url(https://25344453.fs1.hubspotusercontent-eu1.net/hubfs/25344453/Font/Regular/otf/GT-Walsheim-Bold.otf) format("opentype"), url(https://25344453.fs1.hubspotusercontent-eu1.net/hubfs/25344453/Font/Regular/ttf/GT-Walsheim-Bold.ttf) format("truetype")
}

@font-face {
  font-display: swap;
  font-family: GTWalsheimPro;
  font-weight: 800;
  src: url(https://25344453.fs1.hubspotusercontent-eu1.net/hubfs/25344453/Font/Regular/otf/GT-Walsheim-Black.otf) format("opentype")
}
</style>

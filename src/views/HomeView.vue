<template>
  <NavBar />
  <section id="acceuil">
    <div id="accueil-content">
      <img src="@/assets/images/enlilia_dotted_face.webp" alt="enlilia_dotted_face" class="enlilia_dotted_face">
      <div style="z-index: 0;">
        <h1>broco-lis</h1>
        <h4>Commandez vos livres Facilement</h4>
        <!-- <p>Enlilia, votre partenaire de confiance pour des livraisons qui allient rapidité et qualité. Nous mettons
          la route au service de votre satisfaction.</p> -->
        <router-link class="acceuil-btn" to="/boutique">Boutique</router-link>
      </div>
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" id="scroll-down-button" data-name="Calque 1" viewBox="0 0 85.62 32.34">
      <a xlink:href="#about">
        <path id="scroll-down-button"
          d="M0,32.34c4.48-.82,7.33-3.54,9.8-6.52,3.22-3.89,6.13-7.97,9.27-11.92,3.1-3.89,6.46-7.58,11.05-10.29C35.76.28,41.9-.76,48.54.55c5.14,1.01,9.15,3.62,12.6,6.95,3.76,3.64,6.51,7.87,9.53,11.94,1.91,2.58,3.85,5.17,5.99,7.61,1.91,2.18,4.31,3.94,7.42,4.83.51.15,1.04.25,1.55.45H0Z" />
        <path xmlns="http://www.w3.org/2000/svg" id="arrow_up-_337_" data-name="arrow_up-[#337]" class="cls-2"
          d="M34.88,13.64h0c-.32.34-.32.88,0,1.22l6.89,7.14c.65.67,1.71.67,2.36,0l6.94-7.19c.32-.33.33-.87,0-1.21-.32-.35-.86-.35-1.19,0l-6.35,6.58c-.33.34-.85.34-1.18,0l-6.3-6.53c-.32-.34-.85-.34-1.18,0" />
      </a>
    </svg>
  </section>

</template>

<script>
import NavBar from "@/components/NavBarComponent.vue";

export default {
  data() {
    return {
    };
  },

  components: {
    NavBar,
  },


  mounted() {
    this.$store.commit('setShowPanier', false);
  },

  methods: {

  }
};
</script>

<style scoped>
section {
  padding: 40px 10px 40px 10px;
  margin-right: auto;
  margin-left: auto;
  max-width: 1920px;
}

#acceuil {
  background-position: center;
  background-size: cover;
  height: 80vh;
  margin-top: 70px;
  max-height: 1080px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  background: linear-gradient(#276ecb, #003f91);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.enlilia_dotted_face {
  position: absolute;
  right: 0;
  bottom: 0;
  width: auto !important;
  height: 100vh !important;
  object-fit: cover;
}

#accueil-content {
  display: flex;
  flex-direction: row;
  align-content: center;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 80vw;
}

#accueil-content img {
  width: clamp(200px, 28vw, 600px);
}

#accueil-content div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#accueil-content div h1 {
  font-size: clamp(17px, 3vw, 70px);
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  text-align: center;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  margin-bottom: -5px;
}

#accueil-content div h4 {
  font-size: clamp(12px, 2vw, 60px);
  color: #ffffff;
  margin-bottom: 20px;
  font-weight: 500;
  text-transform: capitalize;
  text-align: center;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
}

#accueil-content div p {
  color: #ffffff;
  margin-bottom: 10px;
  padding: 0px 30px;
  font-size: clamp(12px, 1vw, 60px);
  text-align: center;
  margin-bottom: 40px;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
}

.acceuil-btn {
  color: var(--dark-text-color);
  font-size: clamp(10px, 1.5vw, 16px);
  padding: 10px 58px;
  display: flex;
  transition: 0.5s;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid var(--button-color);
  border-radius: 30px;
  background-color: white;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

#scroll-down-button {
  position: absolute;
  bottom: -1px;
  margin: auto;
  width: 100px;
  height: auto;
}

#scroll-down-button path:first-child {
  fill: #ffffff;
}

#scroll-down-button path:last-child {
  fill: #000000;
  fill-rule: evenodd;
  stroke: #000000;
  stroke-miterlimit: 10;
  padding-bottom: 20px;
  animation: jumpInfinite 1.5s infinite;
}

@media screen and (max-width: 900px) {
  #acceuil {
    margin-top: 0;
  }
}
</style>
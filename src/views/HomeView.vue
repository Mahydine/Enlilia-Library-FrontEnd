<template>
  Accueil
</template>

<script>

export default {
  data() {
    return {
      livres: [],
    };
  },

  mounted() {
    this.getLivres();
  },

  methods: {
    async getLivres() {
      try {
        const response = await fetch("http://127.0.0.1:8000/livres/", { method: "GET", credentials: 'include' });
        const livres = await response.json();

        console.log(livres);

        if (Array.isArray(livres)) {
          this.livres = livres;
        }

      } catch (error) {
        console.error("Erreur d'accès à l'API", error);
      }
    },

  }
};

</script>

<style scoped></style>
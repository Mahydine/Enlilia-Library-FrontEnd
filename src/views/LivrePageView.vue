<template>
    <NavBar />
    <section id="container">
        <h1>Details : </h1>
        <div v-if="livreDetail"
            class="g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
            id="livre-detail">
            <div class="cover-wrapper">
                <img :src="livreDetail.couverture" class="card-img-top" :alt="livreDetail.titre">
            </div>
            <div class="col p-4 d-flex flex-column position-static">
                <strong class="d-inline-block mb-2 text-success-emphasis">{{ livreDetail.auteur }}</strong>
                <h3 class="mb-0">{{ livreDetail.titre }}</h3>
                <div class="mb-1 text-body-secondary">{{ livreDetail.date_sortie }}</div>
                <p class="mb-auto">{{ livreDetail.description }}</p>
                <h3 style="width: 100%; text-align: end;">{{ livreDetail.prix }}€</h3>
                <a href="#" @click="ajouterAuPanier(livreDetail.id)" style="position: relative;">Ajouter au panier</a>
            </div>
        </div>
    </section>
</template>

<script>
import NavBar from "@/components/NavBarComponent.vue";

export default {
    data() {
        return {
            livreId: null,
            livreDetail: null,
            alreadyInPanier: null,
        };
    },

    components: {
        NavBar,
    },

    async mounted() {
        this.livreId = this.$route.params.livre_id;
        await this.getLivreById();
        await this.isAlreadyInPanier();
        this.$store.commit('toggleMenu', false);
    },

    methods: {
        async getLivreById() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/livres/${this.livreId}/`, { method: "GET", credentials: 'include', headers: { 'Authorization': `` } });
                const livre = await response.json();

                this.livreDetail = livre;


            } catch (error) {
                console.error("Erreur d'accès à l'API", error);
            }
        },

        async isAlreadyInPanier() {
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await fetch(`http://127.0.0.1:8000/panier/alreadyInPanier/`, {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        livre_id: this.livreDetail.id
                    }),
                });

                const data = await response.json();

                if (data.alreadyInPanier) {
                    this.alreadyInPanier = data.alreadyInPanier;
                }

            } catch (error) {
                console.error("Erreur d'accès à l'API", error);
            }
        },

        async ajouterAuPanier(livre_id) {
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await fetch(`http://127.0.0.1:8000/panier/ajouter/`, {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        livre_id: livre_id
                    }),
                });

                const data = await response.json();

                if (data.successMsg) {
                    this.successMsg = data.successMsg;
                    await this.$store.dispatch('getPanier');
                }

                this.errorMsg = data.errorMsg;


            } catch (error) {
                console.error("Erreur d'accès à l'API", error);
            }
        },

    }
};
</script>

<style scoped>
#container {
    margin: 10%;
}

#livre-detail {
    display: flex;
}

.card-img-top {
    object-fit: contain;
    padding: 0.5rem;
    width: 100%;
    height: 300px;
    transition: 0.2s ease-in-out;
    filter: drop-shadow(0 0 0.75rem rgb(0, 0, 0, 0.1));
}

@media screen and (max-width: 900px) {
    #livre-detail {
        flex-direction: column;
        /* scale: 0.8; */

    }

    .card-img-top {
        object-fit: contain;
        padding: 0.5rem;
        width: 100%;
        height: auto;
        transition: 0.2s ease-in-out;
        filter: drop-shadow(0 0 0.75rem rgb(0, 0, 0, 0.1));
    }

    #container {
        margin: 10%;
        margin-top: 80px;
    }
}

@media screen and (max-width: 770px) {
    #livre-detail {
        max-width: 400px;
        margin: auto;
    }

}
</style>
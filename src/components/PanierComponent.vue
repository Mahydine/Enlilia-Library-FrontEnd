<template>
    <div id="panier" class="col-md-5 col-lg-4 order-md-last">
        <button @click="this.$store.commit('setShowPanier', !this.$store.state.showPanier)" class="btn-close"
            style="position: absolute; right: 10px; top: 10px"></button>
        <h4 class="d-flex justify-content-between align-items-center mb-3" style="margin-top: 25px;">
            <span class="text-primary">Votre Panier :</span>
            <span class="badge bg-primary rounded-pill">{{ this.$store.state.nbLivresInPanier }}</span>
        </h4>
        <ul v-if="this.$store.state.nbLivresInPanier > 0" class="list-group mb-3">
            <li v-for="ligne in this.$store.state.panier" :key="ligne.livre.id"
            class="list-group-item d-flex justify-content-between lh-sm"
            style="display: flex; align-items: center;">
            <div style="display: flex;">
                <img :src="ligne.livre.couverture" class="cart-livre-img" :alt="ligne.livre.titre">
                <div>
                    <h6 class="my-0">{{ ligne.livre.titre }}</h6>
                    <small class="text-body-secondary">{{ ligne.livre.auteur }}</small>
                </div>
            </div>
            
            <div style="display: flex; align-items: center;">
                <span class="text-body-secondary">{{ ligne.livre.prix }}€</span>
                <img class="delete-icon" src="@/assets/images/delete-icon.svg"
                @click="deleteFromPanier(ligne.livre.id)" alt="profil page">
                <span class="badge bg-primary rounded-pill">{{ ligne.quantite }}</span>
                </div>
            </li>
        </ul>
        <p v-else>Panier vide</p>
        <li class="list-group-item d-flex justify-content-between">
            <span>Total :</span>
            <strong>{{ totalPrix }}€</strong>
        </li>
        <button type="button" class="btn btn-success"
            style="width: fit-content; padding-left: 50px; padding-right: 50px; margin: auto; margin-top: 25px; float: inline-end;">Acheter</button>
    </div>
</template>

<script>

export default {
    name: "PanierView",

    data() {
        return {
            errorMsg: '',
            successMsg: '',
        };
    },

    async mounted() {
        await this.$store.dispatch('getPanier');
    },

    computed: {
        totalPrix() {
            const panier = this.$store.state.panier;
            return panier.reduce((total, ligne) => total + (parseFloat(ligne.livre.prix) * ligne.quantite), 0).toFixed(2);
        }
    },


    methods: {
        async deleteFromPanier(livre_id) {
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await fetch(`http://127.0.0.1:8000/panier/retirer/`, {
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

                await this.$store.dispatch('getPanier');


            } catch (error) {
                console.error("Erreur d'accès à l'API", error);
            }
        },
    }
};

</script>

<style scoped>
#panier {
    z-index: 1000;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 0.375rem;
    box-shadow: 0px 0px 150px 9px rgb(0 0 0 / 10%);
    border: 2px solid #00000014;
    width: clamp(150px, 80vw, 590px);
}

.cart-livre-img {
    width: 25px;
    margin-right: 5px;
    object-fit: contain;
}

.delete-icon {
    filter: invert(0.8);
    width: 25px;
    margin-left: 5px;
    object-fit: contain;
}

.delete-icon:hover {
    filter: invert(0.2);
}

.btn-success {
    background-color: #2cb978;
    border-color: #00854712;
}

.list-group {
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 50vh;
}
</style>
<template>
    <div id="dashboard">
        <SideBarShop />
        <OpenMenuComponent />
        <div id="dashboard-right-panel">
            
            <a href="#" @click="this.$store.commit('setShowPanier', !this.$store.state.showPanier)"
                class="cart-img"><img class="profil-img" src="@/assets/images/cart_icon.svg"
                    alt="profil page"><span class="badge bg-primary rounded-pill panier-number">{{
                this.$store.state.nbLivresInPanier }}</span></a>

            <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" style="margin: 50px;">
                <input type="search" class="form-control" placeholder="Rechercher..."
                    style="width: fit-content; margin-left: 50px;" aria-label="Search" v-model="recherche">
            </form>

            <div class="alert alert-dismissible alert-danger" v-if="errorMsg">
                <button type="button" class="btn-close" data-bs-dismiss="alert" @click="this.errorMsg = ''"></button>
                <strong>Erreur : </strong>{{ errorMsg }}
            </div>
            <div class="alert alert-dismissible alert-success" v-if="successMsg">
                <button type="button" class="btn-close" data-bs-dismiss="alert" @click="this.successMsg = ''"></button>
                <strong>Succès : </strong>{{ successMsg }}
            </div>

            <div class="livres-shop">
                <div v-for="livre in livresFiltres" :key="livre.id" class="card livre-card"
                    style="max-width: 18rem; font-size: clamp(5px, 1vw, 12px);">
                    <div class="cover-wrapper">
                        <router-link :to="{ name: 'LivrePageView', params: { livre_id: livre.id } }"><img
                                :src="livre.couverture" class="card-img-top" :alt="livre.titre"></router-link>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ livre.titre }}</h5>
                        <p class="card-text livre-description">{{ livre.description }} <span
                                style="opacity: 0.5;"><strong>{{ livre.auteur }}</strong> - {{ livre.date_sortie
                                }}</span></p>
                        <button class="btn btn-primary" @click="ajouterAuPanier(livre.id)">
                            <img src="@/assets/images/cart-add.svg"
                                style="width: 20px; object-fit: contain; filter: invert(1); margin-bottom: 1px; margin-right: 5px;"
                                alt="add to cart">
                            <span style="font-size: small; margin-left: 5px;">{{ livre.prix }} €</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import SideBarShop from "@/components/SideBarShopComponent.vue";
import OpenMenuComponent from "@/components/OpenMenuComponent.vue";
export default {
    name: "shop",

    data() {
        return {
            livres: [],
            recherche: '',

            showPanier: false,

            errorMsg: '',
            successMsg: '',
        };
    },

    mounted() {
    },

    async mounted() {
        this.$store.commit('setShowPanier', false);
        await this.getLivres();
        await this.$store.dispatch('getPanier');
        this.$store.dispatch('checkLoginStatus').then(() => {
            console.log(this.$store.state.isLoggedIn);
            if (!this.$store.state.isLoggedIn)
                this.$router.push('/connexion');
        });
        this.$store.commit('toggleMenu', false);
    },

    components: {
        SideBarShop,
        OpenMenuComponent,
    },

    computed: {
        livresFiltres() {
            return this.livres.filter(livre => livre.titre.toLowerCase().includes(this.recherche.toLowerCase()));
        }
    },

    methods: {
        async getLivres() {
            try {
                const response = await fetch("http://127.0.0.1:8000/livres/", { method: "GET", credentials: 'include', headers: { 'Authorization': `` } });
                const livres = await response.json();

                if (Array.isArray(livres)) {
                    this.livres = livres;
                    console.log(this.livres);
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
}
</script>

<style scoped>
#dashboard {
    display: flex;
    min-height: 100vh;
    overflow-x: hidden;
}

#dashboard-right-panel {
    display: flex;
    flex-direction: column;
    flex: 3;
}

#dashboard-component {
    display: flex;
    flex-direction: column;
    padding: 31px 50px 100px 50px;
    background-color: #f8f8f8;
    overflow: hidden;
}

.alert {
    position: fixed;
    width: 50vw;
    z-index: 100;
    left: 50%;
    top: 2%;
    transform: translateX(-50%);
}
.cart-img{
    position: absolute;
    right: 0;
    top: 0;
    margin: 15px;
}

.profil-img {
    width: clamp(35px, 5vw, 55px);
    object-fit: contain;
}

.livres-shop {
    padding: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 20px;
    max-width: 100%;
    margin: 0 auto;
}

.card-img-top {
    object-fit: contain;
    padding: 0.5rem;
    width: 100%;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: 0.2s ease-in-out;
    filter: drop-shadow(0 0 0.75rem rgb(0, 0, 0, 0.1));
}

.card-img-top:hover {
    filter: drop-shadow(0 0 0.75rem rgb(0, 0, 0, 0.3));
    padding: 0.15rem;
    z-index: 20;
}

.card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.cover-wrapper {
    border-color: #f0f0f0;
    position: relative;
    width: 100%;
    padding-bottom: 300px;
}

.livre-description {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
}


@media screen and (max-width: 900px) {
    #dashboard-left-panel {
        height: 100%;
        position: absolute;
        top: -100%;
        z-index: 2;
    }
}
</style>
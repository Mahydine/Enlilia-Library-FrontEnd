<template>
    <div id="panier" class="col-md-5 col-lg-4 order-md-last" style="width: 350px">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Your cart</span>
            <span class="badge bg-primary rounded-pill">3</span>
        </h4>
        <ul class="list-group mb-3">
            <li v-for="livre in panier" class="list-group-item d-flex justify-content-between lh-sm">
                <img :src="livre.couverture" class="cart-livre-img" :alt="livre.titre">
                <div>
                    <h6 class="my-0">{{ livre.titre }}</h6>
                    <small class="text-body-secondary">{{ livre.auteur }}</small>
                </div>
                <span class="text-body-secondary">{{ livre.prix }}€</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
                <span>Total :</span>
                <strong>{{ totalPrix }}€</strong>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: "PanierView",

    data() {
        return {
            panier: [],
            errorMsg: '',
            successMsg: '',
        };
    },

    mounted() {
        this.getPanier();
    },

    computed: {
        totalPrix() {
            return this.panier.reduce((total, livre) => total + parseFloat(livre.prix), 0).toFixed(2);
        }
    },

    methods: {
        async getPanier() {
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
                    this.panier = panier.livres;
                }

            } catch (error) {
                console.error("Erreur d'accès à l'API", error);
            }
        },
    }
};

</script>

<style scoped>
#panier{
    z-index: 1000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 0.375rem;
}

.cart-livre-img {
    width: 25px;
    margin-right: 5px;
    object-fit: contain;
}
</style>
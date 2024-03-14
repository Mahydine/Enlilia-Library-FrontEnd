<template>
    <header class="p-3 text-bg-dark">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><router-link to="/" class="nav-link px-2 text-white">Accueil</router-link></li>
                </ul>

                <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                    <input type="search" class="form-control form-control-dark text-bg-dark" placeholder="Search..."
                        aria-label="Search">
                </form>

                <div class="text-end">
                    <template v-if="isLoggedIn">
                        <router-link type="button" class="btn btn-outline-light me-2"
                            to="/connexion">Connexion</router-link>
                        <router-link type="button" class="btn btn-warning" to="/inscription">Inscription</router-link>
                    </template>
                    <template v-else style="display: flex; align-items: center;">
                        <router-link to="/panier"><img class="profil-img" src="@/assets/images/cart_icon.svg"
                                alt="profil page"></router-link>
                        <router-link to="/profil"><img class="profil-img" src="@/assets/images/user_icon.svg"
                                alt="profil page"></router-link>
                    </template>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "navbar",

    data() {
        return {
            isLoggedIn: false,
        };
    },

    async mounted() {
        await this.isLogged();
    },

    methods: {
        async isLogged() {
            try {
                const response = await fetch("http://127.0.0.1:8000/islogged/", { method: "GET", credentials: 'include' });
                const logged = await response.json();

                this.isLoggedIn = logged;

            } catch (error) {
                console.error("Erreur d'accès à l'API", error);
            }
        },
    }
};
</script>

<style scoped>
.profil-img {
    width: 35px;
    height: 35px;
    object-fit: contain;
}

.text-end a {
    margin: 0px 10px;
}
</style>
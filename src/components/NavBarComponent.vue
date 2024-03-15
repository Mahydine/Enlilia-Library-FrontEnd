<template>
    <nav>
        <div class="first-part-nav">
            <div class="logo">
                <router-link to="/"><img class="profil-img" src="@/assets/images/enlilia-logo.png"
                        alt="profil page"></router-link>
            </div>

            <router-link to="/">Accueil</router-link>
            <router-link to="/boutique">Boutique</router-link>
        </div>

        <div>
            <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
            </form>

            <div v-if="!isLoggedIn">
                <router-link type="button" class="btn btn-outline-light me-2" to="/connexion">Connexion</router-link>
                <router-link type="button" class="btn btn-warning" to="/inscription">Inscription</router-link>
            </div>

            <div v-else style="display: flex; align-items: center;" class="">
                <a href="#"><img class="profil-img" src="@/assets/images/cart_icon.svg" alt="profil page"
                        @click="this.$store.commit('setShowPanier', !this.$store.state.showPanier)"></a>
                <router-link to="/profil"><img class="profil-img" src="@/assets/images/user_icon.svg"
                        alt="profil page"></router-link>
            </div>
        </div>
    </nav>
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
        console.log(this.isLoggedIn);
    },


    methods: {
        async isLogged() {
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await fetch("http://127.0.0.1:8000/islogged/", { method: "GET", credentials: 'include', headers: { 'Authorization': `Bearer ${accessToken}` } });
                const logged = await response.json();

                this.isLoggedIn = logged;
                console.log(isLoggedIn);

            } catch (error) {
                console.error("Erreur d'accès à l'API", error);
            }
        },
    }
};
</script>

<style scoped>
nav {
    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    padding: 0 5%;
    /* box-shadow: 0 1px 158px rgb(255 0 129 / 10%); */
    border-bottom: 1px solid #ed5ca521;
}

nav div {
    display: flex;
    align-items: center;
    justify-content: center;
}

nav .logo a {
    font-size: 25px;
    color: var(--primary-color);
    font-weight: 500;
}

a {
    text-decoration: none;
    color: var(--primary-color);
    font-weight: 500;
}

.first-part-nav a {
    margin: 0px 30px;

}

::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-thumb {
    background-color: #ccc;
}

.btn-login {
    color: #ffffff;
    font-size: 16px;
    padding: 6px 12px;
    display: flex;
    transition: 0.5s;
    font-weight: 600;
    text-decoration: none;
    border: 1px solid var(--button-color);
    border-radius: 30px;
    background-color: var(--link-color);
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.btn-login:hover {
    background-color: var(--primary-color);
    color: #fff;
    cursor: pointer;
}

.profil-img {
    width: 35px;
    object-fit: contain;
}

div a img {
    margin: 0px 10px;
}
</style>
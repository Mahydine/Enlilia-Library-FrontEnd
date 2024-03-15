<template>
    <OpenMenuComponent />
    <nav :class="{ 'menu-open': this.$store.state.isMenuOpen }">
        <div class="first-part-nav">
            <div class="logo">
                <router-link to="/"><img class="profil-img" src="@/assets/images/enlilia-logo.png"
                        alt="profil page"></router-link>
            </div>

            <router-link to="/">Accueil</router-link>
            <router-link to="/boutique">Boutique</router-link>
        </div>

        <div class="second-part-nav">
            <button class="btn-close" style="position: absolute; right: 10px; top: 10px;"
                @click="this.$store.commit('toggleMenu', false);"></button>
            <div class="logo-second">
                <router-link to="/"><img class="profil-img" src="@/assets/images/enlilia-logo.png"
                        alt="profil page"></router-link>
            </div>

            <div v-if="!this.$store.state.isLoggedIn" class="second-part-a">
                <router-link type="button" class="btn btn-outline-light me-2" to="/connexion">Connexion</router-link>
                <router-link type="button" class="btn btn-warning" to="/inscription">Inscription</router-link>
            </div>

            <div v-else style="display: flex; align-items: center;" class="icons">
                <a href="#" @click="this.$store.commit('setShowPanier', !this.$store.state.showPanier)"
                    style="position: relative;">
                    <img class="profil-img" src="@/assets/images/cart_icon.svg" alt="profil page">
                    <span class="badge bg-primary rounded-pill panier-number">{{ this.$store.state.nbLivresInPanier
                        }}</span>
                </a>
                <router-link to="/profil"><img class="profil-img" src="@/assets/images/user_icon.svg"
                        alt="profil page"></router-link>
            </div>
        </div>
    </nav>
</template>

<script>
import OpenMenuComponent from "@/components/OpenMenuComponent.vue";

export default {
    name: "navbar",

    components: {
        OpenMenuComponent,
    },

    data() {
        return {
            isLoggedIn: false,
        };
    },

    mounted() {
        this.isLoggedIn = this.$store.state.isLoggedIn
    },

    methods: {
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
    z-index: 10;
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

.panier-number {
    position: absolute;
    right: 0;
    top: 0;
}

.logo-second {
    display: none;
}

.btn-close {
    display: none;
}

.menu-open {
    left: 0;
}

@media screen and (max-width: 900px) {
    nav {
        position: absolute;
        height: 100vh;
        width: 30vw;
        display: flex;
        flex-direction: column-reverse;
        justify-content: space-around;
        transition: 0.2s ease-in-out;
        left: -100%;
    }

    .first-part-nav a {
        margin-top: 30px;
        margin-bottom: 10px;
    }

    .second-part-a {
        margin-top: 30px;
        margin-bottom: 10px;
        flex-direction: column;
    }

    .second-part-a a {
        margin-bottom: 10px;
    }

    .first-part-nav {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        flex: 1;
        width: 100%;
    }

    .second-part-nav {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
    }

    .logo {
        display: none;
    }

    .btn-close {
        display: block;
    }

    .logo-second {
        display: block;
        margin: 10px;
    }

    .icons {
        justify-content: space-around;
        width: 100%;
    }
}
</style>
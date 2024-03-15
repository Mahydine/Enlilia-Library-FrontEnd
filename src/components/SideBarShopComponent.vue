<template>
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-light side-bar" style="width: 280px;">

        <div class="logo-header" style="display: flex; align-items: flex-end;">
            <router-link to="/"><img class="profil-img" src="@/assets/images/enlilia-logo.png"
                    alt="profil page"></router-link>
            <router-link to="/" class="nav-link link-dark"
                style="margin-left: 10%; margin-bottom: 7px !important; font-size: clamp(18px, 3vw, 30px);">Boutique</router-link>
        </div>

        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <router-link to="/" class="nav-link active" aria-current="page">
                    Home
                </router-link>
            </li>
        </ul>
        <hr>
        <div class="bottom-sidebar">
            <span>Pseudonyme</span>
            <div>
                <a href="#"><img class="profil-img" src="@/assets/images/cart_icon.svg"
                        alt="profil page" @click="this.$store.commit('setShowPanier', !this.$store.state.showPanier)"></a>
                <router-link to="/profil"><img class="profil-img" src="@/assets/images/user_icon.svg"
                        alt="profil page"></router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.side-bar {
    background-color: #f6f6f7 !important;
    height: 100vh;
    position: sticky;
    top: 0;
}

.bottom-sidebar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
}

.bottom-sidebar img {
    width: 35px;
    object-fit: contain;
    margin: 0px 5px;
}

.profil-img {
    width: clamp(35px, 5vw, 55px);
    object-fit: contain;
}
</style>
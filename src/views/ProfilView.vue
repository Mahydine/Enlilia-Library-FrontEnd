<template>
    <NavBar />
    <div class="bg-body-tertiary p-5 rounded profil">
        <h1>Bonjour {{ this.$store.state.user.username }}</h1>
        <a @click="logout" class="btn  btn-primary" role="button">Deconnexion</a>
    </div>
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
        this.$store.commit('toggleMenu', false);
    },

    methods: {
        logout() {
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');

            // faire recalculer au store la valeur : 
            this.$store.dispatch('checkLoginStatus').then(() => {
                this.$router.push('/connexion');
            });
        }
    }
};

</script>

<style scoped>
.profil {
    max-width: 50vw;
    margin: 150px auto;
    text-align: center;
}

.profil h1{
    padding-bottom: 20px;
}
</style>
<template>
    <NavBar />
    <form @submit.prevent="handleSubmit" class="form-log">
        <legend>Connexion</legend>
        <label class="form-label mt-2" for="identifiant">Identifiant :</label>
        <input type="text" id="identifiant" class="form-control" v-model="username"
            placeholder="Nom d'utilisateur - Adresse e-mail" required><br>

        <label for="password" class="form-label">Mot de passe :</label>
        <input type="password" id="password" placeholder="Mot de passe" v-model="password" autocomplete="off"
            class="form-control" required><br>
        <div style="display: flex; justify-content: space-around; align-items: flex-end;">
            <input class="mt-4 btn btn-info text-white" type="submit" value="Se connecter">
            <router-link to="/inscription">S'inscrire</router-link>
        </div>
    </form>
    {{ errorMsg }}
</template>



<script>
import NavBar from "@/components/NavBarComponent.vue";
export default {
    data() {
        return {
            username: '',
            password: '',
            errorMsg: '',
        };
    },
    components: {
        NavBar,
    },

    mounted() {
        this.$store.commit('setShowPanier', false);
        this.$store.dispatch('checkLoginStatus').then(() => {
            if (this.$store.state.isLoggedIn)
                this.$router.push('/');
        });
    },

    methods: {

        async handleSubmit() {

            // Trimmer les valeurs des champs
            this.username = this.username.trim();

            if (this.username == '' || this.password == '') {
                this.errorMsg = 'Veuillez compléter tout les champs'
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:8000/connexion/', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': ``,
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    }),
                });


                const data = await response.json();
                if (!response.ok) {
                    this.errorMsg = data.errorMsg || 'Erreur lors de la tentative de connexion :/';
                    throw new Error(this.errorMsg);
                }

                localStorage.setItem('refreshToken', data.refresh);
                localStorage.setItem('accessToken', data.access);

                // faire recalculer au store la valeur : 
                this.$store.dispatch('checkLoginStatus').then(() => {
                    if (this.$store.state.isLoggedIn) {
                        this.errorMsg = '';
                        this.$router.push('/');
                    } else {
                        this.errorMsg = 'Erreur lors de la tentative de connexion :/';
                        throw new Error(this.errorMsg);
                    }
                });

            } catch (error) {
                throw new Error(this.errorMsg);
            }

        },

    }
};

</script>

<style scoped></style>
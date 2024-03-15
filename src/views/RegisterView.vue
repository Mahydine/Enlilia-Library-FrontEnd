<template>
    <NavBar />
    <form @submit.prevent="handleSubmit" class="form-log">
        <legend>Inscription</legend>
        <label class="form-label mt-2" for="identifiant">Identifiant :</label>
        <input type="text" id="identifiant" class="form-control" v-model="username"
            placeholder="Nom d'utilisateur - Adresse e-mail" required><br>

        <label for="password" class="form-label">Mot de passe :</label>
        <input type="password" id="password" placeholder="Mot de passe" v-model="password" autocomplete="off"
            class="form-control" required><br>
        <label for="password" class="form-label">Confirmez le Mot de passe :</label>
        <input type="password" id="password" placeholder="Mot de passe" v-model="passwordconfirm" autocomplete="off"
            class="form-control" required><br>
            {{ errorMsg }}
            <div style="display: flex; justify-content: space-around; align-items: flex-end;">
                <input class="mt-4 btn btn-info text-white" type="submit" value="S'inscrire">
            <router-link to="/connexion">Se connecter</router-link>
        </div>

    </form>
</template>



<script>
import NavBar from "@/components/NavBarComponent.vue";
export default {
    data() {
        return {
            username: '',
            password: '',
            passwordconfirm: '',
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
        this.$store.commit('toggleMenu', false);
    },

    methods: {

        async handleSubmit() {

            // Trimmer les valeurs des champs
            this.username = this.username.trim();

            if (this.username == '' || this.password == '' || this.passwordconfirm == '') {
                this.errorMsg = 'Veuillez compléter tout les champs'
                return;
            }

            if (this.password != this.passwordconfirm) {
                this.errorMsg = 'Les mots de passe doivent être identiques.'
                return;
            }


            if (this.username.length < 3 || this.username.length > 20) {
                this.errorMsg = 'Le nom d\'utilisateur doit contenir entre 3 et 20 caractères.';
                return;
            }

            if (this.password.length < 8) {
                this.errorMsg = 'Le mot de passe doit contenir au moins 8 caractères.';
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:8000/inscription/', {
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
                    this.errorMsg = data.errorMsg || 'Erreur lors de la tentative d\'inscription';
                    throw new Error(this.errorMsg);
                }

                if (data.successMsg) {
                    this.$router.push('/connexion');
                }

            } catch (error) {
                throw new Error(this.errorMsg);
            }

        },

    }
};

</script>
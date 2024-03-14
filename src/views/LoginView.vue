<template>
    <form @submit.prevent="handleSubmit">
        <legend>Connexion</legend>
        <label class="form-label mt-2" for="identifiant">Identifiant :</label>
        <input type="text" id="identifiant" class="form-control" v-model="username"
            placeholder="Nom d'utilisateur - Adresse e-mail" required><br>

        <label for="password" class="form-label">Mot de passe :</label>
        <input type="password" id="password" placeholder="Mot de passe" v-model="password" autocomplete="off"
            class="form-control" required><br>

        <input class="custom-btn mt-4" type="submit" value="Se connecter">
    </form>
    {{ errorMsg }}
</template>



<script>

export default {
    data() {
        return {
            username: '',
            password: '',
            errorMsg: '',
        };
    },

    mounted() {
        this.getLivres();
    },

    methods: {
        async getLivres() {
            try {
                const response = await fetch("http://127.0.0.1:8000/livres/", { method: "GET", credentials: 'include' });
                const fournisseurs = await response.json();

                if (Array.isArray(fournisseurs)) {
                    this.fournisseurs = fournisseurs;
                }

            } catch (error) {
                console.error("Erreur d'accès à l'API", error);
            }
        },

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

            } catch (error) {
                throw new Error(this.errorMsg);
            }

        },
    }
};

</script>
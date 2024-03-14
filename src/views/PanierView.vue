<template>
    <div class="col-md-5 col-lg-4 order-md-last">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Your cart</span>
            <span class="badge bg-primary rounded-pill">3</span>
        </h4>
        <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 class="my-0">Product name</h6>
                    <small class="text-body-secondary">Brief description</small>
                </div>
                <span class="text-body-secondary">$12</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>$20</strong>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: "PanierView",

    data() {
        return {
            username: '',
            password: '',
            errorMsg: '',
            successMsg: '',
        };
    },

    mounted() {
        this.getFournisseurs();
    },

    methods: {
        async getFournisseurs() {
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

                this.successMsg = data.successMsg || 'success'

            } catch (error) {
                throw new Error(this.errorMsg);
            }

        },
    }
};

</script>

<style scoped></style>
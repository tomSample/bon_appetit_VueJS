<template>
    <div class="reset-co-form">
        <h1>Réinitialiser le mot de passe / Retrouver le login</h1>
        <form @submit.prevent="handleReset">
            <div>
                <label for="email">Email:</label>
                <input type="email" v-model="email" required />
            </div>
            <button type="submit">Envoyer</button>
        </form>
        <p v-if="message" :class="{ error: isError }">{{ message }}</p>
    </div>
</template>

<script>
export default {
    name: 'ResetCo',
    data() {
        return {
            email: '',
            message: '',
            isError: false,
        };
    },
    methods: {
        async handleReset() {
            try {
                const response = await fetch(`http://localhost:8080/api/utilisateurs/check-email?email=${encodeURIComponent(this.email)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Adresse email non trouvée.');
                    }
                    throw new Error('Network response was not ok');
                }
                this.message = 'Adresse email trouvée.';
                this.isError = false;
            } catch (error) {
                this.message = error.message || 'Erreur lors de la vérification de l\'adresse email.';
                this.isError = true;
                console.error('Error during email check:', error);
            }
        },
    },
};
</script>

<style scoped>
.reset-co-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.reset-co-form h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

.reset-co-form label {
    display: block;
    margin-bottom: 5px;
}

.reset-co-form input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.reset-co-form button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.reset-co-form button:hover {
    background-color: #0056b3;
}

.reset-co-form p {
    margin-top: 10px;
    font-size: 16px;
}

.reset-co-form .error {
    color: red;
}
</style>
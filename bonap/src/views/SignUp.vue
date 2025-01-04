<template>
    <div class="signup-container">
        <h2>Inscription</h2>
        <form @submit.prevent="submitSignUp">
            <div>
                <label for="username">Nom d'utilisateur:</label>
                <input type="text" id="username" v-model="signUpData.username" required />
            </div>
            <div>
                <label for="password">Mot de passe:</label>
                <input type="password" id="password" v-model="signUpData.password" required />
            </div>
            <button type="submit">S'inscrire</button>
        </form>
        <p v-if="message">{{ message }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const signUpData = ref({
    username: '',
    password: ''
});

const message = ref('');

const submitSignUp = async () => {
    try {
        // Submit new user data
        const response = await fetch('http://localhost:8080/api/connexions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: signUpData.value.username,
                password: signUpData.value.password
            })
        });

        if (!response.ok) {
            if (response.status === 409) {
                throw new Error('Nom d\'utilisateur indisponible.');
            }
            throw new Error('Erreur lors de l\'inscription.');
        }

        message.value = 'Inscription réussie !';
    } catch (error) {
        message.value = error.message || 'Erreur lors de l\'inscription.';
    }
};
</script>

<style scoped>
    .signup-container {
        max-width: 400px;
        margin: 0 auto;
        padding: 1em;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .signup-container h2 {
        text-align: center;
    }

    .signup-container form {
        display: flex;
        flex-direction: column;
    }

    .signup-container form div {
        margin-bottom: 1em;
    }

    .signup-container form label {
        margin-bottom: 0.5em;
        font-weight: bold;
    }

    .signup-container form input {
        padding: 0.5em;
        font-size: 1em;
    }

    .signup-container form button {
        padding: 0.5em;
        font-size: 1em;
        cursor: pointer;
    }

    .signup-container p {
        text-align: center;
        color: red;
    }
</style>
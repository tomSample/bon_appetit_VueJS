<template>
    <div class="login-form">
        <h2>Connexion</h2>
        <form @submit.prevent="submitLogin">
            <div class="form-group">
                <label for="login">Login :</label>
                <input type="text" id="login" v-model="loginData.login" required />
            </div>
            <div class="form-group">
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" v-model="loginData.password" required />
            </div>
            <button type="submit">Se connecter</button>
        </form>
        <p>
            <router-link to="/reset-co">Mot de passe oublié ?</router-link>
        </p>
        <div v-if="message" :class="{'message': true, 'error': isError}">{{ message }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Define the login data object with default values
const loginData = ref({
    login: '',
    password: ''
});

// Message to display the login status
const message = ref('');
const isError = ref(false);

// Method to submit the login form
const submitLogin = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/connexions/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData.value)
        });
        if (!response.ok) {
            if (response.status === 403) {
                throw new Error('Login ou mot de passe incorrect.');
            }
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        message.value = 'Connexion réussie !';
        isError.value = false;
        console.log('Connexion réussie:', data);
    } catch (error) {
        message.value = error.message || 'Erreur lors de la connexion.';
        isError.value = true;
        console.error('Error during login:', error);
    }
};
</script>

<style scoped>
.login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
}

input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 5px;
    background-color: #333;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #555;
}

.message {
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 5px;
    background-color: #e0ffe0;
    color: #006600;
}

.error {
    background-color: #ffe0e0;
    color: #660000;
}
</style>
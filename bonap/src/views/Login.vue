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
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const loginData = ref({
    login: '',
    password: ''
});

const message = ref('');
const isError = ref(false);

const submitLogin = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/connexions/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: loginData.value.login,
                password: loginData.value.password,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        // Debug (valeur de userId, role, login, iat, exp) => iat = 'token émis à' (issued at) et exp = 'token expire à' (expires at). La valeur de iat et exp représentent une heure.
        console.log('Token:', data.token); 
        await authStore.login(data.token);
        message.value = 'Connexion réussie';
        isError.value = false;
        router.push('/'); // Rediriger vers la page d'accueil ou une autre page après la connexion réussie

    } catch (error) {
        message.value = error.message || 'Erreur de connexion';
        isError.value = true;
    }
};
</script>

<style scoped>
.login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
}

.form-group input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.message {
    margin-top: 1rem;
    padding: 0.75rem;
    border-radius: 4px;
}

.error {
    background-color: #f8d7da;
    color: #721c24;
}
</style>
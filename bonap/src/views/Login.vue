<template>
    <div class="login-form">
        <h2>Connexion</h2>
        <form @submit.prevent="submitLogin">
            <div class="form-group">
                <label for="username">Login :</label>
                <input type="text" id="username" v-model="loginData.username" required />
            </div>
            <div class="form-group">
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" v-model="loginData.password" required />
            </div>
            <button type="submit" class="submit-button">Se connecter</button>
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
    username: '',
    password: ''
});

const message = ref('');
const isError = ref(false);

const submitLogin = async () => {
    try {
        await authStore.login(loginData.value.username, loginData.value.password);
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
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.submit-button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.submit-button:hover {
    background-color: #0056b3;
}

.message {
    text-align: center;
    margin-top: 20px;
}

.error {
    color: red;
}
</style>
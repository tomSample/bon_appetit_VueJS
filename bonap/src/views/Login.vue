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
/* Your styles here */
</style>
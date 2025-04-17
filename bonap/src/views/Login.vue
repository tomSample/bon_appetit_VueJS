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

        <div v-if="otpRequired">
            <h3>Saisissez votre OTP</h3>
            <form @submit.prevent="submitOTP">
                <div class="form-group">
                    <label for="otp">OTP :</label>
                    <input type="text" id="otp" v-model="otp" required />
                </div>
                <button type="submit" class="submit-button">Vérifier OTP</button>
            </form>
        </div>

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

const router = useRouter();
const authStore = useAuthStore();

const loginData = ref({
    username: '',
    password: ''
});

const otp = ref('');
const otpRequired = ref(false);
const message = ref('');
const isError = ref(false);

const submitLogin = async () => {
    try {
        // Appeler l'API pour vérifier le login et générer l'OTP
        const response = await fetch(`http://localhost:8080/api/connexions/login?login=${loginData.value.username}&password=${loginData.value.password}`, {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        // Si la connexion est réussie, demander l'OTP
        const responseData = await response.text();
        message.value = responseData; // optionnel
        isError.value = false;
        otpRequired.value = true; // Afficher le champ OTP
    } catch (error) {
        // Gérer les erreurs de connexion
        message.value = error.message || 'Erreur de connexion';
        isError.value = true;
    }
};

const submitOTP = async () => {
    try {
        // Appeler l'API pour vérifier l'OTP
        const response = await fetch(`http://localhost:8080/api/connexions/verify-otp?login=${loginData.value.username}&otp=${otp.value}`, {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        // Si l'OTP est valide, connecter l'utilisateur
        const responseData = await response.text();
        message.value = responseData; // Le message "OTP vérifié avec succès."
        isError.value = false;

        // Appeler l'API pour finaliser la connexion
        await authStore.login(loginData.value.username, loginData.value.password); // Mettre à jour l'état de connexion
        message.value = 'Connexion réussie';
        isError.value = false;

        // Rediriger l'utilisateur
        router.push('/'); // Exemple de redirection vers un tableau de bord
    } catch (error) {
        // Gérer les erreurs de vérification de l'OTP ou de connexion
        message.value = error.message || 'Erreur lors de la vérification de l’OTP ou de la connexion';
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
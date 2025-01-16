<template>
    <div class="signup-container">
        <h2>Sign Up</h2>
        <form @submit.prevent="submitSignUp">
            <div class="form-columns">
                <div class="form-column">
                    <div class="form-group">
                        <label for="username">Login:</label>
                        <input type="text" id="username" v-model="signUpData.username" required />
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" v-model="signUpData.password" required />
                    </div>
                    <div class="form-group">
                        <label for="nom">Last Name:</label>
                        <input type="text" id="nom" v-model="signUpData.nom" required />
                    </div>
                    <div class="form-group">
                        <label for="prenom">First Name:</label>
                        <input type="text" id="prenom" v-model="signUpData.prenom" required />
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" v-model="signUpData.email" required />
                    </div>
                    <div class="form-group">
                        <label for="telephone">Phone:</label>
                        <input type="text" id="telephone" v-model="signUpData.telephone" required />
                    </div>
                </div>
                <div class="form-column">
                    <div class="form-group">
                        <label for="numero">Street Number:</label>
                        <input type="text" id="numero" v-model="signUpData.numero" required />
                    </div>
                    <div class="form-group">
                        <label for="rue">Street:</label>
                        <input type="text" id="rue" v-model="signUpData.rue" required />
                    </div>
                    <div class="form-group">
                        <label for="complement">Complement:</label>
                        <input type="text" id="complement" v-model="signUpData.complement" />
                    </div>
                    <div class="form-group">
                        <label for="ville">City:</label>
                        <input type="text" id="ville" v-model="signUpData.ville" required />
                    </div>
                    <div class="form-group">
                        <label for="codePostal">Postal Code:</label>
                        <input type="text" id="codePostal" v-model="signUpData.codePostal" required />
                    </div>
                </div>
            </div>
            <input type="hidden" v-model="signUpData.role_id" />
            <button type="submit" class="submit-button">Sign Up</button>
        </form>
        <p v-if="message" class="message">{{ message }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

// Définir les données d'inscription
const signUpData = ref({
    username: '',
    password: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    numero: '',
    rue: '',
    complement: '',
    ville: '',
    codePostal: '',
    role_id: null
});

const message = ref('');
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// Récupérer le rôle à partir des métadonnées de la route lors du montage du composant
onMounted(() => {
    signUpData.value.role_id = route.meta.role;
});

// Fonction pour soumettre les données d'inscription
const submitSignUp = async () => {
    try {
        // Vérifier si les champs utilisateur sont complets
        if (!signUpData.value.nom || !signUpData.value.prenom || !signUpData.value.email || !signUpData.value.telephone || !signUpData.value.numero || !signUpData.value.rue || !signUpData.value.ville || !signUpData.value.codePostal) {
            throw new Error('Veuillez remplir tous les champs utilisateur.');
        }

        // Envoyer les données d'inscription
        await authStore.signUp({ ...signUpData.value });
        message.value = 'Inscription réussie';
        router.push('/'); // Rediriger vers la page d'accueil après l'inscription réussie
    } catch (error) {
        message.value = error.message || 'Erreur lors de l\'inscription.';
    }
};
</script>

<style scoped>
.signup-container {
    max-width: 800px;
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

.form-columns {
    display: flex;
    justify-content: space-between;
}

.form-column {
    width: 48%;
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
input[type="password"],
input[type="email"] {
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
    color: red;
}
</style>
<template>
    <div class="signup-container">
        <h2>Sign Up</h2>
        <form @submit.prevent="submitSignUp">
            <div>
                <label for="username">Login:</label>
                <input type="text" id="username" v-model="signUpData.username" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="signUpData.password" required />
            </div>
            <div>
                <label for="nom">Last Name:</label>
                <input type="text" id="nom" v-model="signUpData.nom" required />
            </div>
            <div>
                <label for="prenom">First Name:</label>
                <input type="text" id="prenom" v-model="signUpData.prenom" required />
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="signUpData.email" required />
            </div>
            <div>
                <label for="telephone">Phone:</label>
                <input type="text" id="telephone" v-model="signUpData.telephone" required />
            </div>
            <input type="hidden" v-model="signUpData.role_id" />
            <button type="submit">Sign Up</button>
        </form>
        <p v-if="message">{{ message }}</p>
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
        if (!signUpData.value.nom || !signUpData.value.prenom || !signUpData.value.email || !signUpData.value.telephone) {
            throw new Error('Veuillez remplir tous les champs utilisateur.');
        }

        // Envoyer les données d'inscription
        await authStore.signUp(signUpData.value);
        message.value = 'Inscription réussie';
        router.push('/'); // Rediriger vers la page d'accueil après l'inscription réussie
    } catch (error) {
        message.value = error.message || 'Erreur lors de l\'inscription.';
    }
};
</script>
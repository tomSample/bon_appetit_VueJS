<template>
    <div class="signup-container">
        <h2>Sign Up</h2>
        <form @submit.prevent="submitSignUp">
            <div>
                <label for="login">Login:</label>
                <input type="text" id="login" v-model="signUpData.login" required />
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
            <input type="hidden" v-model="signUpData.connexion_id" />
            <button type="submit">Sign Up</button>
        </form>
        <p v-if="message">{{ message }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const signUpData = ref({
    login: '',
    password: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    role_id: null,
    connexion_id: null // sera récupérée par la suite (plus bas)
});

const message = ref('');
const router = useRouter();
const route = useRoute();

onMounted(() => {
    // Récupérer le rôle à partir des métadonnées de la route
    signUpData.value.role_id = route.meta.role;
});

const submitSignUp = async () => {
    try {
        // Etape 1: envoyer les données à la table Connexion
        const connexionResponse = await fetch('http://localhost:8080/api/connexions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: signUpData.value.login,
                password: signUpData.value.password
            })
        });

        if (!connexionResponse.ok) {
            if (connexionResponse.status === 409) {
                throw new Error('Nom d\'utilisateur indisponible.');
            }
            throw new Error('Erreur lors de la création de la connexion.');
        }

        const connexionData = await connexionResponse.json();
        signUpData.value.connexion_id = connexionData.id; // Récupérer valeur de connexion_id

        // Etape 2: envoyer les données à la table Utilisateur
        const utilisateurResponse = await fetch('http://localhost:8080/api/utilisateurs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom: signUpData.value.nom,
                prenom: signUpData.value.prenom,
                email: signUpData.value.email,
                telephone: signUpData.value.telephone,
                role: { id: signUpData.value.role_id }, // Inclure Role (objet)
                connexion: { id: signUpData.value.connexion_id } // Inclure Connexion (objet)
            })
        });

        if (!utilisateurResponse.ok) {
            throw new Error('Erreur lors de la création de l\'utilisateur.');
        }

        router.push('/');
        message.value = 'Inscription réussie!'; // n'apparait pas => à revoir

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
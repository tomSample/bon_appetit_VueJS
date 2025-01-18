<template>
    <div class="create-restaurant-form">
        <h2>Créer un Restaurant</h2>
        <form @submit.prevent="submitRestaurant">
            <div class="form-section form-row">
                <div class="form-column">
                    <AdresseDetailsForm @address-selected="handleAddressSelected" />
                </div>
            </div>
            <div class="form-section">
                <RestaurantDetailsForm :restaurant="restaurantData" />
            </div>
            <button type="submit" class="submit-button">Créer le Restaurant</button>
        </form>
        <p v-if="message" class="message">{{ message }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import RestaurantDetailsForm from '@/components/restaurantDetailsForm.vue';
import AdresseDetailsForm from '@/components/adresseDetailsForm.vue';

const authStore = useAuthStore();
const router = useRouter();

const restaurantData = ref({
    nom: '',
    siret: '',
    nombreCouvert: 0,
    capacite: 0,
    telephone: '',
    description: '',
    delaiPreparationCommande: 0,
    photo: '',
    isOpen: true, // Utiliser un Boolean
    utilisateurId: authStore.userId, // Utiliser l'ID utilisateur dynamique
    adresse: {
        numero: '',
        rue: '',
        complement: ''
    },
    ville: {
        nom: '',
        codePostal: ''
    }
});

const message = ref('');

const handleAddressSelected = (address) => {
    restaurantData.value.adresse.numero = address.numero;
    restaurantData.value.adresse.rue = address.rue;
    restaurantData.value.adresse.complement = address.complement;
    restaurantData.value.ville.nom = address.ville;
    restaurantData.value.ville.codePostal = address.codePostal;
};

const submitRestaurant = async () => {
    try {
        if (!authStore.userId) {
            throw new Error('User ID is not defined');
        }

        const dataToSend = {
            ...restaurantData.value,
            nombreCouvert: parseInt(restaurantData.value.nombreCouvert, 10),
            capacite: parseInt(restaurantData.value.capacite, 10),
            delaiPreparationCommande: parseInt(restaurantData.value.delaiPreparationCommande, 10),
            isOpen: Boolean(restaurantData.value.isOpen),
            utilisateurId: parseInt(authStore.userId, 10), // Convertir en Integer, 10 est la base numérique
            adresse: {
                numero: restaurantData.value.adresse.numero,
                rue: restaurantData.value.adresse.rue,
                complement: restaurantData.value.adresse.complement
            },
            ville: {
                nom: restaurantData.value.ville.nom,
                codePostal: restaurantData.value.ville.codePostal
            }
        };

        console.log('Données envoyées:', JSON.stringify(dataToSend, null, 2)); // Journalisation des données envoyées
        console.log('User ID:', authStore.userId); // Journalisation de l'ID utilisateur

        const response = await fetch('http://localhost:8080/api/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create restaurant');
        }

        message.value = 'Restaurant créé avec succès';
        router.push('/owner/dashboard'); // Rediriger vers le tableau de bord après la création
    } catch (error) {
        message.value = error.message || 'Erreur lors de la création du restaurant';
    }
};
</script>

<style scoped>
.create-restaurant-form {
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

.form-section {
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

.form-row {
    display: flex;
    justify-content: space-between;
}

.form-column {
    flex: 1;
    margin-right: 10px;
}

.form-column:last-child {
    margin-right: 0;
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
input[type="number"],
textarea,
select {
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
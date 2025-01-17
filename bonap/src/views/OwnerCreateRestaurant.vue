<template>
    <div class="create-restaurant-form">
        <h2>Créer un Restaurant</h2>
        <form @submit.prevent="submitRestaurant">
            <div class="form-group">
                <label for="siret">SIRET :</label>
                <input type="text" id="siret" v-model="restaurantData.siret" required />
            </div>
            <div class="form-group">
                <label for="nom">Nom :</label>
                <input type="text" id="nom" v-model="restaurantData.nom" required />
            </div>
            <div class="form-group">
                <label for="nombreCouvert">Nombre de Couverts :</label>
                <input type="number" id="nombreCouvert" v-model="restaurantData.nombreCouvert" required />
            </div>
            <div class="form-group">
                <label for="capacite">Capacité :</label>
                <input type="number" id="capacite" v-model="restaurantData.capacite" required />
            </div>
            <div class="form-group">
                <label for="telephone">Téléphone :</label>
                <input type="text" id="telephone" v-model="restaurantData.telephone" required />
            </div>
            <div class="form-group">
                <label for="photo">Photo :</label>
                <input type="file" id="photo" @change="handleFileUpload" />
            </div>
            <div class="form-group">
                <label for="description">Description :</label>
                <textarea id="description" v-model="restaurantData.description" required></textarea>
            </div>
            <div class="form-group">
                <label for="isOpen">Ouvert :</label>
                <input type="checkbox" id="isOpen" v-model="restaurantData.isOpen" />
            </div>
            <div class="form-group">
                <label for="delaiPreparationCommande">Délai de Préparation des Commandes (minutes) :</label>
                <input type="number" id="delaiPreparationCommande" v-model="restaurantData.delaiPreparationCommande" required />
            </div>
            <div class="form-group">
                <label for="typeCuisine">Type de Cuisine :</label>
                <select id="typeCuisine" v-model="selectedTypeCuisineId" required>
                    <option v-for="type in typesCuisine" :key="type.id" :value="type.id">{{ type.nom }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="adresse">Adresse :</label>
                <input type="text" id="numero" v-model="adresseData.numero" placeholder="Numéro" required />
                <input type="text" id="rue" v-model="adresseData.rue" placeholder="Rue" required />
                <input type="text" id="complement" v-model="adresseData.complement" placeholder="Complément" />
            </div>
            <div class="form-group">
                <label for="ville">Ville :</label>
                <input type="text" id="villeNom" v-model="villeData.nom" placeholder="Ville" required />
                <input type="text" id="codePostal" v-model="villeData.codePostal" placeholder="Code Postal" required />
            </div>
            <button type="submit" class="submit-button">Créer le Restaurant</button>
        </form>
        <p v-if="message" class="message">{{ message }}</p>
    </div>
</template>

<script setup>
// filepath: /c:/Users/thoma/Desktop/Projets/bon_appetit_VueJS/bonap/src/views/OwnerCreateRestaurant.vue
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const restaurantData = ref({
    siret: '',
    nom: '',
    nombreCouvert: 0,
    capacite: 0,
    telephone: '',
    photo: null,
    description: '',
    isOpen: false,
    delaiPreparationCommande: 0,
    utilisateur: { id: authStore.userId }, // Send an object with the user ID
    adresse: {}, // This will be set from the address and city details
    typeCuisineHasRestaurants: [] // Initialize as an empty array
});

const adresseData = ref({
    numero: '',
    rue: '',
    complement: ''
});

const villeData = ref({
    nom: '',
    codePostal: ''
});

const typesCuisine = ref([]);
const selectedTypeCuisineId = ref(null);
const message = ref('');

onMounted(async () => {
    try {
        const response = await fetch('http://localhost:8080/api/typecuisines');
        if (!response.ok) {
            throw new Error('Failed to fetch types of cuisine');
        }
        typesCuisine.value = await response.json();
    } catch (error) {
        console.error('Error fetching types of cuisine:', error);
    }
});

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        restaurantData.value.photo = e.target.result;
    };
    reader.readAsDataURL(file);
};

const submitRestaurant = async () => {
    try {
        // Add the selected type of cuisine to the restaurant data
        restaurantData.value.typeCuisineHasRestaurants.push({
            typeCuisine: { id: selectedTypeCuisineId.value }
        });

        // Add the address and city details to the restaurant data
        restaurantData.value.adresse = {
            ...adresseData.value,
            ville: villeData.value
        };

        // Create the restaurant with address and city details
        const restaurantResponse = await fetch('http://localhost:8080/api/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(restaurantData.value),
        });

        if (!restaurantResponse.ok) {
            const errorData = await restaurantResponse.json();
            throw new Error(errorData.message || 'Failed to create restaurant');
        }

        message.value = 'Restaurant créé avec succès';
        router.push('/owner/dashboard'); // Redirect to the owner's dashboard after successful creation
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
input[type="file"],
textarea,
select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

input[type="checkbox"] {
    margin-right: 10px;
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
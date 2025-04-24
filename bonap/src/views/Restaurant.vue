<!-- 
Restaurant.vue :
Cette vue affiche les détails d'un restaurant sélectionné, y compris son nom, sa description, 
et les plats proposés. Elle inclut également un formulaire de réservation.
-->

<template>
    <div v-if="restaurant">
        <!-- Afficher le nom et la description du restaurant -->
        <img :src="restaurant.photo" alt="Photo du restaurant" />
        <h2>{{ restaurant.nom }}</h2>
        <p>{{ restaurant.description }}</p>
        <p>Ceci est la page du restaurant qui doit afficher les plats proposés</p>

        <!-- Afficher les plats proposés par le restaurant organisés par type -->
        <div class="articles-by-type">
            <itemProduitByType 
                :restaurant-id="restaurant.id" 
                :is-owner-of-restaurant="isOwnerOfRestaurant" 
            />
        </div>

        <!-- Afficher le formulaire de réservation (collapsible) -->
        <div class="reservation-container">
            <button class="toggle-button" @click="toggleReservationForm">
                {{ showReservationForm ? 'Masquer le formulaire' : 'Réserver une table' }}
            </button>
            <div v-if="showReservationForm">
                <reservationForm />
            </div>
        </div>

        <!-- Bouton pour accéder à la création d'article (centré) -->
        <div class="create-article-container">
            <router-link v-if="isOwnerOfRestaurant"
                :to="{ name: 'owner-create-article', params: { restaurantId: restaurant.id } }">
                <button class="action-button">Créer un nouvel article</button>
            </router-link>
        </div>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script setup lang="ts">
// Import des composants (ref = reactive)
import { ref, onMounted, computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import reservationForm from '@/components/reservationForm.vue';
import itemProduitByType from '@/components/itemProduitByType.vue';

const route = useRoute();
const restaurantId = route.params.id;
const restaurant = ref(null);

// Access the auth store
const authStore = useAuthStore();

// State for collapsible reservation form
const showReservationForm = ref(false);
const toggleReservationForm = () => {
    showReservationForm.value = !showReservationForm.value;
};

// Computed property to check if the logged-in user is the owner of the restaurant
const isOwnerOfRestaurant = computed(() => {
    return restaurant.value?.utilisateur?.id === Number(authStore.userId);
});

// Fonction pour récupérer les détails du restaurant depuis l'API
const fetchRestaurantDetails = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:8080/api/restaurants/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        restaurant.value = data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

// Appeler la fonction fetchRestaurantDetails lors du montage du composant
onMounted(async () => {
    await fetchRestaurantDetails(parseInt(restaurantId));
});
</script>

<style scoped>
/* Centrer le bouton "Créer un nouvel article" */
.create-article-container {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}

/* Boutons uniformisés */
.action-button,
.toggle-button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.action-button:hover,
.toggle-button:hover {
    background-color: #0056b3;
}



/* Conteneur pour le formulaire de réservation */
.reservation-container {
    margin: 1rem 0;
    text-align: center;
}
</style>
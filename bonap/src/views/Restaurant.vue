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

        <!-- Afficher le formulaire de réservation -->
        <reservationForm />

        <!-- Bouton pour accéder à la création d'article (visible uniquement si l'utilisateur est le propriétaire) -->
        <router-link v-if="isOwnerOfRestaurant" :to="{ name: 'owner-create-article' }">
            <button>Ajouter un nouvel article</button>
        </router-link>

        <!-- Afficher les plats proposés par le restaurant -->
        <itemProduitByType />

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

const route = useRoute();
const restaurantId = route.params.id;
const restaurant = ref(null);

// Access the auth store
const authStore = useAuthStore();

// Computed property to check if the logged-in user is the owner of the restaurant
const isOwnerOfRestaurant = computed(() => {
    return restaurant.value?.utilisateur?.id === Number(authStore.userId);
});

// Fonction pour récupérer les détails du restaurant depuis l'API
const fetchRestaurantDetails = async (id: number) => {
    try {
        // Interroge l'API pour récupérer les détails du restaurant
        const response = await fetch(`http://localhost:8080/api/restaurants/${id}`);
        // Si la réponse n'est pas ok, on lance une erreur
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Sinon on récupère les données de la réponse au format json
        const data = await response.json();
        // Affecter les données récupérées (data) à la variable restaurant
        restaurant.value = data;

// Log the restaurant's utilisateur_id
console.log('Restaurant Utilisateur ID:', restaurant.value?.utilisateur?.id);

// Log the utilisateur ID from the auth store
console.log('Utilisateur ID from Auth Store:', authStore.userId);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

// Appeler la fonction fetchRestaurantDetails lors du montage du composant
onMounted(async () => {
    // Convertir le paramètre id en nombre entier et appeler fetchRestaurantDetails
    await fetchRestaurantDetails(parseInt(restaurantId));
});
</script>
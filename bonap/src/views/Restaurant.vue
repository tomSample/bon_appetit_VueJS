<!-- Restaurant.vue est la page correspondant à 1 restaurant sélectionné par l'user -->
<template>
    <div v-if="restaurant">
        <!-- Afficher le nom et la description du restaurant -->
        <img :src="restaurant.photo" alt="Photo du restaurant" />
        <h2>{{ restaurant.nom }}</h2>
        <p>{{ restaurant.description }}</p>
        <p>Ceci est la page du restaurant qui doit afficher les plats proposés</p>

        <!-- Afficher le formulaire de réservation -->
        <reservationForm />

        <!-- Afficher les plats proposés par le restaurant -->
        <itemProduitByType />

    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>


<script setup lang="ts">
// Import des composants (ref = reactive)
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import reservationForm from '@/components/reservationForm.vue';

const route = useRoute();
const restaurantId = route.params.id;
const restaurant = ref(null);

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
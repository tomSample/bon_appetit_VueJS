<!-- Restaurant.vue est la page correspondant à 1 restaurant sélectionné par l'user -->
<template>
    <div v-if="restaurant">
        <h2>{{ restaurant.nom }}</h2>
        <p>{{ restaurant.description }}</p>
        <p>Ceci est la page du restaurant qui doit afficher les plats proposés</p>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const restaurantId = route.params.id;
const restaurant = ref(null);

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

onMounted(async () => {
    await fetchRestaurantDetails(parseInt(restaurantId));
});
</script>
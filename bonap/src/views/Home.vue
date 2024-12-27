<template>
    <main>
        <heroSearch @search-results="updateRestaurants" />
        <carroussel @filter-cuisine="filterCuisine" />
        <section>
            <div class="grid-container">
                <RouterLink v-for="restaurant in filteredRestaurants" :key="restaurant.id" :to="{ name: 'restaurant', params: { id: restaurant.id } }">
                    <itemRestaurant :restaurant="restaurant" />
                </RouterLink>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import carroussel from '@/components/carroussel.vue';
import heroSearch from '@/components/heroSearch.vue';
import itemRestaurant from '@/components/itemRestaurant.vue';

const restaurants = ref([]);
const filteredRestaurants = ref([]);

// Fonction pour récupérer tous les restaurants depuis l'API
const fetchRestaurants = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/restaurants', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        restaurants.value = data;
        filteredRestaurants.value = data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

// Fonction pour filtrer les restaurants par type de cuisine
const filterCuisine = async (typeCuisineId) => {
    if (typeCuisineId === null) {
        filteredRestaurants.value = restaurants.value;
        return;
    }
    try {
        const response = await fetch(`http://localhost:8080/api/restaurants/filter?typeCuisineId=${typeCuisineId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        filteredRestaurants.value = data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

// Fonction pour mettre à jour les restaurants avec les résultats de la recherche
const updateRestaurants = (restaurants) => {
    console.log('updateRestaurants called with:', restaurants); // Log pour vérifier que la fonction est appelée
    filteredRestaurants.value = restaurants;
};

onMounted(async () => {
    await fetchRestaurants();
});
</script>

<style scoped>
.grid-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem; /* Espace entre les éléments */
    justify-content: space-around; /* Centrer les éléments */
}

@media (max-width: 768px) {
    .grid-container > * {
        flex: 1 1 calc(50% - 1rem); /* Deux colonnes sur les écrans moyens */
    }
}

@media (max-width: 480px) {
    .grid-container > * {
        flex: 1 1 100%; /* Une colonne sur les petits écrans */
    }
}
</style>
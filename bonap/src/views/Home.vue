<template>
    <main>
        <heroSearch />
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

// Fonction pour récupérer tous les restaurants depuis l'api
const fetchRestaurants = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/restaurants');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // récupère les données dans la variable data sous forme de JSON (tableau associatif)
restaurants.value = data;                   // assigne les données récupérées à la variable restaurants
filteredRestaurants.value = data;           // initialise les restaurants filtrés avec les mêmes données
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

const filterCuisine = async (typeCuisineId) => {
                // Si l'ID du type de cuisine est null, réinitialiser les restaurants filtrés avec tous les restaurants
    if (typeCuisineId === null) {
        filteredRestaurants.value = restaurants.value; 
        return; // et sortir de la fonction
    }
    try {
        const response = await fetch(`http://localhost:8080/api/restaurants/filter?typeCuisineId=${typeCuisineId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }       // récupère les données des resturants dont le type de cuisine est celui défini
        const data = await response.json();
        filteredRestaurants.value = data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

onMounted(async () => {
    await fetchRestaurants();
});
</script>

<style scoped>
.grid-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-around;
}

@media (max-width: 768px) {
    .grid-container > * {
        flex: 1 1 calc(50% - 1rem);
    }
}

@media (max-width: 480px) {
    .grid-container > * {
        flex: 1 1 100%;
    }
}
</style>
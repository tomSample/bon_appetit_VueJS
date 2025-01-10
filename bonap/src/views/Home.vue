<template>
    <main>
        <!--  titre + barre de recherche -->
        <heroSearch @search-results="updateRestaurants" />

        <!--  carroussel de type de cuisine -->
        <carroussel @filter-cuisine="filterCuisine" />

        <!--  liste des restaurants -->
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
// Import des composants (ref = reactive)
import { ref, onMounted } from 'vue';
import carroussel from '@/components/carroussel.vue';
import heroSearch from '@/components/heroSearch.vue';
import itemRestaurant from '@/components/itemRestaurant.vue';

// variables reactive signifie que si la variable change, le composant sera automatiquement actualisé
const restaurants = ref([]);
const filteredRestaurants = ref([]);

// methode pour récupérer les restaurants depuis l'API
const fetchRestaurants = async () => {
    try {
        //interroge l'API pour récupérer les restaurants
        const response = await fetch('http://localhost:8080/api/restaurants', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //si la réponse n'est pas ok, on lance une erreur
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        //sinon on récupère les données de la réponse au format json
        const data = await response.json();
        //affecter les données récupérées (data) à la variable restaurants
        restaurants.value = data;
        //affecter les données récupérées (data) à la variable filteredRestaurants
        filteredRestaurants.value = data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

// méthode pour filtrer les restaurants par type de cuisine (procédé identique à fetchRestaurants)
const filterCuisine = async (typeCuisineId) => {
    if (typeCuisineId === null) {
        filteredRestaurants.value = restaurants.value;
        return;
    }
    try {
        const response = await fetch(`http://localhost:8080/api/restaurants/filterByCuisine?typeCuisineId=${typeCuisineId}`, {
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

// méthode pour mettre à jour les restaurants affichés
const updateRestaurants = (restaurants) => {
    filteredRestaurants.value = restaurants;
};

// appel de la méthode fetchRestaurants au montage du composant
// signifie que lorsque la page est chargée le comoposant est appelé
// et la méthode fetchRestaurants est appelée pour afficher les restaurants
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
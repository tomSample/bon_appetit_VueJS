<!-- 
restaurantTable.vue :
Ce composant affiche une table des restaurants associés à un utilisateur. 
Il permet de rechercher, modifier ou supprimer des restaurants, et inclut des liens pour accéder aux détails de chaque restaurant.
-->

<template>
    <div class="grid__item__view">
        <div class="search" id="man__search" data-category="restaurant">
            <input class="search__views" id="restaurant__input" type="search" placeholder="Rechercher un restaurant">
            <button class="administration-restaurant-button" id="restaurant__button" type="submit">Rechercher</button>
        </div>
        <table id="restaurantsTable" class="display">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Ville</th>
                    <th>Flux</th>
                    <th>Couverts</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="restaurant in restaurants" :key="restaurant.id">
                    <!-- Utilisation de RouterLink pour rediriger vers la page du restaurant -->
                    <td>
                        <RouterLink :to="{ name: 'restaurant', params: { id: restaurant.id } }">
                            {{ restaurant.nom }}
                        </RouterLink>
                    </td>
                    <td>{{ restaurant.adresse?.villes[0]?.nom }}</td>
                    <td><img class="change__icon" src="../../src/img/icon/order.png"></td>
                    <td>{{ restaurant.nombreCouvert }}</td>
                    <td><img class="change__icon" src="../../src/img/icon/editing.png"></td>
                    <td><img class="change__icon" src="../../src/img/icon/delete.png"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { useAuthStore } from '@/stores/auth';

const restaurants = ref([]);
const authStore = useAuthStore();

const fetchRestaurants = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/restaurants/by-user/${authStore.userId}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des restaurants.');
        }
        restaurants.value = await response.json();
    } catch (error) {
        console.error(error.message);
    }
};

const initializeDataTable = () => {
    $('#restaurantsTable').DataTable();
};

const destroyDataTable = () => {
    if ($.fn.DataTable.isDataTable('#restaurantsTable')) {
        $('#restaurantsTable').DataTable().destroy();
    }
};

onMounted(async () => {
    await fetchRestaurants();
    initializeDataTable();
});

watch(restaurants, async () => {
    destroyDataTable();
    await nextTick();
    initializeDataTable();
});
</script>

<style scoped>
.change__icon {
    width: 15px;
    height: 15px;
}
</style>
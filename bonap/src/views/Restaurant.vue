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
        <!-- Afficher les plats proposés par le restaurant -->
        <itemProduitByType />
    </div>
    <div v-else-if="loading">
        <p>Loading...</p>
    </div>
    <div v-else>
        <p>Erreur : Restaurant non trouvé</p>
    </div>
</template>

<script setup lang="ts">
// Import des composants et services
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import reservationForm from '@/components/reservationForm.vue';
import itemProduitByType from '@/components/itemProduitByType.vue'; // Import ajouté
import { fetchRestaurantById } from '@/services/restaurantApi.js';

const route = useRoute();
const restaurant = ref(null);
const loading = ref(true);

// Appeler la fonction lors du montage du composant
onMounted(async () => {
    try {
        // Debug : vérifier la valeur du paramètre
        console.log('Restaurant ID from route:', route.params.restaurantId);
        console.log('Full route params:', route.params);
       
        const restaurantId = parseInt(route.params.restaurantId as string);
       
        // Vérifier que l'ID est valide
        if (isNaN(restaurantId)) {
            console.error('Route params:', route.params);
            throw new Error('ID restaurant invalide');
        }
       
        // Utiliser le service API
        const data = await fetchRestaurantById(restaurantId);
        restaurant.value = data;
       
        console.log('Restaurant loaded:', data);
       
    } catch (error) {
        console.error('Erreur lors du chargement du restaurant:', error);
        console.error('Current route:', route);
    } finally {
        loading.value = false;
    }
});
</script>
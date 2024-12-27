<!-- itemRestaurant.vue est injecté dans la page Home.vue -->

<template>
    <div class="restaurant-item">
        <h2>{{ restaurant.nom }}</h2>
        <p>{{ restaurant.description }}</p>
        <img :src="restaurant.photo" alt="Photo du restaurant" />
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    restaurant: {
        type: Object,
        required: true
    }
});
</script>

<style scoped>
.restaurant-item {
    border: 1px solid #ccc;
    padding: 1rem;
    margin: 1rem 0;
    width: 220px; /* Taille fixe pour le conteneur */
    height: 300px; /* Taille fixe pour le conteneur */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
}

.restaurant-item img {
    width: 100%;
    height: auto;
    max-height: 150px; /* Limite la hauteur de l'image */
    object-fit: cover; /* Ajuste l'image pour couvrir l'espace disponible */
}

.restaurant-item h2, .restaurant-item p {
    text-align: center;
}
</style>
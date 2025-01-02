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

// Définition des propriétés (props) que le composant attend de son parent
const props = defineProps({
    // Propriété 'restaurant' est de type Objet car provient de la bdd
    // (à l'inverse, on pourrait rentrer des données en dur)
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
    width: 220px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
}

.restaurant-item img {
    width: 100%;
    height: auto;
    max-height: 150px;
    object-fit: cover;
}

.restaurant-item h2, .restaurant-item p {
    text-align: center;
}
</style>
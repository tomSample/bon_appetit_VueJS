<script setup lang="ts">
import { ref } from 'vue';
import carroussel from '@/components/carroussel.vue';
import heroSearch from '@/components/heroSearch.vue';
import itemRestaurant from '@/components/itemRestaurant.vue';

// Liste d'exemples de restaurants
const restaurants = ref([
    { id: 1, name: 'Restaurant 1', description: 'Description 1' },
    { id: 2, name: 'Restaurant 2', description: 'Description 2' },
    { id: 3, name: 'Restaurant 3', description: 'Description 3' },
    // Ajoutez autant de restaurants que nécessaire
]);
</script>

<template>
    <main>
        <heroSearch />

        <carroussel />

        <div v-for="restaurant in restaurants" :key="restaurant.id">
            <itemRestaurant :restaurant="restaurant" />
        </div>
    </main>
</template>
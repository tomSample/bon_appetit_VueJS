<template>
    <div class="restaurant-item">
        <h2>{{ restaurant.name }}</h2>
        <p>{{ restaurant.description }}</p>
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
}
</style>
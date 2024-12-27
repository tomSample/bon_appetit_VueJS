<template>
    <div class="hero-search">
        <h1>Bienvenue sur Bon Appétit !</h1>
        <div class="search-container">
            <input type="text" placeholder="Rechercher un restaurant par ville..." v-model="searchQuery" @input="onSearch" />
            <button @click="onSearch">Rechercher</button>
        </div>
        <h2>Le bon resto au bon endroit</h2>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');

const onSearch = () => {
    // Affiche le message saisi dans la console
    console.log('Recherche:', searchQuery.value);
};
</script>

<style scoped>
.hero-search {
    text-align: center;
    padding: 2rem;
    background-color: #f8f8f8;
    border-bottom: 1px solid #ddd;
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.hero-search h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.hero-search input[type="text"] {
    width: 50%;
    min-width: 200px;
    max-width: 400px;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.hero-search button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    background-color: #333;
    color: white;
    cursor: pointer;
}

.hero-search button:hover {
    background-color: #555;
}

.hero-search h2 {
    font-size: 1.5rem;
    color: #666;
}
</style>
<template>
    <div class="hero-search">
        <h1>Bienvenue sur Bon Appétit !</h1>
        <div class="search-container">
            <input type="text" placeholder="Rechercher un restaurant par ville..." v-model="searchQuery" @input="fetchCitySuggestions" />
            <button @click="onSearch">Rechercher</button>
            <button @click="resetSearch">Effacer</button>
        </div>
        <ul v-if="citySuggestions.length" class="suggestions">
            <li v-for="city in citySuggestions" :key="city" @click="selectCity(city)">{{ city }}</li>
        </ul>
        <h2>Le bon resto au bon endroit</h2>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const searchQuery = ref('');
const citySuggestions = ref([]);
const emit = defineEmits(['search-results']);

const fetchCitySuggestions = async () => {
    if (searchQuery.value.trim() === '') {
        citySuggestions.value = [];
        return;
    }
    try {
        const response = await fetch(`http://localhost:8080/api/villes/search?prefix=${searchQuery.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        citySuggestions.value = data;
    } catch (error) {
        console.error('Error fetching city suggestions:', error);
    }
};

const selectCity = (city) => {
    searchQuery.value = city;
    citySuggestions.value = [];
    onSearch();
};

const onSearch = async () => {
    if (citySuggestions.value.length > 0) {
        return; // Do not search if there are city suggestions
    }
    console.log('onSearch called with query:', searchQuery.value); // Log to verify the function is called
    try {
        const response = await fetch(`http://localhost:8080/api/restaurants/filterByVille?villeNom=${searchQuery.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Restaurants found:', data); // Log to verify the data received
        emit('search-results', data); // Emit the event with the search results
        console.log('search-results event emitted'); // Log to verify the event is emitted
    } catch (error) {
        console.error('Error during restaurant search:', error);
    }
};

const resetSearch = async () => {
    searchQuery.value = '';
    citySuggestions.value = [];
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
        console.log('All restaurants:', data); // Log to verify the data received
        emit('search-results', data); // Emit the event with all restaurants
        console.log('search-results event emitted'); // Log to verify the event is emitted
    } catch (error) {
        console.error('Error during fetching all restaurants:', error);
    }
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

.suggestions {
    list-style-type: none;
    padding: 0;
    margin: 0;
    background-color: white;
    border: 1px solid #ccc;
    width: 50%;
    margin: 0 auto;
    max-width: 400px;
}

.suggestions li {
    padding: 0.5rem;
    cursor: pointer;
}

.suggestions li:hover {
    background-color: #f0f0f0;
}

.hero-search h2 {
    font-size: 1.5rem;
    color: #666;
}
</style>
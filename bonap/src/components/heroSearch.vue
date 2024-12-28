<template>
    <div class="hero-search">
        <h1>Bienvenue sur Bon Appétit !</h1>
        <div class="search-container">
            <!-- v-model crée une liaison bidirectionnelle entre la variable searchQuery et l'élément input -->
            <!-- @input déclenche la méthode fetchCitySuggestions à chaque fois que l'utilisateur tape quelque chose -->
            <input type="text" placeholder="Rechercher un restaurant par ville..." v-model="searchQuery" @input="fetchCitySuggestions" />
            <!-- Bouton pour lancer la recherche -->
            <button @click="onSearch">Rechercher</button>
            <!-- Bouton pour réinitialiser la recherche -->
            <button @click="resetSearch">Effacer</button>
        </div>
        <!-- Liste des suggestions de villes -->
        <!-- v-if vérifie si citySuggestions contient des éléments avant d'afficher la liste -->
        <ul v-if="citySuggestions.length" class="suggestions">
            <!-- Boucle v-for pour générer un élément de liste pour chaque ville dans citySuggestions -->
            <!-- @click déclenche la méthode selectCity avec la ville sélectionnée -->
            <li v-for="city in citySuggestions" :key="city" @click="selectCity(city)">{{ city }}</li>
        </ul>
        <h2>Le bon resto au bon endroit</h2>
    </div>
</template>

<script setup lang="ts">
// Import des fonctions et variables réactives (ref) + defineEmits pour déclarer les événements
import { ref, defineEmits } from 'vue';

const searchQuery = ref(''); // Variable réactive pour stocker la requête de recherche (string)
const citySuggestions = ref([]); // Variable réactive pour stocker les suggestions de villes (tableau)

// Déclaration de l'événement pour émettre les résultats de la recherche :
// Dans le composant courant (heroSearch.vue), emit est utilisé pour émettre l'événement 'search-results' 
// avec les résultats de la recherche. Cela permet à un composant parent (ici Home.vue) d'écouter cet événement 
// et de réagir en conséquence, par exemple en mettant à jour la liste des restaurants affichés.
const emit = defineEmits(['search-results']);

// Méthode pour récupérer les suggestions de villes en fonction de la requête de recherche
const fetchCitySuggestions = async () => {
    // Si la barre de recherche est vide, réinitialiser les suggestions de villes
    if (searchQuery.value.trim() === '') {
        citySuggestions.value = [];
        return;
    }
    try {
        // sinon appel à l'API pour récupérer les villes dont le nom commence par la requête de recherche
        const response = await fetch(`http://localhost:8080/api/villes/search?prefix=${searchQuery.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Vérification de la réponse de l'API
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Conversion de la réponse en JSON
        const data = await response.json();
        // Mise à jour des suggestions de villes avec les données reçues
        citySuggestions.value = data;
    } catch (error) {
        // Affichage d'un message d'erreur en cas de problème avec l'appel à l'API
        console.error('Error fetching city suggestions:', error);
    }
};

// Méthode pour sélectionner une ville dans les suggestions (réagit au clic sur la ville sélectionnée)
const selectCity = (city) => {
    // en cas de clic alors la ville sélectionnée devient la requête de recherche
    searchQuery.value = city;
    // donc on vide les suggestions de villes (disparition de la liste de suggestions)
    citySuggestions.value = [];
    // Lancement de la recherche avec la ville sélectionnée
    onSearch();
};

// Méthode pour lancer la recherche de restaurants en fonction de la ville
const onSearch = async () => {
    // Si des suggestions de villes sont affichées, ne pas lancer la recherche (utilisateur doit sélectionner une ville)
    if (citySuggestions.value.length > 0) {
        return;
    }
    try {
        //sinon appel à l'API pour récupérer les restaurants dans la ville spécifiée
        const response = await fetch(`http://localhost:8080/api/restaurants/filterByVille?villeNom=${searchQuery.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Vérification de la réponse de l'API
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Conversion de la réponse en JSON
        const data = await response.json();
        // Émission de l'événement avec les résultats de la recherche (le parent doit mettre à jour la liste des restaurants)
        emit('search-results', data);
    } catch (error) {
        // Affichage d'un message d'erreur en cas de problème avec l'appel à l'API
        console.error('Error during restaurant search:', error);
    }
};

// Méthode pour réinitialiser la recherche (bouton "effacer")
const resetSearch = async () => {
    // au clic sur effacer => réinitialisation de la requête de recherche et des suggestions de villes
    searchQuery.value = '';
    citySuggestions.value = [];
    try {
        // rappel à l'API pour récupérer tous les restaurants
        const response = await fetch('http://localhost:8080/api/restaurants', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Vérification de la réponse de l'API
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Conversion de la réponse en JSON
        const data = await response.json();
        // Émission de l'événement avec tous les restaurants (le parent doit réinitialiser la liste des restaurants)
        emit('search-results', data);
    } catch (error) {
        // Affichage d'un message d'erreur en cas de problème avec l'appel à l'API
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
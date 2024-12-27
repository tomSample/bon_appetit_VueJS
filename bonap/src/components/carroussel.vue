<template>
    <div class="carrousel">
        <button @click="prev" class="nav-button">‹</button>
        <div class="carrousel-track">
            <div v-for="(cuisine, index) in visibleCuisines" :key="index" class="carrousel-item" @click="toggleFilter(cuisine.id)">
                {{ cuisine.nom }}
            </div>
        </div>
        <button @click="next" class="nav-button">›</button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';

const cuisines = ref([]);
const visibleCuisines = ref([]);
const currentIndex = ref(0);
const selectedCuisineId = ref(null);
const emit = defineEmits(['filter-cuisine']);

// Récupère les types de cuisine depuis l'API
const fetchCuisines = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/typecuisines', {
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('Network response was not ok');
        cuisines.value = await response.json(); // Assigne les données récupérées à la variable cuisines
        updateVisibleCuisines();                // Met à jour les types de cuisine visibles (fonction définie plus bas)
    } catch (error) {
        console.error('Fetch error:', error); 
    }
};

//mettre à jour les restaurants par type de cuisine
const updateVisibleCuisines = () => {
    const totalCuisines = cuisines.value.length; // Récupère le nombre total de types de cuisine depuis la bdd (grace au fetch plus haut)
    visibleCuisines.value = [];                 // Réinitialise la liste des cuisines visibles dans un tableau
    for (let i = 0; i < 5; i++) {               // Boucle 5 fois pour afficher 5 types de cuisine (5 boutons filtre)
        visibleCuisines.value.push(cuisines.value[(currentIndex.value + i) % totalCuisines]); // Ajoute les types de cuisine visibles en utilisant l'index actuel et en bouclant de façon infinie grâce au modulo
    }
};

const prev = () => {
    if (cuisines.value.length > 0) {
        currentIndex.value = (currentIndex.value - 1 + cuisines.value.length) % cuisines.value.length;
        updateVisibleCuisines();
    }
};

const next = () => {
    if (cuisines.value.length > 0) {
        currentIndex.value = (currentIndex.value + 1) % cuisines.value.length;
        updateVisibleCuisines();
    }
};

// active ou désactive un filtre
const toggleFilter = (typeCuisineId: number) => {
                // Vérifie si le type de cuisine sélectionné est le même que celui cliqué
    if (selectedCuisineId.value === typeCuisineId) {
                // Si oui, désélectionne le type de cuisine en mettant selectedCuisineId à null
        selectedCuisineId.value = null;
                // Émet un événement pour réinitialiser le filtre (aucun type de cuisine sélectionné)
        emit('filter-cuisine', null);
    } else {
                // Sinon, met à jour selectedCuisineId avec le nouvel ID de type de cuisine
        selectedCuisineId.value = typeCuisineId;
                // Émet un événement pour filtrer les restaurants par le nouveau type de cuisine sélectionné
        emit('filter-cuisine', typeCuisineId);
    }
};

onMounted(async () => {
    await fetchCuisines();
});
</script>

<style scoped>
.carrousel {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
}

.carrousel-track {
    display: flex;
    overflow: hidden;
    width: 80%;
    justify-content: space-between;
    transition: transform 0.5s ease;
}

.carrousel-item {
    flex: 1;
    padding: 1rem;
    margin: 0 0.5rem;
    background-color: #f0f0f0;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    transition: transform 0.3s ease;
}

.nav-button {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
}
</style>
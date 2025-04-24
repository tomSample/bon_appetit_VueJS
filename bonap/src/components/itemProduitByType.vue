<template>
    <div class="item-produit-by-type">
        <h2>Articles par type</h2>
        <div v-if="typeArticles.length">
            <template v-for="type in typeArticles" :key="type.id">
                <div v-if="articlesByType[type.id]?.length > 0" class="type-section">
                    <h3 class="type-title">{{ capitalizeFirstLetter(type.nom) }}</h3>
                    <div class="articles-grid">
                        <div 
                            v-for="article in articlesByType[type.id]" 
                            :key="article.id" 
                            class="article-card"
                            @click="openModal(article)"
                        >
                            <img :src="article.image || 'placeholder.jpg'" alt="Image de l'article" class="article-image" />
                            <h4 class="article-name">{{ capitalizeFirstLetter(article.nom) }}</h4>
                            <p class="article-description">{{ article.description }}</p>
                            <p class="article-price">Prix : {{ article.prix }} €</p>
                            <p class="article-weight">Poids : {{ article.poids }} g</p>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div v-else>
            <p>Chargement des types d'articles...</p>
        </div>

<!-- Modal -->
<div v-if="selectedArticle" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
        <button class="close-button" @click="closeModal">&times;</button>
        <img :src="selectedArticle.image || 'placeholder.jpg'" alt="Image de l'article" class="modal-image" />

        <!-- Affichage des informations ou des champs de formulaire -->
        <div v-if="!isEditing">
            <h2 class="modal-title">{{ capitalizeFirstLetter(selectedArticle.nom) }}</h2>
            <p class="modal-description">{{ selectedArticle.description }}</p>
            <p class="modal-price">Prix : {{ selectedArticle.prix }} €</p>
            <p class="modal-weight">Poids : {{ selectedArticle.poids }} g</p>
        </div>

        <!-- Formulaire d'édition -->
        <form v-else @submit.prevent="updateArticle" class="modal-form">
            <div class="form-group">
                <label for="nom">Nom :</label>
                <input id="nom" v-model="selectedArticle.nom" type="text" class="form-input" required />
            </div>
            <div class="form-group">
                <label for="description">Description :</label>
                <textarea id="description" v-model="selectedArticle.description" class="form-input" required></textarea>
            </div>
            <div class="form-group">
                <label for="prix">Prix :</label>
                <input id="prix" v-model.number="selectedArticle.prix" type="number" step="0.01" class="form-input" required />
            </div>
            <div class="form-group">
                <label for="poids">Poids :</label>
                <input id="poids" v-model.number="selectedArticle.poids" type="number" class="form-input" required />
            </div>
            <div class="form-group">
                <label for="stock">Stock :</label>
                <input id="stock" v-model.number="selectedArticle.stock" type="number" class="form-input" required />
            </div>
            <div class="form-group">
                <label for="duree">Durée :</label>
                <input id="duree" v-model.number="selectedArticle.duree" type="number" class="form-input" />
            </div>
            <div class="form-group">
                <label for="image">Image URL :</label>
                <input id="image" v-model="selectedArticle.image" type="text" class="form-input" />
            </div>
            <div class="form-actions">
                <button type="submit" class="save-button">Enregistrer</button>
                <button type="button" @click="disableEditing" class="cancel-button">Annuler</button>
            </div>
        </form>

        <!-- Bouton pour activer l'édition -->
        <div v-if="isOwnerOfRestaurant && !isEditing">
            <button @click="enableEditing" class="edit-button">Modifier</button>
        </div>
    </div>
</div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
    restaurantId: Number,
    isOwnerOfRestaurant: Boolean, // Prop pour vérifier si l'utilisateur est le propriétaire
});

const route = useRoute();

const typeArticles = ref([]);
const articlesByType = ref({});
const selectedArticle = ref(null); // Article sélectionné pour le modal
const isEditing = ref(false); // État pour activer/désactiver l'édition

// Fonction pour capitaliser la première lettre d'une chaîne
const capitalizeFirstLetter = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Ouvrir le modal avec l'article sélectionné
const openModal = (article: any) => {
    selectedArticle.value = { ...article }; // Cloner l'article pour éviter les modifications directes
    isEditing.value = false; // Désactiver l'édition par défaut
};

// Fermer le modal
const closeModal = () => {
    selectedArticle.value = null;
    isEditing.value = false; // Réinitialiser l'état d'édition
};

// Activer l'édition
const enableEditing = () => {
    isEditing.value = true;
};

// Désactiver l'édition
const disableEditing = () => {
    isEditing.value = false;
};

// Mettre à jour l'article
const updateArticle = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/articles/${props.restaurantId}/${selectedArticle.value.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedArticle.value),
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour de l\'article');
        }
        alert('Article mis à jour avec succès');
        closeModal();
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'article :', error);
    }
};

// Récupérer les types d'articles
const fetchTypeArticles = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/type-articles');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des types d\'articles');
        }
        typeArticles.value = await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des types d\'articles :', error);
    }
};

// Récupérer les articles par type
const fetchArticlesByType = async (typeId: number) => {
    try {
        const response = await fetch(`http://localhost:8080/api/articles/restaurant/${props.restaurantId}/type/${typeId}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des articles');
        }
        const articles = await response.json();
        articlesByType.value[typeId] = articles.map((article: any) => ({
            id: article.id,
            nom: article.nom,
            description: article.description,
            image: article.image,
            prix: article.prix,
            poids: article.poids,
        }));
    } catch (error) {
        console.error(`Erreur lors de la récupération des articles pour le type ${typeId} :`, error);
    }
};

// Charger les données au montage du composant
onMounted(async () => {
    await fetchTypeArticles();
    for (const type of typeArticles.value) {
        await fetchArticlesByType(type.id);
    }
});
</script>

<style scoped>
.item-produit-by-type {
    margin-top: 2rem;
}

.type-section {
    margin-bottom: 3rem;
}

.type-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
    color: #333;
}

.articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Ajuste la largeur minimale des vignettes */
    gap: 1.5rem;
}

.article-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer;
}

.article-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.article-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 1rem;
}

.article-name {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #333;
}

.article-description {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
}

.article-price,
.article-weight {
    font-size: 0.9rem;
    color: #666;
    margin: 0.2rem 0;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    overflow: hidden; /* Empêche le défilement de la page en arrière-plan */
}

.modal-content {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    max-height: 90%; /* Limite la hauteur du modal */
    overflow-y: auto; /* Ajoute un défilement vertical si le contenu dépasse */
    text-align: center;
    position: relative;
}

.modal-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 1rem;
}

.modal-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #333;
}

.modal-description {
    font-size: 1rem;
    color: #666;
    margin-bottom: 1rem;
}

.modal-price,
.modal-weight {
    font-size: 1rem;
    color: #333;
    margin: 0.5rem 0;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #333;
}

.close-button:hover {
    color: #000;
}

.edit-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 1rem;
}

.edit-button:hover {
    background-color: #0056b3;
}

.cancel-button {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 1rem;
}

.cancel-button:hover {
    background-color: #c82333;
}

.form-group {
    margin-bottom: 1rem;
    text-align: left;
}

.form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #333;
}

.form-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    color: #333;
    box-sizing: border-box;
}

.form-input:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.save-button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
}

.save-button:hover {
    background-color: #218838;
}
</style>
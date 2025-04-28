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

                <div>
                    <h2 class="modal-title">{{ capitalizeFirstLetter(selectedArticle.nom) }}</h2>
                    <p class="modal-description">{{ selectedArticle.description }}</p>
                    <p class="modal-price">Prix : {{ selectedArticle.prix }} €</p>
                    <p class="modal-weight">Poids : {{ selectedArticle.poids }} g</p>
                </div>

                <div class="form-group">
                    <label for="quantity">Quantité :</label>
                    <input id="quantity" v-model.number="modalQuantity" type="number" min="1" class="form-input" />
                </div>
                <button @click="addToCartFromModal" class="add-to-cart-button">Ajouter au panier</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
    restaurantId: Number,
    isOwnerOfRestaurant: Boolean,
});

const route = useRoute();

const typeArticles = ref([]);
const articlesByType = ref({});
const selectedArticle = ref(null);
const modalQuantity = ref(1);
const cart = ref([]); // Panier local

const capitalizeFirstLetter = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const openModal = (article: any) => {
    selectedArticle.value = { ...article };
    modalQuantity.value = 1;
};

const closeModal = () => {
    selectedArticle.value = null;
};

const addToCartFromModal = () => {
    if (modalQuantity.value > 0) {
        console.log(`Ajout au panier depuis le modal : 
            ID: ${selectedArticle.value.id}, 
            Nom: ${selectedArticle.value.nom}, 
            Prix: ${selectedArticle.value.prix}, 
            Poids: ${selectedArticle.value.poids}, 
            Quantité: ${modalQuantity.value}`);
        const existingItem = cart.value.find((item) => item.id === selectedArticle.value.id);
        if (existingItem) {
            existingItem.quantity += modalQuantity.value;
        } else {
            cart.value.push({
                id: selectedArticle.value.id,
                name: selectedArticle.value.nom,
                price: selectedArticle.value.prix,
                quantity: modalQuantity.value,
            });
        }
        alert('Article ajouté au panier !');
        closeModal();
    } else {
        alert('Veuillez sélectionner une quantité valide.');
    }
};

const fetchTypeArticles = async () => {
    const response = await fetch('http://localhost:8080/api/type-articles');
    typeArticles.value = await response.json();
};

const fetchArticlesByType = async (typeId: number) => {
    const response = await fetch(`http://localhost:8080/api/articles/restaurant/${props.restaurantId}/type/${typeId}`);
    const articles = await response.json();
    articlesByType.value[typeId] = articles.map((article: any) => ({
        id: article.id,
        nom: article.nom,
        description: article.description,
        image: article.image,
        prix: article.prix,
        poids: article.poids,
    }));
};

onMounted(async () => {
    await fetchTypeArticles();
    for (const type of typeArticles.value) {
        await fetchArticlesByType(type.id);
    }
});
</script>

<style scoped>
.articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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

.add-to-cart-button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
}

.add-to-cart-button:hover {
    background-color: #218838;
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
    overflow: hidden;
}

.modal-content {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    max-height: 90%;
    overflow-y: auto;
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
</style>
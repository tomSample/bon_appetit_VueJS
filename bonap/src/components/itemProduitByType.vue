<template>
    <div class="item-produit-by-type">
        <h2>Articles par type</h2>
        <div v-if="typeArticles.length">
            <template v-for="type in typeArticles" :key="type.id">
                <div 
                    v-if="articlesByType[type.id]?.length > 0" 
                    class="type-section"
                >
                    <h3 class="type-title">{{ capitalizeFirstLetter(type.nom) }}</h3>
                    <div class="articles-grid">
                        <div v-for="article in articlesByType[type.id]" :key="article.id" class="article-card">
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
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const restaurantId = Number(route.params.id);

const typeArticles = ref([]);
const articlesByType = ref({});

// Fonction pour capitaliser la première lettre d'une chaîne
const capitalizeFirstLetter = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

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

const fetchArticlesByType = async (typeId: number) => {
    try {
        const response = await fetch(`http://localhost:8080/api/articles/restaurant/${restaurantId}/type/${typeId}`);
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
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
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
</style>
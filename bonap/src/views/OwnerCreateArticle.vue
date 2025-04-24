<template>
  <div class="create-article">
    <h1>Créer un nouvel article</h1>
    <form @submit.prevent="submitArticle">
      <div>
        <label for="nom">Nom de l'article:</label>
        <input type="text" id="nom" v-model="article.nom" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="article.description" required></textarea>
      </div>
      <div>
        <label for="prix">Prix:</label>
        <input type="number" id="prix" v-model="article.prix" step="0.01" required />
      </div>
      <div>
        <label for="image">Image (URL):</label>
        <input type="text" id="image" v-model="article.image" />
      </div>
      <div>
        <label for="poids">Poids (en grammes):</label>
        <input type="number" id="poids" v-model="article.poids" required />
      </div>
      <div>
        <label for="stock">Stock:</label>
        <input type="number" id="stock" v-model="article.stock" required />
      </div>
      <div>
        <label for="duree">Durée (en minutes):</label>
        <input type="number" id="duree" v-model="article.duree" />
      </div>
      <div>
        <label for="typeArticle">Type d'article:</label>
        <select id="typeArticle" v-model="article.typeArticleId" required>
          <option v-for="type in typeArticles" :key="type.id" :value="type.id">
            {{ type.nom }}
          </option>
        </select>
      </div>
      <button type="submit">Créer l'article</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const restaurantId = Number(route.params.restaurantId);

const article = ref({
  nom: '',
  description: '',
  prix: null,
  image: '',
  poids: null,
  stock: null,
  duree: null,
  restaurantId: restaurantId,
  typeArticleId: null, // ID du type d'article sélectionné
});

const typeArticles = ref([]); // Liste des types d'articles

// Récupérer les types d'articles depuis l'API
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

// Soumettre l'article au backend
const submitArticle = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article.value),
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la création de l\'article');
    }
    alert('Article créé avec succès!');
    article.value = {
      nom: '',
      description: '',
      prix: null,
      image: '',
      poids: null,
      stock: null,
      duree: null,
      restaurantId: restaurantId,
      typeArticleId: null,
    };
  } catch (error) {
    console.error('Erreur lors de la création de l\'article :', error);
    alert('Erreur lors de la création de l\'article.');
  }
};

onMounted(() => {
  fetchTypeArticles();
});
</script>

<style scoped>
.create-article {
  max-width: 600px;
  margin: 0 auto;
}

form div {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input,
textarea,
select {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
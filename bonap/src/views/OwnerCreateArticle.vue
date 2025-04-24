<!-- 
ownerCreateArticle.vue :
Ce composant permet aux propriétaires de créer un nouvel article (plat, boisson, dessert) pour leur restaurant. 
Il collecte des informations comme le nom, la description, le prix, et l'image de l'article.
-->

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
        <input type="number" id="prix" v-model="article.prix" required />
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
      <button type="submit">Créer l'article</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// Retrieve the restaurantId from the route
const route = useRoute();
const restaurantId = Number(route.params.restaurantId);

// Article object matching the backend model
const article = ref({
  nom: '',
  description: '',
  prix: null,
  image: '',
  poids: null,
  stock: null,
  duree: null,
  restaurantId: restaurantId, // Automatically associate with the restaurant from the route
});

// Submit the article to the backend
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
      throw new Error('Failed to create article');
    }
    alert('Article créé avec succès!');
    // Reset the form while keeping the restaurantId
    article.value = {
      nom: '',
      description: '',
      prix: null,
      image: '',
      poids: null,
      stock: null,
      duree: null,
      restaurantId: restaurantId,
    };
  } catch (error) {
    console.error('Error creating article:', error);
    alert('Erreur lors de la création de l\'article.');
  }
};
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
textarea {
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
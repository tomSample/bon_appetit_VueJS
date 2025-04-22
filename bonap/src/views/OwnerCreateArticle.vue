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
        <label for="name">Nom de l'article:</label>
        <input type="text" id="name" v-model="article.name" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="article.description" required></textarea>
      </div>
      <div>
        <label for="price">Prix:</label>
        <input type="number" id="price" v-model="article.price" required />
      </div>
      <div>
        <label for="image">Image (URL):</label>
        <input type="text" id="image" v-model="article.image" />
      </div>
      <button type="submit">Créer l'article</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const article = ref({
  name: '',
  description: '',
  price: null,
  image: '',
});

const submitArticle = () => {
  console.log('Article créé:', article.value);
  alert('Article créé avec succès!');
  // Reset the form
  article.value = { name: '', description: '', price: null, image: '' };
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
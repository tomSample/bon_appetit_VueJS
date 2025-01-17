<template>
  <div class="search-city-form">
    <h2>Rechercher une Ville</h2>
    <form @submit.prevent="validateCity">
      <div class="form-group">
        <label for="cityName">Nom de la Ville :</label>
        <input type="text" id="cityName" v-model="cityName" @input="onCityNameInput" placeholder="Entrez le nom de la ville" />
        <ul v-if="cityNameResults.length > 0" class="dropdown">
          <li v-for="city in cityNameResults" :key="city.code" @click="selectCity(city)">
            {{ city.nom }} ({{ city.codesPostaux.join(', ') }})
          </li>
        </ul>
      </div>
      <div class="form-group">
        <label for="postalCode">Code Postal :</label>
        <input type="text" id="postalCode" v-model="postalCode" @input="onPostalCodeInput" placeholder="Entrez le code postal" />
        <ul v-if="postalCodeResults.length > 0" class="dropdown">
          <li v-for="city in postalCodeResults" :key="city.code" @click="selectCity(city)">
            {{ city.nom }} ({{ city.codesPostaux.join(', ') }})
          </li>
        </ul>
      </div>
      <button type="submit" class="submit-button">Valider</button>
    </form>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const cityName = ref('');
const postalCode = ref('');
const cityNameResults = ref([]);
const postalCodeResults = ref([]);
const message = ref('');
const villeId = ref(null);

const validateCity = async () => {
  try {
    // Vérifier l'existence de la ville via l'API gouvernementale
    const response = await fetch(`https://geo.api.gouv.fr/communes?nom=${cityName.value}&codePostal=${postalCode.value}&fields=nom,codesPostaux&format=json`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to validate city');
    }

    const villes = await response.json();
    if (villes.length > 0) {
      const ville = villes[0];
      villeId.value = ville.code;
      message.value = `Ville validée avec succès : ${ville.nom} (${ville.codesPostaux.join(', ')})`;

      // Créer la ville dans la base de données si elle n'existe pas
      const createResponse = await fetch('http://localhost:8080/api/villes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nom: ville.nom, codePostal: ville.codesPostaux[0] })
      });

      if (!createResponse.ok) {
        const errorData = await createResponse.json();
        throw new Error(errorData.message || 'Failed to create city in database');
      }

      const createdVille = await createResponse.json();
      villeId.value = createdVille.id;
    } else {
      message.value = 'Ville non trouvée';
    }
  } catch (error) {
    message.value = error.message || 'Erreur lors de la validation de la ville';
  }
};

const searchCity = async () => {
  try {
    let query = '';
    if (cityName.value) {
      query = `nom=${cityName.value}&fields=nom,codesPostaux&format=json`;
    } else if (postalCode.value) {
      query = `codePostal=${postalCode.value}&fields=nom,codesPostaux&format=json`;
    }

    const response = await fetch(`https://geo.api.gouv.fr/communes?${query}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch city');
    }

    cityResults.value = await response.json();
    message.value = '';
  } catch (error) {
    message.value = error.message || 'Erreur lors de la recherche de la ville';
    cityResults.value = [];
  }
};

const onCityNameInput = async () => {
  if (cityName.value.length > 0) {
    try {
      const response = await fetch(`https://geo.api.gouv.fr/communes?nom=${cityName.value}&fields=nom,codesPostaux&format=json`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch city');
      }
      cityNameResults.value = await response.json();
    } catch (error) {
      message.value = error.message || 'Erreur lors de la recherche de la ville';
      cityNameResults.value = [];
    }
  } else {
    cityNameResults.value = [];
  }
};

const onPostalCodeInput = async () => {
  if (postalCode.value.length > 0) {
    try {
      const response = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${postalCode.value}&fields=nom,codesPostaux&format=json`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch city');
      }
      postalCodeResults.value = await response.json();
    } catch (error) {
      message.value = error.message || 'Erreur lors de la recherche de la ville';
      postalCodeResults.value = [];
    }
  } else {
    postalCodeResults.value = [];
  }
};

const selectCity = (city) => {
  cityName.value = city.nom;
  postalCode.value = city.codesPostaux[0];
  cityNameResults.value = [];
  postalCodeResults.value = [];
};
</script>

<style scoped>
.search-city-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  position: relative;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  position: relative; /* Ajouté */
  z-index: 1; /* Ajouté */
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #0056b3;
}

.results {
  margin-top: 20px;
}

.message {
  text-align: center;
  margin-top: 20px;
  color: red;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-height: 100px; /* Réduire la taille du dropdown */
  overflow-y: auto;
  z-index: 1000; /* Ajouté */
}

.dropdown li {
  padding: 10px;
  cursor: pointer;
}

.dropdown li:hover {
  background-color: #f0f0f0;
}
</style>
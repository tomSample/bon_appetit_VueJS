<template>
    <div class="form-section">
        <h2>Rechercher une Adresse</h2>
        <form @submit.prevent="validateAddress">
            <div class="form-group">
                <label for="ville">Ville :</label>
                <input type="text" id="ville" v-model="ville" @input="fetchCitySuggestions" required />
                <div v-if="cityResults.length > 0" class="dropdown">
                    <ul>
                        <li v-for="city in cityResults" :key="city.id" @click="selectCity(city)">
                            {{ city.postcode }} - {{ city.city }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="form-group">
                <label for="codePostal">Code Postal :</label>
                <input type="text" id="codePostal" v-model="codePostal" @input="fetchCitySuggestions" required />
            </div>
            <div class="form-group">
                <label for="rue">Rue :</label>
                <input type="text" id="rue" v-model="rue" @input="fetchStreetSuggestions" required />
                <div v-if="uniqueStreets.length > 0" class="dropdown">
                    <ul>
                        <li v-for="street in uniqueStreets" :key="street.id" @click="selectStreet(street)">
                            {{ street.name }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="form-group">
                <label for="numero">Numéro :</label>
                <input type="text" id="numero" v-model="numero" required />
            </div>
            <button type="submit" class="submit-button">Rechercher</button>
        </form>
        <div v-if="addressResults.length > 0" class="dropdown">
            <ul>
                <li v-for="address in addressResults" :key="address.id" @click="selectAddress(address)">
                    {{ address.label }}
                </li>
            </ul>
        </div>
        <div v-if="selectedAddress" class="selected-address">
            <h3>Adresse sélectionnée :</h3>
            <p>{{ selectedAddress.label }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue';

const numero = ref('');
const rue = ref('');
const codePostal = ref('');
const ville = ref('');
const addressResults = ref([]);
const streetResults = ref([]);
const cityResults = ref([]);
const selectedAddress = ref(null);

const emit = defineEmits(['address-selected']);

const fetchStreetSuggestions = async () => {
    if (rue.value.length < 3) return; // Vérifier que la saisie contient au moins 3 caractères
    try {
        const query = `${rue.value}`;
        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}&postcode=${codePostal.value}&autocomplete=1&limit=10`);
        if (!response.ok) {
            throw new Error('Failed to fetch street suggestions');
        }
        const data = await response.json();
        streetResults.value = data.features.map(feature => feature.properties);
    } catch (error) {
        console.error(error);
    }
};

const fetchCitySuggestions = async () => {
    if (ville.value.length < 3) return; // Vérifier que la saisie contient au moins 3 caractères
    try {
        const query = `${ville.value}`;
        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}&type=municipality&autocomplete=1&limit=10`);
        if (!response.ok) {
            throw new Error('Failed to fetch city suggestions');
        }
        const data = await response.json();
        cityResults.value = data.features.map(feature => feature.properties);
    } catch (error) {
        console.error(error);
    }
};

const validateAddress = async () => {
    try {
        const query = `${numero.value} ${rue.value}`;
        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}&postcode=${codePostal.value}&autocomplete=1&limit=10`);
        if (!response.ok) {
            throw new Error('Failed to fetch address');
        }
        const data = await response.json();
        addressResults.value = data.features.map(feature => feature.properties);
    } catch (error) {
        console.error(error);
    }
};

const selectStreet = (street) => {
    rue.value = street.name;
    streetResults.value = [];
};

const selectCity = (city) => {
    codePostal.value = city.postcode;
    ville.value = city.city;
    cityResults.value = [];
};

const selectAddress = (address) => {
    selectedAddress.value = address;
    numero.value = address.housenumber;
    rue.value = address.street;
    codePostal.value = address.postcode;
    ville.value = address.city;
    addressResults.value = [];
    emit('address-selected', {
        numero: address.housenumber,
        rue: address.street,
        codePostal: address.postcode,
        ville: address.city,
        complement: address.complement || ''
    });
};

const uniqueStreets = computed(() => {
    const seen = new Set();
    return streetResults.value.filter(street => {
        const duplicate = seen.has(street.name);
        seen.add(street.name);
        return !duplicate;
    });
});
</script>

<style scoped>
.form-section {
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

.dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
}

.dropdown ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.dropdown li {
    padding: 10px;
    cursor: pointer;
}

.dropdown li:hover {
    background-color: #f0f0f0;
}

.selected-address {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}
</style>
<template>
    <div class="form-section">
        <div class="form-group">
            <label for="nom">Nom :</label>
            <input type="text" id="nom" v-model="restaurant.nom" required />
        </div>
        <div class="form-group">
            <label for="siret">SIRET :</label>
            <input type="text" id="siret" v-model="restaurant.siret" required />
        </div>
        <div class="form-group">
            <label for="nombreCouvert">Nombre de couverts :</label>
            <input type="number" id="nombreCouvert" v-model="restaurant.nombreCouvert" required />
        </div>
        <div class="form-group">
            <label for="capacite">Capacité :</label>
            <input type="number" id="capacite" v-model="restaurant.capacite" required />
        </div>
        <div class="form-group">
            <label for="telephone">Téléphone :</label>
            <input type="text" id="telephone" v-model="restaurant.telephone" required />
        </div>
        <div class="form-group">
            <label for="description">Description :</label>
            <textarea id="description" v-model="restaurant.description" required></textarea>
        </div>
        <div class="form-group">
            <label for="delaiPreparationCommande">Délai de préparation (minutes) :</label>
            <input type="number" id="delaiPreparationCommande" v-model="restaurant.delaiPreparationCommande" required />
        </div>
        <div class="form-group">
            <label for="photo">Photo :</label>
            <input type="text" id="photo" v-model="restaurant.photo" />
        </div>
        <div class="form-group">
            <label for="isOpen">Ouvert :</label>
            <select id="isOpen" v-model="restaurant.isOpen" required>
                <option :value="1">Oui</option>
                <option :value="0">Non</option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    restaurant: Object
});
</script>

<style scoped>
.form-section {
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input[type="text"],
input[type="number"],
textarea,
select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}
</style>
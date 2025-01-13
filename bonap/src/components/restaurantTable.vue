<template>
    <div class="grid__item__view">
        <div class="search" id="man__search" data-category="restaurant">
            <input class="search__views" id="restaurant__input" type="search" placeholder="Rechercher un restaurant">
            <button class="administration-restaurant-button" id="restaurant__button" type="submit">Rechercher</button>
        </div>
        <table id="restaurantsTable" class="display">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Ville</th>
                    <th>Flux</th>
                    <th>Couverts</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="restaurant in restaurants" :key="restaurant.id">
                    <td><a target="_blank" href="#">{{ restaurant.name }}</a></td>
                    <td>{{ restaurant.city }}</td>
                    <td><img class="change__icon" src="../../src/img/icon/order.png"></td>
                    <td><img class="change__icon" src="../../src/img/icon/cutlery.png"></td>
                    <td><img class="change__icon" src="../../src/img/icon/editing.png"></td>
                    <td><img class="change__icon" src="../../src/img/icon/delete.png"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';

const restaurants = ref([
    { id: 1, name: 'Aux plaisirs gustatifs', city: 'Lannion' },
    { id: 2, name: 'Mangez-nous', city: 'Saint-Jacques-en-champagne' },
    { id: 3, name: 'La bonne fourchette', city: 'Lannion' },
]);

const initializeDataTable = () => {
    $('#restaurantsTable').DataTable();
};

const destroyDataTable = () => {
    if ($.fn.DataTable.isDataTable('#restaurantsTable')) {
        $('#restaurantsTable').DataTable().destroy();
    }
};

onMounted(() => {
    initializeDataTable();
});

watch(restaurants, async () => {
    destroyDataTable();
    await nextTick();
    initializeDataTable();
});
</script>

<style scoped>
.change__icon {
    width: 15px;
    height: 15px;
}
</style>
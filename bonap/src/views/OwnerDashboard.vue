<template>
    <!-- ===nav left=== -->
    <div class="container" id="views">
        <div class="grid" id="man__grid">
            <div class="grid__item__nav">
                <ul class="grid_nav">
                    <li class="grid__admin__nav">
                        <a href="#" :class="{ active: activeTab === 'shop' }" @click.prevent="setActiveTab('shop')">Restaurants</a>
                    </li>
                    <li class="grid__admin__nav">
                        <a href="#" :class="{ active: activeTab === 'customer' }" @click.prevent="setActiveTab('customer')">Clients</a>
                    </li>
                    <li class="grid__admin__nav">
                        <a href="#" :class="{ active: activeTab === 'table' }" @click.prevent="setActiveTab('table')">Tableau de bord</a>
                    </li>
                    <li class="grid__admin__nav">
                        <a href="#" :class="{ active: activeTab === 'report' }" @click.prevent="setActiveTab('report')">Rapports</a>
                    </li>
                </ul>
            </div>

            <!-- ===parts=== -->
            <div v-if="activeTab === 'shop'" class="grid__item__view">
                <div class="search" id="man__search" data-category="shop">
                    <input class="search__views" id="shop__input" type="search" placeholder="Rechercher un restaurant">
                    <button class="administration-shop-button" id="shop__button" type="submit">Rechercher</button>
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

            <div v-if="activeTab === 'customer'" class="grid__item__view">
                <div class="search" id="man__search" data-category="customer">
                    <input class="search__views" id="customer__input" type="search" placeholder="Rechercher un client">
                    <button class="administration-customer-button" id="customer__button" type="submit">Rechercher</button>
                </div>
                <table id="customersTable" class="display">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th>Adresse</th>
                            <th>Modifier</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="customer in customers" :key="customer.id">
                            <td>{{ customer.name }}</td>
                            <td>{{ customer.email }}</td>
                            <td>{{ customer.phone }}</td>
                            <td>{{ customer.address }}</td>
                            <td><img class="change__icon" src="../../src/img/icon/editing.png"></td>
                            <td><img class="change__icon" src="../../src/img/icon/delete.png"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Repeat similar structure for other tabs (table, report) -->
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const activeTab = ref('shop');
const restaurants = ref([
    { id: 1, name: 'Aux plaisirs gustatifs', city: 'Lannion' },
    { id: 2, name: 'Mangez-nous', city: 'Saint-Jacques-en-champagne' },
    { id: 3, name: 'La bonne fourchette', city: 'Lannion' },
]);

const setActiveTab = (tab) => {
    activeTab.value = tab;
};

onMounted(() => {
    $('#restaurantsTable').DataTable();
});
</script>

<style scoped>

.change__icon {
    width: 15px;
    height: 15px;
}
</style>
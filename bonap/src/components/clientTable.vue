<template>
    <div class="grid__item__view">
        <div class="search" id="man__search" data-category="client">
            <input class="search__views" id="client__input" type="search" placeholder="Rechercher un client">
            <button class="administration-client-button" id="client__button" type="submit">Rechercher</button>
        </div>
        <table id="clientsTable" class="display">
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
                <tr v-for="client in clients" :key="client.id">
                    <td>{{ client.name }}</td>
                    <td>{{ client.email }}</td>
                    <td>{{ client.phone }}</td>
                    <td>{{ client.address }}</td>
                    <td><img class="change__icon" src="../../src/img/icon/editing.png"></td>
                    <td><img class="change__icon" src="../../src/img/icon/delete.png"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';

const clients = ref([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', address: '123 Main St' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', address: '456 Elm St' },
]);

const initializeDataTable = () => {
    $('#clientsTable').DataTable();
};

const destroyDataTable = () => {
    if ($.fn.DataTable.isDataTable('#clientsTable')) {
        $('#clientsTable').DataTable().destroy();
    }
};

onMounted(() => {
    initializeDataTable();
});

watch(clients, async () => {
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
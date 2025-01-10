<template>
    <!-- ===nav left=== -->
    <div class="container" id="views">
        <div class="grid" id="man__grid">
            <div class="grid__item__nav">
                <ul class="grid_nav">
                    <li class="grid__admin__nav">
                        <a href="#" :class="{ active: activeTab === 'restaurant' }" @click.prevent="setActiveTab('restaurant')">Restaurants</a>
                    </li>
                    <li class="grid__admin__nav">
                        <a href="#" :class="{ active: activeTab === 'client' }" @click.prevent="setActiveTab('client')">Clients</a>
                    </li>
                    <li class="grid__admin__nav">
                        <a href="#" :class="{ active: activeTab === 'dashboard' }" @click.prevent="setActiveTab('dashboard')">Tableau de bord</a>
                    </li>
                    <li class="grid__admin__nav">
                        <a href="#" :class="{ active: activeTab === 'report' }" @click.prevent="setActiveTab('report')">Rapports</a>
                    </li>
                </ul>
            </div>

            <!-- ===parts=== -->
            <RestaurantTable v-if="activeTab === 'restaurant'" />
            <ClientTable v-if="activeTab === 'client'" />
            <ChartTable v-if="activeTab === 'dashboard'" />
            <!-- Repeat similar structure for other tabs (report) -->
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import RestaurantTable from '@/components/RestaurantTable.vue';
import ClientTable from '@/components/ClientTable.vue';
import ChartTable from '@/components/ChartTable.vue'; // Assurez-vous que ce chemin est correct

// Définir l'onglet actif par défaut comme 'restaurant'
const activeTab = ref('restaurant');

// Fonction pour définir l'onglet actif
const setActiveTab = (tab) => {
    activeTab.value = tab;
};
</script>
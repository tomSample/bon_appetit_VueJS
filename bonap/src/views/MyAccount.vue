<template>
    <section id="profile" class="fields">
        <div class="container" id="addresses">
            <div class="subtitle">
                <h2>Mes adresses</h2>
            </div>
            <div v-if="adresses.length">
                <div v-for="adresse in adresses" :key="adresse.id" class="address-block">
                    <p>
                        {{ adresse.numero }} {{ adresse.rue }}
                        <span v-if="adresse.complement">, {{ adresse.complement }}</span>,
                        {{ adresse.codePostal }} {{ adresse.ville }}
                    </p>
                    <span class="address-type" v-if="adresse.adresseParDefaut">🏠 Domicile</span>
                    <span class="address-type" v-if="adresse.adresseTravail">💼 Travail</span>
                </div>
            </div>
            <div v-else>
                <p>Aucune adresse enregistrée.</p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const adresses = ref([]);

// À adapter selon la façon dont tu récupères l'id utilisateur
const userId = localStorage.getItem('userId');

const fetchAdresses = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/utilisateurs/${userId}/adresses`);
        if (response.ok) {
            adresses.value = await response.json();
        } else {
            adresses.value = [];
            console.error('Erreur lors de la récupération des adresses');
        }
    } catch (error) {
        adresses.value = [];
        console.error('Erreur lors de la récupération des adresses:', error);
    }
};

onMounted(() => {
    fetchAdresses();
});
</script>

<style scoped>
.fields {
    padding: 20px;
}

.container {
    margin-bottom: 20px;
}

.subtitle {
    margin-bottom: 10px;
}

.address-block {
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #eee;
    border-radius: 4px;
    background: #fafafa;
}

.address-type {
    margin-left: 10px;
    font-weight: bold;
    color: #007bff;
}
</style>
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
            <form @submit.prevent="ajouterAdresse">
                <input v-model="nouvelleAdresse.numero" placeholder="Numéro" required />
                <input v-model="nouvelleAdresse.rue" placeholder="Rue" required />
                <input v-model="nouvelleAdresse.complement" placeholder="Complément" />
                <input v-model="nouvelleAdresse.codePostal" placeholder="Code postal" required />
                <input v-model="nouvelleAdresse.ville" placeholder="Ville" required />
                <label>
                    <input type="checkbox" v-model="nouvelleAdresse.adresseParDefaut" />
                    Domicile
                </label>
                <label>
                    <input type="checkbox" v-model="nouvelleAdresse.adresseTravail" />
                    Travail
                </label>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const adresses = ref([]);

const userId = localStorage.getItem('userId');

const nouvelleAdresse = ref({
    numero: '',
    rue: '',
    complement: '',
    codePostal: '',
    ville: '',
    adresseParDefaut: false,
    adresseTravail: false
});

const ajouterAdresse = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/utilisateurs/${userId}/adresses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nouvelleAdresse.value)
        });
        if (response.ok) {
            await fetchAdresses();
            // Réinitialiser le formulaire
            Object.keys(nouvelleAdresse.value).forEach(k => nouvelleAdresse.value[k] = (typeof nouvelleAdresse.value[k] === 'boolean' ? false : ''));
        } else {
            alert('Erreur lors de l\'ajout');
        }
    } catch (e) {
        alert('Erreur lors de l\'ajout');
    }
};

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
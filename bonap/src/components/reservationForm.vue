<!-- 
reservationForm.vue :
Ce composant permet aux utilisateurs de réserver une table dans un restaurant. 
Il collecte des informations comme la date, l'heure, et le nombre de convives, 
et envoie ces données à l'API pour créer une réservation.
-->

<template>
    <div class="reservation-form">
        <h2>Réserver une table</h2>
        <form @submit.prevent="submitReservation">
            <div class="form-group">
                <label for="date">Date :</label>
                <input type="date" id="date" v-model="reservation.date" required />
            </div>
            <div class="form-group">
                <label for="time">Heure :</label>
                <div class="time-select">
                    <select v-model="reservation.hour" required>
                        <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
                    </select>
                    <span>:</span>
                    <select v-model="reservation.minute" required>
                        <option v-for="minute in minutes" :key="minute" :value="minute">{{ minute }}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="guests">Nombre de convives :</label>
                <input type="number" id="guests" v-model="reservation.guests" min="1" required />
            </div>
            <button type="submit">Confirmer la réservation</button>
        </form>
        <div v-if="message" :class="{'message': true, 'error': isError}">{{ message }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// Function to get the current date in YYYY-MM-DD format
const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Define the reservation object with default values
const reservation = ref({
    date: getCurrentDate(), // Default current date
    hour: '12', // Default hour
    minute: '00', // Default minute
    guests: 1,
    restaurantId: null, // Default restaurant ID (will be set dynamically)
    utilisateurId: 1 // Default user ID (replace with actual value)
});

// List of hours and minutes for the selectors
const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const minutes = ['00', '15', '30', '45'];

// Message to display the reservation status
const message = ref('');
const isError = ref(false);

// Get the current route
const route = useRoute();

// Set the restaurant ID from the route parameter
onMounted(() => {
    reservation.value.restaurantId = parseInt(route.params.id, 10);
    console.log('Restaurant ID récupéré depuis la route :', reservation.value.restaurantId);

    // Simulez la récupération de l'utilisateur connecté (remplacez par votre logique réelle)
    reservation.value.utilisateurId = 27; // Exemple d'ID utilisateur
    console.log('Utilisateur ID défini :', reservation.value.utilisateurId);
});

// Method to submit the reservation
const submitReservation = async () => {
    // Combine la date et l'heure en un seul champ au format ISO 8601
    const dateTime = `${reservation.value.date}T${reservation.value.hour}:${reservation.value.minute}:00Z`;

    const reservationData = {
        dateTime,
        nbPersonne: reservation.value.guests,
        restaurant: { id: reservation.value.restaurantId },
        utilisateur: { id: reservation.value.utilisateurId }
    };

    console.log('Données envoyées pour la réservation :', reservationData);

    try {
        const response = await fetch('http://localhost:8080/api/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservationData)
        });

        if (!response.ok) {
            if (response.status === 403) {
                throw new Error('Vous n\'êtes pas autorisé à effectuer cette action.');
            }
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        message.value = 'Réservation confirmée !';
        isError.value = false;
        console.log('Réservation confirmée :', data);
    } catch (error) {
        message.value = error.message || 'Erreur lors de la réservation.';
        isError.value = true;
        console.error('Erreur lors de la réservation :', error);
    }
};
</script>

<style scoped>
.reservation-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
}

input, select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.time-select {
    display: flex;
    align-items: center;
}

.time-select select {
    width: auto;
    margin-right: 0.5rem;
}

button {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 5px;
    background-color: #333;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #555;
}

.message {
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 5px;
    background-color: #e0ffe0;
    color: #006600;
}

.error {
    background-color: #ffe0e0;
    color: #660000;
}
</style>
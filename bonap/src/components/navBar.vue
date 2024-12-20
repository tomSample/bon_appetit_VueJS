<template>
    <header>
        <nav class="nav-bar">
            <div class="nav-bar__logo">
                <router-link to="/">
                    <img src="@/assets/logo.svg" alt="Bonap logo" />
                </router-link>
            </div>
            <div class="nav-bar__links">
                <router-link to="/">Accueil</router-link>
                <div v-if="isLoggedIn" class="dropdown">
                    <button class="dropbtn" @click="toggleDropdown">Mon Compte</button>
                    <div :class="{'dropdown-content': true, 'show': dropdownOpen}">
                        <router-link to="/profile">Profil</router-link>
                        <router-link to="/orders">Mes Commandes</router-link>
                        <router-link v-if="userRole === 'admin'" to="/admin/dashboard">Tableau de Bord</router-link>
                        <router-link v-if="userRole === 'admin'" to="/admin/users">Gérer les Utilisateurs</router-link>
                    </div>
                </div>
                <div v-else>
                    <router-link to="/register">Inscription</router-link>
                    <router-link to="/login">Connexion</router-link>
                </div>
                <router-link to="/cart">Panier</router-link>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Simuler l'état de connexion de l'utilisateur
const isLoggedIn = ref(true);
const userRole = ref('admin'); // Peut être 'admin', 'client', etc.
const dropdownOpen = ref(false);

// Fonction pour basculer l'affichage du menu déroulant
const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};

// Vous pouvez remplacer la logique ci-dessus par une vérification réelle de l'état de connexion
// et du rôle de l'utilisateur, par exemple, en vérifiant un token dans le localStorage ou en utilisant un store Vuex.
</script>

<style scoped>
.nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    padding: 1rem;
}

.nav-bar__logo img {
    height: 40px;
}

.nav-bar__links {
    display: flex;
    gap: 1rem;
}

.nav-bar__links a {
    color: white;
    text-decoration: none;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropbtn {
    background-color: #333;
    color: white;
    padding: 1rem;
    font-size: 16px;
    border: none;
    cursor: pointer;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropdown-content a:hover {
    background-color: #f1f1f1;
}

.show {
    display: block;
}
</style>
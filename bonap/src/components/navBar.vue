<template>
    <header>
        <nav class="nav-bar">
            <div class="nav-bar__logo">
                <router-link to="/">
                    <img src="@/assets/logo.svg" alt="Bonap logo" />
                </router-link>
            </div>
            <div class="nav-bar__links">
                <div v-if="isLoggedIn" class="dropdown">
                    <button class="dropbtn" @click="toggleDropdown">Mon Compte</button>
                    <div :class="{'dropdown-content': true, 'show': dropdownOpen}">
                        <router-link v-if="userRole === 'client'" to="/my-account">Mon Profil</router-link>
                        <router-link v-if="userRole === 'admin'" to="/admin/dashboard">Tableau de Bord</router-link>
                        <router-link v-if="userRole === 'admin'" to="/admin/users">Gérer les Utilisateurs</router-link>
                        <router-link v-if="userRole === 'owner'" to="/owner/dashboard">Tableau de Bord owner</router-link>
                        <router-link v-if="userRole === 'owner'" to="/owner/create">Créer un restaurant</router-link>
                        <router-link v-if="userRole === 'carrier'" to="/carrier/orders">Commandes en Cours</router-link>
                        <router-link to="#" @click.prevent="logout">Déconnexion</router-link>
                    </div>
                </div>
                <div v-else>
                    <router-link to="/signup/client">Inscription</router-link>
                    <router-link to="/login">Connexion</router-link>
                </div>
                <button @click="$emit('toggle-cart')">Panier</button>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router'; // Importer useRouter

const authStore = useAuthStore();
const router = useRouter(); // Obtenir l'objet router

const dropdownOpen = ref(false);

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};

const logout = () => {
    authStore.logout(router); // Passer l'objet router à la méthode logout
    // window.location.reload(); // Supprimer cette ligne pour éviter les problèmes de redirection
};

// Utiliser les données de l'authentification
const isLoggedIn = computed(() => authStore.isLoggedIn);
const userRole = computed(() => authStore.userRole);
</script>

<style scoped>
.nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #333;
    color: white;
}

.nav-bar__logo img {
    height: 40px;
}

.nav-bar__links {
    display: flex;
    align-items: center;
}

.nav-bar__links a {
    color: white;
    text-decoration: none;
    margin: 0 10px;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropbtn {
    background-color: #333;
    color: white;
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
<template>
    <footer>
        <p>© 2023 Bon Appétit. Tous droits réservés.</p>
        <div v-if="userRole === 'admin'">
            <p>Admin Panel</p>
            <nav>
                <ul>
                    <li><router-link to="/admin/dashboard">Dashboard</router-link></li>
                    <li><router-link to="/admin/settings">Settings</router-link></li>
                    <li><router-link to="/mentions">Mentions légales</router-link></li>
                    <li><router-link to="/conditions-generales">Conditions Générales</router-link></li>
                    <li><router-link to="/about">A propos</router-link></li>
                </ul>
            </nav>
        </div>
        <div v-else-if="userRole === 'owner'">
            <p>Guest Panel</p>
            <nav>
                <ul>
                    <li><router-link to="/mentions">Mentions légales</router-link></li>
                    <li><router-link to="/conditions-generales">Conditions Générales</router-link></li>
                    <li><router-link to="/about">A propos</router-link></li>
                </ul>
            </nav>
        </div>
        <div v-else>
            <p>Guest Panel</p>
            <nav>
                <ul>
                    <li><router-link to="/mentions">Mentions légales</router-link></li>
                    <li><router-link to="/conditions-generales">Conditions Générales</router-link></li>
                    <li><router-link to="/about">A propos</router-link></li>
                </ul>
            </nav>    
        </div>
    </footer>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const userRole = ref('guest'); // Change this value to 'admin' or 'user' to test different roles
</script>

<style scoped>
    footer {
        background-color: #333;
        color: white;
        text-align: center;
        padding: 1rem;
    }

    nav ul {
        list-style: none;
        padding: 0;
    }

    nav ul li {
        display: inline;
        margin: 0 10px;
    }

    nav ul li a {
        color: white;
        text-decoration: none;
    }

    footer {
        background-color: #333;
        color: white;
        text-align: center;
        padding: 1rem;
        position: relative;
        bottom: 0;
}
</style>
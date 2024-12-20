<template>
    <footer>
        <p>© 2023 Bon Appétit. Tous droits réservés.</p>
        <div v-if="userRole === 'admin'">
            <p>Admin Panel</p>
            <nav>
                <ul>
                    <li><a href="/admin/dashboard">Dashboard</a></li>
                    <li><a href="/admin/settings">Settings</a></li>
                </ul>
            </nav>
        </div>
        <div v-else-if="userRole === 'user'">
            <p>User Panel</p>
            <nav>
                <ul>
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="/settings">Settings</a></li>
                </ul>
            </nav>
        </div>
        <div v-else>
            <p>Welcome, Guest!</p>
        </div>
    </footer>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const userRole = ref('admin'); // Change this value to 'admin' or 'user' to test different roles
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
</style>
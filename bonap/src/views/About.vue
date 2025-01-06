<template>
    <div class="about-container">
        <h1>À propos</h1>
        <p>Cette webapp est un projet étudiant réalisé par trois étudiants développeurs.</p>
        <p>Le projet utilise les technologies suivantes :</p>
        <ul>
            <li>API Java Spring Boot</li>
            <li>Front-end en Vue.js</li>
            <li>Gestion de version avec Git et GitHub</li>
            <li>Base de données hébergée sur Azure</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'About'
}
</script>

<style scoped>
.about-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.about-container h1 {
    font-size: 28px;
    margin-bottom: 20px;
}

.about-container p {
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 10px;
}

.about-container ul {
    list-style-type: disc;
    padding-left: 20px;
}

.about-container li {
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 5px;
}
</style>
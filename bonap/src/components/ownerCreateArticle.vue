<!-- <template>
    <div class="create-article-form">
        <h2>Créer un Article</h2>
        <form @submit.prevent="submitArticle">
            <div class="form-group">
                <label for="nom">Nom :</label>
                <input type="text" id="nom" v-model="articleData.nom" required />
            </div>
            <div class="form-group">
                <label for="description">Description :</label>
                <textarea id="description" v-model="articleData.description" required></textarea>
            </div>
            <div class="form-group">
                <label for="prix">Prix :</label>
                <input type="number" id="prix" v-model="articleData.prix" required />
            </div>
            <div class="form-group">
                <label for="poids">Poids :</label>
                <input type="number" id="poids" v-model="articleData.poids" required />
            </div>
            <div class="form-group">
                <label for="stock">Stock :</label>
                <input type="number" id="stock" v-model="articleData.stock" required />
            </div>
            <div class="form-group">
                <label for="duree">Durée :</label>
                <input type="number" id="duree" v-model="articleData.duree" />
            </div>
            <div class="form-group">
                <label for="image">Image :</label>
                <input type="file" id="image" @change="handleFileUpload" />
            </div>
            <button type="submit" class="submit-button">Créer l'Article</button>
        </form>
        <p v-if="message" class="message">{{ message }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const articleData = ref({
    nom: '',
    description: '',
    prix: 0,
    poids: 0,
    stock: 0,
    duree: 0,
    image: null,
    restaurantId: null // This will be set when the restaurant is created
});

const message = ref('');

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        articleData.value.image = e.target.result;
    };
    reader.readAsDataURL(file);
};

const submitArticle = async () => {
    try {
        // Create the article
        const articleResponse = await fetch('http://localhost:8080/api/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(articleData.value),
        });

        if (!articleResponse.ok) {
            const errorData = await articleResponse.json();
            throw new Error(errorData.message || 'Failed to create article');
        }

        message.value = 'Article créé avec succès';
        router.push('/owner/dashboard'); // Redirect to the owner's dashboard after successful creation
    } catch (error) {
        message.value = error.message || 'Erreur lors de la création de l\'article';
    }
};
</script>

<style scoped>
.create-article-form {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input[type="text"],
input[type="number"],
input[type="file"],
textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.submit-button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.submit-button:hover {
    background-color: #0056b3;
}

.message {
    text-align: center;
    margin-top: 20px;
    color: red;
}
</style> -->
<template>
    <div id="create-super-container">
        <section class="create-container">
        
            <div class="resto-id" id="add__item">
                <div class="add__picture">
                    <h4>Télécharger une image de l'item :</h4>
                    <input type="file" @change="handleFileUpload('itemImage', $event)">
                    <input v-model="item.price" type="text" placeholder="Prix">
                    <textarea v-model="item.description" cols="25" rows="3" wrap="virtual" placeholder="Description de l'item"></textarea>
                </div>
                <div class="resto-id-text _dp_column">
                    <div class="resto-id-title">
                        <h4>Ajout d'items :</h4>
                        <label for="item-select">Type :</label>
                        <select v-model="item.type" id="item-select">
                            <option value="">--Veuillez choisir une option--</option>
                            <option value="plat">Plat</option>
                            <option value="menu">Menu</option>
                            <option value="dessert">Dessert</option>
                            <option value="boisson">Boisson</option>
                        </select>
                    </div>
                    <div class="resto-id-specs">
                        <input v-model="item.name" type="text" placeholder="Intitulé">
                        <input v-model="item.weight" type="text" placeholder="Poids">
                        <input v-model="item.preparationTime" type="text" placeholder="Délai de préparation">
                        <label for="choix">Choisissez une recommandation :</label>
                        <select id="choix" name="choix">
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                            <option value="option4">Option 4</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>

        <section class="create-container" id="create-container-presentation">
            <div class="create__shop">
                <button class="submit-button" id="create__button" @click="submitForm">Enregistrer</button>
            </div>
        </section>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useArticleStore } from '@/stores/articleStore';
import itemRestaurant from '@/components/itemRestaurant.vue';

// Récupération de la route et création d'une ref pour l'ID du restaurant
const route = useRoute();
const articleStore = useArticleStore();
const restaurantId = ref(null);

const restaurant = ref({
    name: '',
    hours: '',
    orderTime: '',
    description: '',
    image: null,
});

const item = ref({
    nom: '',
    poids: '',
    duree: '',
    prix: '',
    description: '',
    stock: '',
    image: null,
    restaurantId: null,
});

// Fonction exécutée au chargement du composant
onMounted(() => {
    // Récupération de l'ID du restaurant depuis l'URL
    if (route.params.restaurantId) {
        restaurantId.value = route.params.restaurantId;
        articleStore.fetchArticles(Number(restaurantId.value));
    }
    
    if (restaurantId.value) {
        console.log('ID du restaurant récupéré:', restaurantId.value);
        // Assigner l'ID du restaurant à l'item
        item.value.restaurantId = Number(restaurantId.value);
        
        // Si nécessaire, vous pourriez également charger les données du restaurant
        // fetchRestaurantData(restaurantId.value);
    } else {
        console.warn("Aucun ID de restaurant trouvé dans l'URL");
    }
});

const handleFileUpload = (type, event) => {
    const file = event.target.files[0];
    if (type === 'restaurantImage') {
        restaurant.value.image = file;
    } else if (type === 'itemImage') {
        item.value.image = file;
    }
};

const submitForm = async () => {
    // Vérifier que nous avons un ID de restaurant
    if (!item.value.restaurantId) {
        console.error("Impossible de soumettre le formulaire: ID du restaurant manquant");
        // Vous pourriez afficher un message d'erreur à l'utilisateur ici
        return;
    }
    
    // Préparation des données pour l'envoi
    try {
        const formData = new FormData();
        
        // Préparer l'article sans l'ID du restaurant (car il est passé séparément)
    const articleToSend = {
      nom: item.value.nom,
      prix: parseFloat(item.value.prix),
      description: item.value.description,
      poids: parseInt(item.value.poids),
      stock: parseInt(item.value.stock),
      duree: parseInt(item.value.duree),
      // L'image sera gérée séparément si nécessaire
    };

          // Passer l'article et l'ID du restaurant séparément
    await articleStore.addArticle(
      articleToSend, 
      Number(item.value.restaurantId)
    );

        // Conversion en JSON
        const jsonData = JSON.stringify(articleStore);
        
        // Envoi des données au serveur
        const response = await fetch(`/api/articles/restaurant/${item.value.restaurantId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        });
        
        if (!response.ok) {
            throw new Error('Erreur lors de l\'envoi des données');
        }
        
        const result = await response.json();
        console.log('Article créé avec succès:', result);
        
        // Gestion de l'image (si nécessaire)
        if (item.value.image) {
            const imageFormData = new FormData();
            imageFormData.append('image', item.value.image);
            
            // Vous devrez probablement créer un endpoint séparé pour l'upload d'image
            // await fetch(`/api/articles/${result.id}/upload-image`, {
            //     method: 'POST',
            //     body: imageFormData
            // });
        }
        
        // Réinitialiser le formulaire
        item.value = {
            nom: '',
            prix: '',
            description: '',
            image: null,
            poids: '',
            stock: '',
            duree: '',
            restaurantId: item.value.restaurantId
        };
      
        /* Version antérieure à priori inadéquate
       // Ajout des données de l'item au FormData
        Object.keys(item.value).forEach(key => {
            if (key === 'image' && item.value[key]) {
                formData.append('itemImage', item.value[key]);
            } else if (item.value[key] !== null) {
                formData.append(key, item.value[key]);
            }
        });
        
        // Si vous soumettez également les données du restaurant
        if (restaurant.value.name) {
            Object.keys(restaurant.value).forEach(key => {
                if (key === 'image' && restaurant.value[key]) {
                    formData.append('restaurantImage', restaurant.value[key]);
                } else if (restaurant.value[key] !== null) {
                    formData.append('restaurant_' + key, restaurant.value[key]);
                }
            });
        }
        
        console.log('Données à envoyer:', {
            restaurant: restaurant.value,
            item: item.value,
            restaurantId: restaurantId.value
        }); */
        
        // Envoi des données au serveur (à décommenter et adapter selon votre API)
        /*
        const response = await fetch('votre_url_api/items', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Erreur lors de l\'envoi des données');
        }
        
        const result = await response.json();
        console.log('Succès:', result);
        // Réinitialiser le formulaire ou rediriger l'utilisateur
        */
        
    alert('Article ajouté avec succès !');
    
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire:', error);
    alert('Erreur lors de l\'ajout de l\'article');
  }
};

// Fonction pour charger les données du restaurant
const fetchRestaurantData = async (id) => {
    try {
        const response = await fetch(`votre_url_api/restaurants/${id}`);
        if (response.ok) {
            const data = await response.json();
            // Mettre à jour les données du restaurant (sans écraser l'image)
            restaurant.value = {
                ...data,
                image: restaurant.value.image
            };
        }
    } catch (error) {
        console.error('Erreur lors du chargement des données du restaurant:', error);
    }
};
</script>

<style scoped>
#create-super-container {
    padding: 20px;
}

.create-container {
    margin-bottom: 20px;
}

.resto-id {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.add__picture {
    flex: 1;
    margin-right: 20px;
}

.resto-id-text {
    flex: 2;
}

.resto-id-title {
    margin-bottom: 10px;
}

.resto-id-specs {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.create__shop {
    text-align: center;
}

.submit-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.submit-button:hover {
    background-color: #0056b3;
}
</style>
<template>
    <div id="create-super-container">
        <section class="create-container">
            <div class="resto-id" id="add__top">
                <div class="add__picture">
                    <h4>Télécharger une image du restaurant :</h4>
                    <input type="file" @change="handleFileUpload('restaurantImage', $event)">
                </div>
                <div class="resto-id-text _dp_column">
                    <div class="resto-id-title">
                        <h4>Informations du restaurant :</h4>
                        <input v-model="restaurant.name" type="text" placeholder="Nom du restaurant">
                    </div>
                    <div class="resto-id-specs">
                        <input v-model="restaurant.hours" type="text" placeholder="Horaires d'ouverture">
                        <input v-model="restaurant.orderTime" type="text" placeholder="Délai préparation commande">
                    </div>
                </div>
            </div>
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
                    </div>
                </div>
            </div>
        </section>

        <section class="create-container" id="create-container-presentation">
            <div class="resto-resume body-padding" id="add__description">
                <div class="_w_50 mobile-resto-presentation">
                    <h4>Présentation du restaurant :</h4>
                    <textarea v-model="restaurant.description" cols="25" rows="3" wrap="virtual" placeholder="Description du restaurant"></textarea>
                </div>
            </div>
            <div class="create__shop">
                <button class="submit-button" id="create__button" @click="submitForm">Enregistrer</button>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const restaurant = ref({
    name: '',
    hours: '',
    orderTime: '',
    description: '',
    image: null,
});

const item = ref({
    name: '',
    type: '',
    weight: '',
    preparationTime: '',
    price: '',
    description: '',
    image: null,
});

const handleFileUpload = (type, event) => {
    const file = event.target.files[0];
    if (type === 'restaurantImage') {
        restaurant.value.image = file;
    } else if (type === 'itemImage') {
        item.value.image = file;
    }
};

const submitForm = () => {
    // Handle form submission logic here
    console.log('Restaurant:', restaurant.value);
    console.log('Item:', item.value);
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
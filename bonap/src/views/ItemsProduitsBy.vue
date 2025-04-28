<template>
    <div id="create-super-container">
      <section class="create-container">
        <h2 class="section-title">Informations du restaurant</h2>
        <div class="resto-id" id="add__top">
          <div class="add__picture">
            <h4>Image du restaurant</h4>
            <div class="file-upload-container">
              <input type="file" @change="handleFileUpload('restaurantImage', $event)">
              <div class="upload-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <span>Déposer une image ou cliquer pour parcourir</span>
              </div>
            </div>
          </div>
          <div class="resto-id-text">
            <div class="form-group">
              <label for="restaurant-name">Nom du restaurant</label>
              <input id="restaurant-name" v-model="restaurant.name" type="text" placeholder="Ex: La Belle Assiette">
            </div>
            
            <div class="resto-id-specs">
              <div class="form-group">
                <label for="restaurant-hours">Horaires d'ouverture</label>
                <input id="restaurant-hours" v-model="restaurant.hours" type="text" placeholder="Ex: Lun-Dim 10h-22h">
              </div>
              <div class="form-group">
                <label for="restaurant-order-time">Délai de préparation</label>
                <input id="restaurant-order-time" v-model="restaurant.orderTime" type="text" placeholder="Ex: 15-20 min">
              </div>
            </div>
            
            <div class="form-group">
              <label for="restaurant-description">Présentation du restaurant</label>
              <textarea id="restaurant-description" v-model="restaurant.description" placeholder="Décrivez votre restaurant, sa spécialité, son ambiance..."></textarea>
            </div>
          </div>
        </div>
      </section>
  
      <section class="create-container">
        <h2 class="section-title">Ajouter un item au menu</h2>
        <div class="resto-id" id="add__item">
          <div class="add__picture">
            <h4>Image de l'item</h4>
            <div class="file-upload-container">
              <input type="file" @change="handleFileUpload('itemImage', $event)">
              <div class="upload-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <span>Déposer une image ou cliquer pour parcourir</span>
              </div>
            </div>
            
            <div class="form-group">
              <label for="item-price">Prix</label>
              <input id="item-price" v-model="item.price" type="text" placeholder="Ex: 12.90 €">
            </div>
            
            <div class="form-group">
              <label for="item-description">Description</label>
              <textarea id="item-description" v-model="item.description" placeholder="Décrivez les ingrédients, la préparation, etc."></textarea>
            </div>
          </div>
          
          <div class="resto-id-text">
            <div class="form-group">
              <label for="item-type">Type d'item</label>
              <select v-model="item.type" id="item-type">
                <option value="">--Veuillez choisir une option--</option>
                <option value="plat">Plat</option>
                <option value="menu">Menu</option>
                <option value="dessert">Dessert</option>
                <option value="boisson">Boisson</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="item-name">Nom de l'item</label>
              <input id="item-name" v-model="item.name" type="text" placeholder="Ex: Burger Gourmet">
            </div>
            
            <div class="resto-id-specs">
              <div class="form-group">
                <label for="item-weight">Poids</label>
                <input id="item-weight" v-model="item.weight" type="text" placeholder="Ex: 250g">
              </div>
              <div class="form-group">
                <label for="item-prep-time">Temps de préparation</label>
                <input id="item-prep-time" v-model="item.preparationTime" type="text" placeholder="Ex: 15 min">
              </div>
            </div>
          </div>
        </div>
      </section>
  
        <section class="create-container" id="create-container-presentation">
            <div class="button-container">
                <button class="submit-button" id="create__button" @click="submitForm">Enregistrer le restaurant</button>
            </div>
        </section>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import itemRestaurant from '@/components/itemsProduitsBy.vue';
  
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
  
  /*const submitForm = () => {
      // Handle form submission logic here
      console.log('Restaurant:', restaurant.value);
      console.log('Item:', item.value);
  };*/

  const submitForm = async () => {
  try {
    // 1. Récupérer l'ID du restaurant du restaurateur connecté
    const restaurantId = localStorage.getItem('restaurantId');
    
 /*// Option 2: Si vous devez le récupérer via une API
 if (!restaurantId) {
      try {
        const userResponse = await fetch('http://localhost:8080/api/user/current-restaurant', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Ajoutez ici les headers d'authentification si nécessaire
            // 'Authorization': `Bearer ${votre_token_jwt}`
          }
        });
        
        if (userResponse.ok) {
          const userData = await userResponse.json();
          restaurantId = userData.restaurantId;
          console.log('ID du restaurant récupéré:', restaurantId);
        } else {
          throw new Error(`Impossible de récupérer les informations du restaurant: ${userResponse.status}`);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du restaurant:', error);
        throw new Error('Impossible de déterminer le restaurant. Veuillez réessayer.');
      }
    }

    // Si c'est un nouveau restaurant, créez-le d'abord
    if (!restaurantId) {
      const restaurantData = {
        nom: restaurant.value.name,
        horaires: restaurant.value.hours,
        tempsPreparation: restaurant.value.orderTime,
        description: restaurant.value.description
      };

      console.log('Données restaurant à envoyer:', restaurantData);
      
      const restaurantResponse = await fetch('http://localhost:8080/api/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(restaurantData)
      });
      
      if (!restaurantResponse.ok) {
        throw new Error(`HTTP error! status: ${restaurantResponse.status}`);
      }
      
      const newRestaurant = await restaurantResponse.json();
      console.log('Restaurant créé avec succès:', newRestaurant);

      restaurantId = newRestaurant.id; // Récupérez l'ID du restaurant créé
    } */
    
 // Si nous avons un ID de restaurant, nous ajoutons simplement un item
 if (restaurantId) {
      // Préparation des données de l'item
    const itemData = {
      nom: item.value.name,
      prix: item.value.price,
      description: item.value.description,
      poids: item.value.weight,
      stock: item.value.stock,
      duree: item.value.preparationTime,
      image: item.value.image ? await convertImageToBase64(item.value.image) : '' // Conversion de l'image
    };

    console.log('Données item à envoyer:', itemData);
    
    const itemResponse = await fetch(`http://localhost:8080/api/articles/restaurant/${restaurantId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemData)
    });
    
    if (!itemResponse.ok) {
      throw new Error(`HTTP error! status: ${restaurantResponse.status}`);
    }
    
    const result = await itemResponse.json();
    console.log('Item enregistré avec succès:', result);
    
    // Réinitialiser le formulaire d'item
    /*item.value = {
      name: '',
      type: '',
      weight: '',
      preparationTime: '',
      price: '',
      description: '',
      image: null,
    };*/
    resetItemForm();
    
    alert('Item ajouté au menu avec succès!');
    } else {
      // Si nous n'avons pas d'ID de restaurant
      alert('Impossible de trouver votre restaurant. Veuillez vous reconnecter.');
    }
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement:', error);
    alert(`Erreur lors de l'enregistrement: ${error.message}`);
  }
};

// Fonction pour convertir une image en base64
const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve('');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]); 
    reader.onerror = error => reject(error);
  });
};


// Fonction pour réinitialiser le formulaire
const resetForm = () => {
  restaurant.value = {
    name: '',
    siret: '',
    nombreCouvert: '',
    capacite: '',
    telephone: '',
    orderTime: '',
    description: '',
    image: null,
  };
}

const resetItemForm = () => {
  item.value = {
    name: '',
    type: '',
    weight: '',
    preparationTime: '',
    price: '',
    description: '',
    image: null,
  };
};
  </script>
  
  <style scoped>
  :root {
    --primary: #ff6b35;
    --primary-light: #ff8a5f;
    --secondary: #2e4057;
    --light: #f7f7f7;
    --gray: #e0e0e0;
    --dark-gray: #555;
    --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    --border-radius: 8px;
  }
  
  #create-super-container {
    max-width: 1200px;
    margin: 30px auto;
    padding: 0 20px;
  }
  
  .create-container {
    background-color: white;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    padding: 25px;
    margin-bottom: 30px;
    overflow: hidden;
  }
  
  .section-title {
    font-size: 22px;
    color: var(--secondary);
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--primary);
  }
  
  h4 {
    color: var(--secondary);
    margin-bottom: 12px;
    font-weight: 600;
  }
  
  .resto-id {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    margin-bottom: 30px;
  }
  
  .add__picture {
    flex: 1;
    min-width: 250px;
  }
  
  .resto-id-text {
    flex: 2;
    min-width: 300px;
  }
  
  .file-upload-container {
    position: relative;
    width: 100%;
    height: 200px;
    border: 2px dashed var(--gray);
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-bottom: 15px;
    transition: all 0.3s ease;
  }
  
  .file-upload-container:hover {
    border-color: var(--primary);
  }
  
  .file-upload-container input[type="file"] {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 2;
  }
  
  .upload-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--dark-gray);
  }
  
  .upload-icon svg {
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: var(--secondary);
    font-weight: 500;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--gray);
    border-radius: var(--border-radius);
    font-size: 14px;
    transition: all 0.3s ease;
  }
  
  input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.2);
  }
  
  textarea {
    resize: vertical;
    min-height: 100px;
  }
  
  select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%232e4057' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px;
  }
  
  .resto-id-specs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }
  
  #create-container-presentation {
    text-align: center;
  }
  
  .button-container {
  text-align: center;
  padding: 20px 0;
  margin-top: 20px;
}

.submit-button {
  background-color: #ff6b35;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: inline-block;
  min-width: 200px;
}

.submit-button:hover {
  background-color: #e55a2a;
}

#create-container-presentation {
  text-align: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 25px;
  margin-bottom: 30px;
}
  
  @media (max-width: 768px) {
    .resto-id {
      flex-direction: column;
    }
    
    .add__picture, .resto-id-text {
      width: 100%;
    }
    
    .resto-id-specs {
      grid-template-columns: 1fr;
    }
  }
  </style>
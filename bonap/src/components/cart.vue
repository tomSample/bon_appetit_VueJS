<template>
    <div class="cart">
        <h3>Votre panier</h3>
        <div v-if="cart.length" class="cart-items">
            <div v-for="item in cart" :key="item.id" class="cart-item">
                <div class="cart-item-details">
                    <p class="cart-item-name">{{ item.name }}</p>
                    <p class="cart-item-price">{{ item.price }} €</p>
                </div>
                <div class="cart-item-quantity">
                    <button @click="decreaseQuantity(item.id)">-</button>
                    <span>{{ item.quantity }}</span>
                    <button @click="increaseQuantity(item.id)">+</button>
                </div>
                <button @click="removeItem(item.id)" class="remove-item-button">Supprimer</button>
            </div>
            <div class="cart-summary">
                <p>Total : {{ total }} €</p>
            </div>
        </div>
        <p v-else>Votre panier est vide.</p>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Panier local
const cart = ref([
    // Exemple d'articles
    // { id: 1, name: 'Pizza Margherita', price: 12.5, quantity: 1 },
    // { id: 2, name: 'Pâtes Carbonara', price: 15, quantity: 2 },
]);

const total = computed(() =>
    cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

const increaseQuantity = (id: number) => {
    const item = cart.value.find((item) => item.id === id);
    if (item) item.quantity++;
};

const decreaseQuantity = (id: number) => {
    const item = cart.value.find((item) => item.id === id);
    if (item && item.quantity > 1) item.quantity--;
};

const removeItem = (id: number) => {
    cart.value = cart.value.filter((item) => item.id !== id);
};
</script>

<style scoped>
.cart {
    padding: 1rem;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.cart-items {
    margin-top: 1rem;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #ddd;
}

.cart-item-details {
    flex: 1;
}

.cart-item-name {
    font-weight: bold;
}

.cart-item-price {
    color: #666;
}

.cart-item-quantity {
    display: flex;
    align-items: center;
}

.cart-item-quantity button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 0.5rem;
}

.cart-item-quantity button:hover {
    background-color: #0056b3;
}

.remove-item-button {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    cursor: pointer;
}

.remove-item-button:hover {
    background-color: #c82333;
}

.cart-summary {
    margin-top: 1rem;
    font-weight: bold;
    text-align: right;
}
</style>
<template>
    <section class="checkout-body">
        <div class="checkout-container-left">
            <div class="checkout-content">
                <div class="checkout-content-title">
                    <div class="checkout-title" @click="toggleAddDeliveryAddress">
                        <h2>Adresse de livraison</h2>
                        <span class="material-symbols-outlined">home_work</span>
                    </div>
                </div>
                <div v-for="(address, index) in addresses" :key="index" @click="checkRadio(`address-${index}`)" class="checkout-content-box">
                    <div>
                        <input type="radio" name="address" :id="`address-${index}`" />
                    </div>
                    <div class="checkout-radio-box">
                        <p>{{ address }}</p>
                    </div>
                </div>
                <div class="checkout-edit" @click="toggleAddDeliveryAddress">
                    <h3>Ajouter/Modifier une adresse</h3>
                    <span class="material-symbols-outlined">edit</span>
                </div>
            </div>

            <div class="checkout-content">
                <div class="checkout-content-title">
                    <div class="checkout-title" @click="toggleAddPaymentMode">
                        <h2>Moyens de paiement</h2>
                        <span class="material-symbols-outlined">payments</span>
                    </div>
                </div>
                <div v-for="(payment, index) in payments" :key="index" @click="checkRadio(`payment-${index}`)" class="checkout-content-box">
                    <div>
                        <input type="radio" name="payment" :id="`payment-${index}`" />
                    </div>
                    <div class="checkout-radio-box">
                        <p>{{ payment }}</p>
                    </div>
                </div>
                <div class="checkout-edit" @click="toggleAddPaymentMode">
                    <h3>Ajouter/Modifier</h3>
                    <span class="material-symbols-outlined">edit</span>
                </div>
            </div>
        </div>

        <div class="checkout-container-right">
            <div class="checkout-content">
                <div class="checkout-content-title">
                    <div class="checkout-title">
                        <h2>Récapitulatif</h2>
                    </div>
                </div>
                <div class="cart-items">
                    <div v-if="cart.length">
                        <div v-for="item in cart" :key="item.id" class="cart-item">
                            <div class="cart-item-details">
                                <div class="cart-item-name">
                                    {{ item.name }} {{ item.price }}€
                                </div>
                                <div class="cart-item-quantity">
                                    <button @click="decreaseQuantity(item.id)"><strong>-</strong></button>
                                    {{ item.quantity }}
                                    <button @click="increaseQuantity(item.id)"><strong>+</strong></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p v-else>Votre panier est vide</p>
                </div>
                <div class="confirm-order-button-box">
                    <button v-if="cart.length" class="confirm-order-button">Commander et payer</button>
                </div>
                <div class="checkout-summary">
                    <div class="checkout-summary-item">
                        <p>Sous-total</p>
                        <p>{{ subtotal }}</p>
                    </div>
                    <div class="checkout-summary-item">
                        <p>Livraison</p>
                        <p>{{ delivery }}</p>
                    </div>
                    <div class="checkout-summary-item">
                        <h4>Total</h4>
                        <p>{{ total }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const addresses = ref([
    'John Doe, 123 Main St, 75001 Paris',
    'Jane Doe, 456 Elm St, 75002 Paris'
]);

const payments = ref([
    'VISA 4971 8545 2245 7889'
]);

const cart = ref([
    { id: 1, name: 'Item 1', price: 10, quantity: 1 },
    { id: 2, name: 'Item 2', price: 20, quantity: 2 }
]);

const subtotal = computed(() => cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0));
const delivery = ref(5); // Example delivery fee
const total = computed(() => subtotal.value + delivery.value);

const toggleAddDeliveryAddress = () => {
    // Implement toggle logic
};

const toggleAddPaymentMode = () => {
    // Implement toggle logic
};

const checkRadio = (id) => {
    document.getElementById(id).checked = true;
};

const decreaseQuantity = (id) => {
    const item = cart.value.find((item) => item.id === id);
    if (item && item.quantity > 1) {
        item.quantity--;
    }
};

const increaseQuantity = (id) => {
    const item = cart.value.find((item) => item.id === id);
    if (item) {
        item.quantity++;
    }
};
</script>

<style scoped>
.checkout-body {
    display: flex;
    justify-content: space-between;
    padding: 20px;
}

.checkout-container-left,
.checkout-container-right {
    width: 48%;
}

.checkout-content {
    background-color: white;
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
}

.checkout-content-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.checkout-content-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
}

.checkout-radio-box {
    flex-grow: 1;
    padding-left: 10px;
}

.cart-items {
    margin-top: 20px;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
}

.cart-item-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.cart-item-name {
    flex-grow: 1;
}

.cart-item-quantity {
    display: flex;
    align-items: center;
}

.confirm-order-button-box {
    text-align: center;
    margin-top: 20px;
}

.confirm-order-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.confirm-order-button:hover {
    background-color: #0056b3;
}

.checkout-summary {
    margin-top: 20px;
}

.checkout-summary-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
}
</style>
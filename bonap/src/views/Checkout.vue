<!-- 
Checkout.vue :
Cette vue gère le processus de commande et de paiement. 
Elle permet aux utilisateurs de sélectionner une adresse de livraison, un mode de paiement, 
et de voir un récapitulatif de leur commande avant de confirmer et payer.
-->
<template>
    <section class="checkout-body">
        <div class="checkout-container-left">
            <!-- Adresse et paiement -->
        </div>
        <div class="checkout-container-right">
            <cart />
            <div class="confirm-order-button-box">
                <button v-if="cart.length" class="confirm-order-button">Commander et payer</button>
            </div>
        </div>
    </section>
</template>

<script setup>
import cart from '@/components/cart.vue'; // Assurez-vous que le nom correspond au fichier
</script>
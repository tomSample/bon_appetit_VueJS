<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterView } from 'vue-router';
import navBar from '@/components/navBar.vue';
import foot from '@/components/foot.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const isCartVisible = ref(false);

const toggleCart = () => {
  isCartVisible.value = !isCartVisible.value;
};

const isLoggedIn = computed(() => authStore.isLoggedIn);
const userRole = computed(() => authStore.userRole);
const userId = computed(() => authStore.userId);

// Debug
console.log('isLoggedIn:', isLoggedIn.value);
console.log('userRole:', userRole.value);
console.log('userId:', userId.value);
console.log('token:', authStore.token);

</script>

<template>
  <header>
    <navBar @toggle-cart="toggleCart" :isLoggedIn="isLoggedIn" :userRole="userRole" />
  </header>

  <main>
    <RouterView />
    <div v-if="isCartVisible" class="cart-sidebar">
      <div class="cart-header">
        <h2>Votre Panier</h2>
        <button @click="toggleCart" class="close-btn">Fermer</button>
      </div>
      <div class="cart-items">
        <p>article 1</p>
        <!-- Add more cart items here -->
      </div>
      <router-link to="/checkout" class="checkout-link" @click="toggleCart">Commander et payer</router-link>
    </div>
  </main>

  <footer>
    <foot />
  </footer>
</template>

<style scoped>
.cart-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  padding: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.cart-items {
  flex-grow: 1;
  overflow-y: auto;
  margin-top: 20px;
}

.checkout-link {
  display: block;
  text-align: center;
  padding: 10px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 20px;
}

.checkout-link:hover {
  background-color: #0056b3;
}
</style>
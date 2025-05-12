// src/api/restaurantApi.js

// Configuration de base
const BASE_URL = 'http://localhost:8080/api';

/**
 * Récupérer les restaurants d'un utilisateur
 * @param {number} userId - ID de l'utilisateur
 * @returns {Promise} Liste des restaurants
 */
export const fetchRestaurantsByUser = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/restaurants/by-user/${userId}`);
        
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des restaurants.');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erreur dans fetchRestaurantsByUser:', error);
        throw error;
    }
};

/**
 * Récupérer un restaurant par son ID
 * @param {number} restaurantId - ID du restaurant
 * @returns {Promise} Détails du restaurant
 */
export const fetchRestaurantById = async (restaurantId) => {
    try {
        const response = await fetch(`${BASE_URL}/restaurants/${restaurantId}`);
        
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération du restaurant.');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erreur dans fetchRestaurantById:', error);
        throw error;
    }
};

/**
 * Créer un nouvel item pour un restaurant
 * @param {FormData} itemData - Données de l'item
 * @returns {Promise} Item créé
 */
export const createRestaurantItem = async (itemData) => {
    try {
        const response = await fetch(`${BASE_URL}/items`, {
            method: 'POST',
            body: itemData
        });
        
        if (!response.ok) {
            throw new Error('Erreur lors de la création de l\'item.');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erreur dans createRestaurantItem:', error);
        throw error;
    }
};
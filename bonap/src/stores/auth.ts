// Ce store Pinia gère l'authentification de l'utilisateur, y compris la connexion, la déconnexion et la récupération du rôle de l'utilisateur. 
// Il stocke et récupère les informations d'authentification (token et rôle, d'autres pourront être ajoutés) dans le localStorage pour persister l'état de connexion.


import { defineStore } from 'pinia';

// Interface pour représenter le token décodé
interface DecodedToken {
    userId: string;
    role: string;
}

// Définition du store Pinia pour l'authentification
export const useAuthStore = defineStore('auth', {
    // État initial du store
    state: () => ({
        token: localStorage.getItem('token') || '', // Récupère le token depuis le localStorage ou initialise à une chaîne vide
        // !! = convertir une valeur en un booléen
        isLoggedIn: !!localStorage.getItem('token') ||'', // Détermine si l'utilisateur est connecté en vérifiant la présence d'un token
        userRole: localStorage.getItem('userRole') || '', // Récupère le rôle de l'utilisateur depuis le localStorage ou initialise à une chaîne vide
        userId: localStorage.getItem('userId') || '', // Récupère l'ID de l'utilisateur depuis le localStorage ou initialise à une chaîne vide
    }),
    actions: {
        // Action pour gérer la connexion
        async login(token: string) {
            this.token = token; // Met à jour le token dans l'état
            this.isLoggedIn = true; // Met à jour l'état de connexion
            localStorage.setItem('token', this.token); // Stocke le token dans le localStorage
            const decodedToken: DecodedToken = JSON.parse(atob(this.token.split('.')[1])); // Décode le token JWT
            console.log('Decoded Token:', decodedToken); // Ligne de débogage pour afficher le token décodé
            if (decodedToken.userId) {
                await this.fetchUserRole(decodedToken.userId); // Récupère le rôle de l'utilisateur si l'ID est présent dans le token
            } else {
                console.error('User ID is undefined in the token'); // Affiche une erreur si l'ID de l'utilisateur est indéfini dans le token
            }
        },
        // Action pour récupérer le rôle de l'utilisateur
        async fetchUserRole(userId: string) {
            try {
                const response = await fetch(`http://localhost:8080/api/utilisateurs/role/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`, // Ajoute le token d'authentification dans les en-têtes de la requête
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user role'); // Lance une erreur si la requête échoue
                }
                const data = await response.json();
                this.userRole = data.nom; // Met à jour le rôle de l'utilisateur dans l'état
                localStorage.setItem('userRole', this.userRole); // Stocke le rôle de l'utilisateur dans le localStorage
            } catch (error) {
                console.error('Error fetching user role:', error); // Affiche une erreur en cas de problème lors de la récupération du rôle
            }
        },
        // Action pour gérer la déconnexion (bouton déconnexion de la navBar)
        logout() {
            this.token = ''; // Réinitialise le token dans l'état
            this.userRole = ''; // Réinitialise le rôle de l'utilisateur dans l'état
            this.isLoggedIn = false; // Met à jour l'état de connexion
            localStorage.removeItem('token'); // Supprime le token du localStorage
            localStorage.removeItem('userRole'); // Supprime le rôle de l'utilisateur du localStorage
        },
    },
});
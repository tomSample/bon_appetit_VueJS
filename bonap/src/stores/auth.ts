import { defineStore } from 'pinia';
import { useRouter } from 'vue-router'; // Importer useRouter

// Interface for representing the decoded token
interface DecodedToken {
    sub: string; // Utilisé pour stocker l'ID de l'utilisateur
    roleId: string; // Utilisé pour stocker l'ID du rôle de l'utilisateur
}

// Helper functions for localStorage
export const getToken = () => localStorage.getItem('token') || '';
const setToken = (token: string) => localStorage.setItem('token', token);
const clearStorage = () => localStorage.clear();

// Helper function to include the token in the headers
const authFetch = async (url: string, options: RequestInit = {}) => {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
    }
    return response.json();
};

// Define the Pinia store for authentication
export const useAuthStore = defineStore('auth', {
    // Initial state of the store
    state: () => ({
        token: getToken(), // Retrieve the token from localStorage or initialize to an empty string
        isLoggedIn: !!getToken(), // Determine if the user is logged in by checking the presence of a token
        userRole: localStorage.getItem('userRole') || '', // Retrieve the user's role from localStorage or initialize to an empty string
        userId: localStorage.getItem('userId') || '', // Retrieve the user's ID from localStorage or initialize to an empty string
    }),
    actions: {
        // Action to handle login
        async login(username: string, password: string) {
            try {
                console.log('Attempting to log in with:', { username, password });

                // Step 1: Verify the user's credentials
                const response = await fetch('http://localhost:8080/api/connexions/check', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ login: username, password }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Login request failed');
                }

                const userData = await response.json();
                const userId = userData.utilisateurId;
                const userRole = userData.role;
                console.log('User data received:', userData);

                // Step 2: Fetch the token from the backend
                const tokenResponse = await fetch(`http://localhost:8080/api/generate-token?userId=${userId}`, {
                    method: 'GET',
                });

                if (!tokenResponse.ok) {
                    const errorData = await tokenResponse.json();
                    throw new Error(errorData.message || 'Failed to generate token');
                }

                const token = await tokenResponse.text();
                console.log('Token received:', token);

                // Step 3: Set the authentication state
                this.setAuthState(token, userId, userRole);
            } catch (error) {
                console.error('Login error:', error);
                throw error;
            }
        },
        // Action to handle signup
        async signUp(signUpData: { username: string, password: string, nom: string, prenom: string, email: string, telephone: string, numero: string, rue: string, complement: string, ville: string, codePostal: string, role_id: number }) {
            try {
                console.log('Attempting to sign up with:', signUpData);

                // Extraire les données brutes de l'objet Proxy `signUpData` (objet réactif) et les placer dans un nouvel objet `rawData`.
                // Cela permet de travailler avec une copie des données sans les références Proxy.
                const rawData = { ...signUpData };

                const response = await fetch('http://localhost:8080/api/utilisateurs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(rawData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Signup request failed');
                }

                const responseData = await response.json();
                console.log('Response received:', responseData);

                const userId = responseData.id;
                const userRole = responseData.role;

                // Fetch the token from the backend
                const tokenResponse = await fetch(`http://localhost:8080/api/generate-token?userId=${userId}`, {
                    method: 'GET',
                });

                if (!tokenResponse.ok) {
                    const errorData = await tokenResponse.json();
                    throw new Error(errorData.message || 'Failed to generate token');
                }

                const token = await tokenResponse.text();
                console.log('Token received:', token);

                // Set the authentication state with the token, user ID, and role
                this.setAuthState(token, userId, userRole);
            } catch (error) {
                console.error('Signup error:', error);
            }
        },
        // Action to handle logout
        logout(router) {
            clearStorage(); // Clear all localStorage items
            this.token = ''; // Reset the token in the state
            this.userRole = ''; // Reset the userRole in the state
            this.userId = ''; // Reset the userId in the state
            this.isLoggedIn = false; // Update the login state
            router.replace('/'); // Utiliser replace pour rediriger vers la page d'accueil
        },
        // Helper method to set authentication state
        setAuthState(token: string, userId: number, userRole: string) {
            this.token = token; // Update the token in the state
            this.isLoggedIn = true; // Update the login state
            setToken(token); // Store the token in localStorage
            this.userId = userId; // Update the userId in the state
            localStorage.setItem('userId', this.userId.toString()); // Store the userId in localStorage
            this.userRole = userRole; // Update the userRole in the state
            localStorage.setItem('userRole', this.userRole); // Store the userRole in localStorage

            // Debug
            console.log('Token:', this.token);
            console.log('User ID:', this.userId);
            console.log('User Role:', this.userRole);
        },
    },
});
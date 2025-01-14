import { defineStore } from 'pinia';

// Interface for representing the decoded token
interface DecodedToken {
    userId: string;
    role: string;
}

// Helper functions for localStorage
const getToken = () => localStorage.getItem('token') || '';
const setToken = (token: string) => localStorage.setItem('token', token);
const clearStorage = () => localStorage.clear();

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
        async login(login: string, password: string) {
            try {
                console.log('Attempting to log in with:', { login, password });

                // Step 1: Verify the user's credentials
                const response = await fetch('http://localhost:8080/api/connexions/check', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ login, password }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Login failed');
                }

                const userData = await response.json();
                const token = userData.token;
                console.log('User data received:', userData);

                this.setAuthState(token);
            } catch (error) {
                console.error('Login error:', error);
            }
        },
        // Action to handle signup
        async signUp(signUpData: { login: string, password: string, nom: string, prenom: string, email: string, telephone: string, role_id: number }) {
            try {
                console.log('Attempting to sign up with:', signUpData);

                const response = await fetch('http://localhost:8080/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(signUpData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Signup failed');
                }

                const token = await response.text();
                console.log('Token received:', token);
                this.setAuthState(token);
            } catch (error) {
                console.error('Signup error:', error);
            }
        },
        // Action to handle logout
        logout() {
            clearStorage(); // Clear all localStorage items
            this.token = ''; // Reset the token in the state
            this.userRole = ''; // Reset the userRole in the state
            this.userId = ''; // Reset the userId in the state
            this.isLoggedIn = false; // Update the login state
        },
        // Helper method to set authentication state
        setAuthState(token: string) {
            this.token = token; // Update the token in the state
            this.isLoggedIn = true; // Update the login state
            setToken(token); // Store the token in localStorage
            const decodedToken: DecodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token

            // Debug
            console.log('Token:', token);
            console.log('Decoded Token:', decodedToken); // Debug line to display the decoded token

            if (decodedToken.userId) {
                this.userId = decodedToken.userId; // Update the userId in the state
                localStorage.setItem('userId', this.userId); // Store the userId in localStorage
                this.userRole = decodedToken.role; // Update the userRole in the state
                localStorage.setItem('userRole', this.userRole); // Store the userRole in localStorage
            } else {
                console.error('User ID is undefined in the token'); // Log an error if the userId is undefined in the token
            }
        },
    },
});
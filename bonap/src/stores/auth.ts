import { defineStore } from 'pinia';

interface DecodedToken {
    id: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || '',
        userRole: '',
        isLoggedIn: !!localStorage.getItem('token'),
    }),
    actions: {
        async login(token: string) {
            this.token = token;
            this.isLoggedIn = true;
            localStorage.setItem('token', this.token);
            const decodedToken: DecodedToken = JSON.parse(atob(this.token.split('.')[1]));
            console.log('Decoded Token:', decodedToken); // Debugging line
            if (decodedToken.id) {
                await this.fetchUserRole(decodedToken.id);
            } else {
                console.error('User ID is undefined in the token');
            }
        },
        async fetchUserRole(userId: string) {
            try {
                const response = await fetch(`http://localhost:8080/api/utilisateurs/role/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user role');
                }
                const data = await response.json();
                this.userRole = data.nom;
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        },
        logout() {
            this.token = '';
            this.userRole = '';
            this.isLoggedIn = false;
            localStorage.removeItem('token');
        },
    },
});
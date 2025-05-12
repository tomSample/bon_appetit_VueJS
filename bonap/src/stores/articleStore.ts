import { defineStore } from 'pinia';
import { getToken } from './auth'; // Importez votre fonction de récupération de token

// Interface pour correspondre exactement au modèle Spring Boot
interface Article {
  id?: number;
  name: string;
  type: string;
  weight: string;
  preparationTime: string;
  price: number;
  description: string;
}

interface ArticleState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

export const useArticleStore = defineStore('article', {
  state: (): ArticleState => ({
    articles: [],
    loading: false,
    error: null
  }),

  actions: {
    async addArticle(article: Article, restaurantId: number) {
      try {
        this.loading = true;
        this.error = null;

        const token = getToken();

        // Correspond exactement à votre endpoint backend
        const response = await fetch(`http://localhost:8080/api/articles/restaurant/${restaurantId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(article)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erreur lors de la création de l\'article');
        }

        const newArticle = await response.json();
        
        // Ajouter le nouvel article à la liste locale
        this.articles.push(newArticle);
        
        return newArticle;
      } catch (error: any) {
        this.error = error.message;
        console.error('Erreur:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Méthode pour récupérer les articles d'un restaurant
    async fetchArticles(restaurantId: number) {
      try {
        this.loading = true;
        this.error = null;

        const token = getToken();

        const response = await fetch(`http://localhost:8080/api/articles?restaurantId=${restaurantId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erreur lors de la récupération des articles');
        }

        this.articles = await response.json();
      } catch (error: any) {
        this.error = error.message;
        console.error('Erreur:', error);
      } finally {
        this.loading = false;
      }
    }
  },

  getters: {
    // Getter pour filtrer les articles par type
    getArticlesByType: (state) => (type: string) => {
      return state.articles.filter(article => article.type === type);
    }
  }
});
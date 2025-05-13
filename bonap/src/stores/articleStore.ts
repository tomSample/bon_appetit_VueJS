import { defineStore } from 'pinia';

// Interface pour correspondre au backend
interface Article {
  id?: number;
  nom: string;
  prix: number;
  description: string;
  image?: string;
  poids: number;
  stock: number;
  duree?: number;
  restaurant?: any;
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
        
        // Correspond exactement à votre endpoint backend
        const response = await fetch(`http://localhost:8080/api/articles/restaurant/${restaurantId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(article)
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la création de l\'article');
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
        
        const response = await fetch(`http://localhost:8080/api/articles?restaurantId=${restaurantId}`);

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des articles');
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
    // Getter pour récupérer un article par ID
    getArticleById: (state) => (id: number) => {
      return state.articles.find(article => article.id === id);
    }
  }
});
import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  created_by: string;
  created_by_name: string;
  stars: string;
  userStarred: boolean;
}

export interface User {
  id: string;
  name: string;
}

export const articleService = {
    
    getArticles: async (order?: string): Promise<Article[]> => {
        const params = order ? { order } : {};
        const response = await api.get('/articles', { params });
        return response.data.response
    },

    getUser: async (userId: string): Promise<User> => {
        const response = await api.get(`/users/${userId}`);
        return response.data
    },

    toggleStar: async (articleId: string, isStarred: boolean, userId: string) => {
        try {
            if (isStarred) {
                await api.delete(`/articles/stars/`, {
                    data: { userId, articleId }
                });
            } else {
                await api.post(`/articles/stars`, {
                    userId, articleId
                });
            }
        } catch (error) {
            console.error('Error toggling star:', error);
            throw error;
        }
    },

}
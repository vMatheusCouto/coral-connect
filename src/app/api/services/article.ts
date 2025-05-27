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

    getSars: async (articleId: string): Promise<Article[]> => {
        const response = await api.get(`/articles/${articleId}/stars}`)
        return response.data
    },

    getUserStarred: async (articleId: string) => {
        const response = await api.get(`/articles/${articleId}/stars`)
        const user = await api.get('/users/user')
        const userStar = response.data.stars.find((star: any) => star.user_id === user.data.id)
        return !!userStar
    },

    toggleStar: async (articleId: string, isStarred: boolean) => {
        const user = await api.get('/users/user')
        if (isStarred) {
            await api.delete(`/articles/${articleId}/stars`, { data: user.data.id });
        } else {
            await api.post(`/articles/${articleId}/stars`, { userId: user.data.id });
        }
    }

}
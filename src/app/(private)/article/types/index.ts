export interface Article {
    id: string;
    title: string;
    description: string;
    content: string;
    created_by: string;
    created_by_name: string;
    created_at: string;
    updated_at: string;
    stars: string;
    userStarred: boolean;
    comments: {
      count: number;
      items: [{
        id: string;
        created_by: string;
        article_id: string;
        content: string;
        created_by_name: string;
        likes: number;
        userLiked: boolean;
      }]
    }
  }
  
  export interface ArticleComment {
    id: string;
    created_at: Date;
    article_id: string;
    created_by: string;
    content: string;
  }
  
  export interface ArticleCardProps {
    element: Article;
    setArticles: (articles: Article[]) => void;
    articles: Article[];
    userIdServer: string;
    size?: 'small' | 'medium' | 'large';
  }
  
  export interface ArticleListProps {
    variant: 'grid' | 'list';
    userIdServer: string;
  }
  
  export interface StarToggleResponse {
    success: boolean;
    error?: string;
  }
  
  export interface UserProfile {
    id: string;
    name: string;
    avatar?: string;
  }
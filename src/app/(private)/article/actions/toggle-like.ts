import { articleService } from "@/app/services/article";
import { Article } from "../types";

export const toggleLike = async (commentary: any, setArticles: Function, articles: Article[], userIdServer: string) => {
      setArticles(articles.map((article: Article) => 
        article.id === commentary.article_id ? {
          ...article, 
          comments: {
            ...article.comments,
            items: article.comments.items.map(item => 
              item.id === commentary.id ? {
                ...item, 
                likes: commentary.userLiked ? item.likes - 1 : item.likes + 1, 
                userLiked: !commentary.userLiked
              } : item
            )
          }
        } : article
      ));
      
      await articleService.toggleLike(commentary.id, commentary.userLiked, userIdServer);
}
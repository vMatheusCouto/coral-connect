import { articleService } from "@/services/article";
import { Article } from "@/types";

export const toggleStar = async (element: Article, setArticles: Function, articles: Article[], userIdServer: string) => {
    try {
      setArticles(articles.map((article: Article) => 
        article.id === element.id ? {...article, stars: (parseInt(article.stars) + (article.userStarred ? -1 : 1)).toString(), userStarred: !article.userStarred} : article
      ))
      await articleService.toggleStar(element.id, element.userStarred, userIdServer);
    } catch (error) {
      return error
    }
  }
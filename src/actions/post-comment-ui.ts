import { Article } from "../types";

export async function postCommentUI(element: Article, setArticles: Function, articles: Article[], userIdServer: string, content: string) {
  setTimeout(() => {
    setArticles(articles.map((article: Article) => {
      if (article.id === element.id) {
        return {
          ...article,
          comments: {
            count: article.comments.count + 1,
            items: [
              ...article.comments.items,
              {
                id: article.comments.items.slice(-1)[0]?.id ? (parseInt(article.comments.items.slice(-1)[0].id) + 1).toString() : '0',
                created_by: userIdServer,
                article_id: element.id,
                content: content,
                created_by_name: 'You',
                likes: 0,
                userLiked: false
              }
            ]
          }
        }
      }
      console.log('UI done first: ' + new Date())
      return article;
    }))
  }, 1000)
}

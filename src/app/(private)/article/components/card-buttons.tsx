import { Button } from "@/components/ui/button"
import { Article } from "../types"
import { toggleStar } from "../actions/toggle-star"
import { Heart, MessageCircle, Star } from "lucide-react"
import { toggleLike } from "../actions/toggle-like"

export const StarButton = ({element, setArticles, articles, userIdServer}: {element: Article, setArticles: Function, articles: Article[], userIdServer: string}) => {
    return (
        <Button variant="ghost" onClick={() => toggleStar(element, setArticles, articles, userIdServer)} className="border-1">
            <Star className={element.userStarred ? "fill-foreground" : ""}/>
            {element.stars}
        </Button>
    )
}

export const LikeButton = ({commentary, setArticles, articles, userIdServer}: {commentary: any, setArticles: Function, articles: Article[], userIdServer: string}) => {
    return (
        <Button variant="ghost" onClick={() => toggleLike(commentary, setArticles, articles, userIdServer)}>
            <Heart className={commentary.userLiked ? "fill-foreground" : ""}/>
            {commentary.likes}
        </Button>
    )
}
import { Button } from "@/components/ui/button"
import { Article } from "../types"
import { toggleStar } from "../actions/toggle-star"
import { Star } from "lucide-react"

export const StarButton = ({element, setArticles, articles, userIdServer}: {element: Article, setArticles: Function, articles: Article[], userIdServer: string}) => {
    return (
        <Button variant="ghost" onClick={() => toggleStar(element, setArticles, articles, userIdServer)}>
            <Star className={element.userStarred ? "fill-foreground" : ""}/>
            {element.stars}
        </Button>
    )
}
"use server"

import { getSession } from "@/app/lib/session";
import { supabase } from "@/app/utils/supabase";

interface StarButtonProps {
    articleId: string;
}

export async function StarButton({ articleId }: StarButtonProps) {
    const user = await getSession()
    let userStarred: boolean = false
    let starsCount: number = 0

    const { data: fetchedArticle, error: fetchError } = await supabase
        .from('stars')
        .select('*')
        .eq('article_id', articleId)
        .single()

    if (fetchError || !fetchedArticle) {
        console.log(userStarred)
        console.log(starsCount)
        return { userStarred: userStarred, starsCount: starsCount }
    }

    console.log(fetchedArticle)
}

import { getSession } from "@/app/lib/session";
import { supabase } from "@/app/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const order = searchParams.get('order') || 'created_at';
/*     console.log('Fetching articles with order:', order);
 */    const session = await getSession()
    const userIdServer = session?.userId || null;
    console.log("user: " + userIdServer)
    try {
        const { data, error } = await supabase
            .from("articles")
            .select("*")
            .order(order, { ascending: false });

        const { data: user } = await supabase
            .from('auth-users')
            .select('id, name')

        const { data: star } = await supabase
            .from('comments')
            .select('user_id, article_id')

        const { data: comments } = await supabase
            .from('comments')
            .select('id, created_by, article_id, content')

        const { data: likes } = await supabase
            .from('likes')
            .select('user_id, comment_id')
        
        const response = data?.map((item: any) => {
            return {
                ...item,
                created_by_name: user?.find((j: any) => j.id === item.created_by)?.name || 'Unknown User',
                stars: star?.filter((j: any) => j.article_id === item.id)?.length || 0,
                userStarred: !!star?.filter((j: any) => j.article_id === item.id)?.find((j: any) => j.user_id == userIdServer),
                comments: {
                    count: comments?.filter((j: any) => j.article_id === item.id)?.length || 0,
                    items: comments?.filter((j: any) => j.article_id === item.id)?.map((comment: any) => {
                        return {
                            ...comment,
                            created_by_name: user?.find((j: any) => j.id === comment.created_by)?.name || 'Unknown User',
                            likes: likes?.filter((j: any) => j.comment_id === comment.id)?.length || 0,
                            userLiked: !!likes?.find((j: any) => j.comment_id === comment.id && j.user_id == userIdServer)
                        }
                    })
                }
            }
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
            console.log({response});
            return NextResponse.json({ response });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
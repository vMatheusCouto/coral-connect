import { supabase } from "@/app/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const order = searchParams.get('order') || 'created_at';
    console.log('Fetching articles with order:', order);
    try {
        const { data, error } = await supabase
            .from("articles")
            .select("*")
            .order(order, { ascending: false });

        const { data: user } = await supabase
            .from('auth-users')
            .select('id, name')

        const { data: star } = await supabase
            .from('stars')
            .select('user_id, article_id')
    
        const response = data?.map((item: any) => {
            return {
                ...item,
                created_by_name: user?.find((j: any) => j.id === item.created_by)?.name || 'Unknown User',
                stars: star?.filter((j: any) => j.article_id === item.id)?.length || 0
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
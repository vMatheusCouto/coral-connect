import { supabase } from "@/app/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    request: NextRequest
) {
    try {
        const { userId, articleId } = await request.json();
        console.log('Adding star for user:', userId, 'for article with ID:', articleId);
        const { error } = await supabase
            .from('stars')
            .insert([{
                article_id: articleId,
                user_id: userId
            }]);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest
) {
    try {
        const { userId, articleId } = await request.json();
        console.log('Removing star for user:', userId, 'for article with ID:', articleId);
        const { error } = await supabase
            .from('stars')
            .delete()
            .eq('article_id', articleId)
            .eq('user_id', userId)

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    request: NextRequest
) {
    try {
        const { userId, commentId } = await request.json();
        const { error } = await supabase
            .from('likes')
            .insert([{
                comment_id: commentId,
                created_by: userId
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
        const { userId, commentId } = await request.json();
        const { error } = await supabase
            .from('likes')
            .delete()
            .eq('created_by', userId)
            .eq('comment_id', commentId)

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
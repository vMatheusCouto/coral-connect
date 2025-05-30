import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest, { params }: {
    params: Promise<{ userId: string }>
}) {
    const { userId } = await params;
    console.log('Fetching user with ID:', userId);
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)

            if (error) {
                return NextResponse.json({ error: error.message }, { status: 500 });
            }
            return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
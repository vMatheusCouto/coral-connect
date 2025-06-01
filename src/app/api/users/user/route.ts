import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    console.log('Fetching user with ID:', userId);
    try {
        const { data, error } = await supabase
            .from('auth-users')
            .select('*')
            .eq('id', userId)

            if (error) {
                return NextResponse.json({ error: error.message }, { status: 500 });
            }
            console.log(data[0])
            return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}